"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MathCommon = undefined;
class MathCommon {
  constructor() {}
  static Clamp(t, o, a) {
    if (t < o) {
      return o;
    } else if (t < a) {
      return t;
    } else {
      return a;
    }
  }
  static UnwindDegrees(t) {
    let o = t;
    while (o > this.FlatAngle) {
      o -= this.RoundAngle;
    }
    while (o < -this.FlatAngle) {
      o += this.RoundAngle;
    }
    return o;
  }
  static FloatSelect(t, o, a) {
    if (t >= 0) {
      return o;
    } else {
      return a;
    }
  }
  static DegreeToRadian(t) {
    return this.DegToRad * t;
  }
  static RadianToDegree(t) {
    return this.RadToDeg * t;
  }
  static Lerp(t, o, a) {
    return t * (1 - a) + o * a;
  }
  static LerpSin(t, o, a) {
    a = Math.sin(a * Math.PI / 2);
    return t * (1 - a) + o * a;
  }
  static VectorNormalizeRotator(t) {
    var o = t.Pitch;
    var a = t.Yaw;
    var m = t.Roll;
    var o = this.WrapAngle(o);
    var a = this.WrapAngle(a);
    var m = this.WrapAngle(m);
    t.Pitch = o;
    t.Yaw = a;
    t.Roll = m;
  }
  static WrapAngle(t) {
    return (t % this.RoundAngle + this.RoundAngle + this.FlatAngle) % this.RoundAngle - this.FlatAngle;
  }
  static Warp(t, o, a) {
    if (a < o) {
      [o, a] = [a, o];
    }
    a -= o;
    if (a < MathCommon.SmallNumber) {
      return o;
    } else {
      return (t % a + a - o) % a + o;
    }
  }
}
(exports.MathCommon = MathCommon).ThreshPointOnPlane = 0.1;
MathCommon.ThreshVectorNormalized = 0.01;
MathCommon.ThreshPointAreSame = 0.00002;
MathCommon.ThreshNormalsAreParallel = 0.999845;
MathCommon.ThreshNormalsAreOrthogonal = 0.017455;
MathCommon.SmallNumber = 1e-8;
MathCommon.KindaSmallNumber = 0.0001;
MathCommon.BigNumber = 3.4e+38;
MathCommon.Delta = 0.00001;
MathCommon.MaxInt16 = 32767;
MathCommon.RightAngle = 90;
MathCommon.FlatAngle = 180;
MathCommon.RoundAngle = 360;
MathCommon.ProgressTotalValue = 100;
MathCommon.DegToRad = Math.PI / MathCommon.FlatAngle;
MathCommon.RadDividedBy2 = MathCommon.DegToRad * 0.5;
MathCommon.RadToDeg = MathCommon.FlatAngle / Math.PI; //# sourceMappingURL=MathCommon.js.map