"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraStructure = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
class UiCameraStructure {
  constructor() {
    this.ZUo = undefined;
    this.CameraActor = undefined;
    this.SpringArmComponent = undefined;
    this.OwnActor = undefined;
  }
  Initialize(t) {
    this.ZUo = t;
    this.CameraActor = this.ZUo.GetCameraActor();
    this.OwnActor = this.OnSpawnStructureActor();
    this.SpringArmComponent = this.OnSetSpringArmComponent();
    this.OnInitialize();
  }
  Destroy() {
    this.Deactivate();
    this.OnDestroy();
    this.CameraActor = undefined;
    this.OwnActor = undefined;
  }
  IsValid() {
    return !!this.CameraActor && !!this.OwnActor && this.CameraActor.IsValid() && this.OwnActor.IsValid();
  }
  Activate() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCamera", 58, "激活相机结构", ["Name", this.constructor.name]);
    }
    this.OnActivate();
  }
  Deactivate() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCamera", 58, "休眠相机结构", ["Name", this.constructor.name]);
    }
    this.OnDeactivate();
  }
  OnActivate() {}
  OnDeactivate() {}
  OnSpawnStructureActor() {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCamera", 58, "没有创建StructureActor", ["Name", this.constructor.name]);
    }
  }
  OnSetSpringArmComponent() {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCamera", 58, "没有实现OnSetSpringArmComponent", ["Name", this.constructor.name]);
    }
  }
  GetSpringArmComponent() {
    return this.SpringArmComponent;
  }
  OnInitialize() {}
  OnDestroy() {}
  AttachToComponent(t, i = FNameUtil_1.FNameUtil.NONE, e = 2, o = 2, r = 1) {
    if (this.CameraActor?.IsValid()) {
      this.CameraActor.K2_AttachToComponent(t, i, e, o, r, false);
    }
  }
  DetachFromComponent(t = 1, i = 1, e = 1) {
    if (this.CameraActor?.IsValid()) {
      this.CameraActor.K2_DetachFromActor(t, i, e);
    }
  }
  DetachUiCameraSpringActor(t, i, e) {
    this.OwnActor?.K2_DetachFromActor(t, i, e);
  }
  SetActorTransform(t) {
    this.OwnActor.D_K2_SetActorTransform(t, false, undefined, false);
  }
  SetActorLocation(t) {
    if (!this.OwnActor.D_K2_GetActorLocation().Equals(t, MathUtils_1.MathUtils.SmallNumber)) {
      this.OwnActor.D_K2_SetActorLocation(t, false, undefined, false);
    }
  }
  SetActorRelativeLocation(t) {
    if (this.OwnActor.GetParentComponent() !== undefined) {
      this.OwnActor.D_K2_SetActorRelativeLocation(t, false, undefined, false);
    } else {
      this.OwnActor.D_K2_SetActorLocation(t, false, undefined, false);
    }
  }
  SetCameraActorRelativeLocation(t) {
    this.CameraActor.D_K2_SetActorRelativeLocation(t, false, undefined, false);
  }
  SetActorRotation(t) {
    if (!this.OwnActor.K2_GetActorRotation().Equals(t, MathUtils_1.MathUtils.SmallNumber)) {
      this.OwnActor.K2_SetActorRotation(t, false);
    }
  }
  SetActorLocationAndRotation(t, i) {
    this.OwnActor.D_K2_SetActorLocationAndRotation(t, i, true, undefined, false);
  }
  SetUiCameraAnimationRelativeRotation(t) {
    this.OwnActor.K2_SetActorRelativeRotation(t, false, undefined, false);
  }
  SetSprintArmRelativeRotation(t) {
    this.SpringArmComponent.K2_SetRelativeRotation(t, false, undefined, false);
  }
  SetSpringArmRelativeLocation(t) {
    this.SpringArmComponent.D_K2_SetRelativeLocation(t, false, undefined, false);
  }
  SetCollisionTest(t) {
    this.SpringArmComponent.bDoCollisionTest = t;
  }
  SetSpringArmLength(t) {
    this.SpringArmComponent.TargetArmLength = t;
  }
  GetSpringArmLength() {
    return this.SpringArmComponent.TargetArmLength;
  }
  GetSpringRelativeLocation() {
    return new UE.VectorDouble(this.SpringArmComponent.RelativeLocation);
  }
  GetSpringRelativeRotation() {
    return this.SpringArmComponent.RelativeRotation;
  }
  GetActorLocation() {
    return this.OwnActor.D_K2_GetActorLocation();
  }
  GetActorRotation() {
    return this.OwnActor.K2_GetActorRotation();
  }
  GetOwnActor() {
    return this.OwnActor;
  }
}
exports.UiCameraStructure = UiCameraStructure;
//# sourceMappingURL=UiCameraStructure.js.map