"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraSpecialGameplayController = undefined;
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const CameraControllerBase_1 = require("./CameraControllerBase");
const ISpecialGameplayCamera_1 = require("./SpecialGameplay/ISpecialGameplayCamera");
class CameraSpecialGameplayController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments);
    this.CameraActor = undefined;
    this.wce = undefined;
  }
  Name() {
    return "SpecialGameplayController";
  }
  OnInit() {
    this.Lock(this);
  }
  UpdateInternal(e) {
    if (this.wce) {
      this.wce.Update(e);
    }
  }
  EnterSpecialGameplayController(e) {
    this.CameraActor ||= ControllerHolder_1.ControllerHolder.CameraController.SpawnCameraActor();
    ControllerHolder_1.ControllerHolder.CameraController.SetViewTarget(this.CameraActor, "EnterSpecialGameplayController", 0, 0);
    if (ISpecialGameplayCamera_1.SpecialGameplayCamera.GameplayMap.has(e)) {
      this.wce = ISpecialGameplayCamera_1.SpecialGameplayCamera.GameplayMap.get(e)();
      this.wce.OnInit(this.CameraActor);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[特殊玩法相机] 使用空相机", ["gameplayId", e]);
    }
    this.Unlock(this);
  }
  ExitSpecialGameplayController() {
    if (this.Camera?.CameraActor?.IsValid()) {
      ControllerHolder_1.ControllerHolder.CameraController.SetViewTarget(this.Camera.CameraActor, "ExitSpecialGameplayController");
    }
    if (this?.CameraActor) {
      ActorSystem_1.ActorSystem.Put("CameraSpecialGameplayController.ExitSpecialGameplayController", this.CameraActor);
      this.CameraActor = undefined;
    }
    this.wce?.OnDestroy();
    this.wce = undefined;
    this.Lock(this);
  }
}
exports.CameraSpecialGameplayController = CameraSpecialGameplayController;
//# sourceMappingURL=CameraSpecialGameplayController.js.map