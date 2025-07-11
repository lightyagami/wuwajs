"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventExitOrbitalCamera = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventExitOrbitalCamera extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    if (e) {
      ControllerHolder_1.ControllerHolder.CameraController.OrbitalCamera.PlayerComponent.StopCameraOrbital();
    } else {
      this.FinishExecute(false);
    }
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemGuaranteeAction, this.Type, this.BaseContext, {
      Name: "ExitOrbitalCamera"
    });
  }
}
exports.LevelEventExitOrbitalCamera = LevelEventExitOrbitalCamera;
//# sourceMappingURL=LevelEventExitOrbitalCamera.js.map