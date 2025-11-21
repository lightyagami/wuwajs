"use strict";

var __decorate = this && this.__decorate || function (e, t, o, i) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, o, i);
  } else {
    for (var c = e.length - 1; c >= 0; c--) {
      if (s = e[c]) {
        n = (r < 3 ? s(n) : r > 3 ? s(t, o, n) : s(t, o)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(t, o, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleSplineMoveComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const VehicleSplineMoveComponent_1 = require("../Common/VehicleSplineMoveComponent");
let MotorcycleSplineMoveComponent = class MotorcycleSplineMoveComponent extends VehicleSplineMoveComponent_1.VehicleSplineMoveComponent {
  constructor() {
    super(...arguments);
    this.QuatDelta = Quat_1.Quat.Create();
    this.MoveDelta = Vector_1.Vector.Create();
  }
  PositionAdjust(e, t) {
    this.CalAdjustRotation(e, t);
    super.PositionAdjust(e, t);
  }
  MoveToTargetLocation(e) {
    var t;
    this.TargetLocation.Subtraction(this.CharActorComp.ActorLocationProxy, this.TmpVector);
    if (!(this.TmpVector.SizeSquared() < MathUtils_1.MathUtils.SmallNumber)) {
      if (t = this.CharActorComp?.Actor.VehicleMovementComponent) {
        this.TmpVector1.FromUeVector(t.GetMotorNormal());
        if (this.TmpVector.DotProduct(this.TmpVector1) < 0) {
          this.MoveDelta.DeepCopy(this.TmpVector);
        } else {
          Vector_1.Vector.VectorPlaneProject(this.TmpVector, this.TmpVector1, this.MoveDelta);
        }
        t.MoveMotorcycle(this.MoveDelta.ToUeVectorOld(), this.QuatDelta.ToUeQuat(), true);
      } else {
        super.MoveToTargetLocation(e);
      }
    }
  }
  CalAdjustRotation(e, t) {
    this.QuatDelta.Reset();
  }
};
MotorcycleSplineMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(114)], MotorcycleSplineMoveComponent);
exports.MotorcycleSplineMoveComponent = MotorcycleSplineMoveComponent; //# sourceMappingURL=MotorcycleSplineMoveComponent.js.map