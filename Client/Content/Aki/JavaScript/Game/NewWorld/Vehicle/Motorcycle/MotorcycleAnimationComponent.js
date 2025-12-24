"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var n;
  var s = arguments.length;
  var h = s < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, o);
  } else {
    for (var m = t.length - 1; m >= 0; m--) {
      if (n = t[m]) {
        h = (s < 3 ? n(h) : s > 3 ? n(e, i, h) : n(e, i)) || h;
      }
    }
  }
  if (s > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleAnimationComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const VehicleAnimationComponent_1 = require("../Common/VehicleAnimationComponent");
let MotorcycleAnimationComponent = class MotorcycleAnimationComponent extends VehicleAnimationComponent_1.VehicleAnimationComponent {
  OnStart() {
    super.OnStart();
    if (this.Mesh.DoesSocketExist(VehicleAnimationComponent_1.VehicleAnimationComponent.CameraPosition)) {
      this.CameraPositionOffset.FromUeVector(this.Mesh.GetRefBoneComponentPosition(this.Mesh.GetSocketBoneName(VehicleAnimationComponent_1.VehicleAnimationComponent.CameraPosition)));
    } else if (this.Mesh.DoesSocketExist(VehicleAnimationComponent_1.VehicleAnimationComponent.SeatProp01)) {
      this.CameraPositionOffset.FromUeVector(this.Mesh.GetRefBoneComponentPosition(this.Mesh.GetSocketBoneName(VehicleAnimationComponent_1.VehicleAnimationComponent.SeatProp01)));
    }
    return true;
  }
  GetCameraPosition(t, e = FNameUtil_1.FNameUtil.EMPTY) {
    if (FNameUtil_1.FNameUtil.IsEmpty(e)) {
      switch (this.CameraPositionType) {
        case 0:
          (this.HasModelBuffer() ? (this.TmpQuat.DeepCopy(this.Mesh.D_K2_GetComponentToWorld().GetRotation()), this.BufferShowTransform.GetRotation().Inverse(this.TmpQuat2), this.TmpQuat2.Multiply(this.TmpQuat, this.TmpQuat), this.TmpQuat) : this.ActorComp.ActorQuatProxy).RotateVector(this.CameraPositionOffset, this.TmpDirect);
          this.ActorComp.ActorLocationProxy.Addition(this.TmpDirect, t);
          break;
        case 1:
          t.FromUeVector(this.Mesh.D_GetSocketLocation(VehicleAnimationComponent_1.VehicleAnimationComponent.SeatProp01));
          break;
        default:
          this.ActorComp.ActorUpProxy.Multiply(VehicleAnimationComponent_1.DEFAULT_CAMERA_HEIGHT_RATE * this.ActorComp.Actor.VehicleMovementComponent.VehicleShapeBounds.BoxExtent.Z, this.TmpDirect);
          this.ActorComp.ActorLocationProxy.Addition(this.TmpDirect, t);
      }
    } else {
      t.DeepCopy(this.Mesh.D_GetSocketLocation(e));
    }
  }
};
MotorcycleAnimationComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(271)], MotorcycleAnimationComponent);
exports.MotorcycleAnimationComponent = MotorcycleAnimationComponent; //# sourceMappingURL=MotorcycleAnimationComponent.js.map