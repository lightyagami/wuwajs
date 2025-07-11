"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraSpringStructure = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const GlobalData_1 = require("../../../GlobalData");
const UiCameraStructure_1 = require("./UiCameraStructure");
class UiCameraSpringStructure extends UiCameraStructure_1.UiCameraStructure {
  constructor() {
    super(...arguments);
    this.zUo = undefined;
  }
  OnSpawnStructureActor() {
    var t = GlobalData_1.GlobalData.World;
    var r = new UE.Transform(new UE.Quat(0), new UE.Vector(0), new UE.Vector(1, 1, 1));
    var t = UE.GameplayStatics.BeginDeferredActorSpawnFromClass(t, UE.BP_UiCameraAnimation_C.StaticClass(), r);
    t.SetTickableWhenPaused(true);
    UE.GameplayStatics.FinishSpawningActor(t, r);
    this.zUo = t;
    this.zUo.SpringArm?.SetTickableWhenPaused(true);
    this.zUo.Camera?.SetTickableWhenPaused(true);
    return t;
  }
  OnSetSpringArmComponent() {
    return this.zUo.SpringArm;
  }
  OnInitialize() {}
  OnDestroy() {
    ActorSystem_1.ActorSystem.Put("UiCameraSpringStructure.OnDestroy", this.zUo);
    this.zUo = undefined;
  }
  OnActivate() {
    this.CameraActorAttachToSpringActor();
  }
  OnDeactivate() {
    this.CameraActorDetachFromSpringActor();
  }
  CameraActorAttachToSpringActor() {
    var t = this.zUo.Camera;
    this.AttachToComponent(t);
  }
  CameraActorDetachFromSpringActor() {
    this.DetachFromComponent();
  }
  GetSpringActor() {
    return this.zUo;
  }
}
exports.UiCameraSpringStructure = UiCameraSpringStructure;
//# sourceMappingURL=UiCameraSpringStructure.js.map