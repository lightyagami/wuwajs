"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigJumpUnit = exports.DEFAULT_GRAVITY = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const CurveUtils_1 = require("../../../../../../Core/Utils/Curve/CurveUtils");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
exports.DEFAULT_GRAVITY = 1960;
class BigJumpUnit {
  constructor() {
    this.qJo = -0;
    this.GJo = -0;
    this.dYi = Vector_1.Vector.Create();
    this.NJo = Vector_1.Vector.Create();
    this.fDe = Vector_1.Vector.Create();
    this.OJo = "";
    this.kJo = undefined;
    this.FJo = -0;
    this.Tdc = Vector_1.Vector.Create(0, 0, -1);
    this.VJo = Vector_1.Vector.Create();
    this.HJo = Vector_1.Vector.Create();
    this.Rotator = Rotator_1.Rotator.Create();
  }
  SetAll(t, i, s, h, e = "", r = exports.DEFAULT_GRAVITY, U = undefined, u) {
    this.qJo = t;
    this.dYi.DeepCopy(i);
    this.NJo.DeepCopy(s);
    this.fDe.DeepCopy(h);
    if (this.OJo !== e && (this.OJo = e, this.kJo = undefined, e)) {
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Object, t => {
        this.kJo = t;
      }, 104);
    }
    if (U) {
      this.Rotator.DeepCopy(U);
    }
    this.FJo = r;
    this.Tdc.DeepCopy(u ?? Vector_1.Vector.DownVectorProxy);
  }
  SetStartPoint(t) {
    this.dYi.DeepCopy(t);
  }
  Init() {
    var t;
    var i;
    if (this.FJo > 0) {
      this.fDe.Subtraction(this.dYi, BigJumpUnit.Lz);
      this.Rotator.Set(0, MathUtils_1.MathUtils.GetAngleByVector2D(BigJumpUnit.Lz), 0);
      this.NJo.Subtraction(this.dYi, BigJumpUnit.Tz);
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForDirect(this.Tdc, BigJumpUnit.Lz);
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForDirect(this.Tdc, BigJumpUnit.Tz);
      BigJumpUnit.Lz.Normalize();
      BigJumpUnit.Lz.MultiplyEqual(BigJumpUnit.Tz.DotProduct(BigJumpUnit.Lz));
      BigJumpUnit.Lz.AdditionEqual(this.dYi);
      t = GravityUtils_1.GravityUtils.GetZnInGravityForDirect(this.Tdc, this.NJo);
      this.NJo.DeepCopy(BigJumpUnit.Lz);
      GravityUtils_1.GravityUtils.SetZnInGravity(this.Tdc, this.NJo, t);
      i = GravityUtils_1.GravityUtils.GetZnInGravityForDirect(this.Tdc, this.fDe);
      this.GJo = Math.sqrt((t - i) * 2 / this.FJo);
      this.fDe.Subtraction(this.NJo, BigJumpUnit.Lz);
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForDirect(this.Tdc, BigJumpUnit.Lz);
      BigJumpUnit.Lz.Division(this.GJo, this.HJo);
      this.NJo.Subtraction(this.dYi, BigJumpUnit.Lz);
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForDirect(this.Tdc, BigJumpUnit.Lz);
      BigJumpUnit.Lz.DivisionEqual(this.qJo);
      BigJumpUnit.Lz.MultiplyEqual(2);
      BigJumpUnit.Lz.Subtraction(this.HJo, this.VJo);
    } else {
      this.NJo.Subtraction(this.dYi, BigJumpUnit.Lz);
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForDirect(this.Tdc, BigJumpUnit.Lz);
      BigJumpUnit.Lz.DivisionEqual(this.qJo);
      this.VJo.DeepCopy(BigJumpUnit.Lz);
      this.HJo.DeepCopy(this.VJo);
      this.GJo = 0;
    }
  }
  ToString() {
    return `TimeLength: ${this.qJo} + ${this.GJo}, Points: ${this.dYi.ToString()}, ${this.NJo.ToString()}, ${this.fDe.ToString()}
  Gravity2: ${this.FJo}, Speeds: ${this.VJo.ToString()}, ${this.HJo.ToString()}`;
  }
  get RisingTime() {
    return this.qJo;
  }
  get TimeLength() {
    return this.qJo + this.GJo;
  }
  GetLocation(t, i) {
    var s;
    var h;
    var e;
    if (t < this.qJo) {
      Vector_1.Vector.Lerp(this.VJo, this.HJo, t / this.qJo, i);
      i.AdditionEqual(this.VJo);
      i.MultiplyEqual(t / 2);
      i.AdditionEqual(this.dYi);
      s = this.kJo ? this.kJo.GetFloatValue(t / this.qJo) : CurveUtils_1.CurveUtils.DefaultPara.GetCurrentValue(t / this.qJo);
      e = GravityUtils_1.GravityUtils.GetZnInGravityForDirect(this.Tdc, this.dYi);
      h = GravityUtils_1.GravityUtils.GetZnInGravityForDirect(this.Tdc, this.NJo);
      GravityUtils_1.GravityUtils.SetZnInGravity(this.Tdc, i, MathUtils_1.MathUtils.Lerp(e, h, s));
    } else {
      e = t - this.qJo;
      this.HJo.Multiply(e, i);
      GravityUtils_1.GravityUtils.SetZnInGravity(this.Tdc, i, -this.FJo * e * e / 2);
      i.AdditionEqual(this.NJo);
    }
  }
  GetOffset(t, i, s) {
    this.GetLocation(t, BigJumpUnit.Lz);
    this.GetLocation(t + i, s);
    s.SubtractionEqual(BigJumpUnit.Lz);
  }
  GetSpeed(t, i) {
    if (t < this.qJo) {
      Vector_1.Vector.Lerp(this.VJo, this.HJo, t / this.qJo, i);
      i.AdditionEqual(this.VJo);
      i.MultiplyEqual(0.5);
    } else {
      i.DeepCopy(this.HJo);
      t = t - this.qJo;
      GravityUtils_1.GravityUtils.SetZnInGravity(this.Tdc, i, -this.FJo * t);
    }
  }
}
(exports.BigJumpUnit = BigJumpUnit).Lz = Vector_1.Vector.Create();
BigJumpUnit.Tz = Vector_1.Vector.Create(); //# sourceMappingURL=BigJumpUnit.js.map