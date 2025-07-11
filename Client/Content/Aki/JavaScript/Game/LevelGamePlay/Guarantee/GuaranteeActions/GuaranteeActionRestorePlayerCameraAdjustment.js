"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeActionRestorePlayerCameraAdjustment = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionRestorePlayerCameraAdjustment extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 39, "保底相机调整");
    }
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.RestoreCameraFromAdjust();
  }
}
exports.GuaranteeActionRestorePlayerCameraAdjustment = GuaranteeActionRestorePlayerCameraAdjustment;
//# sourceMappingURL=GuaranteeActionRestorePlayerCameraAdjustment.js.map