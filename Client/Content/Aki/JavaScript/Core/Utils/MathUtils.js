"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MathUtils = exports.FastUeFloatRange = exports.INT_BIT = exports.intBit = exports.PI_DEG_DOUBLE = exports.PI_DEG = void 0;
const UE = require("ue"),
  Long = require("../../Core/Define/Net/long"),
  Stack_1 = require("../Container/Stack"),
  MathCommon_1 = require("./Math/MathCommon"),
  Quat_1 = require("./Math/Quat"),
  Rotator_1 = require("./Math/Rotator"),
  Transform_1 = require("./Math/Transform"),
  Vector_1 = require("./Math/Vector"),
  MAX_INVALID_NUMBER = (exports.PI_DEG = 180, exports.PI_DEG_DOUBLE = 2 * exports.PI_DEG, exports.intBit = 32n, exports.INT_BIT = 32, 999999999);
class FastUeFloatRange {
  constructor(t) {
    this.LowerBoundValue = 0, this.UpperBoundValue = 0, this.LowerBoundValue = t.LowerBound.Value, this.UpperBoundValue = t.UpperBound.Value, this.LowerBoundType = t.LowerBound.Type, this.UpperBoundType = t.UpperBound.Type
  }
}
exports.FastUeFloatRange = FastUeFloatRange;
class MathUtils {
  static IsNearlyEqual(t, i, a = this.SmallNumber) {
    return Math.abs(t - i) <= a
  }
  static IsNearlyZero(t, i = this.SmallNumber) {
    return Math.abs(t) <= i
  }
  static IsAngleNearEqual(t, i, a = MathCommon_1.MathCommon.KindaSmallNumber) {
    return Math.abs(MathUtils.WrapAngle(t - i)) <= a
  }
  static Clamp(t, i, a) {
    return MathCommon_1.MathCommon.Clamp(t, i, a)
  }
  static GetRangePct(t, i, a) {
    var s = i - t;
    return this.IsNearlyZero(s) ? i <= a ? 1 : 0 : (a - t) / s
  }
  static RangeClamp(t, i, a, s, r) {
    i = this.Clamp(this.GetRangePct(i, a, t), 0, 1);
    return this.Lerp(s, r, i)
  }
  static Lerp(t, i, a) {
    return t * (1 - a) + i * a
  }
  static InverseLerp(t, i, a) {
    return Math.max(0, Math.min(1, (t - i) / (a - i)))
  }
  static LerpCubic(t, i, a, s, r) {
    var e = r * r,
      h = e * r;
    return (2 * h - 3 * e + 1) * t + (h - 2 * e + r) * i + (h - e) * s + (-2 * h + 3 * e) * a
  }
  static LerpSin(t, i, a) {
    a = Math.sin(a * Math.PI / 2);
    return t * (1 - a) + i * a
  }
  static LerpVectorOld(t, i, a, s = void 0) {
    a = this.Clamp(a, 0, 1);
    return s ? (s.X = this.Lerp(t.X, i.X, a), s.Y = this.Lerp(t.Y, i.Y, a), s.Z = this.Lerp(t.Z, i.Z, a), s) : new UE.Vector(this.Lerp(t.X, i.X, a), this.Lerp(t.Y, i.Y, a), this.Lerp(t.Z, i.Z, a))
  }
  static LerpVector(t, i, a, s = void 0) {
    a = this.Clamp(a, 0, 1);
    return s ? (s.X = this.Lerp(t.X, i.X, a), s.Y = this.Lerp(t.Y, i.Y, a), s.Z = this.Lerp(t.Z, i.Z, a), s) : new UE.VectorDouble(this.Lerp(t.X, i.X, a), this.Lerp(t.Y, i.Y, a), this.Lerp(t.Z, i.Z, a))
  }
  static LerpDirect2dByMaxAngle(t, i, a, s, r, e) {
    var h = MathUtils.GetAngleByVector2D(t),
      n = MathUtils.GetAngleByVector2D(i),
      t = Math.asin(t.Z) * MathUtils.RadToDeg,
      i = Math.asin(i.Z) * MathUtils.RadToDeg * a;
    let o = n - h;
    for (; 180 < o;) o -= 360;
    for (; 180 < -o;) o += 360;
    r && (o = 0 < o ? o - 360 : o + 360);
    let M = i - t;
    a = Math.sqrt(o * o + M * M), s < a && (o *= s / a, M *= s / a), n = h + o, r = (t + M) * MathUtils.DegToRad, e.Z = Math.sin(r), i = Math.cos(r);
    e.X = Math.cos(n * MathUtils.DegToRad) * i, e.Y = Math.sin(n * MathUtils.DegToRad) * i
  }
  static InterpTo(t, i, a, s) {
    var r = i - t;
    return Math.abs(r) < MathCommon_1.MathCommon.KindaSmallNumber ? i : t + r * this.Clamp(a * s, 0, 1)
  }
  static InterpConstantTo(t, i, a, s) {
    var r = i - t;
    return Math.abs(r) < MathCommon_1.MathCommon.KindaSmallNumber ? i : t + this.Clamp(r, -(i = a * s), i)
  }
  static VectorInterpTo(t, i, a, s, r) {
    i.Subtraction(t, this.cz), this.cz.MultiplyEqual(this.Clamp(a * s, 0, 1)), this.cz.Addition(t, r)
  }
  static RotatorInterpTo(t, i, a, s, r) {
    s <= 0 ? r.DeepCopy(i) : (s *= a, r.Pitch = i.Pitch - t.Pitch, r.Yaw = i.Yaw - t.Yaw, r.Roll = i.Roll - t.Roll, MathCommon_1.MathCommon.VectorNormalizeRotator(r), r.Pitch = 1 <= s ? r.Pitch : r.Pitch * s, r.Yaw = 1 <= s ? r.Yaw : r.Yaw * s, r.Roll = 1 <= s ? r.Roll : r.Roll * s, r.Pitch += t.Pitch, r.Yaw += t.Yaw, r.Roll += t.Roll, MathCommon_1.MathCommon.VectorNormalizeRotator(r))
  }
  static RotatorAxisInterpTo(t, i, a, s) {
    return s <= 0 ? i : (s = s * a, a = MathCommon_1.MathCommon.WrapAngle(i - t), a = 1 <= s ? a : a * s, a += t, MathCommon_1.MathCommon.WrapAngle(a))
  }
  static RotatorInterpConstantTo(t, i, a, s, r) {
    a <= 0 || s <= 0 ? r.DeepCopy(t) : (s *= a, r.Pitch = i.Pitch - t.Pitch, r.Yaw = i.Yaw - t.Yaw, r.Roll = i.Roll - t.Roll, MathCommon_1.MathCommon.VectorNormalizeRotator(r), r.Pitch = this.Clamp(r.Pitch, -s, s), r.Yaw = this.Clamp(r.Yaw, -s, s), r.Roll = this.Clamp(r.Roll, -s, s), r.Pitch += t.Pitch, r.Yaw += t.Yaw, r.Roll += t.Roll, MathCommon_1.MathCommon.VectorNormalizeRotator(r))
  }
  static RotatorInterpConstantToAvoid(t, i, a, s, r, e) {
    s <= 0 || r <= 0 ? e.DeepCopy(t) : (r *= s, e.Pitch = i.Pitch - t.Pitch, e.Yaw = i.Yaw - t.Yaw, e.Roll = i.Roll - t.Roll, MathCommon_1.MathCommon.VectorNormalizeRotator(e), e.Pitch = this.Clamp(e.Pitch, -r, r), e.Yaw = this.Clamp(e.Yaw, -r, r), e.Roll = this.Clamp(e.Roll, -r, r), e.Pitch += t.Pitch, e.Yaw += t.Yaw, e.Roll += t.Roll, MathCommon_1.MathCommon.VectorNormalizeRotator(e))
  }
  static GetRandomFloatNumber(t, i) {
    return t + (i - t) * Math.random()
  }
  static GetRandomVector(t, i) {
    var a = new UE.Vector;
    return a.X = MathUtils.GetRandomFloatNumber(t, i), a.Y = MathUtils.GetRandomFloatNumber(t, i), a.Z = MathUtils.GetRandomFloatNumber(t, i), a
  }
  static GetRandomVector2d(t, i) {
    var a = new UE.Vector2D;
    return a.X = MathUtils.GetRandomFloatNumber(t, i), a.Y = MathUtils.GetRandomFloatNumber(t, i), a
  }
  static GetAngleByVector2D(t) {
    let i = 0;
    return (i = (t instanceof UE.Vector ? (this.cz.FromUeVector(t), this.cz) : t).HeadingAngle()) * this.RadToDeg
  }
  static GetUeVector2dByAngle(t) {
    t *= this.DegToRad;
    return new UE.Vector(Math.cos(t), Math.sin(t), 0)
  }
  static GetVector2dByAngle(t, i) {
    t *= this.DegToRad;
    i.X = Math.cos(t), i.Y = Math.sin(t)
  }
  static InRange(t, i) {
    return t >= i.Min && t <= i.Max
  }
  static InRangeArray(t, i) {
    return t >= i[0] && t <= i[1]
  }
  static InRangeAngle(t, i) {
    let a = t;
    for (; a + 360 <= i.Max;) a += 360;
    for (; a - 360 >= i.Min;) a -= 360;
    return this.InRange(a, i)
  }
  static InRangeAngleArray(t, i) {
    let a = t;
    for (; a + 360 <= i[1];) a += 360;
    for (; a - 360 >= i[0];) a -= 360;
    return this.InRangeArray(a, i)
  }
  static InUeRange(t, i) {
    return (0 === i.LowerBound.Type ? t > i.LowerBound.Value : t >= i.LowerBound.Value) && (0 === i.UpperBound.Type ? t < i.UpperBound.Value : t <= i.UpperBound.Value)
  }
  static InFastUeRange(t, i) {
    return (0 === i.LowerBoundType ? t > i.LowerBoundValue : t >= i.LowerBoundValue) && (0 === i.UpperBoundType ? t < i.UpperBoundValue : t <= i.UpperBoundValue)
  }
  static InUeRangeAngle(t, i) {
    let a = t;
    for (; a + 360 <= i.UpperBound.Value;) a += 360;
    for (; a - 360 >= i.LowerBound.Value;) a -= 360;
    return this.InUeRange(a, i)
  }
  static InFastUeRangeAngle(t, i) {
    let a = t;
    for (; a + 360 <= i.UpperBoundValue;) a += 360;
    for (; a - 360 >= i.LowerBoundValue;) a -= 360;
    return this.InFastUeRange(a, i)
  }
  static LocationInRangeArray(t, i, a, s, r, e, h) {
    this.InverseTransformPositionNoScale(t, i, a, this.cz);
    t = this.cz.Z;
    return !!this.InRangeArray(t, h) && (i = this.cz.Size2D() - s, !!this.InRangeArray(i, r)) && (a = MathUtils.GetAngleByVector2D(this.cz), this.InRangeAngleArray(a, e))
  }
  static LocationInUeRange(t, i, a, s, r, e, h) {
    this.InverseTransformPositionNoScale(t, i, a, this.cz);
    t = this.cz.Z;
    return !!this.InUeRange(t, h) && (i = this.cz.Size2D() - s, !!this.InUeRange(i, r)) && (a = MathUtils.GetAngleByVector2D(this.cz), this.InUeRangeAngle(a, e))
  }
  static LocationInFastUeRange(t, i, a, s, r, e, h) {
    this.InverseTransformPositionNoScale(t, i, a, this.cz);
    t = this.cz.Z;
    return !!this.InFastUeRange(t, h) && (i = Math.max(MathUtils.SmallNumber, this.cz.Size2D() - s), !!this.InFastUeRange(i, r)) && (a = MathUtils.GetAngleByVector2D(this.cz), this.InFastUeRangeAngle(a, e))
  }
  static GetFloatPointFloor(t, i = 0) {
    i = Math.pow(10, i), t *= i, t = Math.floor(t);
    return t /= i
  }
  static GetRoundToNDecimalPlaces(t, i) {
    i = Math.pow(10, i);
    return Math.round(t * i) / i
  }
  static GetFloatPointFloorString(t, i = 0) {
    return MathUtils.GetFloatPointFloor(t, i).toFixed(i)
  }
  static SafeDivide(t, i) {
    return 0 !== i ? t / i : 0
  }
  static LongToBigInt(t) {
    if ("number" == typeof t) {
      const a = BigInt(t);
      return a
    }
    var i = BigInt(t.low >>> 0);
    const a = BigInt(t.high) << exports.intBit | i;
    return a
  }
  static LongToNumber(t) {
    var i;
    return "number" == typeof t ? t : (i = BigInt(t.low >>> 0), t = BigInt(t.high) << exports.intBit | i, Number(t))
  }
  static NumberToLong(t) {
    t = BigInt(t);
    return Long.fromBigInt(t)
  }
  static BigIntToLong(t) {
    return Long.fromBigInt(t)
  }
  static GetRandomRange(t, i) {
    i -= t;
    return t + Math.random() * i
  }
  static BlendEaseIn(t, i, a, s) {
    return t + (i - t) * this.Lerp(0, 1, Math.pow(a, s))
  }
  static StandardizingPitch(t) {
    return 180 < t ? t - 360 : t < -180 ? t + 360 : t
  }
  static WrapAngle(t) {
    return MathCommon_1.MathCommon.WrapAngle(t)
  }
  static GetAngleByVectorDot(t, i) {
    t = this.DotProduct(t, i);
    return Math.acos(MathCommon_1.MathCommon.Clamp(t, -1, 1)) * this.RadToDeg
  }
  static GetAngleByVectorDotWithSign(t, i) {
    var a = this.GetAngleByVectorDot(t, i);
    return t.X * i.Y - t.Y * i.X < 0 ? -a : a
  }
  static DotProduct(t, i) {
    return t.X * i.X + t.Y * i.Y + t.Z * i.Z
  }
  static ComposeRotator(t, i, a) {
    t = t.Quaternion(), i = i.Quaternion();
    a instanceof Quat_1.Quat ? i.Multiply(t, a) : a instanceof Rotator_1.Rotator && (i.Multiply(t, this.az), this.az.Rotator(a))
  }
  static VectorToRotator(t, i) {
    return i.Yaw = Math.atan2(t.Y, t.X) * this.RadToDeg, i.Pitch = Math.atan2(t.Z, Math.sqrt(t.X * t.X + t.Y * t.Y)) * this.RadToDeg, i.Roll = 0, i
  }
  static RotatorToVector(t, i) {
    var a = MathCommon_1.MathCommon.WrapAngle(t.Pitch),
      t = MathCommon_1.MathCommon.WrapAngle(t.Yaw),
      a = MathCommon_1.MathCommon.DegreeToRadian(a),
      t = MathCommon_1.MathCommon.DegreeToRadian(t),
      s = Math.cos(a),
      a = Math.sin(a),
      r = Math.cos(t),
      t = Math.sin(t);
    return i.X = s * r, i.Y = s * t, i.Z = a, i
  }
  static Bisection(t, i, a, s) {
    let r = i,
      e = a;
    for (; e - r > s;) {
      var h = (r + e) / 2;
      t(h) ? e = h : r = h + s
    }
    return r
  }
  static Square(t) {
    return t * t
  }
  static TransformPosition(t, i, a, s, r) {
    a.Multiply(s, r), i.Quaternion().RotateVector(r, r), t.Addition(r, r)
  }
  static TransformPositionNoScale(t, i, a, s) {
    i.Quaternion().RotateVector(a, s), t.Addition(s, s)
  }
  static InverseTransformPosition(t, i, a, s, r) {
    s.Subtraction(t, r), i.Quaternion(this.az), this.az.Inverse(this.az), this.az.RotateVector(r, r), a.Multiply(r, r)
  }
  static InverseTransformPositionNoScale(t, i, a, s) {
    a.Subtraction(t, s), i.Quaternion(this.az), this.az.Inverse(this.az), this.az.RotateVector(s, s)
  }
  static mz() {
    return this.dz || (this.dz = new Array(3), this.dz[0] = new Array(3), this.dz[1] = new Array(3), this.dz[2] = new Array(3)), this.dz
  }
  static Cz() {
    return this.gz || (this.gz = new Array(3)), this.gz
  }
  static LookRotation(i, a, s, r) {
    let e = i.X + a.Y + s.Z;
    if (0 < e) {
      e += 1;
      var h = .5 / Math.sqrt(e),
        n = h * e,
        o = (a.Z - s.Y) * h,
        M = (s.X - i.Z) * h,
        h = (i.Y - a.X) * h;
      r.Set(o, M, h, n)
    } else {
      o = this.mz(), M = (o[0][0] = i.X, o[0][1] = a.X, o[0][2] = s.X, o[1][0] = i.Y, o[1][1] = a.Y, o[1][2] = s.Y, o[2][0] = i.Z, o[2][1] = a.Z, o[2][2] = s.Z, this.Cz());
      let t = 0;
      a.Y > i.Y && (t = 1);
      h = ((t = s.Z > o[t][t] ? 2 : t) + 1) % 3, n = (1 + h) % 3, a = (e = o[t][t] - o[h][h] - o[n][n] + 1, .5 / Math.sqrt(e)), i = (M[t] = a * e, (o[n][h] - o[h][n]) * a);
      M[h] = (o[h][t] + o[t][h]) * a, M[n] = (o[n][t] + o[t][n]) * a, r.Set(M[0], M[1], M[2], i)
    }
    r.Normalize()
  }
  static LookRotationUpFirst(t, i, a) {
    var s = this.cz,
      i = (s.FromUeVector(i), s.Normalize(), this.fz),
      t = (s.CrossProduct(t, i), i.Normalize(), this.pz);
    i.CrossProduct(s, t), a instanceof Quat_1.Quat ? this.LookRotation(t, i, s, a) : a instanceof Rotator_1.Rotator && (this.LookRotation(t, i, s, this.az), this.az.Rotator(a))
  }
  static LookRotationForwardFirst(t, i, a) {
    var s = this.cz,
      t = (s.FromUeVector(t), s.Normalize(), this.fz),
      i = (i.CrossProduct(s, t), t.Normalize(), this.pz);
    s.CrossProduct(t, i), a instanceof Quat_1.Quat ? this.LookRotation(s, t, i, a) : a instanceof Rotator_1.Rotator && (this.LookRotation(s, t, i, this.az), this.az.Rotator(a))
  }
  static GetCubicValue(t) {
    return (-2 * t + 3) * t * t
  }
  static DecimalToBinary(t) {
    let i = t,
      a = "";
    if (i < 0) a = "-", i = 0 - i;
    else {
      if (0 === i) return "0";
      a = "+"
    }
    for (var s = new Stack_1.Stack; 0 < i;) s.Push(Math.floor(i % 2)), i = Math.floor(i / 2);
    var r = s.Size;
    for (let t = 0; t < r; t++) a += s.Pop().toString();
    return a
  }
  static GetObliqueTriangleAngle(t, i, a) {
    return Math.acos((t * t + i * i - a * a) / (2 * t * i))
  }
  static GetTriangleCircumradius(t, i, a) {
    var s = (t + i + a) / 2;
    return t * i * a / (this.CircumradiusRatio * Math.sqrt(s * (s - t) * (s - i) * (s - a)))
  }
  static VerticalFovToHorizontally(t, i) {
    t = Math.tan(t / 2 * MathUtils.DegToRad);
    return 2 * Math.atan(t * i) * MathUtils.RadToDeg
  }
  static HorizontalFovToVertically(t, i) {
    t = Math.tan(t / 2 * MathUtils.DegToRad);
    return 2 * Math.atan(t / i) * MathUtils.RadToDeg
  }
  static IsValidNumber(t) {
    return null != t && !isNaN(t) && !!isFinite(t)
  }
  static IsValidNumbers(t, i, a, s = 1e8) {
    return void 0 !== t && void 0 !== i && void 0 !== a && null !== t && null !== i && null !== a && !(isNaN(t) || isNaN(i) || isNaN(a) || !(isFinite(t) && isFinite(i) && isFinite(a)) || Math.abs(t) >= s && Math.abs(t) !== Number.MAX_SAFE_INTEGER || Math.abs(i) >= s && Math.abs(i) !== Number.MAX_SAFE_INTEGER || Math.abs(a) >= s && Math.abs(a) !== Number.MAX_SAFE_INTEGER)
  }
  static IsValidVector(t, i = 1e8) {
    var a, s;
    return !!t && (a = t.X, s = t.Y, t = t.Z, void 0 !== a) && void 0 !== s && void 0 !== t && null !== a && null !== s && null !== t && !(isNaN(a) || isNaN(s) || isNaN(t) || !(isFinite(a) && isFinite(s) && isFinite(t)) || Math.abs(a) >= i && Math.abs(a) !== Number.MAX_SAFE_INTEGER || Math.abs(s) >= i && Math.abs(s) !== Number.MAX_SAFE_INTEGER || Math.abs(t) >= i && Math.abs(t) !== Number.MAX_SAFE_INTEGER)
  }
  static IsValidRotator(t, i = 1e8) {
    var a, s;
    return !!t && (a = t.Roll, s = t.Pitch, t = t.Yaw, void 0 !== a) && void 0 !== s && void 0 !== t && null !== a && null !== s && null !== t && !(isNaN(a) || isNaN(s) || isNaN(t) || !(isFinite(a) && isFinite(s) && isFinite(t)) || Math.abs(a) >= i && Math.abs(a) !== Number.MAX_SAFE_INTEGER || Math.abs(s) >= i && Math.abs(s) !== Number.MAX_SAFE_INTEGER || Math.abs(t) >= i && Math.abs(t) !== Number.MAX_SAFE_INTEGER)
  }
  static IsValidQuat(t, i = 1e8) {
    var a, s, r;
    return !!t && (a = t.X, s = t.Y, r = t.Z, t = t.W, void 0 !== a) && void 0 !== s && void 0 !== r && void 0 !== t && null !== a && null !== s && null !== r && !(isNaN(a) || isNaN(s) || isNaN(r) || isNaN(t) || !(isFinite(a) && isFinite(s) && isFinite(r) && isFinite(t)) || Math.abs(a) >= i && Math.abs(a) !== Number.MAX_SAFE_INTEGER || Math.abs(s) >= i && Math.abs(s) !== Number.MAX_SAFE_INTEGER || Math.abs(r) >= i && Math.abs(r) !== Number.MAX_SAFE_INTEGER || Math.abs(t) >= i && Math.abs(t) !== Number.MAX_SAFE_INTEGER)
  }
  static LinePlaneIntersectionOriginNormal(t, i, a, s, r) {
    let e = 0;
    i.Subtraction(t, this.cz);
    var i = this.cz,
      h = i.DotProduct(s);
    return 0 === h ? (e = -1, r.Reset(), !1) : (a.Subtraction(t, this.fz), (e = this.fz.DotProduct(s) / h) < 0 || 1 < e ? (r.Reset(), !1) : (t.Addition(i.Multiply(e, this.pz), r), !0))
  }
  static IsLocationInsideCone(t, i, a, s, r) {
    r.Subtraction(t, this.cz);
    r = this.DotProduct(this.cz, i);
    return !(r < 0 || a < r) && (t = r / a * s, i.Multiply(r, this.fz), this.cz.Subtraction(this.fz, this.fz), this.fz.SizeSquared() <= t * t)
  }
  static SqInterpToVector(t, i, a, s) {
    var r = Math.acos(t.DotProduct(i)) * MathUtils.RadToDeg;
    r < a ? s.DeepCopy(i) : (Quat_1.Quat.FindBetween(t, i, this.az), Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, this.az, a / r, this.az), this.az.RotateVector(t, s))
  }
  static SqLerpVector(t, i, a, s) {
    Quat_1.Quat.FindBetween(t, i, this.az), Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, this.az, a, this.az), this.az.RotateVector(t, s)
  }
  static ClampAngle(t, i, a) {
    var a = .5 * Rotator_1.Rotator.ClampAxis(a - i),
      i = Rotator_1.Rotator.ClampAxis(i + a),
      s = Rotator_1.Rotator.NormalizeAxis(t - i);
    return a < s ? Rotator_1.Rotator.NormalizeAxis(i + a) : s < -a ? Rotator_1.Rotator.NormalizeAxis(i - a) : Rotator_1.Rotator.NormalizeAxis(t)
  }
  static CheckNanObject(t, i = 100) {
    const e = new WeakMap;
    let h = !1;
    const n = [];
    return function a(t, s, r) {
      i <= r || void 0 === t || "object" != typeof t && "number" != typeof t || e.has(t) || ("number" == typeof t ? MathUtils.IsValidNumber(t) || (h = !0, n.push(s.join(".") + ": " + t.toString())) : (t instanceof Vector_1.Vector ? MathUtils.IsValidVector(t, MAX_INVALID_NUMBER) || (h = !0, n.push(s.join(".") + ": " + t.ToString())) : t instanceof Rotator_1.Rotator ? MathUtils.IsValidRotator(t, MAX_INVALID_NUMBER) || (h = !0, n.push(s.join(".") + ": " + t.ToString())) : t instanceof Quat_1.Quat && (MathUtils.IsValidQuat(t, MAX_INVALID_NUMBER) || (h = !0, n.push(s.join(".") + ": " + t.ToString()))), e.set(t, !0), Array.isArray(t) ? t.forEach((t, i) => {
        a(t, [...s, `[${i}]`], r + 1)
      }) : Object.entries(t).forEach(([t, i]) => {
        a(i, [...s, t], r + 1)
      })))
    }(t, [], 0), [h, n]
  }
  static Shuffle(i) {
    for (let t = i.length - 1; 0 < t; t--) {
      var a = Math.floor(Math.random() * (t + 1));
      [i[t], i[a]] = [i[a], i[t]]
    }
    return i
  }
}(exports.MathUtils = MathUtils).MaxFloat = 3402823466e29, MathUtils.Int32Max = 2147483647, MathUtils.Int16Max = 32767, MathUtils.SmallNumber = 1e-8, MathUtils.KindaSmallNumber = 1e-4, MathUtils.LargeNumber = 1e50, MathUtils.MillisecondToSecond = .001, MathUtils.SecondToMillisecond = 1e3, MathUtils.CircumradiusRatio = 4, MathUtils.RadToDeg = exports.PI_DEG / Math.PI, MathUtils.DegToRad = Math.PI / exports.PI_DEG, MathUtils.DefaultTransform = new UE.Transform, MathUtils.DefaultTransformDouble = new UE.TransformDouble, MathUtils.DefaultTransformProxy = Transform_1.Transform.Create(), MathUtils.cz = Vector_1.Vector.Create(), MathUtils.fz = Vector_1.Vector.Create(), MathUtils.pz = Vector_1.Vector.Create(), MathUtils.CommonTempVector = Vector_1.Vector.Create(), MathUtils.CommonTempRotator = Rotator_1.Rotator.Create(), MathUtils.CommonTempQuat = Quat_1.Quat.Create(), MathUtils.az = Quat_1.Quat.Create();
//# sourceMappingURL=MathUtils.js.map