"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventTriggerSystemRandomPlot = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTriggerSystemRandomPlot extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    ControllerHolder_1.ControllerHolder.RandomPlotController.PlayRandomPlot(e.Id);
  }
}
exports.LevelEventTriggerSystemRandomPlot = LevelEventTriggerSystemRandomPlot;
//# sourceMappingURL=LevelEventTriggerSystemRandomPlot.js.map