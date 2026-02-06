"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhonographModel = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
class PhonographModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CurrentPlayMusicId = 0;
    this.CurrentSelectMusicId = 0;
    this.CurrentPlayActorEntityId = 0;
    this.IsGlobal = false;
    this.CurrentPlayMusicTime = 0;
    this.CurrentPlayMusicTotalTime = 0;
    this.UnlockMusicIds = [];
    this.NewMusicIds = [];
    this.GlobalMusicId = 0;
    this.CurrentMusicHandleId = 0;
    this.RecordMusicIdMap = new Map();
    this.Gn_ = new Map();
    this.QQf = new Set();
  }
  OnInit() {
    var e = ConfigManager_1.ConfigManager.PhonographConfig.GetMusicList();
    if (e) {
      e.forEach(e => this.QQf.add(e.ItemId));
    }
    return true;
  }
  set RecordMusicId(e) {
    this.RecordMusicIdMap.set(this.CurrentPlayActorEntityId, e);
  }
  get RecordMusicId() {
    return this.RecordMusicIdMap.get(this.CurrentPlayActorEntityId) ?? 0;
  }
  GetRecordMusicId(e) {
    return this.RecordMusicIdMap.get(e) ?? 0;
  }
  GetPlayIdRecord(e) {
    return this.Gn_.get(e) ?? 0;
  }
  SetPlayIdRecord(e, t) {
    this.Gn_.set(e, t);
  }
  RemovePlayIdRecord(e) {
    this.Gn_.delete(e);
  }
  IsUnlockMusic(e) {
    return !!ConfigManager_1.ConfigManager.PhonographConfig.GetMusicById(e).Lock || this.UnlockMusicIds.includes(e);
  }
  IsNewMusic(e) {
    return this.NewMusicIds.includes(e);
  }
  RemoveNewMusic(e) {
    e = this.NewMusicIds.indexOf(e);
    if (e >= 0) {
      this.NewMusicIds.splice(e, 1);
    }
  }
  get EntityActor() {
    var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.CurrentPlayActorEntityId);
    if (e) {
      e = e.Entity?.CheckGetComponent(1);
      if (e) {
        return e.Owner;
      }
    }
  }
  get EntityId() {
    var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.CurrentPlayActorEntityId);
    if (e) {
      return e.Entity?.EntityData?.EntityId;
    }
  }
  CheckAlbumHasNewMusic(e) {
    for (const t of ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicList() ?? []) {
      if (this.IsNewMusic(t.Id) && t.Album.includes(e)) {
        return true;
      }
    }
    return false;
  }
  ClearPlayInfo() {
    this.CurrentPlayMusicId = 0;
    this.CurrentPlayActorEntityId = 0;
    this.CurrentPlayMusicTime = 0;
    this.CurrentPlayMusicTotalTime = 0;
  }
  async GetMusicDuration(e) {
    e = ConfigManager_1.ConfigManager.PhonographConfig.GetMusicById(e).MusicEvent;
    return (await AudioSystem_1.AudioSystem.GetAudioEvent(e))?.MaximumDuration ?? 0;
  }
  GetCurrentPlayTimeFromAudio() {
    var e;
    if (this.CurrentMusicHandleId === -1 || (e = AudioSystem_1.AudioSystem.GetSourcePlayPosition(this.CurrentMusicHandleId)) === undefined) {
      return 0;
    } else {
      return Math.floor(e * CommonDefine_1.SECOND_PER_MILLIONSECOND);
    }
  }
  GetUnlockItemIds() {
    const t = [];
    var e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemByItemType(60004);
    if (e) {
      e.forEach(e => {
        if (this.QQf.has(e.GetConfigId())) {
          t.push(e.GetConfigId());
        }
      });
      return t;
    } else {
      return [];
    }
  }
}
exports.PhonographModel = PhonographModel;
//# sourceMappingURL=PhonographModel.js.map