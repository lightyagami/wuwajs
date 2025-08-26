"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyActivityView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const CommonRewardPopup_1 = require("../../Common/CommonRewardPopup");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const DailyActivityController_1 = require("../DailyActivityController");
const DailyActivityDefine_1 = require("../DailyActivityDefine");
const DailyActivityTaskItem_1 = require("../DailyActivityTask/DailyActivityTaskItem");
const DailyActivityRewardPanel_1 = require("./DailyActivityRewardPanel");
class DailyActivityView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.M2t = undefined;
    this.qkt = undefined;
    this.E2t = undefined;
    this.S2t = undefined;
    this.y2t = undefined;
    this.l8e = undefined;
    this.I2t = 0;
    this.T2t = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(122);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.L2t = () => {
      this.S2t.SetActive(false);
      this.D2t();
      this.R2t();
      this.E2t.Init();
    };
    this.U2t = () => {
      this.D2t();
    };
    this.A2t = e => {
      this.P2t();
    };
    this.VOe = () => {
      var e = new DailyActivityTaskItem_1.DailyActivityTaskItem();
      e.SetClickReceiveCb(() => {
        var e = this.qkt?.filter(e => e.TaskState === 1).map(e => e.TaskId);
        if (e !== undefined && e.length > 0) {
          DailyActivityController_1.DailyActivityController.RequestDailyActivityTaskReward(e);
        }
      });
      return e;
    };
    this.x2t = () => {
      var e = ModelManager_1.ModelManager.DailyActivityModel.RewardData;
      this.S2t.Refresh(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await DailyActivityController_1.DailyActivityController.RequestDailyActivityData();
  }
  OnStart() {
    this.E2t = new DailyActivityRewardPanel_1.DailyActivityRewardPanel(this.GetItem(4));
    this.M2t = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.VOe);
    this.l8e = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.S2t = new CommonRewardPopup_1.CommonRewardPopup(this.RootItem);
  }
  OnBeforeDestroy() {
    this.E2t.Destroy();
    this.E2t = undefined;
    this.l8e?.Clear();
    this.l8e = undefined;
    this.S2t &&= undefined;
    this.qkt = [];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DailyActivityRefresh, this.L2t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DailyActivityTaskUpdate, this.U2t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshActivityRewardPopUp, this.x2t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DailyActivityValueChange, this.A2t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DailyUpdateNotify, this.T2t);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DailyActivityRefresh, this.L2t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DailyActivityTaskUpdate, this.U2t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshActivityRewardPopUp, this.x2t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DailyActivityValueChange, this.A2t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DailyUpdateNotify, this.T2t);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdventureHelpBtn, DailyActivityDefine_1.DAILY_ACTIVITY_HELP);
    this.w2t();
    this.D2t();
    this.B2t(true);
    this.l8e?.PlayLevelSequenceByName("Start");
  }
  OnBeforeHide() {
    this.S2t.SetActive(false);
  }
  OnTickUiTabViewBase(e) {
    this.E2t.OnTickRefresh(e);
    this.B2t();
  }
  B2t(t = false) {
    var r = ModelManager_1.ModelManager.DailyActivityModel.DayEndTime;
    if (r === 0 && this.y2t !== "") {
      this.y2t = "";
    } else {
      var s;
      var n = TimeUtil_1.TimeUtil.GetServerTime();
      var r = Math.max(r - n, 0);
      let e = "";
      let i = "";
      r = (i = r <= TimeUtil_1.TimeUtil.Minute ? "Text_RefreshText_Text01" : (n = r >= CommonDefine_1.SECOND_PER_HOUR ? 2 : 1, s = r >= CommonDefine_1.SECOND_PER_HOUR ? 1 : 0, e = TimeUtil_1.TimeUtil.GetCountDownDataFormat2(r, n, s).CountDownText ?? "", "Text_RefreshText_Text")) + "_" + e;
      if (this.y2t !== r || !!t) {
        this.y2t = r;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DailyActivityCountDownUpdate, e, i);
      }
    }
  }
  D2t() {
    this.qkt = ModelManager_1.ModelManager.DailyActivityModel.DailyActivityTaskList;
    this.M2t.RefreshByData(this.qkt);
  }
  w2t() {
    this.GetText(3).SetText("0");
    this.I2t = ModelManager_1.ModelManager.DailyActivityModel.ActivityValue;
    this.GetText(2).SetText(this.I2t.toString());
    this.E2t.Init();
  }
  R2t() {
    var e = ModelManager_1.ModelManager.DailyActivityModel.ActivityValue;
    this.GetText(2).SetText(e.toString());
    if (e > this.I2t) {
      if (this.UiViewSequence.HasSequenceNameInPlaying("Refresh")) {
        this.UiViewSequence.ReplaySequence("Refresh");
      } else {
        this.UiViewSequence.PlaySequence("Refresh");
      }
    }
    return this.I2t = e;
  }
  P2t() {
    var e = this.R2t();
    this.E2t.RefreshProgressBarDynamic(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length >= 2) {
      var i = String(e[0]);
      var t = Number(e[1]);
      if (i === "Task") {
        var r = this.M2t.GetGridByDisplayIndex(t);
        if (r) {
          return [r, r];
        }
      } else if (i === "Gift") {
        r = this.E2t.GetRewardItemByIndex(t);
        if (r) {
          return [r, r];
        }
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", e]);
    }
  }
}
exports.DailyActivityView = DailyActivityView;
//# sourceMappingURL=DailyActivityView.js.map