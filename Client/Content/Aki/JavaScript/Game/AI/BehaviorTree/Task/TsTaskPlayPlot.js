"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const DEFAULT_WAIT_TICK = 5;
class TsTaskPlayPlot extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.SeqNetworkId = "";
    this.SeqNetworkRes = "";
    this.PlotConfigRes = "";
    this.WaitTickCount = DEFAULT_WAIT_TICK;
    this.IsInitTsVariables = false;
    this.TsSeqNetworkId = "";
    this.TsSeqNetworkRes = "";
    this.TsPlotConfigRes = "";
    this.TsWaitTickCount = 0;
    this.IsPlotStart = false;
    this.TickRemain = 0;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsSeqNetworkId = "";
    this.TsSeqNetworkRes = "";
    this.TsPlotConfigRes = "";
    this.TsWaitTickCount = 0;
    this.IsPlotStart = false;
    this.TickRemain = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsSeqNetworkId = this.SeqNetworkId;
      this.TsSeqNetworkRes = this.SeqNetworkRes;
      this.TsPlotConfigRes = this.PlotConfigRes;
      this.TsWaitTickCount = this.WaitTickCount;
    }
  }
  ReceiveExecuteAI(s, t) {
    this.InitTsVariables();
    if (s.AiController) {
      this.IsPlotStart = false;
      this.TickRemain = this.TsWaitTickCount;
      if (this.TsPlotConfigRes) {
        ControllerHolder_1.ControllerHolder.FlowController.StartFlowByRes(this.TsPlotConfigRes);
      } else if (!this.TsSeqNetworkId || !this.TsSeqNetworkRes) {
        this.IsPlotStart = true;
        this.FinishExecute(true);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", s.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  ReceiveTickAI(s, t, i) {
    if (this.IsPlotStart) {
      if (this.TsPlotConfigRes && !ModelManager_1.ModelManager.PlotModel.IsInPlot) {
        this.FinishExecute(true);
      }
    } else {
      this.TickRemain--;
      if (this.TsPlotConfigRes && ModelManager_1.ModelManager.PlotModel.IsInPlot) {
        this.IsPlotStart = true;
      }
      if (!this.IsPlotStart && this.TickRemain < 1) {
        this.FinishExecute(true);
      }
    }
  }
}
exports.default = TsTaskPlayPlot;
//# sourceMappingURL=TsTaskPlayPlot.js.map