"use strict";

var __decorate = this && this.__decorate || function (t, e, o, i) {
  var s;
  var r = arguments.length;
  var h = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, o, i);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (s = t[n]) {
        h = (r < 3 ? s(h) : r > 3 ? s(e, o, h) : s(e, o)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(e, o, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleMoveComponent = undefined;
const Time_1 = require("../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const VehicleMoveComponent_1 = require("../Common/VehicleMoveComponent");
const BRAKE_FORWARD_SPEED_THRESHOLD = 10;
const BRAKE_RIGHT_SPEED_THRESHOLD = 100;
const BACK_TIME_THRESHOLD = 301;
let MotorcycleMoveComponent = class MotorcycleMoveComponent extends VehicleMoveComponent_1.VehicleMoveComponent {
  constructor() {
    super(...arguments);
    this.Ydl = Vector_1.Vector.Create();
    this.iCu = 0;
    this.rCu = false;
  }
  get BackBraking() {
    return this.rCu;
  }
  set BackBraking(t) {
    this.rCu = t;
  }
  SetInputOrder() {
    var t;
    var e;
    var o = this.ActorComp?.Actor.VehicleMovementComponent;
    if (o) {
      if (this.BackBraking) {
        this.Ydl.DeepCopy(this.ActorComp.InputDirectProxy);
        this.Ydl.X = 0;
        o.SetMotorInput(this.ActorComp.InputDirect, 0, 1);
      } else if (this.ActorComp.InputDirect.X >= 0) {
        o.SetMotorInput(this.ActorComp.InputDirect);
        this.iCu = 0;
      } else {
        t = this.ActorComp.ActorVelocityProxy.DotProduct(this.ActorComp.ActorForwardProxy);
        e = this.ActorComp.ActorVelocityProxy.DotProduct(this.ActorComp.ActorRightProxy);
        if (Math.abs(e) > BRAKE_RIGHT_SPEED_THRESHOLD || t > BRAKE_FORWARD_SPEED_THRESHOLD) {
          this.Ydl.DeepCopy(this.ActorComp.InputDirectProxy);
          this.Ydl.X = 0;
          o.SetMotorInput(this.Ydl.ToUeVectorOld(), -this.ActorComp.InputDirectProxy.X);
          this.iCu = 0;
        } else if (this.iCu > BACK_TIME_THRESHOLD) {
          o.SetMotorInput(this.ActorComp.InputDirect);
        } else {
          this.Ydl.DeepCopy(this.ActorComp.InputDirectProxy);
          this.Ydl.X = 0;
          o.SetMotorInput(this.Ydl.ToUeVectorOld(), -this.ActorComp.InputDirectProxy.X);
          this.iCu += Time_1.Time.DeltaTime;
        }
      }
    }
  }
};
MotorcycleMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(250)], MotorcycleMoveComponent);
exports.MotorcycleMoveComponent = MotorcycleMoveComponent; //# sourceMappingURL=MotorcycleMoveComponent.js.map