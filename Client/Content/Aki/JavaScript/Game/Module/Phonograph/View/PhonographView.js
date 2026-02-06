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
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhonographAlbumItem_1 = require("../Component/PhonographAlbumItem");
const PhonographMusicPlayItem_1 = require("../Component/PhonographMusicPlayItem");
class PhonographView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.AlbumGenericLayout = undefined;
    this.MusicGenericLayout = undefined;
    this.MusicMap = new Map();
    this.CaptionComponent = undefined;
    this.SequencePlayer = undefined;
    this.Hzd = 0;
    this.wsg = 0;
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
      var o;
      this.wsg = e;
      this.AlbumGenericLayout.SelectGridProxy(r);
      const i = (this.MusicMap.get(e) ?? []).sort((e, r) => {
        var o = ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId === e;
        var i = ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId === r;
        if (o && !i) {
          return -1;
        } else if (!o && i) {
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
      let t = 0;
      let n = -1;
      for (const a of i) {
        if (ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(a)) {
          t++;
        }
        if (ModelManager_1.ModelManager.PhonographModel?.CurrentPlayMusicId === a && (o = ModelManager_1.ModelManager.PhonographModel?.CurrentPlayMusicId)) {
          n = i.indexOf(o);
        }
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "PrefabTextItem_1090321532_Text", t, i.length);
      ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId = n !== -1 ? i[n] : 0;
      this.RefreshSwitchBtn(ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId);
      this.MusicGenericLayout?.GetUiAnimController()?.Stop();
      r = new UiAsyncTask_1.UiAsyncTask("PhonographView.OnClickAlbumItem", async () => {
        var e = i.map(async e => ModelManager_1.ModelManager.PhonographModel.GetMusicDuration(e));
        const o = await Promise.all(e);
        e = i.map((e, r) => ({
          Id: e,
          Duration: o[r]
        }));
        this.MusicGenericLayout.RefreshByData(e, () => {
          if (n !== -1) {
            this.MusicGenericLayout.SelectGridProxy(n, false);
            this.RefreshMusicInfo(ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId);
          }
          this.GetScrollViewWithScrollbar(11)?.SetScrollProgress(0);
        }, true);
      });
      this.RunAsyncTask(r);
      this.SequencePlayer?.PlaySequencePurely("Album");
      this.RefreshAlbumInfo(e);
    };
    this.OnClickMusicItem = (e, r) => {
      var o;
      ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId = e;
      if (ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(e)) {
        this.MusicGenericLayout.SelectGridProxy(r);
        this.Hzd = ControllerHolder_1.ControllerHolder.PhonographController.PlayMusic(e, ModelManager_1.ModelManager.PhonographModel.IsGlobal);
        ModelManager_1.ModelManager.PhonographModel?.RemoveNewMusic(e);
        this.RefreshMusicInfo(e);
        this.SequencePlayer?.PlaySequencePurely("Single");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhonographRemoveNewTag);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhonographSwitchMusic);
        (o = new LogReportDefine_1.PhonographPlayLogEvent()).i_item_id = e;
        o.i_album_id = this.wsg;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(o);
      } else {
        this.RefreshMusicInfo(e);
        this.MusicGenericLayout.SelectGridProxy(r);
      }
    };
    this.OnClickSetBgMusic = () => {
      var e;
      var r = ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId;
      var o = ModelManager_1.ModelManager.PhonographModel.RecordMusicId === r ? 0 : r;
      ModelManager_1.ModelManager.PhonographModel.RecordMusicId = o;
      if (ModelManager_1.ModelManager.PhonographModel.IsGlobal) {
        ModelManager_1.ModelManager.PhonographModel.GlobalMusicId = o;
        ControllerHolder_1.ControllerHolder.PhonographController.SendMusicSaveRequest(o);
      } else {
        e = ModelManager_1.ModelManager.PhonographModel?.EntityId;
        if (o === 0) {
          ModelManager_1.ModelManager.PhonographModel.RemovePlayIdRecord(e);
        } else {
          ModelManager_1.ModelManager.PhonographModel.SetPlayIdRecord(e, this.Hzd);
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhonographSetBgm, o);
      this.RefreshSwitchBtn(r);
      if (o !== 0) {
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
    await ControllerHolder_1.ControllerHolder.PhonographController.GetMusicInfoRequest();
    this.AlbumGenericLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.OnCreateAlbumItem);
    this.MusicGenericLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), this.OnCreateMusicItem);
    var e = new Set();
    var r = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicList() ?? [];
    const o = new Map();
    let i = 0;
    for (const t of r) {
      for (const n of t.Album) {
        if (!e.has(n)) {
          e.add(n);
          o.set(n, ConfigManager_1.ConfigManager.PhonographConfig.GetMusicAlbumById(n));
        }
        if (!this.MusicMap.has(n)) {
          this.MusicMap.set(n, []);
        }
        this.MusicMap.get(n).push(t.Id);
        if (t.Id === ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId) {
          i = n;
        }
      }
    }
    r = Array.from(e);
    r.sort((e, r) => {
      e = o.get(e);
      r = o.get(r);
      return e.SortIndex - r.SortIndex;
    });
    await this.AlbumGenericLayout.RefreshByDataAsync(r);
    r = r.indexOf(i);
    this.AlbumGenericLayout.SelectGridProxy(r <= 0 ? 0 : r, true);
    this.CaptionComponent = new PopupCaptionItem_1.PopupCaptionItem();
    this.CaptionComponent.SetCloseCallBack(() => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnExitNpcInteract);
      this.CloseMe();
    });
    await this.CaptionComponent.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnTick(e) {
    if (!this.MusicGenericLayout.IsLock) {
      this.MusicGenericLayout.GetLayoutItemList().forEach(e => {
        e.OnTick();
      });
    }
  }
  OnBeforeDestroy() {
    var e;
    var r;
    ModelManager_1.ModelManager.PhonographModel.NewMusicIds = [];
    if (ModelManager_1.ModelManager.PhonographModel.IsGlobal) {
      if (ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId !== ModelManager_1.ModelManager.PhonographModel.RecordMusicId && (ControllerHolder_1.ControllerHolder.PhonographController.StopMusic(false), ModelManager_1.ModelManager.PhonographModel.RecordMusicId !== 0)) {
        ControllerHolder_1.ControllerHolder.PhonographController.PlayGlobalMusic(ModelManager_1.ModelManager.PhonographModel.RecordMusicId, true);
      }
    } else if (ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId !== ModelManager_1.ModelManager.PhonographModel.RecordMusicId && (ControllerHolder_1.ControllerHolder.PhonographController.StopMusic(false), e = ModelManager_1.ModelManager.PhonographModel?.EntityId, ModelManager_1.ModelManager.PhonographModel.RecordMusicId !== 0)) {
      r = ControllerHolder_1.ControllerHolder.PhonographController.PlayMusic(ModelManager_1.ModelManager.PhonographModel.RecordMusicId);
      ModelManager_1.ModelManager.PhonographModel.SetPlayIdRecord(e, r);
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