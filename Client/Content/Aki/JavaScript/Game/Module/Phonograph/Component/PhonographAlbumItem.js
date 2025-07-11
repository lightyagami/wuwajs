"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhonographAlbumItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PhonographAlbumItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnClickAlbumItem = undefined;
    this.AlbumId = 0;
    this.IsPlayMusic = false;
    this.LevelSequencePlayer = undefined;
    this.eTt = e => {
      if (e === 1 && this.OnClickAlbumItem) {
        this.OnClickAlbumItem(this.AlbumId, this.GridIndex);
      }
    };
    this.oKl = () => {
      var e;
      if (ModelManager_1.ModelManager.PhonographModel?.CurrentPlayMusicId === 0 && this.IsPlayMusic) {
        this.IsPlayMusic = false;
        this.LevelSequencePlayer?.PlaySequencePurely("Stop");
      } else if ((e = ModelManager_1.ModelManager.PhonographModel?.CurrentPlayMusicId) !== 0 && (e = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(e))) {
        if ((e = e.Album.includes(this.AlbumId)) && !this.IsPlayMusic) {
          this.IsPlayMusic = true;
          this.LevelSequencePlayer?.PlaySequencePurely("Play");
        } else if (!e && this.IsPlayMusic) {
          this.IsPlayMusic = false;
          this.LevelSequencePlayer?.PlaySequencePurely("Stop");
        }
      }
    };
    this.W5l = () => {
      var e = ModelManager_1.ModelManager.PhonographModel.CheckAlbumHasNewMusic(this.AlbumId);
      this.GetItem(2).SetUIActive(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhonographRemoveNewTag, this.W5l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhonographSwitchMusic, this.oKl);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhonographRemoveNewTag, this.W5l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhonographSwitchMusic, this.oKl);
  }
  Refresh(e, t, i) {
    this.AlbumId = e;
    var s = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicAlbumById(e);
    if (s) {
      e = ModelManager_1.ModelManager.PhonographModel.CheckAlbumHasNewMusic(e);
      this.GetItem(2).SetUIActive(e);
      this.SetSpriteByPath(s.Icon, this.GetSprite(1), false);
    }
  }
  OnSelected(e) {
    this.GetExtendToggle(0).SetToggleState(1);
    if (e && this.OnClickAlbumItem) {
      this.OnClickAlbumItem(this.AlbumId, this.GridIndex);
    }
    if (this.IsPlayMusic) {
      this.LevelSequencePlayer?.PlaySequencePurely("Play");
    }
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleState(0);
  }
}
exports.PhonographAlbumItem = PhonographAlbumItem;
//# sourceMappingURL=PhonographAlbumItem.js.map