"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyStateDisableCameraCollision extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(e, r, o) {
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent)?.Valid && !!e?.IsAutonomousProxy && !(ControllerHolder_1.ControllerHolder.CameraController.FightCamera?.LogicComponent?.SetCameraCollisionEnable(false), Log_1.Log.CheckInfo() && Log_1.Log.Info("Camera", 57, "关闭相机碰撞"), 0);
  }
  K2_NotifyEnd(e, r) {
    var e = e?.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent)?.Valid && !!e?.IsAutonomousProxy && !(ControllerHolder_1.ControllerHolder.CameraController.FightCamera?.LogicComponent?.SetCameraCollisionEnable(true), Log_1.Log.CheckInfo() && Log_1.Log.Info("Camera", 57, "启用相机碰撞"), 0);
  }
  GetNotifyName() {
    return "关闭相机碰撞";
  }
}
exports.default = TsAnimNotifyStateDisableCameraCollision;
//# sourceMappingURL=TsAnimNotifyStateDisableCameraCollision.js.map