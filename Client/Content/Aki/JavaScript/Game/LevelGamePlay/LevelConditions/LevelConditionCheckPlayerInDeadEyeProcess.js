"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckPlayerInDeadEyeProcess = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckPlayerInDeadEyeProcess extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    var a;
    return !!e && (e = e.IsInDeadEyeProcess, a = ModelManager_1.ModelManager.DeadEyeModeModel.CurDeadEyeModeStage, e ? a !== 0 : a === 0);
  }
}
exports.LevelConditionCheckPlayerInDeadEyeProcess = LevelConditionCheckPlayerInDeadEyeProcess;
//# sourceMappingURL=LevelConditionCheckPlayerInDeadEyeProcess.js.map