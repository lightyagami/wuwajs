"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector2D = undefined;
const UE = require("ue");
const MathCommon_1 = require("./MathCommon");
const VECTOR2D_POOL_MAX_CAPACITY = 25;
class Vector2D {
  constructor(t, r) {
    this._z = undefined;
    this.Tuple = [t ?? 0, r ?? 0];
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
  FromUeVector2D(t) {
    var r = this.Tuple;
    r[0] = t.X;
    r[1] = t.Y;
  }
  static Create(...t) {
    var r;
    var e = new Vector2D();
    if (t.length !== 0) {
      if (t.length === 1 && t[0]) {
        e.FromUeVector2D(t[0]);
      } else if (t[0] === undefined || typeof t[0] == "number") {
        r = t[0];
        t = t[1];
        e.Set(r, t);
      }
    }
    return e;
  }
  ToUeVector2D(t = false) {
    var r = this.Tuple;
    this._z = Vector2D.uz.pop();
    if (this._z === undefined) {
      this._z = new UE.Vector2D();
    }
    this._z.X = r[0];
    this._z.Y = r[1];
    if (t) {
      r = this._z;
      Vector2D.uz.push(this._z);
      this._z = undefined;
      return r;
    } else {
      return this._z;
    }
  }
  Addition(t, r) {
    var e = this.Tuple;
    var i = r.Tuple;
    if (typeof t == "number") {
      i[0] = e[0] + t;
      i[1] = e[1] + t;
    } else {
      t = t.Tuple;
      i[0] = e[0] + t[0];
      i[1] = e[1] + t[1];
    }
    return r;
  }
  AdditionEqual(t) {
    var r = this.Tuple;
    if (typeof t == "number") {
      r[0] += t;
      r[1] += t;
    } else {
      t = t.Tuple;
      r[0] += t[0];
      r[1] += t[1];
    }
    return this;
  }
  Subtraction(t, r) {
    var e = this.Tuple;
    var i = r.Tuple;
    if (typeof t == "number") {
      i[0] = e[0] - t;
      i[1] = e[1] - t;
    } else {
      t = t.Tuple;
      i[0] = e[0] - t[0];
      i[1] = e[1] - t[1];
    }
    return r;
  }
  SubtractionEqual(t) {
    var r = this.Tuple;
    if (typeof t == "number") {
      r[0] -= t;
      r[1] -= t;
    } else {
      t = t.Tuple;
      r[0] -= t[0];
      r[1] -= t[1];
    }
    return this;
  }
  Multiply(t, r) {
    var e = this.Tuple;
    var i = r.Tuple;
    if (typeof t == "number") {
      i[0] = e[0] * t;
      i[1] = e[1] * t;
    } else {
      t = t.Tuple;
      i[0] = e[0] * t[0];
      i[1] = e[1] * t[1];
    }
    return r;
  }
  MultiplyEqual(t) {
    var r = this.Tuple;
    if (typeof t == "number") {
      r[0] *= t;
      r[1] *= t;
    } else {
      t = t.Tuple;
      r[0] *= t[0];
      r[1] *= t[1];
    }
    return this;
  }
  Division(t, r) {
    var e;
    var i = this.Tuple;
    var h = r.Tuple;
    if (typeof t == "number") {
      h[0] = i[0] * (e = 1 / t);
      h[1] = i[1] * e;
    } else {
      e = t.Tuple;
      h[0] = i[0] / e[0];
      h[1] = i[1] / e[1];
    }
    return r;
  }
  DivisionEqual(t) {
    var r;
    var e = this.Tuple;
    if (typeof t == "number") {
      e[0] *= r = 1 / t;
      e[1] *= r;
    } else {
      r = t.Tuple;
      e[0] /= r[0];
      e[1] /= r[1];
    }
    return this;
  }
  UnaryNegation(t) {
    var r = this.Tuple;
    var t = t.Tuple;
    t[0] = -r[0];
    t[1] = -r[1];
  }
  DotProduct(t) {
    var r = this.Tuple;
    var t = t.Tuple;
    return r[0] * t[0] + r[1] * t[1];
  }
  CrossProduct(t) {
    var r = this.Tuple;
    var t = t.Tuple;
    return r[0] * t[1] - r[1] * t[0];
  }
  Size() {
    return Math.sqrt(this.SizeSquared());
  }
  SizeSquared() {
    var t = this.Tuple;
    return t[0] * t[0] + t[1] * t[1];
  }
  IsNearlyZero(t = MathCommon_1.MathCommon.KindaSmallNumber) {
    var r = this.Tuple;
    return !(Math.abs(r[0]) > t) && !(Math.abs(r[1]) > t);
  }
  Normalize(t = MathCommon_1.MathCommon.SmallNumber) {
    var r = this.SizeSquared();
    return t < r && (t = 1 / Math.sqrt(r), this.Multiply(t, this), true);
  }
  GetSafeNormal(t, r = MathCommon_1.MathCommon.SmallNumber) {
    var e = this.SizeSquared();
    if (e === 1) {
      t.DeepCopy(this);
    } else if (e < r) {
      t.Reset();
    } else {
      r = 1 / Math.sqrt(e);
      this.Multiply(r, t);
    }
  }
  DeepCopy(t) {
    this.Set(t.X, t.Y);
  }
  GetRotated(t, r) {
    var e = this.Tuple;
    var r = r.Tuple;
    var t = MathCommon_1.MathCommon.DegreeToRadian(t);
    var i = Math.sin(t);
    var t = Math.cos(t);
    r[0] = t * e[0] - i * e[1];
    r[1] = i * e[0] + t * e[1];
  }
  SphericalToUnitCartesian(t) {
    var r = this.Tuple;
    var t = t.Tuple;
    var e = Math.sin(r[0]);
    t[0] = Math.cos(r[1]) * e;
    t[1] = Math.sin(r[1]) * e;
    t[2] = Math.cos(r[0]);
  }
  Equals(t, r = MathCommon_1.MathCommon.KindaSmallNumber) {
    var e = this.Tuple;
    var t = t.Tuple;
    return Math.abs(e[0] - t[0]) <= r && Math.abs(e[1] - t[1]) <= r;
  }
  GetMax() {
    var t = this.Tuple;
    return Math.max(t[0], t[1]);
  }
  GetAbsMax() {
    var t = this.Tuple;
    return Math.max(Math.abs(t[0]), Math.abs(t[1]));
  }
  GetMin() {
    var t = this.Tuple;
    return Math.min(t[0], t[1]);
  }
  GetAbsMin() {
    var t = this.Tuple;
    return Math.min(Math.abs(t[0]), Math.abs(t[1]));
  }
  ToDirectionAndLength(t) {
    var r;
    var e = this.Tuple;
    var i = t.Tuple;
    var h = this.Size();
    if (h > MathCommon_1.MathCommon.SmallNumber) {
      i[0] = e[0] * (r = 1 / h);
      i[1] = e[1] * r;
    } else {
      t.Reset();
    }
    return h;
  }
  Set(t, r) {
    this.Tuple[0] = t;
    this.Tuple[1] = r;
    if (this._z) {
      this.ToUeVector2D();
    }
  }
  static Distance(t, r) {
    return Math.sqrt(this.DistSquared(t, r));
  }
  static DistSquared(t, r) {
    t = t.Tuple;
    r = r.Tuple;
    return Math.pow(r[0] - t[0], 2) + Math.pow(r[1] - t[1], 2);
  }
  Reset() {
    var t = this.Tuple;
    t[0] = 0;
    t[1] = 0;
    if (this._z) {
      this.ToUeVector2D();
    }
  }
  ContainsNaN() {
    var t = this.Tuple;
    return !isFinite(t[0]) || !isFinite(t[1]);
  }
}
(exports.Vector2D = Vector2D).uz = new Array(VECTOR2D_POOL_MAX_CAPACITY);
Vector2D.ZeroVector = new UE.Vector2D(0, 0);
Vector2D.UnitVector = new UE.Vector2D(1, 1);
Vector2D.Unit45Deg = new UE.Vector2D(Math.SQRT1_2, Math.SQRT1_2); //# sourceMappingURL=Vector2D.js.map