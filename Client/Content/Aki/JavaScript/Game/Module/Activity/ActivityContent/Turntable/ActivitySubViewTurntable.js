"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewTurntable = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityTurntableComponent_1 = require("./ActivityTurntableComponent");
const ActivityTurntableController_1 = require("./ActivityTurntableController");
const ActivityTurntableItem_1 = require("./ActivityTurntableItem");
const titleIdNameList = [[1, 2, 3], [2, 1, 3], [3, 1, 2]];
class ActivitySubViewTurntable extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityTurntableData = undefined;
    this.LNe = undefined;
    this.vUn = undefined;
    this.ZTn = undefined;
    this.YTl = undefined;
    this.eLn = undefined;
    this.Qqn = undefined;
    this.tLn = undefined;
    this.iLn = -1;
    this.PNe = false;
    this.xNe = 0;
    this.zTl = false;
    this.wNe = t => {
      if (t === this.ActivityTurntableData.Id && this.ActivityTurntableData.TurntableType === 1) {
        this.e2n();
      }
    };
    this.Dwa = () => {
      var t;
      this.PKt();
      if (this.ActivityTurntableData.CheckIfInShowTime() && this.ActivityTurntableData.TurntableType === 2 && !this.zTl && this.ActivityTurntableData.IsActivityUnFinished()) {
        t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(234);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    };
    this.oLn = () => {
      var t = new ActivityTurntableItem_1.ActivityTurntableToggleGroupItem();
      t.ToggleCallBack = this.pqe;
      return t;
    };
    this.pqe = (t, i) => {
      if (i) {
        if (this.iLn >= 0 && this.iLn !== t) {
          this.tLn.GetLayoutItemByIndex(this.iLn).SetToggleState(false);
        }
        this.rLn(t, this.iLn);
        this.MUn();
      }
    };
    this.nLn = () => {
      if (this.ActivityTurntableData.GetActivityCurrencyCount() >= this.ActivityTurntableData.TurntableCostCount) {
        ActivityTurntableController_1.ActivityTurntableController.RequestTurntableRun(this.ActivityTurntableData.Id);
      }
    };
    this.Xqn = [];
    this.$qn = [];
    this.sLn = t => {
      const i = this.ActivityTurntableData.GetCurrentRoundId();
      const e = this.iLn;
      this.zTl = true;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetActivityViewState, false, 1, true);
      this.eLn.RunTurntableByRewardId(t, () => {
        ActivityTurntableController_1.ActivityTurntableController.ShowTurntableItemObtain(this.ActivityTurntableData.GetRunResult(), () => {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetActivityViewState, true, 1, true);
          this.zTl = false;
          if (i !== e) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("TurntableActivity_Tips01");
          }
        });
        this.PKt();
        this.aLn();
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIHorizontalLayout], [6, UE.UIItem], [5, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UISprite], [10, UE.UISprite], [11, UE.UISprite], [12, UE.UISprite], [13, UE.UISprite], [14, UE.UIItem]];
  }
  OnSetData() {
    this.ActivityTurntableData = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var t = [];
    var i = this.GetItem(1);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    t.push(this.LNe.CreateThenShowByActorAsync(i.GetOwner()));
    var i = this.GetItem(3);
    this.ZTn = new ActivityTurntableItem_1.ActivityTurntableQuestItem();
    t.push(this.ZTn.CreateByActorAsync(i.GetOwner()));
    this.GetItem(2).SetUIActive(false);
    var i = this.GetItem(14);
    this.YTl = new ActivityTurntableItem_1.ActivityTurntableDailyPanel(this.ActivityTurntableData);
    t.push(this.YTl.CreateByActorAsync(i.GetOwner()));
    var i = this.GetItem(5);
    this.eLn = new ActivityTurntableComponent_1.ActivityTurntableComponent();
    t.push(this.eLn.CreateThenShowByActorAsync(i.GetOwner()));
    var i = this.GetItem(8);
    this.Qqn = new ActivityTurntableComponent_1.ActivityTurntableComponent();
    t.push(this.Qqn.CreateThenShowByActorAsync(i.GetOwner()));
    var i = this.GetItem(7);
    this.vUn = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    t.push(this.vUn.CreateThenShowByActorAsync(i.GetOwner()));
    this.tLn = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.oLn);
    await Promise.all(t);
  }
  OnStart() {
    this.LNe.SetActivityBaseData(this.ActivityBaseData);
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    this.vUn.FunctionButton.SetFunction(this.nLn);
    this.vUn.SetFunctionRedDotVisible(true);
    this.Qqn.SetActive(false);
    this.Qqn.Activate = false;
    this.Yqn();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TurntableStartRun, this.sLn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.Dwa);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TurntableStartRun, this.sLn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.Dwa);
  }
  OnRefreshView() {
    this.PKt();
    this.aLn();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetActivityViewCurrency, [this.ActivityTurntableData.TurntableCostConfigId]);
    if (this.ActivityTurntableData.IsUnLock()) {
      this.ActivityTurntableData.SaveUnlockRedDot();
    }
    if (this.ActivityTurntableData.TurntableType === 2) {
      this.ActivityTurntableData.SaveDailyRedDot();
    }
  }
  OnBeforeDestroy() {
    this.Xqn.length = 0;
    this.$qn.length = 0;
  }
  OnTimer(t) {
    this.FNe();
  }
  PKt() {
    if (this.ActivityTurntableData.TurntableType === 1) {
      this.hLn();
    } else if (this.ActivityTurntableData.TurntableType === 2) {
      this.JTl();
    }
  }
  e2n() {
    var t = this.ActivityTurntableData.IsHasNewQuestRedDot();
    this.ZTn?.SetRedDot(t);
  }
  hLn() {
    this.PNe = false;
    var i = this.ActivityTurntableData.GetCurrentQuestProgress();
    var e = this.ActivityTurntableData.QuestList.length;
    this.GetItem(2).SetUIActive(i < e);
    this.ZTn.SetActive(i < e);
    if (i !== e) {
      this.ZTn.SetTitle("TurntableActivity_Progress", i.toString(), e.toString());
      var s = this.ActivityTurntableData.GetCurrentQuestIndex();
      var i = this.ActivityTurntableData.QuestList[s];
      var e = this.ActivityTurntableData.QuestStateMap.get(i);
      var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(i);
      var h = r?.RewardId;
      if (h !== 0) {
        h = this.ActivityTurntableData.GetPreviewReward(h);
        if (!(h.length < 1)) {
          let t = false;
          switch (e.QuestState) {
            case 1:
            case 2:
              var n = r?.TidName;
              var n = n ? PublicUtil_1.PublicUtil.GetConfigTextByKey(n) : "";
              this.ZTn.SetTxt(n);
              break;
            case 3:
              t = true;
              this.PNe = true;
              n = this.ActivityTurntableData.QuestList[s + 1];
              n = this.ActivityTurntableData.QuestStateMap.get(n);
              this.xNe = n.QuestUnlockStamp;
              this.FNe();
          }
          this.ZTn.Refresh(t, h[0], i, this.ActivityTurntableData.Id);
          this.e2n();
        }
      }
    }
  }
  FNe() {
    var [t, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(t);
    if (t) {
      this.LNe.SetTimeTextByText(i);
    }
    if (this.PNe) {
      this.ZTn.SetTxtById("TurntableActivity_TaskDesc", this.lLn(this.xNe));
    }
  }
  lLn(t) {
    var i = TimeUtil_1.TimeUtil.GetServerTime();
    var t = Math.max(t - i, 1);
    var i = this.jNe(t);
    return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, i[0], i[1]).CountDownText ?? "";
  }
  jNe(t) {
    if (t > CommonDefine_1.SECOND_PER_DAY) {
      return [3, 2];
    } else if (t > CommonDefine_1.SECOND_PER_HOUR) {
      return [2, 1];
    } else if (t > CommonDefine_1.SECOND_PER_MINUTE) {
      return [1, 0];
    } else {
      return [0, 0];
    }
  }
  JTl() {
    var t = this.ActivityTurntableData.IsActivityUnFinished();
    this.YTl.SetActive(t);
    if (t) {
      this.YTl.Refresh();
    }
  }
  MUn() {
    var t = this.ActivityTurntableData.GetCurrentRoundId() === this.iLn;
    var i = this.ActivityTurntableData.IsRoundUnFinished(this.iLn);
    var e = this.ActivityTurntableData.IsHasRewardRedDot();
    if (i) {
      if (t) {
        if (e) {
          this.EUn();
        } else {
          this.SUn("TurntableActivity_ForbidTips01");
        }
      } else {
        this.SUn("TurntableActivity_ForbidTips02");
      }
    } else {
      this.yUn();
    }
  }
  yUn() {
    this.vUn.FunctionButton.SetActive(false);
    this.vUn.SetPanelConditionVisible(false);
    this.vUn.SetActivatePanelConditionVisible(true);
  }
  SUn(t) {
    this.vUn.FunctionButton.SetActive(false);
    this.vUn.SetPanelConditionVisible(true);
    this.vUn.SetLockTextByTextId(t);
    this.vUn.SetActivatePanelConditionVisible(false);
  }
  EUn() {
    this.vUn.FunctionButton.SetActive(true);
    this.vUn.SetPanelConditionVisible(false);
    this.vUn.SetActivatePanelConditionVisible(false);
  }
  aLn() {
    this.tLn.RefreshByData(this.ActivityTurntableData.RoundIdList, () => {
      var i = this.ActivityTurntableData.GetCurrentRoundId();
      var e = this.tLn.GetLayoutItemList();
      for (let t = 0; t < this.ActivityTurntableData.RoundIdList.length; t++) {
        var s = this.ActivityTurntableData.RoundIdList[t];
        var r = this.ActivityTurntableData.IsRoundUnFinished(s);
        e[t].SetToggleDisable(!r);
        var r = s === i;
        e[t].SetToggleState(r, false);
      }
      this.rLn(i, this.iLn, false);
      this.MUn();
    });
  }
  Yqn() {
    for (const s of titleIdNameList) {
      var t = [];
      for (const r of s) {
        var i = "SP_TurntableTitleRound" + r;
        var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
        t.push(i);
      }
      this.$qn.push(t);
    }
    for (const h of [[9, 0, true], [10, 0, false], [11, 1, true], [12, 2, true], [13, 0, true]]) {
      var e = {
        Sprite: this.GetSprite(h[0]),
        Index: h[1],
        IsCurrent: h[2]
      };
      this.Xqn.push(e);
    }
  }
  async mGe(t, i) {
    let e = 0;
    const s = new CustomPromise_1.CustomPromise();
    var r = () => {
      if (++e === this.Xqn.length) {
        s.SetResult();
      }
    };
    for (const n of this.Xqn) {
      var h = n.IsCurrent ? t : i;
      var h = this.$qn[h][n.Index];
      this.SetSpriteByPath(h, n.Sprite, false, undefined, r);
    }
    await s.Promise;
  }
  async rLn(t, i, e = true) {
    this.iLn = t;
    var e = e && i >= 0;
    if (e) {
      await this.Jqn(i, this.Qqn);
      this.Qqn.SetUiActive(true);
      this.eLn.SetUiActive(false);
    }
    var s = [this.Jqn(t, this.eLn), this.mGe(t, i >= 0 ? i : t)];
    await Promise.all(s);
    if (e) {
      await this.LevelSequencePlayer.PlaySequenceAsync(i < t ? "PageDown" : "PageUp", new CustomPromise_1.CustomPromise(), true);
    }
  }
  async Jqn(t, i) {
    var e = [];
    for (const r of this.ActivityTurntableData.RoundRewardIdMap.get(t)) {
      var s = this.ActivityTurntableData.AllRewardInfo.get(r);
      e.push(s);
    }
    await i.Refresh(e);
  }
  OnCommonViewStateChange(t) {
    this.LevelSequencePlayer.PlayLevelSequenceByName(t ? "TurnTableOut" : "TurnTableIn", true);
  }
}
exports.ActivitySubViewTurntable = ActivitySubViewTurntable;
//# sourceMappingURL=ActivitySubViewTurntable.js.map