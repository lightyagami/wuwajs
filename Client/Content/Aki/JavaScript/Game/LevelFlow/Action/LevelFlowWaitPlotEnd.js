"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowWaitPlotEnd = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowWaitPlotEnd extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.yXd = StringUtils_1.EMPTY_STRING;
    this.B2o = 0;
    this.tRl = 0;
    this.hWe = e => {
      if (e.FlowListName === this.yXd && e.FlowId === this.B2o && e.StateId === this.tRl) {
        this.FinishExecute(true);
      }
    };
  }
  Init(e, t, i) {
    this.yXd = e;
    this.B2o = t;
    this.tRl = i;
    return this;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.hWe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.hWe);
  }
}
exports.LevelFlowWaitPlotEnd = LevelFlowWaitPlotEnd;
//# sourceMappingURL=LevelFlowWaitPlotEnd.js.map