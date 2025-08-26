"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var n = arguments.length;
  var h = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, o);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (s = t[r]) {
        h = (n < 3 ? s(h) : n > 3 ? s(e, i, h) : s(e, i)) || h;
      }
    }
  }
  if (n > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GongduolaSplineMoveComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const VehicleSplineMoveComponent_1 = require("../Common/VehicleSplineMoveComponent");
const GongduolaConfig_1 = require("./GongduolaConfig");
const UNLOCK_TURN_INPUT_MIN_ANGLE = 10;
const INPUT_ADJUST_FORWARD_MIN_YAW = 45;
const INPUT_ADJUST_FORWARD_MAX_YAW = 60;
let GongduolaSplineMoveComponent = class GongduolaSplineMoveComponent extends VehicleSplineMoveComponent_1.VehicleSplineMoveComponent {
  constructor() {
    super(...arguments);
    this.LastLockedInput = Vector_1.Vector.Create();
  }
  InputAdjustSlideTrack(t) {
    this.SplineQuat.Inverse(this.TmpQuat);
    this.ActorComp.ActorLocationProxy.Subtraction(this.SplineLocation, this.TmpVector1);
    this.TmpQuat.RotateVector(this.TmpVector1, this.TmpVector);
    this.TmpQuat.Multiply(this.ActorComp.ActorQuatProxy, this.TmpQuat1);
    this.TmpQuat1.Rotator(this.TmpRotator);
    var e = this.CurrentSplineMoveParamsInternal;
    var i = e.EdgeLimitCurve.GetCurrentValue(Math.abs(this.TmpVector.Y) / e.MaxOffsetDist);
    let o = -e.InputLimitAngle;
    let s = e.InputLimitAngle;
    if (this.TmpVector.Y < 0) {
      o *= 1 - i;
    } else {
      s *= 1 - i;
    }
    this.TmpVector1.DeepCopy(t);
    this.ConvertToTriangleInput(this.TmpVector1);
    this.TmpVector1.X = 1;
    this.AdjustInputForValid(this.TmpVector1, this.TmpVector.Y, this.TmpRotator.Yaw, o, s);
    this.ConvertToCircleInput(this.TmpVector1);
    this.CharActorComp?.SetInputDirect(this.TmpVector1);
  }
  ConvertToTriangleInput(t) {
    var e = t.GetAbsMax();
    if (!(t.Size() < 1) && !(e < MathUtils_1.MathUtils.KindaSmallNumber)) {
      t.MultiplyEqual(1 / e);
    }
  }
  ConvertToCircleInput(t) {
    if (!(t.Size() < 1)) {
      t.Normalize();
    }
  }
  AdjustInputForValid(t, e, i, o, s) {
    if (this.CurrentSplineMoveParams?.OnlyForward) {
      var n = Math.min(s - i, i - o);
      if (this.TmpVector1.Y * this.LastLockedInput.Y <= 0 || n > UNLOCK_TURN_INPUT_MIN_ANGLE) {
        this.LastLockedInput.Reset();
      }
      var n = this.CurrentSplineMoveParams;
      var n = n.CurrentMaxOffset <= n.MaxOffsetDist;
      var o = MathUtils_1.MathUtils.InRangeArray(i, [o, s]);
      if (!n) {
        if (Math.abs(i) >= 90) {
          t.Y = -Math.sign(e);
          return;
        } else {
          if ((e > 0 ? 1 : -1) * (i > 0 ? 1 : -1) > 0) {
            t.Y = -Math.sign(i);
          } else {
            n = (s = Math.abs(i)) < INPUT_ADJUST_FORWARD_MIN_YAW ? 1 : s > INPUT_ADJUST_FORWARD_MAX_YAW ? -1 : 0;
            t.Y = n * Math.sign(i);
          }
          return;
        }
      }
      if (o) {
        if (this.LastLockedInput.Y * t.Y > 0) {
          t.Y = 0;
        }
      } else {
        this.LastLockedInput.DeepCopy(t);
        t.Y = -Math.sign(i);
      }
    }
  }
  ApplySplineMoveDaConfig() {
    var t;
    if (this.ExtraMoveParams && (t = this.Entity.GetComponent(246))?.Config instanceof GongduolaConfig_1.GongduolaConfig) {
      t.Config.BaseMaxSpeed = this.ExtraMoveParams.ForwardSpeed;
      t.Config.BaseMaxAcceleration = this.ExtraMoveParams.ForwardAcceleration;
      t.RefreshMoveConfigFromVehicleConfig();
      t.SetEnableInputSprint(!this.ExtraMoveParams.DisableSprint);
    }
  }
  ResetSplineMoveDaConfig() {
    var t = this.Entity.GetComponent(246);
    t?.ResetVehicleConfig(true);
    t?.SetEnableInputSprint(true);
  }
};
GongduolaSplineMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(111)], GongduolaSplineMoveComponent);
exports.GongduolaSplineMoveComponent = GongduolaSplineMoveComponent; //# sourceMappingURL=GongduolaSplineMoveComponent.js.map