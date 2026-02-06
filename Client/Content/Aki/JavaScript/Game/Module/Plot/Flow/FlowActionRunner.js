"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionRunner = exports.HANG_COUNT_DOWN = exports.SKIP_FADE_TIME = exports.OPTION_SKIPPING_SELECTED = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Queue_1 = require("../../../../Core/Container/Queue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const KuroSdkReport_1 = require("../../../KuroSdk/KuroSdkReport");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const UiManager_1 = require("../../../Ui/UiManager");
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const PlotController_1 = require("../PlotController");
const FlowNetworks_1 = require("./FlowNetworks");
const FlowSequence_1 = require("./FlowSequence");
const FlowShowTalk_1 = require("./FlowShowTalk");
exports.OPTION_SKIPPING_SELECTED = 0;
exports.SKIP_FADE_TIME = 0.25;
exports.HANG_COUNT_DOWN = 20000;
class FlowActionRunner extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.nx = undefined;
    this.QTn = new Map();
    this.TXi = [];
    this.LXi = new Queue_1.Queue();
    this.DXi = undefined;
    this.RXi = undefined;
    this.UXi = undefined;
    this.AXi = undefined;
    this.FlowSequence = new FlowSequence_1.FlowSequence();
    this.FlowShowTalk = new FlowShowTalk_1.FlowShowTalk();
    this.PXi = undefined;
    this.xXi = new Array();
    this.wXi = undefined;
    this.BXi = undefined;
    this.bXi = {
      Name: "SetPlotMode",
      Params: {
        Mode: "LevelC",
        IsSwitchMainRole: false,
        UseFlowCamera: true
      },
      ActionGuid: ""
    };
    this.EnableSkip = t => {
      if (this.nx) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EnableSkipPlot, t);
        this.nx.CanSkip = t;
      }
    };
    this.qXi = (t, i) => {
      if (this.RXi) {
        this.RXi.Recycle();
      }
      this.DXi = undefined;
      this.nx.CurActionId = 0;
      this.RXi = undefined;
      if (i) {
        this.GXi();
      }
    };
    this.NXi = (t, i) => {
      if (this.QTn.has(t)) {
        this.QTn.delete(t);
        if (i !== Protocol_1.Aki.Protocol.Q4n.KRs && i) {
          if (i === Protocol_1.Aki.Protocol.Q4n.Proto_ErrFlowNotExist) {
            this.LogError("ErrFlowNotExist", ["response flowIncId", t]);
          } else {
            this.CVa(this.QTn.get(t));
            FlowNetworks_1.FlowNetworks.RequestFlowRestart(t);
          }
        }
      } else {
        this.LogError("ContextCache undefined");
      }
    };
    this.OXi = (t, i) => {
      if (this.AXi) {
        this.AXi.Recycle();
      }
      this.UXi = undefined;
      if (this.nx) {
        this.nx.CurSubActionId = 0;
      }
      this.AXi = undefined;
      if (i) {
        this.kXi();
      } else {
        this.Aca(false);
      }
    };
    this.FXi = () => {
      this.wXi?.Remove();
      this.wXi = undefined;
      if (this.nx) {
        if (this.nx.CurShowTalk) {
          if (this.FlowSequence.IsInit) {
            this.VXi();
          } else {
            this.HXi();
          }
          this.AXi?.InterruptExecute();
        } else if (this.DXi) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 26, "跳过剧情: 行为", ["ActionId", this.DXi.ActionId]);
          }
          this.RXi?.InterruptExecute();
        }
      }
    };
  }
  OnDestroy() {
    this.nx = undefined;
    this.DXi = undefined;
    this.RXi = undefined;
    this.UXi = undefined;
    this.AXi = undefined;
  }
  GetInteractPoint() {
    let t = undefined;
    if (t = this.nx?.Context && this.nx.Context.Type === 1 ? EntitySystem_1.EntitySystem.Get(this.nx.Context.EntityId) : t) {
      var i = t.GetComponent(209);
      if (i) {
        return i.GetInteractController()?.GetInteractPoint();
      }
    }
  }
  GetCameraOffsetConfig() {
    let t = undefined;
    if (t = this.nx?.Context && this.nx.Context.Type === 1 ? EntitySystem_1.EntitySystem.Get(this.nx.Context.EntityId) : t) {
      var i = t.GetComponent(209);
      if (i) {
        return i.GetInteractController()?.GetCameraOffsetConfig();
      }
    }
  }
  IsInShowTalk() {
    return this.nx !== undefined && this.nx.CurShowTalk !== undefined;
  }
  GetCurActionName() {
    return this.DXi?.Name ?? this.UXi?.Name;
  }
  ExecuteActions(i, t, e) {
    if (!i || i.length <= 0) {
      this.jXi();
    } else {
      this.nx = t;
      this.TXi.length = 0;
      for (let t = i.length - 1; t >= 0; t--) {
        this.TXi.push(i[t]);
      }
      if (this.TXi[this.TXi.length - 1].Name !== "SetPlotMode") {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 38, "第一个行为不是SetPlotMode，自动添加。");
        }
        this.TXi.push(this.bXi);
      }
      this.nx.HasAdjustCamera = this.WXi();
      this.PXi = e;
      t = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.DisableFlow;
      this.nx.IsBackground ||= t;
      this.GXi();
    }
  }
  GXi() {
    var t;
    var i;
    var e;
    if (this.nx.IsBreakdown || this.TXi.length <= 0) {
      this.jXi();
    } else if ((t = this.TXi.pop()).Disabled || t.EdLocalDisabled) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "注释的行为 ", ["", t.Name]);
      }
      this.GXi();
    } else if (i = ControllerHolder_1.ControllerHolder.FlowController.GetFlowAction(t.Name)) {
      this.DXi = t;
      this.nx.CurActionId = t.ActionId;
      e = i.GetAction();
      (this.RXi = e).Runner = this;
      e.Callback = this.qXi;
      e.Execute(t, this.nx, i.IsAutoFinish);
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "无客户端实现的剧情行为 ", ["", t.Name]);
      }
      this.GXi();
    }
  }
  FinishFlow(t, i, e = false) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "FinishFlow", ["reason", t], ["incId", i]);
    }
    if ((!i || !ModelManager_1.ModelManager.PlotModel.SetPendingPlotState(i, true, true, e)) && !!this.nx && (!i || this.nx.FlowIncId === i)) {
      this.nx.IsBreakdown = true;
      this.CVa(this.nx.RollbackRecord);
      this.BackgroundActions(t, false, e);
    }
  }
  ForceFinishActionsByGm() {
    if (this.nx) {
      if (this.nx.IsServerNotify) {
        FlowNetworks_1.FlowNetworks.RequestGmFinish();
      }
      this.nx.IsBreakdown = true;
      this.BackgroundActions("GM强制中断剧情", false, true);
    }
  }
  jXi() {
    this.RXi?.Recycle();
    this.RXi = undefined;
    this.AXi?.Recycle();
    this.AXi = undefined;
    this.wXi?.Remove();
    this.wXi = undefined;
    this.FlowSequence.Stop(true);
    this.TXi.length = 0;
    this.DXi = undefined;
    this.UXi = undefined;
    ControllerHolder_1.ControllerHolder.PlotController.CloseAllUi();
    this.KXi(() => {
      this.QXi();
      this.nx = undefined;
      var t = this.PXi;
      this.PXi = undefined;
      t?.();
    });
  }
  KXi(t) {
    if (this.nx.IsFadeSkip && !ModelManager_1.ModelManager.PlotModel.IsFadeIn || !ModelManager_1.ModelManager.PlotModel.PlotConfig.SkipHiddenBlackScreenAtEnd) {
      ModelManager_1.ModelManager.PlotModel.IsFadeIn = false;
      LevelLoadingController_1.LevelLoadingController.CloseLoading(0, t, exports.SKIP_FADE_TIME);
    } else {
      t();
    }
  }
  QXi() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 38, "剧情选项", ["选项", this.nx.OptionsCollection]);
    }
    KuroSdkReport_1.KuroSdkReport.OnPlotFinish(this.nx);
    if (!this.nx.IsServerEnd && !!this.nx.IsServerNotify && !this.nx.IsAsync) {
      this.QTn.set(this.nx.FlowIncId, [...this.nx.RollbackRecord]);
      FlowNetworks_1.FlowNetworks.RequestFlowEnd(this.nx.FlowIncId, this.nx.IsBackground, this.nx.OptionsCollection, this.NXi);
    }
  }
  AddActionNext(t) {
    if (this.nx) {
      this.TXi.push(t);
    }
  }
  ExecuteNextAction() {
    if (this.nx) {
      this.GXi();
    }
  }
  ExecuteSubActions(t, i, e = false) {
    this.XXi(t, i, e);
    if (!this.AXi) {
      this.kXi();
    }
  }
  XXi(t, i, e = false) {
    if (!e) {
      this.LXi.Clear();
      this.xXi.length = 0;
    }
    if (i) {
      this.xXi.push(i);
    }
    if (t) {
      for (const o of t) {
        this.LXi.Push(o);
      }
    }
  }
  kXi() {
    var t;
    var i;
    var e;
    if (this.LXi.Size <= 0) {
      this.Aca();
    } else {
      t = this.LXi.Pop();
      if (i = ControllerHolder_1.ControllerHolder.FlowController.GetFlowAction(t.Name)) {
        this.UXi = t;
        if (this.nx) {
          this.nx.CurSubActionId = t.ActionId;
        }
        e = i.GetAction();
        (this.AXi = e).Runner = this;
        e.Callback = this.OXi;
        e.Execute(t, this.nx, i.IsAutoFinish);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "无客户端实现的剧情行为 ", ["", t.Name]);
        }
        this.kXi();
      }
    }
  }
  Aca(t = true) {
    if (this.xXi) {
      var i = [...this.xXi];
      this.xXi.length = 0;
      for (const e of i) {
        e(t);
      }
    }
  }
  CVa(t) {
    if (this.nx?.RollbackRecord.length) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "回退剧情行为开始", ["id", this.nx.FormatId]);
      }
      for (const e of t) {
        var i = ControllerHolder_1.ControllerHolder.FlowController.GetFlowAction(e.ActionInfo.Name);
        if (i) {
          i.GetAction().Rollback(e, this.nx);
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "无客户端实现的剧情行为 ", ["Name", e.ActionInfo.Name]);
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "回退剧情行为完成", ["id", this.nx.FormatId]);
      }
    }
  }
  FinishShowCenterTextAction(t) {
    let i = true;
    var e;
    if (this.DXi) {
      if (this.TXi.length > 0 && ((e = this.TXi[this.TXi.length - 1]) || this.LogError("FinishShowCenterTextAction:nextAction丢失"), e.Name === "ShowCenterText")) {
        i = false;
      }
    } else if (this.UXi && this.LXi.Size > 0 && ((e = this.LXi.Front) || this.LogError("FinishShowCenterTextAction:nextAction丢失"), e.Name === "ShowCenterText")) {
      i = false;
    }
    if (i && UiManager_1.UiManager.IsViewOpen("PlotTransitionView")) {
      UiManager_1.UiManager.CloseView("PlotTransitionView", () => {
        t();
      });
    } else {
      t();
    }
  }
  BackgroundActions(t, i = true, e = false) {
    if (this.nx) {
      this.nx.IsServerEnd = e;
      if (!this.nx.IsBackground) {
        if (!this.nx.CanSkip && ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 26, "当前状态不可跳过");
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 26, "跳过剧情", ["原因", t], ["Id", this.nx.FormatId], ["ServerNotify", this.nx.IsServerNotify], ["ServerEnd", this.nx.IsServerEnd]);
          }
          this.wXi?.Remove();
          this.wXi = undefined;
          this.nx.IsBackground = true;
          this.nx.IsServerEnd = e;
          this.nx.IsFadeSkip = i;
          PlotController_1.PlotController.ClearUi();
          PlotController_1.PlotController.HideUi(true);
          if (i) {
            LevelLoadingController_1.LevelLoadingController.OpenLoading(0, 3, undefined, exports.SKIP_FADE_TIME);
            this.wXi = TimerSystem_1.TimerSystem.Delay(this.FXi, exports.SKIP_FADE_TIME * CommonDefine_1.MILLIONSECOND_PER_SECOND);
          } else {
            this.FXi();
          }
        }
      }
    }
  }
  VXi() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "跳过剧情: 演出对话");
    }
    this.FlowSequence.Skip();
  }
  HXi() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "跳过剧情: 普通对话");
    }
    this.FlowShowTalk.Skip();
  }
  HandleInputBeforePlay(t = "LevelC") {
    if (t !== "LevelD" && t !== "Prompt") {
      ModelManager_1.ModelManager.PlotModel.PlotConfig.DisableInput = true;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, "Start Plot");
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
    } else {
      ModelManager_1.ModelManager.PlotModel.PlotConfig.DisableInput = false;
    }
  }
  WXi() {
    if (this.TXi.length !== 0) {
      for (const t of this.TXi) {
        if (t.Name === "AdjustPlayerCamera") {
          return true;
        }
      }
    }
    return false;
  }
  GetOptionToSelect(t) {
    var i = this.nx.CurShowTalkActionId;
    var t = t ?? this.nx.CurShowTalk.TalkItems.find(t => t.Id === this.nx.CurTalkId);
    if (t?.Options && (i = this.nx.OptionsHistory.get(i))?.has(t.Id) && (i = i.get(t.Id) + 1) < t.Options.length) {
      return i;
    } else {
      return exports.OPTION_SKIPPING_SELECTED;
    }
  }
  GetHistoryOptionSelect(t) {
    if (this.nx?.CurShowTalk) {
      return this.nx.OptionsHistory.get(this.nx.CurShowTalkActionId).get(t) ?? -1;
    } else {
      return -1;
    }
  }
  RecordOption(i, t) {
    var e;
    if (this.nx?.CurShowTalk && (this.nx.OptionsHistory.get(this.nx.CurShowTalkActionId).set(i, t), this.nx.OptionsCollection[this.nx.OptionsCollection.length - 1][1].push([i, t]), e = this.nx.CurShowTalk.TalkItems.find(t => t.Id === i))) {
      this.nx?.TalkHistory.push({
        TalkItem: e,
        IsOption: true,
        OptionIndex: t
      });
    }
  }
  RecordTalkItem(t) {
    var i = t.Type;
    if ((!i || i === "Talk") && !!(i = t.TidTalk) && (i = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(i)) !== undefined && !StringUtils_1.StringUtils.IsBlank(i)) {
      this.nx?.TalkHistory.push({
        TalkItem: t,
        IsOption: false
      });
    }
  }
  GetTalkHistory() {
    return this.nx?.TalkHistory;
  }
  CheckCanSkipTmp() {
    if (!this.TXi) {
      return false;
    }
    for (const t of this.TXi) {
      if (t.Name === "PlaySequenceData") {
        return false;
      }
    }
    return true;
  }
  JumpTalk(t) {
    if (this.nx.CurShowTalk) {
      if (this.FlowSequence.IsInit) {
        this.FlowSequence.OnJumpTalk(t);
      } else {
        this.FlowShowTalk.SwitchTalkItem(t);
      }
    }
  }
  FinishTalk() {
    if (this.nx.CurShowTalk) {
      if (this.FlowSequence.IsInit) {
        this.FlowSequence.OnFinishTalk();
      } else {
        this.FlowShowTalk.FinishShowTalk();
      }
    }
  }
  TriggerCountDownSkip(t) {
    if (t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "剧情跳过开启倒计时", ["time", exports.HANG_COUNT_DOWN]);
      }
      this.BXi?.Remove();
      this.BXi = TimerSystem_1.TimerSystem.Delay(() => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "剧情跳过倒计时完毕，跳过");
        }
        this.BackgroundActions("D级剧情被别的界面打断", false);
        this.BXi = undefined;
      }, exports.HANG_COUNT_DOWN);
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "剧情跳过关闭倒计时");
      }
      this.BXi?.Remove();
      this.BXi = undefined;
    }
  }
  HasFlow(t, i, e) {
    if (this.nx && this.nx.FlowListName === t && this.nx.FlowId === i && this.nx.FlowStateId === e) {
      return true;
    }
    for (const o of ModelManager_1.ModelManager.PlotModel.PlotPendingList) {
      if (o.FlowListName === t && o.FlowId === i && o.StateId === e) {
        return true;
      }
    }
    return false;
  }
  GetNextAction(t) {
    if (this.nx) {
      if (t && this.LXi.Size > 0) {
        return this.LXi.Front;
      } else if (this.TXi.length > 0) {
        return this.TXi[this.TXi.length - 1];
      } else {
        return undefined;
      }
    }
  }
  LogError(t, ...i) {
    if (this.nx) {
      this.nx?.LogError(t, ...i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Plot", 26, t, ...i);
    }
  }
  GetFlowIncId() {
    return this.nx.FlowIncId;
  }
  RequestPosition(t, i) {
    FlowNetworks_1.FlowNetworks.RequestSeqEndPosition(this.nx, t, i);
  }
  CheckViewControlBeginForC() {
    for (let t = this.TXi.length - 1; t > 0; t--) {
      var i = this.TXi[t];
      if (i.Name === "ShowTalk") {
        return true;
      }
      if (i.Name === "BeginFlowTemplate") {
        return i.Params.UseFreeCamera ?? false;
      }
    }
    return true;
  }
  GetNameAction(t) {
    var i = [];
    for (const e of this.TXi) {
      if (e.Name === t) {
        i.push(e);
      }
    }
    return i;
  }
  GetFlowName() {
    return this.nx?.FormatId ?? "";
  }
}
exports.FlowActionRunner = FlowActionRunner;
//# sourceMappingURL=FlowActionRunner.js.map