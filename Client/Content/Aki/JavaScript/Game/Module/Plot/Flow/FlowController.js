"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowController = exports.LOCAL_FLOWINCID = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const ControllerWithAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const FlowActionCenter_1 = require("./FlowActionCenter");
const FlowActionRunner_1 = require("./FlowActionRunner");
const FlowLaunchCenter_1 = require("./FlowLaunchCenter");
const FlowNetworks_1 = require("./FlowNetworks");
const FlowServerNotifyCenter_1 = require("./FlowServerNotifyCenter");
exports.LOCAL_FLOWINCID = -1;
const assistantMap = {
  [0]: undefined,
  1: undefined,
  2: undefined,
  3: undefined
};
class FlowController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnInit() {
    var t = super.OnInit();
    FlowNetworks_1.FlowNetworks.Register();
    return t;
  }
  static OnClear() {
    FlowNetworks_1.FlowNetworks.UnRegister();
    return super.OnClear();
  }
  static RegisterAssistant() {
    this.AddAssistant(0, new FlowServerNotifyCenter_1.FlowServerNotifyCenter());
    this.AddAssistant(1, new FlowActionCenter_1.FlowActionCenter());
    this.AddAssistant(2, new FlowActionRunner_1.FlowActionRunner());
    this.AddAssistant(3, new FlowLaunchCenter_1.FlowLaunchCenter());
  }
  static cYt(t) {
    if (this.Assistants) {
      return this.Assistants.get(t);
    }
  }
  static StartNotify(t) {
    this.cYt(0).HandleFlowStartNotify(t);
  }
  static EndNotify(t) {
    this.cYt(0).HandleFlowEndNotify(t);
  }
  static SkipBlackScreenNotify(t) {
    this.cYt(0).HandleFlowSkipBlackScreenNotify(t);
  }
  static ClearOnLeaveOnlineWorld() {}
  static GetFlowAction(t) {
    return this.cYt(1).GetFlowAction(t);
  }
  static ExecuteActions(t, i, e) {
    this.cYt(2).ExecuteActions(t, i, e);
  }
  static FinishFlow(t, i, e) {
    this.cYt(2).FinishFlow(t, i, e);
  }
  static HasFlow(t, i, e) {
    return this.cYt(2).HasFlow(t, i, e);
  }
  static BackgroundFlow(t, i = true, e = false) {
    this.cYt(2).BackgroundActions(t, i, e);
  }
  static RunNextAction() {
    this.cYt(2).ExecuteNextAction();
  }
  static FinishFlowByGm() {
    this.cYt(2).ForceFinishActionsByGm();
  }
  static GetCurFlowAction() {
    return this.cYt(2).GetCurActionName();
  }
  static IsInShowTalk() {
    return this.cYt(2).IsInShowTalk();
  }
  static ExecuteSubActions(t, i, e = false) {
    this.cYt(2).ExecuteSubActions(t, i, e);
  }
  static GetInteractPoint() {
    return this.cYt(2).GetInteractPoint();
  }
  static GetCameraOffsetConfig() {
    return this.cYt(2).GetCameraOffsetConfig();
  }
  static AddActionNext(t) {
    this.cYt(2).AddActionNext(t);
  }
  static GetRecommendedOption(t) {
    return this.cYt(2).GetOptionToSelect(t);
  }
  static SelectOption(t, i) {
    this.cYt(2).RecordOption(t, i);
  }
  static RecordTalkItem(t) {
    this.cYt(2).RecordTalkItem(t);
  }
  static CreatePlotReviewViewData() {
    var t;
    var i = [];
    var e = this.cYt(2).GetTalkHistory();
    if (e && e.length > 0) {
      for (const s of e) {
        if (s.IsOption) {
          t = {
            TalkItem: s.TalkItem,
            OptionIndex: s.OptionIndex
          };
          i.push({
            Type: 1,
            Data: t
          });
        } else {
          t = {
            TalkItem: s.TalkItem,
            IsPlaying: false
          };
          i.push({
            Type: 0,
            Data: t
          });
        }
      }
    }
    return {
      PlotReviewItemDataList: i
    };
  }
  static OpenPlotReviewView() {
    var t = this.cYt(2)?.GetTalkHistory();
    if (t && t.length !== 0) {
      t = this.CreatePlotReviewViewData();
      UiManager_1.UiManager.OpenView("PlotReviewView", t);
      return true;
    } else {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PlotView_001");
      return false;
    }
  }
  static get FlowSequence() {
    return this.cYt(2).FlowSequence;
  }
  static get FlowShowTalk() {
    return this.cYt(2).FlowShowTalk;
  }
  static EnableSkip(t) {
    this.cYt(2).EnableSkip(t);
  }
  static CheckCanSkipTmp() {
    return this.cYt(2).CheckCanSkipTmp();
  }
  static CountDownSkip(t) {
    this.cYt(2).TriggerCountDownSkip(t);
  }
  static CheckDisableInput(t) {
    this.cYt(2).HandleInputBeforePlay(t);
  }
  static GetNextAction(t = true) {
    return this.cYt(2).GetNextAction(t);
  }
  static LogError(t, ...i) {
    this.cYt(2).LogError(t, ...i);
  }
  static GetFlowIncId() {
    return this.cYt(2).GetFlowIncId();
  }
  static RequestPosition(t, i) {
    this.cYt(2).RequestPosition(t, i);
  }
  static CheckViewControlBeginForC() {
    return this.cYt(2).CheckViewControlBeginForC();
  }
  static GetNextNameAction(t) {
    return this.cYt(2).GetNextNameAction(t);
  }
  static GetFlowName() {
    return this.cYt(2).GetFlowName();
  }
  static StartFlowByRes(t) {}
  static StartFlow(t, i, e, s, r, o, n, a, c) {
    return this.cYt(3).StartFlow(t, i, e, s, r, o, n, undefined, undefined, a, c);
  }
  static StartFlowForView(t, i, e, s, r = true) {
    return this.cYt(3).StartFlow(t, i, e, undefined, undefined, false, false, s, r);
  }
  static StartPlotNetworkPending() {
    this.cYt(3).StartPlotNetworkPending();
  }
  static OnTick(t) {
    this.cYt(3).Tick(t);
  }
}
(exports.FlowController = FlowController).IsTickEvenPausedInternal = true;
//# sourceMappingURL=FlowController.js.map