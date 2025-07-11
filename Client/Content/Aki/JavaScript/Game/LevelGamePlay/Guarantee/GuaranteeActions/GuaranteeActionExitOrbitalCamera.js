"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeActionExitOrbitalCamera = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionExitOrbitalCamera extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    ControllerHolder_1.ControllerHolder.CameraController.OrbitalCamera.PlayerComponent.StopCameraOrbital();
  }
}
exports.GuaranteeActionExitOrbitalCamera = GuaranteeActionExitOrbitalCamera;
//# sourceMappingURL=GuaranteeActionExitOrbitalCamera.js.map