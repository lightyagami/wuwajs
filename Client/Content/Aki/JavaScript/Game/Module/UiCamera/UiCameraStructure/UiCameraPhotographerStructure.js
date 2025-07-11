"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraPhotographerStructure = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const CameraController_1 = require("../../../Camera/CameraController");
const Global_1 = require("../../../Global");
const PhotographDefine_1 = require("../../Photograph/PhotographDefine");
const UiCameraStructure_1 = require("./UiCameraStructure");
class UiCameraPhotographerStructure extends UiCameraStructure_1.UiCameraStructure {
  constructor() {
    super(...arguments);
    this.$Uo = undefined;
  }
  OnSpawnStructureActor() {
    var t = new UE.TransformDouble(new UE.Quat(0), new UE.VectorDouble(0), new UE.VectorDouble(1, 1, 1));
    this.$Uo = ActorSystem_1.ActorSystem.Get(UE.TsPhotographer_C.StaticClass(), t, undefined);
    this.$Uo.SetTickableWhenPaused(true);
    this.$Uo.SetActorTickEnabled(true);
    this.$Uo.Initialize();
    this.$Uo.CameraArm.SetTickableWhenPaused(true);
    return this.$Uo;
  }
  OnSetSpringArmComponent() {
    return this.$Uo.CameraArm;
  }
  OnDestroy() {
    this.YUo();
  }
  OnActivate() {
    var t = this.JUo();
    var r = this.DWi();
    var e = Global_1.Global.BaseCharacter;
    r.SetIsDitherEffectEnable(false);
    e.SetDitherEffect(1, 1);
    var r = e.Mesh.D_GetSocketLocation(PhotographDefine_1.SPAWN_SOCKET_NAME);
    var e = t.D_GetTransform();
    this.$Uo.SetPlayerSourceLocation(r);
    this.$Uo.SetCameraInitializeTransform(e);
    this.$Uo.ActivateCamera(this.CameraActor);
  }
  OnDeactivate() {
    this.$Uo.DeactivateCamera();
  }
  YUo() {
    if (this.$Uo?.IsValid()) {
      this.$Uo.DeactivateCamera();
      ActorSystem_1.ActorSystem.Put("UiCameraPhotographerStructure.DestroyPhotographer", this.$Uo);
    }
    this.$Uo = undefined;
  }
  DWi() {
    var t = CameraController_1.CameraController.FightCamera;
    if (t) {
      return t.GetComponent(5);
    }
  }
  JUo() {
    var t = CameraController_1.CameraController.FightCamera;
    if (t) {
      t = t.GetComponent(4);
      if (t.Valid) {
        return t.CameraActor;
      }
    }
  }
  SetPlayerSourceLocation(t) {
    this.$Uo.SetPlayerSourceLocation(t);
  }
  SetCameraInitializeTransform(t) {
    this.$Uo.SetCameraInitializeTransform(t);
  }
  GetCameraInitializeTransform() {
    return this.$Uo.GetCameraInitializeTransform();
  }
  SetCameraTransform(t) {
    this.$Uo.SetCameraTransform(t);
  }
  MoveUp(t) {
    this.$Uo.MoveUp(t);
  }
  MoveRight(t) {
    this.$Uo.MoveRight(t);
  }
  AddCameraArmPitchInput(t) {
    this.$Uo.AddCameraArmPitchInput(t);
  }
  AddCameraArmYawInput(t) {
    this.$Uo.AddCameraArmYawInput(t);
  }
  SetFov(t) {
    this.$Uo.SetFov(t);
  }
  GetFov() {
    return this.$Uo.GetFov();
  }
  ResetCamera() {
    this.$Uo.ResetCamera();
  }
  SetCameraLUT(t) {
    this.$Uo.SetCameraLUT(t);
  }
}
exports.UiCameraPhotographerStructure = UiCameraPhotographerStructure;
//# sourceMappingURL=UiCameraPhotographerStructure.js.map