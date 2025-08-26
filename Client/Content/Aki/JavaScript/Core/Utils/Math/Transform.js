"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transform = undefined;
const UE = require("ue");
const Quat_1 = require("./Quat");
const Rotator_1 = require("./Rotator");
const Vector_1 = require("./Vector");
class Transform {
  constructor() {
    this.rz = undefined;
    this.mC = undefined;
    this.nz = undefined;
    this.sz = undefined;
    this.Yvl = undefined;
  }
  static Create(...t) {
    var s;
    var r = new Transform();
    if (t.length === 1) {
      if (t[0] instanceof UE.Transform) {
        s = t[0];
        r.mC = Quat_1.Quat.Create(s.GetRotation());
        r.rz = Vector_1.Vector.Create(s.GetTranslation());
        r.nz = Vector_1.Vector.Create(s.GetScale3D());
      } else if (t[0] instanceof UE.TransformDouble) {
        s = t[0];
        r.mC = Quat_1.Quat.Create(s.GetRotation());
        r.rz = Vector_1.Vector.Create(s.GetTranslation());
        r.nz = Vector_1.Vector.Create(s.GetScale3D());
      }
    } else if (t.length === 0) {
      r.mC = Quat_1.Quat.Create();
      r.rz = Vector_1.Vector.Create();
      r.nz = Vector_1.Vector.Create(1, 1, 1);
    } else {
      r.mC = Quat_1.Quat.Create(t[0]);
      r.rz = Vector_1.Vector.Create(t[1]);
      r.nz = Vector_1.Vector.Create(t[2]);
    }
    return r;
  }
  FromUeTransform(t) {
    this.mC.FromUeQuat(t.GetRotation());
    this.rz.FromUeVector(t.GetTranslation());
    this.nz.FromUeVector(t.GetScale3D());
  }
  ToUeTransformOld() {
    if (this.sz === undefined) {
      this.sz = new UE.Transform(this.mC.ToUeQuat(), this.rz.ToUeVectorOld(), this.nz.ToUeVectorOld());
    } else {
      this.sz.SetRotation(this.mC.ToUeQuat());
      this.sz.SetTranslation(this.rz.ToUeVectorOld());
      this.sz.SetScale3D(this.nz.ToUeVectorOld());
    }
    return this.sz;
  }
  ToUeTransform() {
    if (this.Yvl === undefined) {
      this.Yvl = new UE.TransformDouble(this.mC.ToUeQuat(), this.rz.ToUeVector(), this.nz.ToUeVector());
    } else {
      this.Yvl.SetRotation(this.mC.ToUeQuat());
      this.Yvl.SetTranslation(this.rz.ToUeVector());
      this.Yvl.SetScale3D(this.nz.ToUeVector());
    }
    return this.Yvl;
  }
  Set(t, s, r) {
    this.rz.Set(t.X, t.Y, t.Z);
    this.mC.Set(s.X, s.Y, s.Z, s.W);
    this.nz.Set(r.X, r.Y, r.Z);
  }
  SetLocation(t) {
    this.rz.Set(t.X, t.Y, t.Z);
  }
  GetLocation() {
    return this.rz;
  }
  SetRotation(t) {
    this.mC.Set(t.X, t.Y, t.Z, t.W);
  }
  GetRotation() {
    return this.mC;
  }
  SetScale3D(t) {
    this.nz.Set(t.X, t.Y, t.Z);
  }
  GetScale3D() {
    return this.nz;
  }
  TransformPosition(t, s) {
    this.nz.Multiply(t, s);
    this.mC.RotateVector(s, s);
    this.rz.Addition(s, s);
  }
  TransformVector(t, s) {
    this.nz.Multiply(t, s);
    this.mC.RotateVector(s, s);
  }
  TransformPositionNoScale(t, s) {
    this.mC.RotateVector(t, s);
    this.rz.Addition(s, s);
  }
  InverseTransformVector(t, s) {
    this.mC.Inverse(Transform.az);
    Transform.az.RotateVector(t, s);
    this.nz.Reciprocal(Transform.wXs);
    Transform.wXs.Multiply(s, s);
  }
  InverseTransformPosition(t, s) {
    t.Subtraction(this.rz, s);
    this.mC.Inverse(Transform.az);
    Transform.az.RotateVector(s, s);
    this.nz.Reciprocal(Transform.wXs);
    Transform.wXs.Multiply(s, s);
  }
  InverseTransformPositionNoScale(t, s) {
    t.Subtraction(this.rz, s);
    this.mC.Inverse(Transform.az);
    Transform.az.RotateVector(s, s);
  }
  InverseTransformRotation(t, s) {
    this.mC.Inverse(s);
    s.Multiply(t, s);
  }
  TransformRotation(t, s) {
    var r = this.mC;
    var t = t.Quaternion();
    if (s instanceof Rotator_1.Rotator) {
      r.Multiply(t, Transform.az);
      s.FromUeRotator(Transform.az.Rotator());
    } else if (s instanceof Quat_1.Quat) {
      r.Multiply(t, s);
    }
  }
  ComposeTransforms(t, s) {
    this.rz.Multiply(t.nz, s.rz);
    t.mC.RotateVector(s.rz, s.rz);
    t.rz.Addition(s.rz, s.rz);
    this.nz.Multiply(t.nz, s.nz);
    t.mC.Multiply(this.mC, s.mC);
  }
  Reset() {
    this.rz.Reset();
    this.nz.Reset();
    this.mC.Reset();
    if (this.sz) {
      this.ToUeTransformOld();
    }
    if (this.Yvl) {
      this.ToUeTransform();
    }
  }
}
(exports.Transform = Transform).wXs = Vector_1.Vector.Create();
Transform.az = Quat_1.Quat.Create(); //# sourceMappingURL=Transform.js.map