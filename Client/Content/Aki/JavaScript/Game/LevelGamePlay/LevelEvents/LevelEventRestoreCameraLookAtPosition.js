"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventRestoreCameraLookAtPosition = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRestoreCameraLookAtPosition extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), this.Ctc = !0
  }
  ExecuteNew(e, o) {
    this.Ctc && Log_1.Log.CheckInfo() && Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventRestoreCameraLookAtPosition Start"), ControllerHolder_1.ControllerHolder.CameraController.FightCamera?.LogicComponent?.ExitCameraGuide(), this.FinishExecute(!0)
  }
  ExecuteInGm(e, o) {
    this.FinishExecute(!0)
  }
}
exports.LevelEventRestoreCameraLookAtPosition = LevelEventRestoreCameraLookAtPosition;
//# sourceMappingURL=LevelEventRestoreCameraLookAtPosition.js.map