"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Quat = undefined;
const UE = require("ue");
const MathCommon_1 = require("./MathCommon");
const Rotator_1 = require("./Rotator");
const Vector_1 = require("./Vector");
const FIND_BETWEEN_CONST = 0.000001;
const SLERP_CONST = 0.9999;
const SINGULARITY_THRESHOLD = 0.4999995;
class Quat {
  constructor(t, i, h, s) {
    this.NJ = undefined;
    this.OJ = undefined;
    this.kJ = undefined;
    this.Tuple = [t ?? 0, i ?? 0, h ?? 0, s ?? 1];
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
  get W() {
    return this.Tuple[3];
  }
  set W(t) {
    this.Tuple[3] = t;
  }
  ToString() {
    return `X=${this.Tuple[0]}, Y=${this.Tuple[1]}, Z=${this.Tuple[2]}, W= ${this.Tuple[3]}`;
  }
  ToUeQuat() {
    var t = this.Tuple;
    if (this.NJ === undefined) {
      this.NJ = new UE.Quat(t[0], t[1], t[2], t[3]);
    } else {
      this.NJ.X = t[0];
      this.NJ.Y = t[1];
      this.NJ.Z = t[2];
      this.NJ.W = t[3];
    }
    return this.NJ;
  }
  FromUeQuat(t) {
    var i = this.Tuple;
    i[0] = t.X;
    i[1] = t.Y;
    i[2] = t.Z;
    i[3] = t.W;
  }
  static Create(...t) {
    var i;
    var h;
    var s;
    var a = new Quat();
    if (t.length === 1 && t[0]) {
      a.FromUeQuat(t[0]);
    } else if (t[0] === undefined || typeof t[0] == "number") {
      i = t[0];
      h = t[1];
      s = t[2];
      t = t[3];
      a.Set(i || 0, h || 0, s || 0, t || 1);
    }
    return a;
  }
  DeepCopy(t) {
    this.Set(t.X, t.Y, t.Z, t.W);
  }
  Set(t, i, h, s) {
    var a = this.Tuple;
    a[0] = t;
    a[1] = i;
    a[2] = h;
    a[3] = s;
    if (this.NJ) {
      this.ToUeQuat();
    }
  }
  Multiply(t, i) {
    if (typeof t == "number") {
      i.X *= t;
      i.Y *= t;
      i.Z *= t;
      i.W *= t;
    } else {
      Quat.VectorQuaternionMultiply(this, t, i);
      i.Inverse2(i);
    }
  }
  get Vector4() {
    var t = this.Tuple;
    if (this.OJ === undefined) {
      this.OJ = [t[0], t[1], t[2], t[3]];
    } else {
      this.OJ[0] = t[0];
      this.OJ[1] = t[1];
      this.OJ[2] = t[2];
      this.OJ[3] = t[3];
    }
    return this.OJ;
  }
  static FJ(t, i, h, s) {
    var a = t.Tuple;
    var e = i.Tuple;
    var r = s.Tuple;
    var t = h + Vector_1.Vector.DotProduct(t, i);
    if (t > FIND_BETWEEN_CONST * h) {
      r[0] = a[1] * e[2] - a[2] * e[1];
      r[1] = a[2] * e[0] - a[0] * e[2];
      r[2] = a[0] * e[1] - a[1] * e[0];
      r[3] = t;
    } else {
      i = Math.abs(a[0]) > Math.abs(a[1]);
      r[0] = i ? -a[2] : 0;
      r[1] = i ? 0 : -a[2];
      r[2] = i ? a[0] : a[1];
      r[3] = 0;
    }
    s.Normalize();
  }
  static VJ(t, i, h, s) {
    var a;
    var t = t.Tuple;
    var i = i.Tuple;
    var s = s.Tuple;
    var e = t[0] * i[0] + t[1] * i[1] + t[2] * i[2] + t[3] * i[3];
    var r = MathCommon_1.MathCommon.FloatSelect(e, e, -e);
    let o = 0;
    let u = 0;
    u = r < SLERP_CONST ? (r = Math.acos(r), a = 1 / Math.sin(r), o = Math.sin((1 - h) * r) * a, Math.sin(h * r) * a) : (o = 1 - h, h);
    u = MathCommon_1.MathCommon.FloatSelect(e, u, -u);
    s[0] = o * t[0] + u * i[0];
    s[1] = o * t[1] + u * i[1];
    s[2] = o * t[2] + u * i[2];
    s[3] = o * t[3] + u * i[3];
  }
  static Squad(t, i, h, s, a, e) {
    Quat.VJ(t, h, a, Quat.WJ);
    Quat.VJ(i, s, a, Quat.KJ);
    Quat.Slerp(Quat.WJ, Quat.KJ, a * 2 * (1 - a), e);
  }
  static FindBetween(t, i, h) {
    this.FindBetweenVectors(t, i, h);
  }
  static FindBetweenVectors(t, i, h) {
    var s = Math.sqrt(t.SizeSquared() * i.SizeSquared());
    this.FJ(t, i, s, h);
  }
  static Slerp(t, i, h, s) {
    this.VJ(t, i, h, s);
    s.Normalize();
  }
  Normalize(t = MathCommon_1.MathCommon.SmallNumber) {
    this.GetNormalized(this, t);
    return true;
  }
  GetNormalized(t, i = MathCommon_1.MathCommon.SmallNumber) {
    var h = this.Tuple;
    var h = h[0] * h[0] + h[1] * h[1] + h[2] * h[2] + h[3] * h[3];
    if (i <= h) {
      i = t.Tuple;
      h = 1 / Math.sqrt(h);
      i[0] *= h;
      i[1] *= h;
      i[2] *= h;
      i[3] *= h;
    } else {
      t.Reset();
    }
  }
  Reset() {
    var t = this.Tuple;
    t[0] = 0;
    t[1] = 0;
    t[2] = 0;
    t[3] = 1;
    if (this.NJ) {
      this.ToUeQuat();
    }
  }
  RotateVector(t, i) {
    var h = this.Tuple;
    var t = t.Tuple;
    var i = i.Tuple;
    var s = (h[1] * t[2] - h[2] * t[1]) * 2;
    var a = (h[2] * t[0] - h[0] * t[2]) * 2;
    var e = (h[0] * t[1] - h[1] * t[0]) * 2;
    var r = h[1] * e - h[2] * a;
    var o = h[2] * s - h[0] * e;
    var u = h[0] * a - h[1] * s;
    i[0] = t[0] + h[3] * s + r;
    i[1] = t[1] + h[3] * a + o;
    i[2] = t[2] + h[3] * e + u;
  }
  UnRotateVector(t, i) {
    var h = this.Tuple;
    var s = [-h[0], -h[1], -h[2]];
    var t = t.Tuple;
    var a = (s[1] * t[2] - s[2] * t[1]) * 2;
    var e = (s[2] * t[0] - s[0] * t[2]) * 2;
    var r = (s[0] * t[1] - s[1] * t[0]) * 2;
    var o = s[2] * a - s[0] * r;
    var u = s[0] * e - s[1] * a;
    var h = h[3];
    var i = i.Tuple;
    i[0] = t[0] + h * a + (s[1] * r - s[2] * e);
    i[1] = t[1] + h * e + o;
    i[2] = t[2] + h * r + u;
  }
  Rotator(t) {
    var i = this.Tuple;
    let h = undefined;
    var t = (h = t || (this.kJ === undefined && (this.kJ = Rotator_1.Rotator.Create()), this.kJ)).Tuple;
    var s = i[2] * i[0] - i[3] * i[1];
    var a = (i[3] * i[2] + i[0] * i[1]) * 2;
    var e = 1 - (i[1] * i[1] + i[2] * i[2]) * 2;
    if (s < -SINGULARITY_THRESHOLD) {
      t[0] = -MathCommon_1.MathCommon.RightAngle;
      t[1] = Math.atan2(a, e) * MathCommon_1.MathCommon.RadToDeg;
      t[2] = Rotator_1.Rotator.NormalizeAxis(-t[1] - Math.atan2(i[0], i[3]) * 2 * MathCommon_1.MathCommon.RadToDeg);
    } else if (s > SINGULARITY_THRESHOLD) {
      t[0] = MathCommon_1.MathCommon.RightAngle;
      t[1] = Math.atan2(a, e) * MathCommon_1.MathCommon.RadToDeg;
      t[2] = Rotator_1.Rotator.NormalizeAxis(t[1] - Math.atan2(i[0], i[3]) * 2 * MathCommon_1.MathCommon.RadToDeg);
    } else {
      t[0] = Math.asin(s * 2) * MathCommon_1.MathCommon.RadToDeg;
      t[1] = Math.atan2(a, e) * MathCommon_1.MathCommon.RadToDeg;
      t[2] = Math.atan2(-(i[3] * i[0] + i[1] * i[2]) * 2, 1 - (i[1] * i[1] + i[0] * i[0]) * 2) * MathCommon_1.MathCommon.RadToDeg;
    }
    return h;
  }
  Inverse(t) {
    var i = this.Tuple;
    var t = t.Tuple;
    t[0] = -i[0];
    t[1] = -i[1];
    t[2] = -i[2];
    t[3] = i[3];
  }
  Inverse2(t) {
    var i = this.Tuple;
    var t = t.Tuple;
    t[0] = -i[0];
    t[1] = -i[1];
    t[2] = -i[2];
    t[3] = -i[3];
  }
  IsNearZero(t = MathCommon_1.MathCommon.SmallNumber) {
    return Math.abs(this.X) < t && Math.abs(this.Y) < t && Math.abs(this.Z) < t && Math.abs(this.W) < t;
  }
  GetAxisX(t) {
    this.RotateVector(Vector_1.Vector.ForwardVectorProxy, t);
    return t;
  }
  GetAxisY(t) {
    this.RotateVector(Vector_1.Vector.RightVectorProxy, t);
    return t;
  }
  GetAxisZ(t) {
    this.RotateVector(Vector_1.Vector.UpVectorProxy, t);
    return t;
  }
  GetForwardVector(t) {
    return this.GetAxisX(t);
  }
  GetRightVector(t) {
    return this.GetAxisY(t);
  }
  GetUpVector(t) {
    return this.GetAxisZ(t);
  }
  Equals(t, i = MathCommon_1.MathCommon.KindaSmallNumber) {
    var h = this.Tuple;
    var t = t.Tuple;
    return Math.abs(h[0] - t[0]) <= i && Math.abs(h[1] - t[1]) <= i && Math.abs(h[2] - t[2]) <= i && Math.abs(h[3] - t[3]) <= i;
  }
  static ConstructorByAxisAngle(t, i, h) {
    var t = t.Tuple;
    var h = h.Tuple;
    var i = i * 0.5;
    var s = Math.sin(i);
    var i = Math.cos(i);
    h[0] = s * t[0];
    h[1] = s * t[1];
    h[2] = s * t[2];
    h[3] = i;
  }
  static VectorQuaternionMultiply(t, i, h) {
    this.HJ.FromUeQuat(t);
    this.jJ.FromUeQuat(i);
    this.WJ.Reset();
    this.KJ.Reset();
    this.QJ.Reset();
    this.XJ(this.HJ, 3, this.WJ);
    this.$J(this.WJ, this.jJ, h);
    this.XJ(this.HJ, 0, this.WJ);
    this.YJ(this.jJ, 3, 2, 1, 0, this.KJ);
    this.$J(this.WJ, this.KJ, this.QJ);
    this.JJ(this.QJ, this.zJ, h, h);
    this.XJ(this.HJ, 1, this.WJ);
    this.YJ(this.jJ, 2, 3, 0, 1, this.KJ);
    this.$J(this.WJ, this.KJ, this.QJ);
    this.JJ(this.QJ, this.ZJ, h, h);
    this.XJ(this.HJ, 2, this.WJ);
    this.YJ(this.jJ, 1, 0, 3, 2, this.KJ);
    this.$J(this.WJ, this.KJ, this.QJ);
    this.JJ(this.QJ, this.ez, h, h);
  }
  static $J(t, i, h) {
    t = t.Tuple;
    i = i.Tuple;
    h = h.Tuple;
    h[0] = t[0] * i[0];
    h[1] = t[1] * i[1];
    h[2] = t[2] * i[2];
    h[3] = t[3] * i[3];
  }
  static JJ(t, i, h, s) {
    t = t.Tuple;
    i = i.Tuple;
    h = h.Tuple;
    s = s.Tuple;
    s[0] = t[0] * i[0] + h[0];
    s[1] = t[1] * i[1] + h[1];
    s[2] = t[2] * i[2] + h[2];
    s[3] = t[3] * i[3] + h[3];
  }
  static XJ(t, i, h) {
    h = h.Tuple;
    t = t.Tuple[i];
    h[0] = t;
    h[1] = t;
    h[2] = t;
    h[3] = t;
  }
  static YJ(t, i, h, s, a, e) {
    e = e.Tuple;
    e[0] = t.Tuple[i];
    e[1] = t.Tuple[h];
    e[2] = t.Tuple[s];
    e[3] = t.Tuple[a];
  }
}
(exports.Quat = Quat).Identity = new UE.Quat(0, 0, 0, 1);
Quat.IdentityProxy = Quat.Create(0, 0, 0, 1);
Quat.zJ = Quat.Create(1, -1, 1, -1);
Quat.ZJ = Quat.Create(1, 1, -1, -1);
Quat.ez = Quat.Create(-1, 1, 1, -1);
Quat.HJ = Quat.Create();
Quat.jJ = Quat.Create();
Quat.WJ = Quat.Create();
Quat.KJ = Quat.Create();
Quat.QJ = Quat.Create(); //# sourceMappingURL=Quat.js.map