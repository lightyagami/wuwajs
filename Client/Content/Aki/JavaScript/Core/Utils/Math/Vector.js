"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector = undefined;
const UE = require("ue");
const Macro_1 = require("../../Preprocessor/Macro");
const MathCommon_1 = require("./MathCommon");
const Quat_1 = require("./Quat");
const VECTOR_POOL_MAX_CAPACITY = 50;
class Vector {
  constructor(t, r, h) {
    this.Tuple = [t ?? 0, r ?? 0, h ?? 0];
    this.hz = undefined;
    this.zvl = undefined;
  }
  get X() {
    return this.Tuple[0];
  }
  set X(t) {
    this.Tuple[0] = t;
  }
  get Y() {
    return this.Tuple[1];
  }
  set Y(t) {
    this.Tuple[1] = t;
  }
  get Z() {
    return this.Tuple[2];
  }
  set Z(t) {
    this.Tuple[2] = t;
  }
  ToUeVectorOld(t = false) {
    var r = this.Tuple;
    this.hz = Vector.lz.pop();
    if (this.hz === undefined) {
      this.hz = new UE.Vector();
    }
    this.hz.Set(r[0], r[1], r[2]);
    if (t) {
      r = this.hz;
      Vector.lz.push(this.hz);
      this.hz = undefined;
      return r;
    } else {
      return this.hz;
    }
  }
  ToUeVector(t = false) {
    var r = this.Tuple;
    this.zvl = Vector.Jvl.pop();
    if (this.zvl === undefined) {
      this.zvl = new UE.VectorDouble();
    }
    this.zvl.Set(r[0], r[1], r[2]);
    if (t) {
      r = this.zvl;
      Vector.Jvl.push(this.zvl);
      this.zvl = undefined;
      return r;
    } else {
      return this.zvl;
    }
  }
  ToString() {
    return `X=${this.Tuple[0]}, Y=${this.Tuple[1]}, Z=${this.Tuple[2]}`;
  }
  FromUeVector(t) {
    var r = this.Tuple;
    r[0] = t.X;
    r[1] = t.Y;
    r[2] = t.Z;
  }
  FromConfigVector(t) {
    var r = this.Tuple;
    r[0] = t.X ?? 0;
    r[1] = t.Y ?? 0;
    r[2] = t.Z ?? 0;
  }
  static Create(t, r, h) {
    var i = new Vector();
    if (typeof t == "number" || t === undefined) {
      i.Set(t || 0, r || 0, h || 0);
    } else if (t) {
      i.FromUeVector(t);
    }
    return i;
  }
  DotProduct(t) {
    var r = this.Tuple;
    var t = t.Tuple;
    return r[0] * t[0] + r[1] * t[1] + r[2] * t[2];
  }
  static DotProduct(t, r) {
    return t.DotProduct(r);
  }
  CrossProduct(t, r) {
    var h = this.Tuple;
    var t = t.Tuple;
    var r = r.Tuple;
    [r[0], r[1], r[2]] = [h[1] * t[2] - h[2] * t[1], h[2] * t[0] - h[0] * t[2], h[0] * t[1] - h[1] * t[0]];
  }
  CrossProductEqual(t) {
    this.CrossProduct(t, this);
    return this;
  }
  static CrossProduct(t, r, h) {
    t.CrossProduct(r, h);
  }
  DeepCopy(t) {
    var r = this.Tuple;
    r[0] = t.X;
    r[1] = t.Y;
    r[2] = t.Z;
    if (this.hz) {
      this.ToUeVectorOld();
    }
    if (this.zvl) {
      this.ToUeVector();
    }
  }
  AdditionEqual(t) {
    var r = this.Tuple;
    if (typeof t == "number") {
      r[0] += t;
      r[1] += t;
      r[2] += t;
    } else {
      t = t.Tuple;
      r[0] += t[0];
      r[1] += t[1];
      r[2] += t[2];
    }
    return this;
  }
  SubtractionEqual(t) {
    var r = this.Tuple;
    if (typeof t == "number") {
      r[0] -= t;
      r[1] -= t;
      r[2] -= t;
    } else {
      t = t.Tuple;
      r[0] -= t[0];
      r[1] -= t[1];
      r[2] -= t[2];
    }
    return this;
  }
  MultiplyEqual(t) {
    var r = this.Tuple;
    if (typeof t == "number") {
      r[0] *= t;
      r[1] *= t;
      r[2] *= t;
    } else {
      t = t.Tuple;
      r[0] *= t[0];
      r[1] *= t[1];
      r[2] *= t[2];
    }
    return this;
  }
  DivisionEqual(t) {
    var r;
    var h = this.Tuple;
    if (typeof t == "number") {
      h[0] *= r = 1 / t;
      h[1] *= r;
      h[2] *= r;
    } else {
      r = t.Tuple;
      h[0] /= r[0];
      h[1] /= r[1];
      h[2] /= r[2];
    }
    return this;
  }
  Addition(t, r) {
    var h = this.Tuple;
    var i = r.Tuple;
    if (typeof t == "number") {
      i[0] = h[0] + t;
      i[1] = h[1] + t;
      i[2] = h[2] + t;
    } else {
      t = t.Tuple;
      i[0] = h[0] + t[0];
      i[1] = h[1] + t[1];
      i[2] = h[2] + t[2];
    }
    return r;
  }
  Subtraction(t, r) {
    var h = this.Tuple;
    var i = r.Tuple;
    if (typeof t == "number") {
      i[0] = h[0] - t;
      i[1] = h[1] - t;
      i[2] = h[2] - t;
    } else {
      t = t.Tuple;
      i[0] = h[0] - t[0];
      i[1] = h[1] - t[1];
      i[2] = h[2] - t[2];
    }
    return r;
  }
  Multiply(t, r) {
    var h = this.Tuple;
    var i = r.Tuple;
    if (typeof t == "number") {
      i[0] = h[0] * t;
      i[1] = h[1] * t;
      i[2] = h[2] * t;
    } else {
      t = t.Tuple;
      i[0] = h[0] * t[0];
      i[1] = h[1] * t[1];
      i[2] = h[2] * t[2];
    }
    return r;
  }
  Division(t, r) {
    var h;
    var i = this.Tuple;
    var a = r.Tuple;
    if (typeof t == "number") {
      a[0] = i[0] * (h = 1 / t);
      a[1] = i[1] * h;
      a[2] = i[2] * h;
    } else {
      h = t.Tuple;
      a[0] = i[0] / h[0];
      a[1] = i[1] / h[1];
      a[2] = i[2] / h[2];
    }
    return r;
  }
  Equality(t) {
    var r = this.Tuple;
    var t = t.Tuple;
    return r[0] === t[0] && r[1] === t[1] && r[2] === t[2];
  }
  Inequality(t) {
    var r = this.Tuple;
    var t = t.Tuple;
    return r[0] !== t[0] || r[1] !== t[1] || r[2] !== t[2];
  }
  Equals(t, r = MathCommon_1.MathCommon.KindaSmallNumber) {
    var h = this.Tuple;
    var t = t.Tuple;
    return Math.abs(h[0] - t[0]) <= r && Math.abs(h[1] - t[1]) <= r && Math.abs(h[2] - t[2]) <= r;
  }
  AllComponentsEqual(t = MathCommon_1.MathCommon.KindaSmallNumber) {
    var r = this.Tuple;
    return !(Math.abs(r[0] - r[1]) > t) && !(Math.abs(r[0] - r[2]) > t) && !(Math.abs(r[1] - r[2]) > t);
  }
  UnaryNegation(t) {
    var r = this.Tuple;
    var t = t.Tuple;
    t[0] = -r[0];
    t[1] = -r[1];
    t[2] = -r[2];
  }
  Component(t) {
    switch (t) {
      case 0:
        return this.Tuple[0];
      case 1:
        return this.Tuple[1];
      case 2:
        return this.Tuple[2];
      default:
        return;
    }
  }
  GetComponentForAxis(t) {
    switch (t) {
      case 1:
        return this.Tuple[0];
      case 2:
        return this.Tuple[1];
      case 3:
        return this.Tuple[2];
      default:
        return 0;
    }
  }
  SetComponentForAxis(t, r) {
    switch (t) {
      case 1:
        this.Tuple[0] = r;
        break;
      case 2:
        this.Tuple[1] = r;
        break;
      case 3:
        this.Tuple[2] = r;
    }
  }
  Set(t, r, h) {
    var i = this.Tuple;
    i[0] = t;
    i[1] = r;
    i[2] = h;
    if (this.hz) {
      this.ToUeVectorOld();
    }
    if (this.zvl) {
      this.ToUeVector();
    }
  }
  GetMax() {
    var t = this.Tuple;
    return Math.max(t[0], t[1], t[2]);
  }
  GetAbsMax() {
    var t = this.Tuple;
    return Math.max(Math.abs(t[0]), Math.abs(t[1]), Math.abs(t[2]));
  }
  GetMin() {
    var t = this.Tuple;
    return Math.min(t[0], t[1], t[2]);
  }
  GetAbsMin() {
    var t = this.Tuple;
    return Math.min(Math.abs(t[0]), Math.abs(t[1]), Math.abs(t[2]));
  }
  ComponentMin(t, r) {
    var h = this.Tuple;
    var t = t.Tuple;
    var r = r.Tuple;
    r[0] = Math.min(h[0], t[0]);
    r[1] = Math.min(h[1], t[1]);
    r[2] = Math.min(h[2], t[2]);
  }
  ComponentMax(t, r) {
    var h = this.Tuple;
    var t = t.Tuple;
    var r = r.Tuple;
    r[0] = Math.max(h[0], t[0]);
    r[1] = Math.max(h[1], t[1]);
    r[2] = Math.max(h[2], t[2]);
  }
  GetAbs(t) {
    var r = this.Tuple;
    var t = t.Tuple;
    t[0] = Math.abs(r[0]);
    t[1] = Math.abs(r[1]);
    t[2] = Math.abs(r[2]);
  }
  Size() {
    return Math.sqrt(this.SizeSquared());
  }
  SizeSquared() {
    var t = this.Tuple;
    return t[0] * t[0] + t[1] * t[1] + t[2] * t[2];
  }
  Size2D() {
    return Math.sqrt(this.SizeSquared2D());
  }
  SizeSquared2D() {
    var t = this.Tuple;
    return t[0] * t[0] + t[1] * t[1];
  }
  IsNearlyZero(t = MathCommon_1.MathCommon.KindaSmallNumber) {
    var r = this.Tuple;
    return !(Math.abs(r[0]) > t) && !(Math.abs(r[1]) > t) && !(Math.abs(r[2]) > t);
  }
  IsZero() {
    var t = this.Tuple;
    return t[0] === 0 && t[1] === 0 && t[2] === 0;
  }
  IsUnit(t = MathCommon_1.MathCommon.KindaSmallNumber) {
    return Math.abs(1 - this.SizeSquared()) < t;
  }
  IsNormalized() {
    return this.IsUnit(MathCommon_1.MathCommon.ThreshVectorNormalized);
  }
  Normalize(t = MathCommon_1.MathCommon.SmallNumber) {
    var r = this.SizeSquared();
    return t < r && (t = 1 / Math.sqrt(r), this.MultiplyEqual(t), true);
  }
  GetUnsafeNormal(t) {
    var r = 1 / this.Size();
    this.Multiply(r, t);
  }
  GetUnsafeNormal2D(t) {
    var r = this.Tuple;
    var t = t.Tuple;
    var h = 1 / this.Size2D();
    t[0] = r[0] * h;
    t[1] = r[1] * h;
    t[2] = 0;
  }
  GetSafeNormal(t, r = MathCommon_1.MathCommon.SmallNumber) {
    var h = this.SizeSquared();
    if (h === 1) {
      t.DeepCopy(this);
    } else if (h < r) {
      t.Reset();
    } else {
      r = 1 / Math.sqrt(h);
      this.Multiply(r, t);
    }
  }
  GetSafeNormal2D(t, r = MathCommon_1.MathCommon.SmallNumber) {
    var h = this.Tuple;
    var i = t.Tuple;
    var a = this.SizeSquared2D();
    if (a === 1) {
      t.DeepCopy(this);
    } else if (a < r) {
      t.Reset();
    } else {
      r = 1 / Math.sqrt(a);
      i[0] = h[0] * r;
      i[1] = h[1] * r;
    }
    i[2] = 0;
  }
  ToDirectionAndLength(t) {
    var r;
    var h = this.Size();
    if (h > MathCommon_1.MathCommon.SmallNumber) {
      r = 1 / h;
      t.MultiplyEqual(this).MultiplyEqual(r);
    } else {
      t.Reset();
    }
    return h;
  }
  GetSignVector(t) {
    var r = this.Tuple;
    var t = t.Tuple;
    t[0] = MathCommon_1.MathCommon.FloatSelect(r[0], 1, -1);
    t[1] = MathCommon_1.MathCommon.FloatSelect(r[1], 1, -1);
    t[2] = MathCommon_1.MathCommon.FloatSelect(r[2], 1, -1);
  }
  Projection(t) {
    var r = this.Tuple;
    var t = t.Tuple;
    var h = 1 / r[2];
    t[0] = r[0] * h;
    t[1] = r[1] * h;
    t[2] = 1;
  }
  GridSnap(t, r) {
    var h = this.Tuple;
    var r = r.Tuple;
    r[0] = t ? Math.floor((h[0] + t * 0.5) / t) * t : r[0];
    r[1] = t ? Math.floor((h[1] + t * 0.5) / t) * t : r[0];
    r[2] = t ? Math.floor((h[2] + t * 0.5) / t) * t : r[0];
  }
  BoundToCube(t, r) {
    var h = this.Tuple;
    var r = r.Tuple;
    r[0] = MathCommon_1.MathCommon.Clamp(h[0], -t, t);
    r[1] = MathCommon_1.MathCommon.Clamp(h[1], -t, t);
    r[2] = MathCommon_1.MathCommon.Clamp(h[2], -t, t);
  }
  BoundToBox(t, r, h) {
    var i = this.Tuple;
    var h = h.Tuple;
    var t = t.Tuple;
    var r = r.Tuple;
    h[0] = MathCommon_1.MathCommon.Clamp(i[0], t[0], r[0]);
    h[1] = MathCommon_1.MathCommon.Clamp(i[1], t[1], r[1]);
    h[2] = MathCommon_1.MathCommon.Clamp(i[2], t[2], r[2]);
  }
  GetClampedToSize(t, r, h) {
    var i = this.Size();
    if (i > MathCommon_1.MathCommon.SmallNumber) {
      this.Division(i, h);
    } else {
      h.Reset();
    }
    i = MathCommon_1.MathCommon.Clamp(i, t, r);
    h.MultiplyEqual(i);
  }
  GetClampedToSize2D(t, r, h) {
    var i = this.Tuple;
    var a = h.Tuple;
    var o = this.Size2D();
    if (o > MathCommon_1.MathCommon.SmallNumber) {
      h.DivisionEqual(this).DivisionEqual(o);
    } else {
      h.Reset();
    }
    o = MathCommon_1.MathCommon.Clamp(o, t, r);
    a[0] = a[0] * o;
    a[1] = a[1] * o;
    a[2] = i[2];
  }
  GetClampedToMaxSize(t, r) {
    var h;
    if (t < MathCommon_1.MathCommon.KindaSmallNumber) {
      r.Reset();
    } else if ((h = this.SizeSquared()) > Math.pow(t, 2)) {
      t = t / Math.sqrt(h);
      this.Multiply(t, r);
    } else {
      r.DeepCopy(this);
    }
  }
  GetClampedToMaxSize2D(t, r) {
    var h;
    var i = this.Tuple;
    var a = r.Tuple;
    a[2] = i[2];
    if (t < MathCommon_1.MathCommon.KindaSmallNumber) {
      a[0] = a[1] = 0;
    } else if ((h = this.SizeSquared2D()) > Math.pow(t, 2)) {
      t = +t / Math.sqrt(h);
      a[0] = i[0] * t;
      a[1] = i[1] * t;
    } else {
      r.DeepCopy(this);
    }
  }
  AddBounded(t, r = MathCommon_1.MathCommon.MaxInt16) {
    this.AdditionEqual(t);
    this.BoundToCube(r, this);
  }
  Reciprocal(t) {
    var r = this.Tuple;
    var t = t.Tuple;
    t[0] = r[0] !== 0 ? 1 / r[0] : MathCommon_1.MathCommon.BigNumber;
    t[1] = r[1] !== 0 ? 1 / r[1] : MathCommon_1.MathCommon.BigNumber;
    t[2] = r[2] !== 0 ? 1 / r[2] : MathCommon_1.MathCommon.BigNumber;
  }
  IsUniform(t = MathCommon_1.MathCommon.KindaSmallNumber) {
    return this.AllComponentsEqual(t);
  }
  MirrorByVector(t, r) {
    var h = this.DotProduct(t);
    t.MultiplyEqual(h * -2);
    r.AdditionEqual(this);
  }
  MirrorByPlane(t, r) {
    var h = this.Tuple;
    var i = t.Tuple;
    var h = h[0] * i[0] + h[1] * i[1] + h[2] * i[2] - t.W;
    t.Multiply(h * -2, r);
    r.AdditionEqual(this);
  }
  RotateAngleAxis(t, r, h) {
    var i = this.Tuple;
    var r = r.Tuple;
    var h = h.Tuple;
    var t = t * MathCommon_1.MathCommon.DegToRad;
    var a = Math.sin(t);
    var t = Math.cos(t);
    var o = r[0] * r[0];
    var e = r[1] * r[1];
    var s = r[2] * r[2];
    var n = r[0] * r[1];
    var c = r[1] * r[2];
    var M = r[2] * r[0];
    var m = r[0] * a;
    var u = r[1] * a;
    var r = r[2] * a;
    var a = 1 - t;
    var C = i[0];
    var V = i[1];
    var i = i[2];
    h[0] = (a * o + t) * C + (a * n - r) * V + (a * M + u) * i;
    h[1] = (a * n + r) * C + (a * e + t) * V + (a * c - m) * i;
    h[2] = (a * M - u) * C + (a * c + m) * V + (a * s + t) * i;
  }
  CosineAngle2D(t, r = MathCommon_1.MathCommon.KindaSmallNumber) {
    var h;
    var i = this.Tuple[0];
    var a = this.Tuple[1];
    var o = t.Tuple[0];
    var t = t.Tuple[1];
    var e = i * i + a * a;
    if (e <= r || (h = o * o + t * t) <= r) {
      return 0;
    } else {
      return (i * o + a * t) / Math.sqrt(e * h);
    }
  }
  ProjectOnTo(t, r) {
    var h = this.DotProduct(t) / t.SizeSquared();
    t.Multiply(h, r);
  }
  ProjectOnToNormal(t, r) {
    var h = this.DotProduct(t);
    t.Multiply(h, r);
  }
  ToOrientationRotator(t) {
    t.Yaw = Math.atan2(this.Tuple[1], this.Tuple[0]) * MathCommon_1.MathCommon.RadToDeg;
    t.Pitch = Math.atan2(this.Tuple[2], this.Size2D()) * MathCommon_1.MathCommon.RadToDeg;
    t.Roll = 0;
  }
  ToOrientationQuat(t) {
    var r = Math.atan2(this.Tuple[1], this.Tuple[0]);
    var h = Math.atan2(this.Tuple[2], this.Size2D());
    var i = Math.sin(h * 0.5);
    var h = Math.cos(h * 0.5);
    var a = Math.sin(r * 0.5);
    var r = Math.cos(r * 0.5);
    t.X = i * a;
    t.Y = -i * r;
    t.Z = h * a;
    t.W = h * r;
  }
  Rotation(t) {
    this.ToOrientationRotator(t);
  }
  FindBestAxisVectors(t, r) {
    var h = this.Tuple;
    var i = t.Tuple;
    var a = Math.abs(h[0]);
    var o = Math.abs(h[1]);
    var e = Math.abs(h[2]);
    if (a < e && o < e) {
      i[0] = 1;
      i[1] = i[2] = 0;
    } else {
      i[0] = i[1] = 0;
      i[2] = 1;
    }
    var a = this.DotProduct(t);
    var o = i[0] - h[0] * a;
    var e = i[1] - h[1] * a;
    var h = i[2] - h[2] * a;
    var a = o * o + e * e + h * h;
    if (a == 1) {
      i[0] = o;
      i[1] = e;
      i[2] = h;
    } else if (a < MathCommon_1.MathCommon.SmallNumber) {
      t.Reset();
    } else {
      a = 1 / Math.sqrt(a);
      i[0] = o * a;
      i[1] = e * a;
      i[2] = h * a;
    }
    t.CrossProduct(this, r);
  }
  UnwindEuler() {
    var t = this.Tuple;
    t[0] = MathCommon_1.MathCommon.UnwindDegrees(t[0]);
    t[1] = MathCommon_1.MathCommon.UnwindDegrees(t[1]);
    t[2] = MathCommon_1.MathCommon.UnwindDegrees(t[2]);
  }
  ContainsNaN() {
    var t = this.Tuple;
    return !isFinite(t[0]) || !isFinite(t[1]) || !isFinite(t[2]);
  }
  UnitCartesianToSpherical(t) {
    var r = this.Tuple;
    var h = r[0];
    var i = r[1];
    var r = r[2];
    t.X = Math.acos(r / this.Size());
    t.Y = Math.atan2(i, h);
  }
  HeadingAngle() {
    var t = this.Tuple;
    var r = Math.abs(t[0]) < MathCommon_1.MathCommon.KindaSmallNumber ? 0 : t[0];
    var t = Math.abs(t[1]) < MathCommon_1.MathCommon.KindaSmallNumber ? 0 : t[1];
    if (r === 0 && t === 0) {
      return 0;
    } else {
      return Math.atan2(t, r);
    }
  }
  static CreateOrthonormalBasis(t, r, h) {
    var i = t.Tuple;
    var a = r.Tuple;
    var o = h.Tuple;
    var e = t.DotProduct(h) / h.SizeSquared();
    var s = r.DotProduct(h) / h.SizeSquared();
    i[0] -= e * o[0];
    i[1] -= e * o[1];
    i[2] -= e * o[2];
    a[0] -= s * o[0];
    a[1] -= s * o[1];
    a[2] -= s * o[2];
    var i = MathCommon_1.MathCommon.Delta * MathCommon_1.MathCommon.Delta;
    if (t.SizeSquared() < i) {
      r.CrossProduct(h, t);
    }
    if (r.SizeSquared() < i) {
      t.CrossProduct(h, r);
    }
    t.Normalize();
    r.Normalize();
    h.Normalize();
  }
  static PointsAreSame(t, r) {
    return this.PointsAreNear(t, r, MathCommon_1.MathCommon.ThreshPointAreSame);
  }
  static PointsAreNear(t, r, h) {
    t = t.Tuple;
    r = r.Tuple;
    return Math.abs(t[0] - r[0]) < h && Math.abs(t[1] - r[1]) < h && Math.abs(t[2] - r[2]) < h;
  }
  static PointPlaneDist(t, r, h) {
    var t = t.Tuple;
    var r = r.Tuple;
    var h = h.Tuple;
    var i = t[0] - r[0];
    var a = t[1] - r[1];
    var t = t[2] - r[2];
    return i * h[0] + a * h[1] + t * h[2];
  }
  static PointPlaneProject(...t) {
    var r;
    var h;
    var i;
    var a;
    var o;
    var e;
    var s;
    var n;
    var c;
    var M;
    if (!(t.length < 3) && !(t.length > 5)) {
      r = t[0];
      i = (h = t[t.length - 1]).Tuple;
      if (t.length === 3) {
        c = t[1];
        a = this.DotProduct(r, c) - c.W;
        c.Multiply(-a, h);
        h.AdditionEqual(r);
      } else if (t.length === 4) {
        c = t[1];
        a = t[2];
        c = this.PointPlaneDist(r, c, a);
        a.Multiply(-c, h);
        h.AdditionEqual(r);
      } else if (t.length === 5) {
        c = (a = t[1]).Tuple;
        M = t[2].Tuple;
        t = t[3].Tuple;
        o = M[0] - c[0];
        e = M[1] - c[1];
        M = M[2] - c[2];
        s = t[0] - c[0];
        n = t[1] - c[1];
        t = t[0] - c[2];
        i[0] = e * t - M * n;
        i[1] = M * s - o * t;
        i[2] = o * n - e * s;
        M = this.DotProduct(a, c = h);
        t = this.DotProduct(r, c) - M;
        c.Multiply(-t, h);
        h.AdditionEqual(r);
      }
    }
  }
  static VectorPlaneProject(t, r, h) {
    t.ProjectOnToNormal(r, h);
    h.UnaryNegation(h);
    h.AdditionEqual(t);
  }
  static DistSquaredXY(t, r) {
    t = t.Tuple;
    r = r.Tuple;
    return Math.pow(r[0] - t[0], 2) + Math.pow(r[1] - t[1], 2);
  }
  static DistXY(t, r) {
    return Math.sqrt(this.DistSquaredXY(t, r));
  }
  static DistSquared(t, r) {
    t = t.Tuple;
    r = r.Tuple;
    return Math.pow(r[0] - t[0], 2) + Math.pow(r[1] - t[1], 2) + Math.pow(r[2] - t[2], 2);
  }
  static Dist(t, r) {
    return Math.sqrt(this.DistSquared(t, r));
  }
  static Distance(t, r) {
    return this.Dist(t, r);
  }
  static Dist2D(t, r) {
    return this.DistXY(t, r);
  }
  static DistSquared2D(t, r) {
    return this.DistSquaredXY(t, r);
  }
  static BoxPushOut(t, r) {
    t = t.Tuple;
    r = r.Tuple;
    return Math.abs(t[0] * r[0]) + Math.abs(t[1] * r[1]) + Math.abs(t[2] * r[2]);
  }
  static Parallel(t, r, h = MathCommon_1.MathCommon.ThreshNormalsAreParallel) {
    t = this.DotProduct(t, r);
    return Math.abs(t) >= h;
  }
  static Coincident(t, r, h = MathCommon_1.MathCommon.ThreshNormalsAreParallel) {
    return h <= this.DotProduct(t, r);
  }
  static Orthogonal(t, r, h = MathCommon_1.MathCommon.ThreshNormalsAreOrthogonal) {
    t = this.DotProduct(t, r);
    return Math.abs(t) <= h;
  }
  static Coplanar(t, r, h, i, a = MathCommon_1.MathCommon.ThreshNormalsAreParallel) {
    return !!this.Parallel(r, i, a) && !(Math.abs(this.PointPlaneDist(t, h, r)) > MathCommon_1.MathCommon.ThreshPointOnPlane);
  }
  static Triple(t, r, h) {
    t = t.Tuple;
    r = r.Tuple;
    h = h.Tuple;
    return t[0] * (r[1] * h[2] - r[2] * h[1]) + t[1] * (r[2] * h[0] - r[0] * h[2]) + t[2] * (r[0] * h[1] - r[1] * h[0]);
  }
  static RadiansToDegrees(t, r) {
    t = t.Tuple;
    r = r.Tuple;
    r[0] = t[0] * MathCommon_1.MathCommon.RadToDeg;
    r[1] = t[1] * MathCommon_1.MathCommon.RadToDeg;
    r[2] = t[2] * MathCommon_1.MathCommon.RadToDeg;
  }
  static DegreesToRadians(t, r) {
    t = t.Tuple;
    r = r.Tuple;
    r[0] = t[0] * MathCommon_1.MathCommon.DegToRad;
    r[1] = t[1] * MathCommon_1.MathCommon.DegToRad;
    r[2] = t[2] * MathCommon_1.MathCommon.DegToRad;
  }
  Reset() {
    var t = this.Tuple;
    t[0] = 0;
    t[1] = 0;
    t[2] = 0;
    if (this.hz) {
      this.ToUeVectorOld();
    }
    if (this.zvl) {
      this.ToUeVector();
    }
  }
  DeepCopy2D(t) {
    var r = this.Tuple;
    var t = t.Tuple;
    t[0] = r[0];
    t[1] = r[1];
    t[2] = 0;
    if (this.hz) {
      this.ToUeVectorOld();
    }
    if (this.zvl) {
      this.ToUeVector();
    }
  }
  SineAngle2D(t, r = MathCommon_1.MathCommon.KindaSmallNumber) {
    var h = this.Tuple;
    var t = t.Tuple;
    let i = h[0];
    let a = h[1];
    let o = t[0];
    let e = t[1];
    h = i * i + a * a;
    if (r < h) {
      t = 1 / Math.sqrt(h);
      i *= t;
      a *= t;
    }
    h = o * o + e * e;
    if (r < h) {
      t = 1 / Math.sqrt(h);
      o *= t;
      e *= t;
    }
    return i * e - a * o;
  }
  static VectorBlendEaseIn(t, r, h, i, a) {
    var t = t.Tuple;
    var r = r.Tuple;
    var a = a.Tuple;
    var o = t[0];
    var e = t[1];
    var t = t[2];
    var s = r[0] - o;
    var n = r[1] - e;
    var r = r[2] - t;
    var h = MathCommon_1.MathCommon.Lerp(0, 1, Math.pow(h, i));
    a[0] = o + s * h;
    a[1] = e + n * h;
    a[2] = t + r * h;
  }
  static DirectLerp(t, r, h, i) {
    var a = Quat_1.Quat.Create();
    Quat_1.Quat.FindBetween(t, r, a);
    Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, a, h, a);
    a.RotateVector(t, i);
  }
  static DirectLerpWithAngle(t, r, h, i) {
    var a;
    var o = Vector.DotProduct(t, r);
    var o = Math.acos(o) * MathCommon_1.MathCommon.RadToDeg;
    if (o < h) {
      i.DeepCopy(r);
    } else {
      a = Quat_1.Quat.Create();
      Quat_1.Quat.FindBetween(t, r, a);
      Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, a, h / o, a);
      a.RotateVector(t, i);
    }
  }
  static Lerp(t, r, h, i) {
    h = MathCommon_1.MathCommon.Clamp(h, 0, 1);
    r.Subtraction(t, this.dHo);
    this.dHo.MultiplyEqual(h);
    this.dHo.Addition(t, i);
  }
  static LerpSin(t, r, h, i) {
    t = t.Tuple;
    r = r.Tuple;
    h = MathCommon_1.MathCommon.Clamp(h, 0, 1);
    i.Set(MathCommon_1.MathCommon.LerpSin(t[0], r[0], h), MathCommon_1.MathCommon.LerpSin(t[1], r[1], h), MathCommon_1.MathCommon.LerpSin(t[2], r[2], h));
  }
  static LerpCubic(t, r, h, i, a, o) {
    var e = a * a;
    var s = e * a;
    var n = s * 2 - e * 3 + 1;
    var a = s - e * 2 + a;
    var c = s * -2 + e * 3;
    var s = s - e;
    this.dHo.DeepCopy(t);
    this.dHo.MultiplyEqual(n);
    o.DeepCopy(this.dHo);
    this.dHo.DeepCopy(r);
    this.dHo.MultiplyEqual(a);
    o.AdditionEqual(this.dHo);
    this.dHo.DeepCopy(i);
    this.dHo.MultiplyEqual(s);
    o.AdditionEqual(this.dHo);
    this.dHo.DeepCopy(h);
    this.dHo.MultiplyEqual(c);
    o.AdditionEqual(this.dHo);
  }
  static LerpCubicDerivative(t, r, h, i, a, o) {
    var e = a * a;
    this.dHo.DeepCopy(t);
    this.dHo.MultiplyEqual(6);
    this.Tz.DeepCopy(this.dHo);
    this.dHo.DeepCopy(r);
    this.dHo.MultiplyEqual(3);
    this.Tz.AdditionEqual(this.dHo);
    this.dHo.DeepCopy(i);
    this.dHo.MultiplyEqual(3);
    this.Tz.AdditionEqual(this.dHo);
    this.dHo.DeepCopy(h);
    this.dHo.MultiplyEqual(-6);
    this.Tz.AdditionEqual(this.dHo);
    this.dHo.DeepCopy(t);
    this.dHo.MultiplyEqual(-6);
    this.fHo.DeepCopy(this.dHo);
    this.dHo.DeepCopy(r);
    this.dHo.MultiplyEqual(-4);
    this.fHo.AdditionEqual(this.dHo);
    this.dHo.DeepCopy(i);
    this.dHo.MultiplyEqual(-2);
    this.fHo.AdditionEqual(this.dHo);
    this.dHo.DeepCopy(h);
    this.dHo.MultiplyEqual(6);
    this.fHo.AdditionEqual(this.dHo);
    this.Tz.MultiplyEqual(e);
    this.fHo.MultiplyEqual(a);
    o.DeepCopy(r);
    o.AdditionEqual(this.Tz);
    o.AdditionEqual(this.fHo);
  }
  static VectorCopy(t, r) {
    r.X = t.X;
    r.Y = t.Y;
    r.Z = t.Z;
  }
  static GetVector2dByAngle(t) {
    t *= MathCommon_1.MathCommon.DegToRad;
    return Vector.Create(Math.cos(t), Math.sin(t), 0);
  }
  static GetAngleByVector2D(t) {
    return t.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg;
  }
}
(exports.Vector = Vector).lz = new Array(VECTOR_POOL_MAX_CAPACITY);
Vector.Jvl = new Array(VECTOR_POOL_MAX_CAPACITY);
Vector.ZeroVectorProxy = Vector.Create(0, 0, 0);
Vector.OneVectorProxy = Vector.Create(1, 1, 1);
Vector.UpVectorProxy = Vector.Create(0, 0, 1);
Vector.DownVectorProxy = Vector.Create(0, 0, -1);
Vector.ForwardVectorProxy = Vector.Create(1, 0, 0);
Vector.BackwardVectorProxy = Vector.Create(-1, 0, 0);
Vector.RightVectorProxy = Vector.Create(0, 1, 0);
Vector.LeftVectorProxy = Vector.Create(0, -1, 0);
Vector.XAxisVectorProxy = Vector.ForwardVectorProxy;
Vector.YAxisVectorProxy = Vector.RightVectorProxy;
Vector.ZAxisVectorProxy = Vector.UpVectorProxy;
Vector.ZeroVector = Vector.ZeroVectorProxy.ToUeVectorOld();
Vector.OneVector = Vector.OneVectorProxy.ToUeVectorOld();
Vector.UpVector = Vector.UpVectorProxy.ToUeVectorOld();
Vector.DownVector = Vector.DownVectorProxy.ToUeVectorOld();
Vector.ForwardVector = Vector.ForwardVectorProxy.ToUeVectorOld();
Vector.BackwardVector = Vector.BackwardVectorProxy.ToUeVectorOld();
Vector.RightVector = Vector.RightVectorProxy.ToUeVectorOld();
Vector.LeftVector = Vector.LeftVectorProxy.ToUeVectorOld();
Vector.XAxisVector = Vector.XAxisVectorProxy.ToUeVectorOld();
Vector.YAxisVector = Vector.YAxisVectorProxy.ToUeVectorOld();
Vector.ZAxisVector = Vector.ZAxisVectorProxy.ToUeVectorOld();
Vector.ZeroVectorDouble = Vector.ZeroVectorProxy.ToUeVector();
Vector.OneVectorDouble = Vector.OneVectorProxy.ToUeVector();
Vector.UpVectorDouble = Vector.UpVectorProxy.ToUeVector();
Vector.DownVectorDouble = Vector.DownVectorProxy.ToUeVector();
Vector.ForwardVectorDouble = Vector.ForwardVectorProxy.ToUeVector();
Vector.BackwardVectorDouble = Vector.BackwardVectorProxy.ToUeVector();
Vector.RightVectorDouble = Vector.RightVectorProxy.ToUeVector();
Vector.LeftVectorDouble = Vector.LeftVectorProxy.ToUeVector();
Vector.XAxisVectorDouble = Vector.XAxisVectorProxy.ToUeVector();
Vector.YAxisVectorDouble = Vector.YAxisVectorProxy.ToUeVector();
Vector.ZAxisVectorDouble = Vector.ZAxisVectorProxy.ToUeVector();
Vector.dHo = Vector.Create();
Vector.Tz = Vector.Create();
Vector.fHo = Vector.Create(); //# sourceMappingURL=Vector.js.map