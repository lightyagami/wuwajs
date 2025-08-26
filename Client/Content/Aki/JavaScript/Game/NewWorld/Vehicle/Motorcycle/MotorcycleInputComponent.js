"use strict";

var __decorate = this && this.__decorate || function (t, e, o, i) {
  var n;
  var s = arguments.length;
  var r = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, o, i);
  } else {
    for (var c = t.length - 1; c >= 0; c--) {
      if (n = t[c]) {
        r = (s < 3 ? n(r) : s > 3 ? n(e, o, r) : n(e, o)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(e, o, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleInputComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const VehicleInputComponent_1 = require("../Common/VehicleInputComponent");
let MotorcycleInputComponent = class MotorcycleInputComponent extends VehicleInputComponent_1.VehicleInputComponent {
  constructor() {
    super(...arguments);
    this.MoveComp = undefined;
    this.TmpVector1 = Vector_1.Vector.Create();
  }
  OnStart() {
    super.OnStart();
    this.MoveComp = this.Entity.GetComponent(250);
    return true;
  }
  UpdateVehicleInputDirectAndFacing() {
    this.UpdateMoveCache();
    this.InputAdjusted(this.TmpVector1);
    this.ActorComp.SetInputDirect(this.TmpVector1, true);
    this.SetInputFacingFromInputDirect();
  }
  SetInputFacingFromInputDirect(t = 0) {
    this.ActorComp.SetInputFacing(this.ActorComp.ActorForwardProxy);
  }
  InputAdjusted(t) {
    var e = this.MoveVectorCache.Size();
    if (e <= MathUtils_1.MathUtils.KindaSmallNumber) {
      t.DeepCopy(this.MoveVectorCache);
    } else {
      this.MoveVectorCache.Multiply(e / Math.max(Math.abs(this.MoveVectorCache.X), Math.abs(this.MoveVectorCache.Y)), t);
    }
  }
  ExecuteInputCommand(t, e) {
    var o = t.Command;
    switch (o.CommandType) {
      case 4:
        this.ExecuteSprint(o);
        break;
      case 2:
        this.ExecuteJump(o);
        break;
      case 1:
        this.ExecuteSkill(o);
    }
  }
  ExecuteSprint(t) {
    this.MoveComp.BackBraking = !!t.IntValue;
  }
};
MotorcycleInputComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(249)], MotorcycleInputComponent);
exports.MotorcycleInputComponent = MotorcycleInputComponent; //# sourceMappingURL=MotorcycleInputComponent.js.map