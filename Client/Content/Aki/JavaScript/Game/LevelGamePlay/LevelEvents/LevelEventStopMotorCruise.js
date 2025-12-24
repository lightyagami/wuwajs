"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventStopMotorCruise = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventStopMotorCruise extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    ControllerHolder_1.ControllerHolder.AutoPilotController.ExitAutoPilot("LevelEvent");
    this.FinishExecute(true);
  }
  ExecuteInGm(e, r) {
    this.FinishExecute(true);
  }
}
exports.LevelEventStopMotorCruise = LevelEventStopMotorCruise;
//# sourceMappingURL=LevelEventStopMotorCruise.js.map