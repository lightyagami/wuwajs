"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdventureTargetView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const AdventureGuideController_1 = require("../AdventureGuideController");
const AdventureTargetItem_1 = require("./AdventureTargetItem");
const AdventureTargetRewardItem_1 = require("./AdventureTargetRewardItem");
const REWARD_RECEIVED = "ChapterRewardGet";
const NOT_FINISH_TIP = "NotFinishedTip";
const GET_REWARD = "GetReward";
const FRONT_ADD_FRAME = 0.01;
class AdventureTargetView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.H3e = undefined;
    this.n6e = 0;
    this.s6e = undefined;
    this.a6e = undefined;
    this.h6e = undefined;
    this.l6e = 0;
    this._6e = false;
    this.SPe = undefined;
    this.JVe = false;
    this.YVe = () => {
      var e = new AdventureTargetRewardItem_1.AdventureTargetRewardItem();
      e.BindOnExtendToggleClicked(this.u6e);
      e.BindOnCanExecuteChange(this.c6e);
      return e;
    };
    this.u6e = e => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.Data[0].ItemId);
    };
    this.c6e = () => false;
    this.m6e = () => {
      var e = new AdventureTargetItem_1.AdventureTargetItem();
      e.SetClickGetButtonCb(this.k8u);
      return e;
    };
    this.k8u = e => {
      var t;
      if (!this.JVe) {
        this.JVe = true;
        t = ModelManager_1.ModelManager.AdventureGuideModel.GetChapterTasks(this.n6e)?.filter(e => e.Status === Protocol_1.Aki.Protocol.Aks.a3_).map(e => e.AdventureTaskBase.Id) ?? [];
        ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestMultiForAdventureReward(t).finally(() => {
          this.JVe = false;
        });
      }
    };
    this.U1m = () => {
      if (ConfigManager_1.ConfigManager.AdventureModuleConfig.GetChapterAdventureConfig(this.n6e)) {
        var e = ModelManager_1.ModelManager.AdventureGuideModel.GetRewardChaptersList();
        for (const t of this.H3e?.GetLayoutItemList() ?? []) {
          t.SetReceivedFlagVisible(e.includes(this.n6e));
        }
      }
    };
    this.d6e = () => {
      var e;
      if (this.n6e > 1) {
        this.h6e?.SetFillAmount(0);
        e = this.n6e - 1;
        this.SetAdventureTargetInfoByChapter(e, ModelManager_1.ModelManager.AdventureGuideModel.GetUnLockChaptersList().includes(e));
      }
      this.SPe?.StopCurrentSequence(false, true);
      this.SPe?.PlayLevelSequenceByName("Switch");
    };
    this.C6e = () => {
      var e;
      if (this.n6e < ConfigManager_1.ConfigManager.AdventureModuleConfig.GetMaxChapter()) {
        this.h6e?.SetFillAmount(0);
        e = this.n6e + 1;
        this.SetAdventureTargetInfoByChapter(e, ModelManager_1.ModelManager.AdventureGuideModel.GetUnLockChaptersList().includes(e));
      }
      this.SPe?.StopCurrentSequence(false, true);
      this.SPe?.PlayLevelSequenceByName("Switch");
    };
    this.g6e = () => {
      var e;
      var t = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetChapterAdventureConfig(this.n6e);
      if (t) {
        e = ModelManager_1.ModelManager.AdventureGuideModel.GetChapterReceivedCount(this.n6e);
        if (t.RewardUnlockCount <= e) {
          ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForChapterReward(this.n6e);
          this.s6e.SetSelfInteractive(false);
        } else {
          t = ConfigManager_1.ConfigManager.TextConfig.GetTextById(NOT_FINISH_TIP);
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
        }
      }
    };
    this.f6e = e => {
      if (this.n6e === e) {
        this.SetAdventureTargetInfoByChapter(e, false);
        this.GetItem(9).SetUIActive(false);
        this.C6e();
        this.U1m();
      }
    };
    this.p6e = e => {
      let t = false;
      for (const i of e) {
        if (ModelManager_1.ModelManager.AdventureGuideModel.IsTaskOfChapter(i, this.n6e)) {
          t = true;
          break;
        }
      }
      if (t) {
        e = ModelManager_1.ModelManager.AdventureGuideModel.GetChapterTasks(this.n6e);
        this.SetAdventureTargetInfoByChapter(this.n6e, false);
        e = ModelManager_1.ModelManager.AdventureGuideModel.SortChapterTasks(this.n6e);
        this.a6e?.RefreshByData(e);
      }
    };
    this.v6e = () => {
      this._6e = false;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIText], [7, UE.UILayoutBase], [8, UE.UISprite], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIScrollViewWithScrollbarComponent], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIText], [16, UE.UIText], [19, UE.UIText], [20, UE.UIText]];
    this.BtnBindInfo = [[0, this.g6e], [3, this.d6e], [4, this.C6e]];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AdventureTaskStateChange, this.p6e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChapterRewardReceived, this.f6e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseRewardView, this.v6e);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AdventureTaskStateChange, this.p6e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChapterRewardReceived, this.f6e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseRewardView, this.v6e);
  }
  OnTickUiTabViewBase(e) {
    var t;
    if (!this._6e) {
      if ((t = this.h6e.fillAmount) < this.l6e) {
        this.h6e.SetFillAmount(t + FRONT_ADD_FRAME);
      }
    }
  }
  OnStart() {
    this.GetText(1).SetUIActive(false);
    this.h6e = this.GetSprite(8);
    this.GetItem(14).SetUIActive(true);
    this.s6e = this.GetButton(0);
    this.GetItem(5).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    this.H3e = new GenericLayout_1.GenericLayout(this.GetLayoutBase(7), this.YVe);
    this.a6e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(12), this.m6e);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.H3e = undefined;
    this.a6e = undefined;
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  M6e(e) {
    var t = this.GetButton(3);
    var i = this.GetButton(4);
    t?.SetSelfInteractive(true);
    i?.SetSelfInteractive(true);
    if (e === 1) {
      t?.SetSelfInteractive(false);
    }
    if (e === ConfigManager_1.ConfigManager.AdventureModuleConfig.GetMaxChapter()) {
      i?.SetSelfInteractive(false);
    }
  }
  OnBeforeShow() {
    this.h6e.SetFillAmount(0);
    var e = ModelManager_1.ModelManager.AdventureGuideModel.GetUnLockChaptersList();
    let t = 1;
    var i = ModelManager_1.ModelManager.AdventureGuideModel.GetRewardChaptersList();
    let r = 1;
    let s = false;
    let n = 1;
    let a = false;
    let o = 1;
    let h = false;
    for (; t <= e.length; t++) {
      var _;
      var l = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetChapterAdventureConfig(t);
      if (l && (_ = ModelManager_1.ModelManager.AdventureGuideModel.GetChapterReceivedCount(t), l = l.RewardUnlockCount, !i.includes(t) && l <= _ && r <= t && (r = t, s = true), ModelManager_1.ModelManager.AdventureGuideModel.HaveChapterTasksFinish(t) && n <= t && (n = t, a = true), ModelManager_1.ModelManager.AdventureGuideModel.HaveChapterTasksUnFinish(t)) && o <= t) {
        o = t;
        h = true;
      }
    }
    var g = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetMaxChapter();
    if (s) {
      t = r;
    } else if (a) {
      t = n;
    } else if (h) {
      t = o;
    }
    this.SetAdventureTargetInfoByChapter(Math.min(t, g));
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlayLevelSequenceByName("Start");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdventureHelpBtn, 0);
  }
  SetAdventureTargetInfoByChapter(e, t = true) {
    this.n6e = e;
    this.SetChapterInfo(e);
    if (t) {
      t = ModelManager_1.ModelManager.AdventureGuideModel.SortChapterTasks(e);
      this.E6e(t);
    }
    this.M6e(e);
    this.S6e(e);
  }
  SetChapterInfo(e) {
    var t = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetChapterAdventureConfig(e);
    var i = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(t.DropIds);
    var r = new Array();
    var s = ModelManager_1.ModelManager.AdventureGuideModel.GetRewardChaptersList();
    var n = ModelManager_1.ModelManager.AdventureGuideModel.GetUnLockChaptersList();
    var a = this.GetItem(11);
    var o = this.GetScrollViewWithScrollbar(12).GetRootComponent();
    var h = this.GetItem(13);
    var _ = this.GetText(10);
    for (const d of i.keys()) {
      var l = [{
        IncId: 0,
        ItemId: d
      }, i.get(d)];
      r.push(l);
    }
    this.H3e.RefreshByData(r, this.U1m);
    var g = ModelManager_1.ModelManager.AdventureGuideModel.GetChapterReceivedCount(e);
    var v = t.RewardUnlockCount;
    this.s6e?.RootUIComp.SetUIActive(n.includes(e));
    this.s6e.SetSelfInteractive(v <= g && !s.includes(e));
    if (n.includes(e)) {
      if (s.includes(e)) {
        LguiUtil_1.LguiUtil.SetLocalText(_, REWARD_RECEIVED);
      } else if (v <= g) {
        LguiUtil_1.LguiUtil.SetLocalText(_, GET_REWARD);
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(_, AdventureGuideController_1.DOING);
      }
      a.SetUIActive(true);
      o.SetUIActive(true);
      h.SetUIActive(false);
    } else {
      o.SetUIActive(false);
      h.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), "Adventure_Taget_UnlockTips", e - 1, t?.LevelUnlockCount);
    }
  }
  E6e(e) {
    this.a6e?.RefreshByData(e);
  }
  S6e(e) {
    var t;
    var i;
    var r = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetChapterAdventureConfig(e);
    if (r) {
      i = e >= ConfigManager_1.ConfigManager.AdventureModuleConfig.GetMaxChapter();
      t = ModelManager_1.ModelManager.AdventureGuideModel.GetChapterReceivedCount(e);
      r = r.RewardUnlockCount;
      if (i) {
        this.GetText(6).SetText(t + "/" + r);
        this.l6e = Math.min(1, t / r);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), "Adventure_Taget_LastLevel");
      } else {
        i = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetChapterAdventureConfig(e + 1).LevelUnlockCount;
        this.GetText(6).SetText(t + "/" + i);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), t < i ? "Adventure_Taget_NextLevelLock" : "Adventure_Taget_NextLevelUnlock", e + 1);
        this.l6e = Math.min(1, t / i);
      }
      i = ModelManager_1.ModelManager.AdventureGuideModel.GetUnLockChaptersList().includes(e);
      this.GetText(19).SetUIActive(i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "Adventure_Taget_State_Number", e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), "Adventure_Taget_RewardUnlock", Math.min(t, r), r);
      this.GetItem(9).SetUIActive(r <= t && !ModelManager_1.ModelManager.AdventureGuideModel.GetRewardChaptersList().includes(e));
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = Number(e[0]);
    var t = this.H3e.GetGridByDisplayIndex(t);
    if (t) {
      return [t, t];
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", e]);
    }
  }
}
exports.AdventureTargetView = AdventureTargetView;
//# sourceMappingURL=AdventureTargetView.js.map