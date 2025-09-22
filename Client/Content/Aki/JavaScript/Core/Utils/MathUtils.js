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
    var s = a - t;
    if (this.IsNearlyZero(s)) {
      if (a <= i) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return (i - t) / s;
    }
  }
  static RangeClamp(t, a, i, s, r) {
    a = this.Clamp(this.GetRangePct(a, i, t), 0, 1);
    return this.Lerp(s, r, a);
  }
  static Lerp(t, a, i) {
    return t * (1 - i) + a * i;
  }
  static InverseLerp(t, a, i) {
    return Math.max(0, Math.min(1, (t - a) / (i - a)));
  }
  static LerpCubic(t, a, i, s, r) {
    var e = r * r;
    var n = e * r;
    return (n * 2 - e * 3 + 1) * t + (n - e * 2 + r) * a + (n - e) * s + (n * -2 + e * 3) * i;
  }
  static LerpSin(t, a, i) {
    i = Math.sin(i * Math.PI / 2);
    return t * (1 - i) + a * i;
  }
  static LerpVectorOld(t, a, i, s = undefined) {
    i = this.Clamp(i, 0, 1);
    if (s) {
      s.X = this.Lerp(t.X, a.X, i);
      s.Y = this.Lerp(t.Y, a.Y, i);
      s.Z = this.Lerp(t.Z, a.Z, i);
      return s;
    } else {
      return new UE.Vector(this.Lerp(t.X, a.X, i), this.Lerp(t.Y, a.Y, i), this.Lerp(t.Z, a.Z, i));
    }
  }
  static LerpVector(t, a, i, s = undefined) {
    i = this.Clamp(i, 0, 1);
    if (s) {
      s.X = this.Lerp(t.X, a.X, i);
      s.Y = this.Lerp(t.Y, a.Y, i);
      s.Z = this.Lerp(t.Z, a.Z, i);
      return s;
    } else {
      return new UE.VectorDouble(this.Lerp(t.X, a.X, i), this.Lerp(t.Y, a.Y, i), this.Lerp(t.Z, a.Z, i));
    }
  }
  static LerpDirect2dByMaxAngle(t, a, i, s, r, e) {
    var n = MathUtils.GetAngleByVector2D(t);
    var h = MathUtils.GetAngleByVector2D(a);
    var t = Math.asin(t.Z) * MathUtils.RadToDeg;
    var a = Math.asin(a.Z) * MathUtils.RadToDeg * i;
    let o = h - n;
    while (o > 180) {
      o -= 360;
    }
    while (-o > 180) {
      o += 360;
    }
    if (r) {
      o = o > 0 ? o - 360 : o + 360;
    }
    let M = a - t;
    i = Math.sqrt(o * o + M * M);
    if (s < i) {
      o *= s / i;
      M *= s / i;
    }
    h = n + o;
    r = (t + M) * MathUtils.DegToRad;
    e.Z = Math.sin(r);
    a = Math.cos(r);
    e.X = Math.cos(h * MathUtils.DegToRad) * a;
    e.Y = Math.sin(h * MathUtils.DegToRad) * a;
  }
  static InterpTo(t, a, i, s) {
    var r = a - t;
    if (Math.abs(r) < MathCommon_1.MathCommon.KindaSmallNumber) {
      return a;
    } else {
      return t + r * this.Clamp(i * s, 0, 1);
    }
  }
  static InterpConstantTo(t, a, i, s) {
    var r = a - t;
    if (Math.abs(r) < MathCommon_1.MathCommon.KindaSmallNumber) {
      return a;
    } else {
      return t + this.Clamp(r, -(a = i * s), a);
    }
  }
  static VectorInterpTo(t, a, i, s, r) {
    a.Subtraction(t, this.cz);
    this.cz.MultiplyEqual(this.Clamp(i * s, 0, 1));
    this.cz.Addition(t, r);
  }
  static RotatorInterpTo(t, a, i, s, r) {
    if (s <= 0) {
      r.DeepCopy(a);
    } else {
      s *= i;
      r.Pitch = a.Pitch - t.Pitch;
      r.Yaw = a.Yaw - t.Yaw;
      r.Roll = a.Roll - t.Roll;
      MathCommon_1.MathCommon.VectorNormalizeRotator(r);
      r.Pitch = s >= 1 ? r.Pitch : r.Pitch * s;
      r.Yaw = s >= 1 ? r.Yaw : r.Yaw * s;
      r.Roll = s >= 1 ? r.Roll : r.Roll * s;
      r.Pitch += t.Pitch;
      r.Yaw += t.Yaw;
      r.Roll += t.Roll;
      MathCommon_1.MathCommon.VectorNormalizeRotator(r);
    }
  }
  static RotatorAxisInterpTo(t, a, i, s) {
    if (s <= 0) {
      return a;
    } else {
      s = s * i;
      i = MathCommon_1.MathCommon.WrapAngle(a - t);
      i = s >= 1 ? i : i * s;
      i += t;
      return MathCommon_1.MathCommon.WrapAngle(i);
    }
  }
  static RotatorInterpConstantTo(t, a, i, s, r) {
    if (i <= 0 || s <= 0) {
      r.DeepCopy(t);
    } else {
      s *= i;
      r.Pitch = a.Pitch - t.Pitch;
      r.Yaw = a.Yaw - t.Yaw;
      r.Roll = a.Roll - t.Roll;
      MathCommon_1.MathCommon.VectorNormalizeRotator(r);
      r.Pitch = this.Clamp(r.Pitch, -s, s);
      r.Yaw = this.Clamp(r.Yaw, -s, s);
      r.Roll = this.Clamp(r.Roll, -s, s);
      r.Pitch += t.Pitch;
      r.Yaw += t.Yaw;
      r.Roll += t.Roll;
      MathCommon_1.MathCommon.VectorNormalizeRotator(r);
    }
  }
  static RotatorInterpConstantToAvoid(t, a, i, s, r, e) {
    if (s <= 0 || r <= 0) {
      e.DeepCopy(t);
    } else {
      r *= s;
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
  static LocationInRangeArray(t, a, i, s, r, e, n) {
    this.InverseTransformPositionNoScale(t, a, i, this.cz);
    t = this.cz.Z;
    return !!this.InRangeArray(t, n) && (a = this.cz.Size2D() - s, !!this.InRangeArray(a, r)) && (i = MathUtils.GetAngleByVector2D(this.cz), this.InRangeAngleArray(i, e));
  }
  static LocationInUeRange(t, a, i, s, r, e, n) {
    this.InverseTransformPositionNoScale(t, a, i, this.cz);
    t = this.cz.Z;
    return !!this.InUeRange(t, n) && (a = this.cz.Size2D() - s, !!this.InUeRange(a, r)) && (i = MathUtils.GetAngleByVector2D(this.cz), this.InUeRangeAngle(i, e));
  }
  static LocationInFastUeRange(t, a, i, s, r, e, n) {
    this.InverseTransformPositionNoScale(t, a, i, this.cz);
    t = this.cz.Z;
    return !!this.InFastUeRange(t, n) && (a = Math.max(MathUtils.SmallNumber, this.cz.Size2D() - s), !!this.InFastUeRange(a, r)) && (i = MathUtils.GetAngleByVector2D(this.cz), this.InFastUeRangeAngle(i, e));
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
  static BlendEaseIn(t, a, i, s) {
    return t + (a - t) * this.Lerp(0, 1, Math.pow(i, s));
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
    t = this.DotProduct(t, a);
    return Math.acos(MathCommon_1.MathCommon.Clamp(t, -1, 1)) * this.RadToDeg;
  }
  static GetAngleByVectorDotWithSign(t, a) {
    var i = this.GetAngleByVectorDot(t, a);
    if (t.X * a.Y - t.Y * a.X < 0) {
      return -i;
    } else {
      return i;
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
    var s = Math.cos(i);
    var i = Math.sin(i);
    var r = Math.cos(t);
    var t = Math.sin(t);
    a.X = s * r;
    a.Y = s * t;
    a.Z = i;
    return a;
  }
  static Bisection(t, a, i, s) {
    let r = a;
    let e = i;
    while (e - r > s) {
      var n = (r + e) / 2;
      if (t(n)) {
        e = n;
      } else {
        r = n + s;
      }
    }
    return r;
  }
  static Square(t) {
    return t * t;
  }
  static TransformPosition(t, a, i, s, r) {
    i.Multiply(s, r);
    a.Quaternion().RotateVector(r, r);
    t.Addition(r, r);
  }
  static TransformPositionNoScale(t, a, i, s) {
    a.Quaternion().RotateVector(i, s);
    t.Addition(s, s);
  }
  static InverseTransformPosition(t, a, i, s, r) {
    s.Subtraction(t, r);
    a.Quaternion(this.az);
    this.az.Inverse(this.az);
    this.az.RotateVector(r, r);
    i.Multiply(r, r);
  }
  static InverseTransformPositionNoScale(t, a, i, s) {
    i.Subtraction(t, s);
    a.Quaternion(this.az);
    this.az.Inverse(this.az);
    this.az.RotateVector(s, s);
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
  static LookRotation(a, i, s, r) {
    let e = a.X + i.Y + s.Z;
    if (e > 0) {
      e += 1;
      var n = 0.5 / Math.sqrt(e);
      var h = n * e;
      var o = (i.Z - s.Y) * n;
      var M = (s.X - a.Z) * n;
      var n = (a.Y - i.X) * n;
      r.Set(o, M, n, h);
    } else {
      o = this.mz();
      o[0][0] = a.X;
      o[0][1] = i.X;
      o[0][2] = s.X;
      o[1][0] = a.Y;
      o[1][1] = i.Y;
      o[1][2] = s.Y;
      o[2][0] = a.Z;
      o[2][1] = i.Z;
      o[2][2] = s.Z;
      M = this.Cz();
      let t = 0;
      if (i.Y > a.Y) {
        t = 1;
      }
      n = ((t = s.Z > o[t][t] ? 2 : t) + 1) % 3;
      h = (1 + n) % 3;
      e = o[t][t] - o[n][n] - o[h][h] + 1;
      i = 0.5 / Math.sqrt(e);
      M[t] = i * e;
      a = (o[h][n] - o[n][h]) * i;
      M[n] = (o[n][t] + o[t][n]) * i;
      M[h] = (o[h][t] + o[t][h]) * i;
      r.Set(M[0], M[1], M[2], a);
    }
    r.Normalize();
  }
  static LookRotationUpFirst(t, a, i) {
    var s = this.cz;
    s.FromUeVector(a);
    s.Normalize();
    var a = this.fz;
    s.CrossProduct(t, a);
    a.Normalize();
    var t = this.pz;
    a.CrossProduct(s, t);
    if (i instanceof Quat_1.Quat) {
      this.LookRotation(t, a, s, i);
    } else if (i instanceof Rotator_1.Rotator) {
      this.LookRotation(t, a, s, this.az);
      this.az.Rotator(i);
    }
  }
  static LookRotationForwardFirst(t, a, i) {
    var s = this.cz;
    s.FromUeVector(t);
    s.Normalize();
    var t = this.fz;
    a.CrossProduct(s, t);
    t.Normalize();
    var a = this.pz;
    s.CrossProduct(t, a);
    if (i instanceof Quat_1.Quat) {
      this.LookRotation(s, t, a, i);
    } else if (i instanceof Rotator_1.Rotator) {
      this.LookRotation(s, t, a, this.az);
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
    var s = new Stack_1.Stack();
    for (; a > 0;) {
      s.Push(Math.floor(a % 2));
      a = Math.floor(a / 2);
    }
    var r = s.Size;
    for (let t = 0; t < r; t++) {
      i += s.Pop().toString();
    }
    return i;
  }
  static GetObliqueTriangleAngle(t, a, i) {
    return Math.acos((t * t + a * a - i * i) / (t * 2 * a));
  }
  static GetTriangleCircumradius(t, a, i) {
    var s = (t + a + i) / 2;
    return t * a * i / (this.CircumradiusRatio * Math.sqrt(s * (s - t) * (s - a) * (s - i)));
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
  static IsValidNumbers(t, a, i, s = 100000000) {
    return t !== undefined && a !== undefined && i !== undefined && t !== null && a !== null && i !== null && !isNaN(t) && !isNaN(a) && !isNaN(i) && !!isFinite(t) && !!isFinite(a) && !!isFinite(i) && (!(Math.abs(t) >= s) || Math.abs(t) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(a) >= s) || Math.abs(a) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(i) >= s) || Math.abs(i) === Number.MAX_SAFE_INTEGER);
  }
  static IsValidVector(t, a = 100000000) {
    var i;
    var s;
    return !!t && (i = t.X, s = t.Y, t = t.Z, i !== undefined) && s !== undefined && t !== undefined && i !== null && s !== null && t !== null && !isNaN(i) && !isNaN(s) && !isNaN(t) && !!isFinite(i) && !!isFinite(s) && !!isFinite(t) && (!(Math.abs(i) >= a) || Math.abs(i) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(s) >= a) || Math.abs(s) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(t) >= a) || Math.abs(t) === Number.MAX_SAFE_INTEGER);
  }
  static IsValidRotator(t, a = 100000000) {
    var i;
    var s;
    return !!t && (i = t.Roll, s = t.Pitch, t = t.Yaw, i !== undefined) && s !== undefined && t !== undefined && i !== null && s !== null && t !== null && !isNaN(i) && !isNaN(s) && !isNaN(t) && !!isFinite(i) && !!isFinite(s) && !!isFinite(t) && (!(Math.abs(i) >= a) || Math.abs(i) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(s) >= a) || Math.abs(s) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(t) >= a) || Math.abs(t) === Number.MAX_SAFE_INTEGER);
  }
  static IsValidQuat(t, a = 100000000) {
    var i;
    var s;
    var r;
    return !!t && (i = t.X, s = t.Y, r = t.Z, t = t.W, i !== undefined) && s !== undefined && r !== undefined && t !== undefined && i !== null && s !== null && r !== null && !isNaN(i) && !isNaN(s) && !isNaN(r) && !isNaN(t) && !!isFinite(i) && !!isFinite(s) && !!isFinite(r) && !!isFinite(t) && (!(Math.abs(i) >= a) || Math.abs(i) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(s) >= a) || Math.abs(s) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(r) >= a) || Math.abs(r) === Number.MAX_SAFE_INTEGER) && (!(Math.abs(t) >= a) || Math.abs(t) === Number.MAX_SAFE_INTEGER);
  }
  static LinePlaneIntersectionOriginNormal(t, a, i, s, r) {
    let e = 0;
    a.Subtraction(t, this.cz);
    var a = this.cz;
    var n = a.DotProduct(s);
    if (n === 0) {
      e = -1;
      r.Reset();
      return false;
    } else {
      i.Subtraction(t, this.fz);
      if ((e = this.fz.DotProduct(s) / n) < 0 || e > 1) {
        r.Reset();
        return false;
      } else {
        t.Addition(a.Multiply(e, this.pz), r);
        return true;
      }
    }
  }
  static IsLocationInsideCone(t, a, i, s, r) {
    r.Subtraction(t, this.cz);
    r = this.DotProduct(this.cz, a);
    return !(r < 0) && !(i < r) && (t = r / i * s, a.Multiply(r, this.fz), this.cz.Subtraction(this.fz, this.fz), this.fz.SizeSquared() <= t * t);
  }
  static SqInterpToVector(t, a, i, s) {
    var r = Math.acos(t.DotProduct(a)) * MathUtils.RadToDeg;
    if (r < i) {
      s.DeepCopy(a);
    } else {
      Quat_1.Quat.FindBetween(t, a, this.az);
      Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, this.az, i / r, this.az);
      this.az.RotateVector(t, s);
    }
  }
  static SqLerpVector(t, a, i, s) {
    Quat_1.Quat.FindBetween(t, a, this.az);
    Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, this.az, i, this.az);
    this.az.RotateVector(t, s);
  }
  static ClampAngle(t, a, i) {
    var i = Rotator_1.Rotator.ClampAxis(i - a) * 0.5;
    var a = Rotator_1.Rotator.ClampAxis(a + i);
    var s = Rotator_1.Rotator.NormalizeAxis(t - a);
    if (i < s) {
      return Rotator_1.Rotator.NormalizeAxis(a + i);
    } else if (s < -i) {
      return Rotator_1.Rotator.NormalizeAxis(a - i);
    } else {
      return Rotator_1.Rotator.NormalizeAxis(t);
    }
  }
  static CheckNanObject(t, a = 100) {
    const e = new WeakMap();
    let n = false;
    const h = [];
    (function i(t, s, r) {
      if (!(a <= r) && t !== undefined && (typeof t == "object" || typeof t == "number") && !e.has(t)) {
        if (typeof t == "number") {
          if (!MathUtils.IsValidNumber(t)) {
            n = true;
            h.push(s.join(".") + ": " + t.toString());
          }
        } else {
          if (t instanceof Vector_1.Vector) {
            if (!MathUtils.IsValidVector(t, MAX_INVALID_NUMBER)) {
              n = true;
              h.push(s.join(".") + ": " + t.ToString());
            }
          } else if (t instanceof Rotator_1.Rotator) {
            if (!MathUtils.IsValidRotator(t, MAX_INVALID_NUMBER)) {
              n = true;
              h.push(s.join(".") + ": " + t.ToString());
            }
          } else if (t instanceof Quat_1.Quat) {
            if (!MathUtils.IsValidQuat(t, MAX_INVALID_NUMBER)) {
              n = true;
              h.push(s.join(".") + ": " + t.ToString());
            }
          }
          e.set(t, true);
          if (Array.isArray(t)) {
            t.forEach((t, a) => {
              i(t, [...s, `[${a}]`], r + 1);
            });
          } else {
            Object.entries(t).forEach(([t, a]) => {
              i(a, [...s, t], r + 1);
            });
          }
        }
      }
    })(t, [], 0);
    return [n, h];
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
    var s = new UE.BoxSphereBounds();
    s.BoxExtent = i.Max.op_Subtraction(i.Min).op_Multiply(0.5);
    s.Origin = i.Min.op_Addition(s.BoxExtent);
    s.SphereRadius = s.BoxExtent.Size();
    s.SphereRadius = Math.min(s.SphereRadius, Math.max(t.Origin.op_Subtraction(s.Origin).Size() + t.SphereRadius, a.Origin.op_Subtraction(s.Origin).Size() + a.SphereRadius));
    return s;
  }
  static IsInSideBox(t, a) {
    return a.X > t.Min.X && a.X < t.Max.X && a.Y > t.Min.Y && a.Y < t.Max.Y && a.Z > t.Min.Z && a.Z < t.Max.Z;
  }
  static BoxSphereBoundsGetBox(t) {
    return new UE.Box(t.Origin.op_Subtraction(t.BoxExtent), t.Origin.op_Addition(t.BoxExtent), 1);
  }
  static IsInsideSphere(t, a, i, s = MathCommon_1.MathCommon.KindaSmallNumber) {
    return t.op_Subtraction(i).SizeSquared() <= Math.pow(a + s, 2);
  }
  static IsInsideBoxSphereBounds(t, a) {
    return !!MathUtils.IsInsideSphere(t.Origin, t.SphereRadius, a) && MathUtils.IsInSideBox(MathUtils.BoxSphereBoundsGetBox(t), a);
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
MathUtils.az = Quat_1.Quat.Create(); //# sourceMappingURL=MathUtils.js.map