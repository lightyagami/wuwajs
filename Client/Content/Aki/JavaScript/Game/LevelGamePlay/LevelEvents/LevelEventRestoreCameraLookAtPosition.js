"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventRestoreCameraLookAtPosition = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRestoreCameraLookAtPosition extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.Ctc = true;
  }
  ExecuteNew(e, o) {
    if (this.Ctc && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventRestoreCameraLookAtPosition Start");
    }
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera?.LogicComponent?.ExitCameraGuide();
    this.FinishExecute(true);
  }
  ExecuteInGm(e, o) {
    this.FinishExecute(true);
  }
}
exports.LevelEventRestoreCameraLookAtPosition = LevelEventRestoreCameraLookAtPosition;
//# sourceMappingURL=LevelEventRestoreCameraLookAtPosition.js.map