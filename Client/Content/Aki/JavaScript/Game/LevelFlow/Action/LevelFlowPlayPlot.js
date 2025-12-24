"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowPlayPlot = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowPlayPlot extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.yXd = StringUtils_1.EMPTY_STRING;
    this.B2o = 0;
    this.tRl = 0;
    this.nx = undefined;
    this.SXd = 0;
    this.MXd = false;
    this.CXd = false;
    this.WHt = false;
    this.WU = undefined;
  }
  Init(t, s, i, e, l, o, h, r) {
    this.yXd = t;
    this.B2o = s;
    this.tRl = i;
    this.nx = e;
    this.SXd = l ?? -1;
    this.MXd = false;
    this.CXd = o ?? false;
    this.WHt = h ?? false;
    this.WU = r;
    return this;
  }
  OnExecute() {
    ControllerHolder_1.ControllerHolder.FlowController.StartFlow(this.yXd, this.B2o, this.tRl, this.nx, this.SXd, this.MXd, this.CXd, this.WHt, this.WU);
    this.FinishExecute(true);
  }
}
exports.LevelFlowPlayPlot = LevelFlowPlayPlot;
//# sourceMappingURL=LevelFlowPlayPlot.js.map