"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhonographView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhonographAlbumItem_1 = require("../Component/PhonographAlbumItem");
const PhonographMusicPlayItem_1 = require("../Component/PhonographMusicPlayItem");
class PhonographView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.AlbumGenericLayout = undefined;
    this.MusicGenericLayout = undefined;
    this.MusicMap = new Map();
    this.CaptionComponent = undefined;
    this.SequencePlayer = undefined;
    this.v7d = 0;
    this.OnCreateAlbumItem = () => {
      var e = new PhonographAlbumItem_1.PhonographAlbumItem();
      e.OnClickAlbumItem = this.OnClickAlbumItem;
      return e;
    };
    this.OnCreateMusicItem = () => {
      var e = new PhonographMusicPlayItem_1.PhonographMusicPlayItem();
      e.OnClickMusicItem = this.OnClickMusicItem;
      return e;
    };
    this.OnClickAlbumItem = (e, r) => {
      this.AlbumGenericLayout.SelectGridProxy(r);
      var t;
      var n = (this.MusicMap.get(e) ?? []).sort((e, r) => {
        var t = ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId === e;
        var n = ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId === r;
        if (t && !n) {
          return -1;
        } else if (!t && n) {
          return 1;
        } else if (ModelManager_1.ModelManager.PhonographModel.IsNewMusic(e) && !ModelManager_1.ModelManager.PhonographModel.IsNewMusic(r)) {
          return -1;
        } else if (!ModelManager_1.ModelManager.PhonographModel.IsNewMusic(e) && ModelManager_1.ModelManager.PhonographModel.IsNewMusic(r)) {
          return 1;
        } else if (ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(e) && !ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(r)) {
          return -1;
        } else if (!ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(e) && ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(r)) {
          return 1;
        } else {
          return e - r;
        }
      });
      let i = 0;
      let o = -1;
      for (const a of n) {
        if (ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(a)) {
          i++;
        }
        if (ModelManager_1.ModelManager.PhonographModel?.CurrentPlayMusicId === a && (t = ModelManager_1.ModelManager.PhonographModel?.CurrentPlayMusicId)) {
          o = n.indexOf(t);
        }
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "PrefabTextItem_1090321532_Text", i, n.length);
      ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId = o !== -1 ? n[o] : 0;
      this.RefreshSwitchBtn(ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId);
      this.MusicGenericLayout?.GetUiAnimController()?.Stop();
      this.MusicGenericLayout.RefreshByData(n, () => {
        if (o !== -1) {
          this.MusicGenericLayout.SelectGridProxy(o, false);
          this.RefreshMusicInfo(ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId);
        }
        this.GetScrollViewWithScrollbar(11)?.SetScrollProgress(0);
      }, true);
      this.SequencePlayer?.PlaySequencePurely("Album");
      this.RefreshAlbumInfo(e);
    };
    this.OnClickMusicItem = (e, r) => {
      ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId = e;
      if (ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(e)) {
        this.MusicGenericLayout.SelectGridProxy(r);
        this.v7d = ControllerHolder_1.ControllerHolder.PhonographController.PlayMusic(e);
        ModelManager_1.ModelManager.PhonographModel?.RemoveNewMusic(e);
        this.RefreshMusicInfo(e);
        this.SequencePlayer?.PlaySequencePurely("Single");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhonographRemoveNewTag);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhonographSwitchMusic);
      } else {
        this.RefreshMusicInfo(e);
        this.MusicGenericLayout.SelectGridProxy(r);
      }
    };
    this.OnClickSetBgMusic = () => {
      var e = ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId;
      var r = ModelManager_1.ModelManager.PhonographModel.RecordMusicId === e ? 0 : e;
      ModelManager_1.ModelManager.PhonographModel.RecordMusicId = r;
      var t = ModelManager_1.ModelManager.PhonographModel?.EntityId;
      if (r === 0) {
        ModelManager_1.ModelManager.PhonographModel.RemovePlayIdRecord(t);
      } else {
        ModelManager_1.ModelManager.PhonographModel.SetPlayIdRecord(t, this.v7d);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhonographSetBgm, r);
      this.RefreshSwitchBtn(e);
      if (r !== 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhonographSwitchMusicSuccess");
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhonographSwitchMusicCancel");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIVerticalLayout], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UIText], [10, UE.UIText], [11, UE.UIScrollViewWithScrollbarComponent]];
    this.BtnBindInfo = [[7, this.OnClickSetBgMusic]];
  }
  async OnBeforeStartAsync() {
    ControllerHolder_1.ControllerHolder.PhonographController.StopMusic();
    ModelManager_1.ModelManager.PhonographModel.RecordMusicId = 0;
    await ControllerHolder_1.ControllerHolder.PhonographController.GetMusicInfoRequest();
    this.AlbumGenericLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.OnCreateAlbumItem);
    this.MusicGenericLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), this.OnCreateMusicItem);
    const r = new Set();
    var e = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicList() ?? [];
    const t = new Map();
    for (const n of e) {
      n.Album.forEach(e => {
        if (!r.has(e)) {
          r.add(e);
          t.set(e, ConfigManager_1.ConfigManager.PhonographConfig.GetMusicAlbumById(e));
        }
        if (!this.MusicMap.has(e)) {
          this.MusicMap.set(e, []);
        }
        this.MusicMap.get(e).push(n.Id);
      });
    }
    await this.AlbumGenericLayout.RefreshByDataAsync(Array.from(r).sort((e, r) => {
      e = t.get(e);
      r = t.get(r);
      return e.SortIndex - r.SortIndex;
    }));
    this.AlbumGenericLayout.SelectGridProxy(0, true);
    this.CaptionComponent = new PopupCaptionItem_1.PopupCaptionItem();
    this.CaptionComponent.SetCloseCallBack(() => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnExitNpcInteract);
      this.CloseMe();
    });
    await this.CaptionComponent.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnBeforeDestroy() {
    var e;
    var r;
    ModelManager_1.ModelManager.PhonographModel.NewMusicIds = [];
    ControllerHolder_1.ControllerHolder.PhonographController.ClearTimer();
    if (ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId !== ModelManager_1.ModelManager.PhonographModel.RecordMusicId) {
      ControllerHolder_1.ControllerHolder.PhonographController.StopMusic(false);
      e = ModelManager_1.ModelManager.PhonographModel?.EntityId;
      if (ModelManager_1.ModelManager.PhonographModel.RecordMusicId !== 0) {
        r = ControllerHolder_1.ControllerHolder.PhonographController.PlayMusic(ModelManager_1.ModelManager.PhonographModel.RecordMusicId, false);
        ModelManager_1.ModelManager.PhonographModel.SetPlayIdRecord(e, r);
      }
    } else {
      ControllerHolder_1.ControllerHolder.PhonographController.ClearTimer();
      ModelManager_1.ModelManager.PhonographModel.ClearPlayInfo();
    }
  }
  RefreshAlbumInfo(e) {
    e = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicAlbumById(e);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Title);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e.Desc);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.Title);
    }
  }
  RefreshMusicInfo(e) {
    var r = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(e);
    if (r) {
      if (ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(e)) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), r.Desc);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), r.UnlockConditionText);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), r.Title);
      this.RefreshSwitchBtn(e);
    }
  }
  RefreshSwitchBtn(e) {
    this.GetButton(7).GetRootComponent()?.SetUIActive(e !== 0 && ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(e));
    e = ModelManager_1.ModelManager.PhonographModel.RecordMusicId === e;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e ? "PhonographSwitchBtnNormal" : "PhonographSwitchBtnSelect");
  }
}
exports.PhonographView = PhonographView;
//# sourceMappingURL=PhonographView.js.map