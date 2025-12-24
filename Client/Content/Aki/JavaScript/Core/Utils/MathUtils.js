"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MathUtils = exports.FastUeFloatRange = exports.INT_BIT = exports.intBit = exports.PI_DEG_DOUBLE = exports.PI_DEG = undefined;
const UE = require("ue");
const Long = require("../../Core/Define/Net/long");
const Stack_1 = require("../Container/Stack");
const MathCommon_1 = require("./Math/MathCommon");
const Quat_1 = require("./Math/Quat");
const Rotator_1 = require("./Math/Rotator");
const Transform_1 = require("./Math/Transform");
const Vector_1 = require("./Math/Vector");
const Vector2D_1 = require("./Math/Vector2D");
exports.PI_DEG = 180;
exports.PI_DEG_DOUBLE = exports.PI_DEG * 2;
exports.intBit = 32n;
exports.INT_BIT = 32;
const MAX_INVALID_NUMBER = 999999999;
class FastUeFloatRange {
  constructor(t) {
    this.LowerBoundValue = 0;
    this.UpperBoundValue = 0;
    this.LowerBoundValue = t.LowerBound.Value;
    this.UpperBoundValue = t.UpperBound.Value;
    this.LowerBoundType = t.LowerBound.Type;
    this.UpperBoundType = t.UpperBound.Type;
  }
}
exports.FastUeFloatRange = FastUeFloatRange;
class MathUtils {
  static IsNearlyEqual(t, a, i = this.SmallNumber) {
    return Math.abs(t - a) <= i;
  }
  static IsNearlyZero(t, a = this.SmallNumber) {
    return Math.abs(t) <= a;
  }
  static IsAngleNearEqual(t, a, i = MathCommon_1.MathCommon.KindaSmallNumber) {
    return Math.abs(MathUtils.WrapAngle(t - a)) <= i;
  }
  static Clamp(t, a, i) {
    return MathCommon_1.MathCommon.Clamp(t, a, i);
  }
  static GetRangePct(t, a, i) {
    var r = a - t;
    if (this.IsNearlyZero(r)) {
      if (a <= i) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return (i - t) / r;
    }
  }
  static RangeClamp(t, a, i, r, e) {
    a = this.Clamp(this.GetRangePct(a, i, t), 0, 1);
    return this.Lerp(r, e, a);
  }
  static Lerp(t, a, i) {
    return t * (1 - i) + a * i;
  }
  static InverseLerp(t, a, i) {
    return Math.max(0, Math.min(1, (t - a) / (i - a)));
  }
  static LerpCubic(t, a, i, r, e) {
    var s = e * e;
    var h = s * e;
    return (h * 2 - s * 3 + 1) * t + (h - s * 2 + e) * a + (h - s) * r + (h * -2 + s * 3) * i;
  }
  static LerpSin(t, a, i) {
    i = Math.sin(i * Math.PI / 2);
    return t * (1 - i) + a * i;
  }
  static LerpVectorOld(t, a, i, r = undefined) {
    i = this.Clamp(i, 0, 1);
    if (r) {
      r.X = this.Lerp(t.X, a.X, i);
      r.Y = this.Lerp(t.Y, a.Y, i);
      r.Z = this.Lerp(t.Z, a.Z, i);
      return r;
    } else {
      return new UE.Vector(this.Lerp(t.X, a.X, i), this.Lerp(t.Y, a.Y, i), this.Lerp(t.Z, a.Z, i));
    }
  }
  static LerpVector(t, a, i, r = undefined) {
    i = this.Clamp(i, 0, 1);
    if (r) {
      r.X = this.Lerp(t.X, a.X, i);
      r.Y = this.Lerp(t.Y, a.Y, i);
      r.Z = this.Lerp(t.Z, a.Z, i);
      return r;
    } else {
      return new UE.VectorDouble(this.Lerp(t.X, a.X, i), this.Lerp(t.Y, a.Y, i), this.Lerp(t.Z, a.Z, i));
    }
  }
  static LerpDirect2dByMaxAngle(t, a, i, r, e, s) {
    var h = MathUtils.GetAngleByVector2D(t);
    var n = MathUtils.GetAngleByVector2D(a);
    var t = Math.asin(t.Z) * MathUtils.RadToDeg;
    var a = Math.asin(a.Z) * MathUtils.RadToDeg * i;
    let o = n - h;
    while (o > 180) {
      o -= 360;
    }
    while (-o > 180) {
      o += 360;
    }
    if (e) {
      o = o > 0 ? o - 360 : o + 360;
    }
    let M = a - t;
    i = Math.sqrt(o * o + M * M);
    if (r < i) {
      o *= r / i;
      M *= r / i;
    }
    n = h + o;
    e = (t + M) * MathUtils.DegToRad;
    s.Z = Math.sin(e);
    a = Math.cos(e);
    s.X = Math.cos(n * MathUtils.DegToRad) * a;
    s.Y = Math.sin(n * MathUtils.DegToRad) * a;
  }
  static InterpTo(t, a, i, r) {
    var e = a - t;
    if (Math.abs(e) < MathCommon_1.MathCommon.KindaSmallNumber) {
      return a;
    } else {
      return t + e * this.Clamp(i * r, 0, 1);
    }
  }
  static InterpConstantTo(t, a, i, r) {
    var e = a - t;
    if (Math.abs(e) < MathCommon_1.MathCommon.KindaSmallNumber) {
      return a;
    } else {
      return t + this.Clamp(e, -(a = i * r), a);
    }
  }
  static VectorInterpTo(t, a, i, r, e) {
    a.Subtraction(t, this.cz);
    this.cz.MultiplyEqual(this.Clamp(i * r, 0, 1));
    this.cz.Addition(t, e);
  }
  static RotatorInterpTo(t, a, i, r, e) {
    if (r <= 0) {
      e.DeepCopy(a);
    } else {
      r *= i;
      e.Pitch = a.Pitch - t.Pitch;
      e.Yaw = a.Yaw - t.Yaw;
      e.Roll = a.Roll - t.Roll;
      MathCommon_1.MathCommon.VectorNormalizeRotator(e);
      e.Pitch = r >= 1 ? e.Pitch : e.Pitch * r;
      e.Yaw = r >= 1 ? e.Yaw : e.Yaw * r;
      e.Roll = r >= 1 ? e.Roll : e.Roll * r;
      e.Pitch += t.Pitch;
      e.Yaw += t.Yaw;
      e.Roll += t.Roll;
      MathCommon_1.MathCommon.VectorNormalizeRotator(e);
    }
  }
  static RotatorAxisInterpTo(t, a, i, r) {
    if (r <= 0) {
      return a;
    } else {
      r = r * i;
      i = MathCommon_1.MathCommon.WrapAngle(a - t);
      i = r >= 1 ? i : i * r;
      i += t;
      return MathCommon_1.MathCommon.WrapAngle(i);
    }
  }
  static RotatorInterpConstantTo(t, a, i, r, e) {
    if (i <= 0 || r <= 0) {
      e.DeepCopy(t);
    } else {
      r *= i;
      e.Pitch = a.Pitch - t.Pitch;
      e.Yaw = a.Yaw - t.Yaw;
      e.Roll = a.Roll - t.Roll;
      MathCommon_1.MathCommon.VectorNormalizeRotator(e);
      e.Pitch = this.Clamp(e.Pitch, -r, r);
      e.Yaw = this.Clamp(e.Yaw, -r, r);
      e.Roll = this.Clamp(e.Roll, -r, r);
      e.Pitch += t.Pitch;
      e.Yaw += t.Yaw;
      e.Roll += t.Roll;
      MathCommon_1.MathCommon.VectorNormalizeRotator(e);
    }
  }
  static RotatorInterpConstantToAvoid(t, a, i, r, e, s) {
    if (r <= 0 || e <= 0) {
      s.DeepCopy(t);
    } else {
      e *= r;
      s.Pitch = a.Pitch - t.Pitch;
      s.Yaw = a.Yaw - t.Yaw;
      s.Roll = a.Roll - t.Roll;
      MathCommon_1.MathCommon.VectorNormalizeRotator(s);
      s.Pitch = this.Clamp(s.Pitch, -e, e);
      s.Yaw = this.Clamp(s.Yaw, -e, e);
      s.Roll = this.Clamp(s.Roll, -e, e);
      s.Pitch += t.Pitch;
      s.Yaw += t.Yaw;
      s.Roll += t.Roll;
      MathCommon_1.MathCommon.VectorNormalizeRotator(s);
    }
  }
  static GetRandomFloatNumber(t, a) {
    return t + (a - t) * Math.random();
  }
  static GetRandomVector(t, a) {
    var i = new UE.Vector();
    i.X = MathUtils.GetRandomFloatNumber(t, a);
    i.Y = MathUtils.GetRandomFloatNumber(t, a);
    i.Z = MathUtils.GetRandomFloatNumber(t, a);
    return i;
  }
  static GetRandomVector2d(t, a) {
    var i = new UE.Vector2D();
    i.X = MathUtils.GetRandomFloatNumber(t, a);
    i.Y = MathUtils.GetRandomFloatNumber(t, a);
    return i;
  }
  static GetAngleByVector2D(t) {
    let a = 0;
    return (a = (t instanceof UE.Vector ? (this.cz.FromUeVector(t), this.cz) : t).HeadingAngle()) * this.RadToDeg;
  }
  static GetUeVector2dByAngle(t) {
    t *= this.DegToRad;
    return new UE.Vector(Math.cos(t), Math.sin(t), 0);
  }
  static GetVector2dByAngle(t, a) {
    t *= this.DegToRad;
    a.X = Math.cos(t);
    a.Y = Math.sin(t);
  }
  static InRange(t, a) {
    return t >= a.Min && t <= a.Max;
  }
  static InRangeArray(t, a) {
    return t >= a[0] && t <= a[1];
  }
  static InRangeAngle(t, a) {
    let i = t;
    while (i + 360 <= a.Max) {
      i += 360;
    }
    while (i - 360 >= a.Min) {
      i -= 360;
    }
    return this.InRange(i, a);
  }
  static InRangeAngleArray(t, a) {
    let i = t;
    while (i + 360 <= a[1]) {
      i += 360;
    }
    while (i - 360 >= a[0]) {
      i -= 360;
    }
    return this.InRangeArray(i, a);
  }
  static InUeRange(t, a) {
    return (a.LowerBound.Type === 0 ? t > a.LowerBound.Value : t >= a.LowerBound.Value) && (a.UpperBound.Type === 0 ? t < a.UpperBound.Value : t <= a.UpperBound.Value);
  }
  static InFastUeRange(t, a) {
    return (a.LowerBoundType === 0 ? t > a.LowerBoundValue : t >= a.LowerBoundValue) && (a.UpperBoundType === 0 ? t < a.UpperBoundValue : t <= a.UpperBoundValue);
  }
  static InUeRangeAngle(t, a) {
    let i = t;
    while (i + 360 <= a.UpperBound.Value) {
      i += 360;
    }
    while (i - 360 >= a.LowerBound.Value) {
      i -= 360;
    }
    return this.InUeRange(i, a);
  }
  static InFastUeRangeAngle(t, a) {
    let i = t;
    while (i + 360 <= a.UpperBoundValue) {
      i += 360;
    }
    while (i - 360 >= a.LowerBoundValue) {
      i -= 360;
    }
    return this.InFastUeRange(i, a);
  }
  static LocationInRangeArray(t, a, i, r, e, s, h) {
    this.InverseTransformPositionNoScale(t, a, i, this.cz);
    t = this.cz.Z;
    return !!this.InRangeArray(t, h) && (a = this.cz.Size2D() - r, !!this.InRangeArray(a, e)) && (i = MathUtils.GetAngleByVector2D(this.cz), this.InRangeAngleArray(i, s));
  }
  static LocationInUeRange(t, a, i, r, e, s, h) {
    this.InverseTransformPositionNoScale(t, a, i, this.cz);
    t = this.cz.Z;
    return !!this.InUeRange(t, h) && (a = this.cz.Size2D() - r, !!this.InUeRange(a, e)) && (i = MathUtils.GetAngleByVector2D(this.cz), this.InUeRangeAngle(i, s));
  }
  static LocationInFastUeRange(t, a, i, r, e, s, h) {
    this.InverseTransformPositionNoScale(t, a, i, this.cz);
    t = this.cz.Z;
    return !!this.InFastUeRange(t, h) && (a = Math.max(MathUtils.SmallNumber, this.cz.Size2D() - r), !!this.InFastUeRange(a, e)) && (i = MathUtils.GetAngleByVector2D(this.cz), this.InFastUeRangeAngle(i, s));
  }
  static GetFloatPointFloor(t, a = 0) {
    a = Math.pow(10, a);
    t *= a;
    t = Math.floor(t);
    return t /= a;
  }
  static GetFloatPointCeil(t, a = 0) {
    a = Math.pow(10, a);
    t *= a;
    t = Math.ceil(t);
    return t /= a;
  }
  static GetRoundToNDecimalPlaces(t, a) {
    a = Math.pow(10, a);
    return Math.round(t * a) / a;
  }
  static GetFloatPointFloorString(t, a = 0) {
    return MathUtils.GetFloatPointFloor(t, a).toFixed(a);
  }
  static SafeDivide(t, a) {
    if (a !== 0) {
      return t / a;
    } else {
      return 0;
    }
  }
  static LongToBigInt(t) {
    if (typeof t == "number") {
      const i = BigInt(t);
      return i;
    }
    var a = BigInt(t.low >>> 0);
    const i = BigInt(t.high) << exports.intBit | a;
    return i;
  }
  static LongToNumber(t) {
    var a;
    if (typeof t == "number") {
      return t;
    } else {
      a = BigInt(t.low >>> 0);
      t = BigInt(t.high) << exports.intBit | a;
      return Number(t);
    }
  }
  static NumberToLong(t) {
    t = BigInt(t);
    return Long.fromBigInt(t);
  }
  static BigIntToLong(t) {
    return Long.fromBigInt(t);
  }
  static StringToNumber(t) {
    var t = t.trim();
    if (t) {
      t = Number(t);
      if (Number.isFinite(t)) {
        return t;
      } else {
        return undefined;
      }
    }
  }
  static GetRandomRange(t, a) {
    a -= t;
    return t + Math.random() * a;
  }
  static GetRandomItem(t) {
    if (t.length !== 0) {
      return t[Math.floor(Math.random() * t.length)];
    }
  }
  static BlendEaseIn(t, a, i, r) {
    return t + (a - t) * this.Lerp(0, 1, Math.pow(i, r));
  }
  static StandardizingPitch(t) {
    if (t > 180) {
      return t - 360;
    } else if (t < -180) {
      return t + 360;
    } else {
      return t;
    }
  }
  static WrapAngle(t) {
    return MathCommon_1.MathCommon.WrapAngle(t);
  }
  static GetAngleByVectorDot(t, a) {
    var i = Math.sqrt(t.X * t.X + t.Y * t.Y + t.Z * t.Z);
    var r = Math.sqrt(a.X * a.X + a.Y * a.Y + a.Z * a.Z);
    var t = this.DotProduct(t, a) / (i * r);
    return Math.acos(MathCommon_1.MathCommon.Clamp(t, -1, 1)) * this.RadToDeg;
  }
  static SignedAngleDeg(t, a, i = false) {
    var r = t.X * a.Y - t.Y * a.X;
    var t = t.X * a.X + t.Y * a.Y;
    let e = Math.atan2(r, t) * this.RadToDeg;
    return e = i ? -e : e;
  }
  static SignedAngleOnPlaneDeg(t, a, i) {
    var r;
    var e;
    var s;
    var h;
    var n;
    var o;
    var M = Math.hypot(i.X, i.Y, i.Z);
    if (M < MathCommon_1.MathCommon.KindaSmallNumber) {
      return 0;
    } else {
      r = i.X / M;
      e = i.Y / M;
      i = i.Z / M;
      M = t.X * r + t.Y * e + t.Z * i;
      s = a.X * r + a.Y * e + a.Z * i;
      h = t.X - M * r;
      n = t.Y - M * e;
      t = t.Z - M * i;
      M = a.X - s * r;
      o = a.Y - s * e;
      a = a.Z - s * i;
      return Math.atan2(r * (n * a - t * o) + e * (t * M - h * a) + i * (h * o - n * M), h * M + n * o + t * a) * this.RadToDeg;
    }
  }
  static DotProduct(t, a) {
    return t.X * a.X + t.Y * a.Y + t.Z * a.Z;
  }
  static ComposeRotator(t, a, i) {
    t = t.Quaternion();
    a = a.Quaternion();
    if (i instanceof Quat_1.Quat) {
      a.Multiply(t, i);
    } else if (i instanceof Rotator_1.Rotator) {
      a.Multiply(t, this.az);
      this.az.Rotator(i);
    }
  }
  static VectorToRotator(t, a) {
    a.Yaw = Math.atan2(t.Y, t.X) * this.RadToDeg;
    a.Pitch = Math.atan2(t.Z, Math.sqrt(t.X * t.X + t.Y * t.Y)) * this.RadToDeg;
    a.Roll = 0;
    return a;
  }
  static RotatorToVector(t, a) {
    var i = MathCommon_1.MathCommon.WrapAngle(t.Pitch);
    var t = MathCommon_1.MathCommon.WrapAngle(t.Yaw);
    var i = MathCommon_1.MathCommon.DegreeToRadian(i);
    var t = MathCommon_1.MathCommon.DegreeToRadian(t);
    var r = Math.cos(i);
    var i = Math.sin(i);
    var e = Math.cos(t);
    var t = Math.sin(t);
    a.X = r * e;
    a.Y = r * t;
    a.Z = i;
    return a;
  }
  static Bisection(t, a, i, r) {
    let e = a;
    let s = i;
    while (s - e > r) {
      var h = (e + s) / 2;
      if (t(h)) {
        s = h;
      } else {
        e = h + r;
      }
    }
    return e;
  }
  static Square(t) {
    return t * t;
  }
  static TransformPosition(t, a, i, r, e) {
    i.Multiply(r, e);
    a.Quaternion().RotateVector(e, e);
    t.Addition(e, e);
  }
  static TransformPositionNoScale(t, a, i, r) {
    a.Quaternion().RotateVector(i, r);
    t.Addition(r, r);
  }
  static InverseTransformPosition(t, a, i, r, e) {
    r.Subtraction(t, e);
    a.Quaternion(this.az);
    this.az.Inverse(this.az);
    this.az.RotateVector(e, e);
    i.Multiply(e, e);
  }
  static InverseTransformPositionNoScale(t, a, i, r) {
    i.Subtraction(t, r);
    a.Quaternion(this.az);
    this.az.Inverse(this.az);
    this.az.RotateVector(r, r);
  }
  static mz() {
    if (!this.dz) {
      this.dz = new Array(3);
      this.dz[0] = new Array(3);
      this.dz[1] = new Array(3);
      this.dz[2] = new Array(3);
    }
    return this.dz;
  }
  static Cz() {
    this.gz ||= new Array(3);
    return this.gz;
  }
  static LookRotation(a, i, r, e) {
    let s = a.X + i.Y + r.Z;
    if (s > 0) {
      s += 1;
      var h = 0.5 / Math.sqrt(s);
      var n = h * s;
      var o = (i.Z - r.Y) * h;
      var M = (r.X - a.Z) * h;
      var h = (a.Y - i.X) * h;
      e.Set(o, M, h, n);
    } else {
      o = this.mz();
      o[0][0] = a.X;
      o[0][1] = i.X;
      o[0][2] = r.X;
      o[1][0] = a.Y;
      o[1][1] = i.Y;
      o[1][2] = r.Y;
      o[2][0] = a.Z;
      o[2][1] = i.Z;
      o[2][2] = r.Z;
      M = this.Cz();
      let t = 0;
      if (i.Y > a.Y) {
        t = 1;
      }
      h = ((t = r.Z > o[t][t] ? 2 : t) + 1) % 3;
      n = (1 + h) % 3;
      s = o[t][t] - o[h][h] - o[n][n] + 1;
      i = 0.5 / Math.sqrt(s);
      M[t] = i * s;
      a = (o[n][h] - o[h][n]) * i;
      M[h] = (o[h][t] + o[t][h]) * i;
      M[n] = (o[n][t] + o[t][n]) * i;
      e.Set(M[0], M[1], M[2], a);
    }
    e.Normalize();
  }
  static LookRotationUpFirst(t, a, i) {
    var r = this.cz;
    r.FromUeVector(a);
    r.Normalize();
    var a = this.fz;
    r.CrossProduct(t, a);
    a.Normalize();
    var t = this.pz;
    a.CrossProduct(r, t);
    if (i instanceof Quat_1.Quat) {
      this.LookRotation(t, a, r, i);
    } else if (i instanceof Rotator_1.Rotator) {
      this.LookRotation(t, a, r, this.az);
      this.az.Rotator(i);
    }
  }
  static LookRotationForwardFirst(t, a, i) {
    var r = this.cz;
    r.FromUeVector(t);
    r.Normalize();
    var t = this.fz;
    a.CrossProduct(r, t);
    t.Normalize();
    var a = this.pz;
    r.CrossProduct(t, a);
    if (i instanceof Quat_1.Quat) {
      this.LookRotation(r, t, a, i);
    } else if (i instanceof Rotator_1.Rotator) {
      this.LookRotation(r, t, a, this.az);
      this.az.Rotator(i);
    }
  }
  static GetCubicValue(t) {
    return (t * -2 + 3) * t * t;
  }
  static DecimalToBinary(t) {
    let a = t;
    let i = "";
    if (a < 0) {
      i = "-";
      a = 0 - a;
    } else {
      if (a === 0) {
        return "0";
      }
      i = "+";
    }
    var r = new Stack_1.Stack();
    for (; a > 0;) {
      r.Push(Math.floor(a % 2));
      a = Math.floor(a / 2);
    }
    var e = r.Size;
    for (let t = 0; t < e; t++) {
      i += r.Pop().toString();
    }
    return i;
  }
  static GetObliqueTriangleAngle(t, a, i) {
    return Math.acos((t * t + a * a - i * i) / (t * 2 * a));
  }
  static GetTriangleCircumradius(t, a, i) {
    var r = (t + a + i) / 2;
    return t * a * i / (this.CircumradiusRatio * Math.sqrt(r * (r - t) * (r - a) * (r - i)));
  }
  static VerticalFovToHorizontally(t, a) {
    t = Math.tan(t / 2 * MathUtils.DegToRad);
    return Math.atan(t * a) * 2 * MathUtils.RadToDeg;
  }
  static HorizontalFovToVertically(t, a) {
    t = Math.tan(t / 2 * MathUtils.DegToRad);
    return Math.atan(t / a) * 2 * MathUtils.RadToDeg;
  }
  static IsValidNumber(t) {
    return t != null && !isNaN(t) && !!isFinite(t);
  }
  static IsValidNumbers(t, a, i, r = 100000000) {
    return t !== undefined && a !== undefined && i !== undefined && t !== null && a !== null && i !== null && !isNaN(t) && !isNaN(a) && !isNaN(i) && !!isFinite(t) && !!isFinite(a) && !!isFinite(i) && (!(Math.abs(t) >= r) || Math.abs(t) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(a) >= r) || Math.abs(a) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(i) >= r) || Math.abs(i) === Number.MAX_SAFE_INTEGER);
  }
  static IsValidVector(t, a = 100000000) {
    var i;
    var r;
    return !!t && (i = t.X, r = t.Y, t = t.Z, i !== undefined) && r !== undefined && t !== undefined && i !== null && r !== null && t !== null && !isNaN(i) && !isNaN(r) && !isNaN(t) && !!isFinite(i) && !!isFinite(r) && !!isFinite(t) && (!(Math.abs(i) >= a) || Math.abs(i) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(r) >= a) || Math.abs(r) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(t) >= a) || Math.abs(t) === Number.MAX_SAFE_INTEGER);
  }
  static IsValidRotator(t, a = 100000000) {
    var i;
    var r;
    return !!t && (i = t.Roll, r = t.Pitch, t = t.Yaw, i !== undefined) && r !== undefined && t !== undefined && i !== null && r !== null && t !== null && !isNaN(i) && !isNaN(r) && !isNaN(t) && !!isFinite(i) && !!isFinite(r) && !!isFinite(t) && (!(Math.abs(i) >= a) || Math.abs(i) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(r) >= a) || Math.abs(r) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(t) >= a) || Math.abs(t) === Number.MAX_SAFE_INTEGER);
  }
  static IsValidQuat(t, a = 100000000) {
    var i;
    var r;
    var e;
    return !!t && (i = t.X, r = t.Y, e = t.Z, t = t.W, i !== undefined) && r !== undefined && e !== undefined && t !== undefined && i !== null && r !== null && e !== null && !isNaN(i) && !isNaN(r) && !isNaN(e) && !isNaN(t) && !!isFinite(i) && !!isFinite(r) && !!isFinite(e) && !!isFinite(t) && (!(Math.abs(i) >= a) || Math.abs(i) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(r) >= a) || Math.abs(r) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(e) >= a) || Math.abs(e) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(t) >= a) || Math.abs(t) === Number.MAX_SAFE_INTEGER);
  }
  static LinePlaneIntersectionOriginNormal(t, a, i, r, e) {
    let s = 0;
    a.Subtraction(t, this.cz);
    var a = this.cz;
    var h = a.DotProduct(r);
    if (h === 0) {
      s = -1;
      e.Reset();
      return false;
    } else {
      i.Subtraction(t, this.fz);
      if ((s = this.fz.DotProduct(r) / h) < 0 || s > 1) {
        e.Reset();
        return false;
      } else {
        t.Addition(a.Multiply(s, this.pz), e);
        return true;
      }
    }
  }
  static IsLocationInsideCone(t, a, i, r, e) {
    e.Subtraction(t, this.cz);
    e = this.DotProduct(this.cz, a);
    return !(e < 0) && !(i < e) && (t = e / i * r, a.Multiply(e, this.fz), this.cz.Subtraction(this.fz, this.fz), this.fz.SizeSquared() <= t * t);
  }
  static SqInterpToVector(t, a, i, r) {
    var e = Math.acos(t.DotProduct(a)) * MathUtils.RadToDeg;
    if (e < i) {
      r.DeepCopy(a);
    } else {
      Quat_1.Quat.FindBetween(t, a, this.az);
      Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, this.az, i / e, this.az);
      this.az.RotateVector(t, r);
    }
  }
  static SqLerpVector(t, a, i, r) {
    Quat_1.Quat.FindBetween(t, a, this.az);
    Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, this.az, i, this.az);
    this.az.RotateVector(t, r);
  }
  static ClampAngle(t, a, i) {
    var i = Rotator_1.Rotator.ClampAxis(i - a) * 0.5;
    var a = Rotator_1.Rotator.ClampAxis(a + i);
    var r = Rotator_1.Rotator.NormalizeAxis(t - a);
    if (i < r) {
      return Rotator_1.Rotator.NormalizeAxis(a + i);
    } else if (r < -i) {
      return Rotator_1.Rotator.NormalizeAxis(a - i);
    } else {
      return Rotator_1.Rotator.NormalizeAxis(t);
    }
  }
  static CheckNanObject(t, a = 100) {
    const s = new WeakMap();
    let h = false;
    const n = [];
    (function i(t, r, e) {
      if (!(a <= e) && t !== undefined && (typeof t == "object" || typeof t == "number") && !s.has(t)) {
        if (typeof t == "number") {
          if (!MathUtils.IsValidNumber(t)) {
            h = true;
            n.push(r.join(".") + ": " + t.toString());
          }
        } else {
          if (t instanceof Vector_1.Vector) {
            if (!MathUtils.IsValidVector(t, MAX_INVALID_NUMBER)) {
              h = true;
              n.push(r.join(".") + ": " + t.ToString());
            }
          } else if (t instanceof Rotator_1.Rotator) {
            if (!MathUtils.IsValidRotator(t, MAX_INVALID_NUMBER)) {
              h = true;
              n.push(r.join(".") + ": " + t.ToString());
            }
          } else if (t instanceof Quat_1.Quat) {
            if (!MathUtils.IsValidQuat(t, MAX_INVALID_NUMBER)) {
              h = true;
              n.push(r.join(".") + ": " + t.ToString());
            }
          }
          s.set(t, true);
          if (Array.isArray(t)) {
            t.forEach((t, a) => {
              i(t, [...r, `[${a}]`], e + 1);
            });
          } else {
            Object.entries(t).forEach(([t, a]) => {
              i(a, [...r, t], e + 1);
            });
          }
        }
      }
    })(t, [], 0);
    return [h, n];
  }
  static Shuffle(a) {
    for (let t = a.length - 1; t > 0; t--) {
      var i = Math.floor(Math.random() * (t + 1));
      [a[t], a[i]] = [a[i], a[t]];
    }
    return a;
  }
  static BoxUnion(t, a) {
    if (t.IsValid) {
      t.Min = new UE.Vector(Math.min(t.Min.X, a.X), Math.min(t.Min.Y, a.Y), Math.min(t.Min.Z, a.Z));
      t.Max = new UE.Vector(Math.max(t.Max.X, a.X), Math.max(t.Max.Y, a.Y), Math.max(t.Max.Z, a.Z));
    } else {
      t.Min = a;
      t.Max = a;
      t.IsValid = 1;
    }
    return t;
  }
  static BoxSphereBoundsUnion(t, a) {
    var i = new UE.Box();
    var i = MathUtils.BoxUnion(i, t.Origin.op_Subtraction(t.BoxExtent));
    i = MathUtils.BoxUnion(i, t.Origin.op_Addition(t.BoxExtent));
    i = MathUtils.BoxUnion(i, a.Origin.op_Subtraction(a.BoxExtent));
    i = MathUtils.BoxUnion(i, a.Origin.op_Addition(a.BoxExtent));
    var r = new UE.BoxSphereBounds();
    r.BoxExtent = i.Max.op_Subtraction(i.Min).op_Multiply(0.5);
    r.Origin = i.Min.op_Addition(r.BoxExtent);
    r.SphereRadius = r.BoxExtent.Size();
    r.SphereRadius = Math.min(r.SphereRadius, Math.max(t.Origin.op_Subtraction(r.Origin).Size() + t.SphereRadius, a.Origin.op_Subtraction(r.Origin).Size() + a.SphereRadius));
    return r;
  }
  static IsInSideBox(t, a) {
    return a.X > t.Min.X && a.X < t.Max.X && a.Y > t.Min.Y && a.Y < t.Max.Y && a.Z > t.Min.Z && a.Z < t.Max.Z;
  }
  static BoxSphereBoundsGetBox(t) {
    return new UE.Box(t.Origin.op_Subtraction(t.BoxExtent), t.Origin.op_Addition(t.BoxExtent), 1);
  }
  static IsInsideSphere(t, a, i, r = MathCommon_1.MathCommon.KindaSmallNumber) {
    return t.op_Subtraction(i).SizeSquared() <= Math.pow(a + r, 2);
  }
  static IsInsideBoxSphereBounds(t, a) {
    return !!MathUtils.IsInsideSphere(t.Origin, t.SphereRadius, a) && MathUtils.IsInSideBox(MathUtils.BoxSphereBoundsGetBox(t), a);
  }
  static IsAngleInRange(t, a, i) {
    if (a <= i) {
      return a <= t && t <= i;
    } else {
      return a <= t || t <= i;
    }
  }
  static NormalizeDeg180(t) {
    let a = t % 360;
    if (a > 180) {
      a -= 360;
    } else if (a < -180) {
      a += 360;
    }
    return a;
  }
  static VectorDistanceSquared(t, a) {
    return Math.pow(a.X - t.X, 2) + Math.pow(a.Y - t.Y, 2) + Math.pow(a.Z - t.Z, 2);
  }
  static VectorDistance(t, a) {
    return Math.sqrt(this.VectorDistanceSquared(t, a));
  }
  static uRm() {
    let t = undefined;
    if (this.cRm.length) {
      (t = this.cRm.pop())?.Reset();
    }
    return t = t || Vector_1.Vector.Create();
  }
  static dRm(t) {
    t.Reset();
    this.cRm.push(t);
  }
  static mRm() {
    let t = undefined;
    if (this.fRm.length) {
      (t = this.fRm.pop())?.Reset();
    }
    return t = t || Rotator_1.Rotator.Create();
  }
  static gRm(t) {
    t.Reset();
    this.fRm.push(t);
  }
  static ExecWithTmpVectorAndRotator(a, i, t) {
    var r = [];
    var e = [];
    for (let t = 0; t < a; t++) {
      r.push(this.uRm());
    }
    for (let t = 0; t < i; t++) {
      e.push(this.mRm());
    }
    t(r, e);
    for (let t = 0; t < a; t++) {
      this.dRm(r[t]);
    }
    for (let t = 0; t < i; t++) {
      this.gRm(e[t]);
    }
  }
  static GetSpiralGrid(t, a) {
    let i = t;
    if (i >= a) {
      i %= a;
    }
    var r = Math.ceil((Math.sqrt(a) + 1) / 2);
    let e = 0;
    let s = 0;
    while (e < r) {
      let t = 0;
      t = e === 0 ? 1 : e * 8;
      if (i < s + t) {
        break;
      }
      s += t;
      e += 1;
    }
    var h;
    var t = i - s;
    let n = 0;
    let o = 0;
    if (e === 0) {
      n = 0;
      o = 0;
    } else {
      h = t % (a = e * 2);
      if ((t = Math.floor(t / a)) === 0) {
        n = -e + h;
        o = -e;
      } else if (t === 1) {
        n = e;
        o = -e + h;
      } else if (t === 2) {
        n = e - h;
        o = e;
      } else if (t === 3) {
        n = -e;
        o = e - h;
      }
    }
    return new Vector2D_1.Vector2D(n, o);
  }
  static GetSequentialGrid(t, a = 25, i = 5) {
    let r = t % a;
    if (r < 0) {
      r += a;
    }
    return new Vector2D_1.Vector2D(r % i, Math.floor(r / i));
  }
  static GenerateUniqueRandomNumbers(a = 0, i = 30) {
    if (i < a) {
      [a, i] = [i, a];
    }
    var r = [];
    for (let t = a; t <= i; t++) {
      r.push(t);
    }
    for (let t = r.length - 1; t > 0; t--) {
      var e = Math.floor(Math.random() * (t + 1));
      [r[t], r[e]] = [r[e], r[t]];
    }
    return r;
  }
  static GetGravityPointOfPoints(t) {
    if (t.length === 0) {
      return Vector_1.Vector.Create(0, 0, 0);
    }
    var a = Vector_1.Vector.Create(0, 0, 0);
    for (const i of t) {
      a.X += i.X;
      a.Y += i.Y;
      a.Z += i.Z;
    }
    a.X /= t.length;
    a.Y /= t.length;
    a.Z /= t.length;
    return a;
  }
  static GetCenterOfPoints(t) {
    this.cz.DeepCopy(t[0]);
    this.fz.DeepCopy(t[0]);
    var a = this.cz;
    var i = this.fz;
    for (const r of t) {
      a.X = Math.min(a.X, r.X);
      a.Y = Math.min(a.Y, r.Y);
      a.Z = Math.min(a.Z, r.Z);
      i.X = Math.max(i.X, r.X);
      i.Y = Math.max(i.Y, r.Y);
      i.Z = Math.max(i.Z, r.Z);
    }
    return Vector_1.Vector.Create((a.X + i.X) / 2, (a.Y + i.Y) / 2, (a.Z + i.Z) / 2);
  }
  static GetNextPointWithDistance(t, a, i) {
    var t = Vector_1.Vector.Create(t);
    var r = this.cz;
    r.DeepCopy(a);
    r.SubtractionEqual(t).Normalize();
    return t.AdditionEqual(r.MultiplyEqual(i));
  }
}
(exports.MathUtils = MathUtils).MaxFloat = 3.402823466e+38;
MathUtils.Int32Max = 2147483647;
MathUtils.Int16Max = 32767;
MathUtils.SmallNumber = 1e-8;
MathUtils.KindaSmallNumber = 0.0001;
MathUtils.LargeNumber = 1e+50;
MathUtils.MillisecondToSecond = 0.001;
MathUtils.SecondToMillisecond = 1000;
MathUtils.CircumradiusRatio = 4;
MathUtils.RadToDeg = exports.PI_DEG / Math.PI;
MathUtils.DegToRad = Math.PI / exports.PI_DEG;
MathUtils.DefaultTransform = new UE.Transform();
MathUtils.DefaultTransformDouble = new UE.TransformDouble();
MathUtils.DefaultTransformProxy = Transform_1.Transform.Create();
MathUtils.cz = Vector_1.Vector.Create();
MathUtils.fz = Vector_1.Vector.Create();
MathUtils.pz = Vector_1.Vector.Create();
MathUtils.CommonTempVector = Vector_1.Vector.Create();
MathUtils.CommonTempRotator = Rotator_1.Rotator.Create();
MathUtils.CommonTempQuat = Quat_1.Quat.Create();
MathUtils.az = Quat_1.Quat.Create();
MathUtils.cRm = [];
MathUtils.fRm = []; //# sourceMappingURL=MathUtils.js.map