"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplineCurve = exports.InterpCurvePointNumber = exports.InterpCurvePointQuat = exports.InterpCurvePointVector = undefined;
const UE = require("ue");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const Log_1 = require("../../Common/Log");
const Quat_1 = require("../Math/Quat");
const Rotator_1 = require("../Math/Rotator");
const Transform_1 = require("../Math/Transform");
const Vector_1 = require("../Math/Vector");
const MathUtils_1 = require("../MathUtils");
const LegendreGaussCoefficients = [[0, 0.5688889], [-0.5384693, 0.47862867], [0.5384693, 0.47862867], [-0.90617985, 0.23692688], [0.90617985, 0.23692688]];
const REPARAM_STEPS = 10;
const SAMPLE_ANGLE_LIMIT = 15;
const SAMPLE_STEP_DIST = 50;
function getTsInterpCurveMode(e) {
  return e;
}
function fromConfigCurveMode(e) {
  switch (e) {
    case IComponent_1.ESplineLine.Linear:
      return 0;
    case IComponent_1.ESplineLine.Curve:
      return 1;
    case IComponent_1.ESplineLine.Constant:
      return 2;
    case IComponent_1.ESplineLine.CurveCustomTangent:
      return 3;
    default:
      return 6;
  }
}
function splinePointTypeToCurveMode(e) {
  switch (e) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 5;
    case 4:
      return 3;
    default:
      return 6;
  }
}
class InterpCurvePointVector {
  constructor(e) {
    this.InVal = 0;
    this.OutVal = Vector_1.Vector.Create();
    this.ArriveTangent = Vector_1.Vector.Create();
    this.LeaveTangent = Vector_1.Vector.Create();
    this.InterpMode = 0;
    this.InterpMode = getTsInterpCurveMode(e);
  }
  DeepCopy(e) {
    this.InVal = e.InVal;
    this.OutVal.DeepCopy(e.OutVal);
    this.ArriveTangent.DeepCopy(e.ArriveTangent);
    this.LeaveTangent.DeepCopy(e.LeaveTangent);
    this.InterpMode = getTsInterpCurveMode(e.InterpMode);
  }
  Clear() {
    this.InVal = 0;
    this.ArriveTangent.Reset();
    this.LeaveTangent.Reset();
    this.OutVal.Reset();
  }
}
exports.InterpCurvePointVector = InterpCurvePointVector;
class InterpCurvePointQuat {
  constructor(e) {
    this.InVal = 0;
    this.OutVal = Quat_1.Quat.Create();
    this.ArriveTangent = Quat_1.Quat.Create();
    this.LeaveTangent = Quat_1.Quat.Create();
    this.InterpMode = 1;
    this.InterpMode = getTsInterpCurveMode(e);
  }
  DeepCopy(e) {
    this.InVal = e.InVal;
    this.OutVal.DeepCopy(e.OutVal);
    this.ArriveTangent.DeepCopy(e.ArriveTangent);
    this.LeaveTangent.DeepCopy(e.LeaveTangent);
    this.InterpMode = getTsInterpCurveMode(e.InterpMode);
  }
  Clear() {
    this.InVal = 0;
    this.ArriveTangent.Reset();
    this.LeaveTangent.Reset();
    this.OutVal.Reset();
  }
}
exports.InterpCurvePointQuat = InterpCurvePointQuat;
class InterpCurvePointNumber {
  constructor(e) {
    this.InVal = 0;
    this.OutVal = 0;
    this.ArriveTangent = 0;
    this.LeaveTangent = 0;
    this.InterpMode = 0;
    this.InterpMode = getTsInterpCurveMode(e);
  }
  DeepCopy(e) {
    this.InVal = e.InVal;
    this.OutVal = e.OutVal;
    this.ArriveTangent = e.ArriveTangent;
    this.LeaveTangent = e.LeaveTangent;
    this.InterpMode = getTsInterpCurveMode(e.InterpMode);
  }
  Clear() {
    this.InVal = 0;
    this.ArriveTangent = 0;
    this.LeaveTangent = 0;
    this.OutVal = 0;
  }
}
exports.InterpCurvePointNumber = InterpCurvePointNumber;
class SplineCurve {
  constructor(e = REPARAM_STEPS) {
    this.yXs = 0;
    this.SplineTransform = Transform_1.Transform.Create();
    this.gih = [];
    this.vXs = [];
    this.MXs = [];
    this.SXs = undefined;
    this.EXs = undefined;
    this.Q8c = Vector_1.Vector.Create(0, 0, 1);
    this.yXs = e;
    this.SplineTransform.Set(Vector_1.Vector.ZeroVectorProxy, Quat_1.Quat.IdentityProxy, Vector_1.Vector.OneVectorProxy);
  }
  InitPoints(t, i) {
    this.SplineTransform.Set(Vector_1.Vector.ZeroVectorProxy, Quat_1.Quat.IdentityProxy, Vector_1.Vector.OneVectorProxy);
    for (let e = this.vXs.length; e < t.length; e++) {
      this.vXs[e] = new InterpCurvePointVector(3);
    }
    for (let e = t.length; e < this.vXs.length; e++) {
      this.vXs.pop();
    }
    for (let e = 0; e < t.length; e++) {
      var r = t[e];
      if (r instanceof InterpCurvePointVector) {
        this.vXs[e].InterpMode = r.InterpMode;
        this.vXs[e].OutVal.FromConfigVector(r.OutVal);
      } else {
        this.vXs[e].InterpMode = fromConfigCurveMode(r.LineType);
        this.vXs[e].OutVal.FromConfigVector(r.Position);
      }
      this.vXs[e].InVal = e;
      this.vXs[e].ArriveTangent.FromConfigVector(r.ArriveTangent);
      this.vXs[e].LeaveTangent.FromConfigVector(r.LeaveTangent);
    }
    if (i) {
      this.SXs ||= [];
      for (let e = this.SXs.length; e < i.length; e++) {
        this.SXs[e] = new InterpCurvePointQuat(1);
      }
      for (let e = i.length; e < this.SXs.length; e++) {
        this.SXs.pop();
      }
      for (let e = 0; e < i.length; e++) {
        var n = i[e];
        this.SXs[e].InterpMode = n.InterpMode;
        this.SXs[e].OutVal.FromUeQuat(n.OutVal);
        this.SXs[e].InVal = e;
        this.SXs[e].ArriveTangent.FromUeQuat(n.ArriveTangent);
        this.SXs[e].LeaveTangent.FromUeQuat(n.LeaveTangent);
      }
    } else {
      this.SXs = undefined;
    }
    this.UpdateSplineCurves();
    this.EXs = undefined;
  }
  Init(t, i, r, n) {
    this.SplineTransform.Set(Vector_1.Vector.ZeroVectorProxy, Quat_1.Quat.IdentityProxy, Vector_1.Vector.OneVectorProxy);
    if (t instanceof UE.InterpCurveVector) {
      for (let e = this.vXs.length; e < t.Points.Num(); e++) {
        this.vXs[e] = new InterpCurvePointVector(3);
      }
      for (let e = 0; e < t.Points.Num(); e++) {
        this.vXs[e].DeepCopy(t.Points.Get(e));
      }
    } else {
      for (let e = this.vXs.length; e < t.Num(); e++) {
        this.vXs[e] = new InterpCurvePointVector(3);
      }
      for (let e = t.Num(); e < this.vXs.length; e++) {
        this.vXs.pop();
      }
      for (let e = 0; e < t.Num(); e++) {
        var s = t.Get(e);
        this.vXs[e].InVal = s.InputKey;
        this.vXs[e].ArriveTangent.DeepCopy(s.ArriveTangent);
        this.vXs[e].LeaveTangent.DeepCopy(s.LeaveTangent);
        this.vXs[e].OutVal.DeepCopy(s.Position);
        this.vXs[e].InterpMode = splinePointTypeToCurveMode(s.Type);
      }
    }
    if (i) {
      for (let e = this.MXs.length; e < i.Num(); e++) {
        this.MXs[e] = new InterpCurvePointNumber(0);
      }
      for (let e = i.Num(); e < this.MXs.length; e++) {
        this.MXs.pop();
      }
      for (let e = 0; e < i.Num(); e++) {
        this.MXs[e].DeepCopy(i.Get(e));
      }
    } else {
      this.UpdateSplineCurves();
    }
    if (r) {
      this.SXs ||= [];
      for (let e = this.SXs.length; e < r.Points.Num(); e++) {
        this.SXs[e] = new InterpCurvePointQuat(1);
      }
      for (let e = r.Points.Num(); e < this.SXs.length; e++) {
        this.SXs.pop();
      }
      for (let e = 0; e < r.Points.Num(); e++) {
        this.SXs[e].DeepCopy(r.Points.Get(e));
      }
    } else {
      this.SXs = undefined;
    }
    if (n) {
      this.EXs ||= [];
      for (let e = this.EXs.length; e < n.Points.Num(); e++) {
        this.EXs[e] = new InterpCurvePointVector(1);
      }
      for (let e = n.Points.Num(); e < this.EXs.length; e++) {
        this.EXs.pop();
      }
      for (let e = 0; e < n.Points.Num(); e++) {
        this.EXs[e].DeepCopy(n.Points.Get(e));
      }
    } else {
      this.EXs = undefined;
    }
  }
  GetPointsWithSampling() {
    var r = [];
    for (let e = 0, i = this.GetSplinePointsNum(); e < i; e++) {
      var n = new InterpCurvePointVector(3);
      n.DeepCopy(this.vXs[e]);
      n.InVal = r.length;
      r.push(n);
      this.GetDirectionAtSplinePoint(e, 0, SplineCurve.jye);
      let t = SplineCurve.jye;
      if (e < i - 1) {
        var n = this.GetDistanceAlongSplineAtSplinePoint(e);
        var s = this.GetDistanceAlongSplineAtSplinePoint(e + 1);
        for (let e = n + SAMPLE_STEP_DIST; e < s; e += SAMPLE_STEP_DIST) {
          this.GetDirectionAtDistanceAlongSpline(e, 0, SplineCurve.RTe);
          var o = SplineCurve.RTe;
          if (!(MathUtils_1.MathUtils.GetAngleByVectorDot(t, o) < SAMPLE_ANGLE_LIMIT)) {
            t = o;
            o = new InterpCurvePointVector(3);
            this.GetLocationAtDistanceAlongSpline(e, 0, SplineCurve.sqn);
            o.InVal = r.length;
            o.ArriveTangent.DeepCopy(SplineCurve.RTe);
            o.LeaveTangent.DeepCopy(SplineCurve.RTe);
            o.OutVal.DeepCopy(SplineCurve.sqn);
            r.push(o);
          }
        }
      }
    }
    return r;
  }
  GetSplinePointsNum() {
    return this.Position.length;
  }
  SetSplineTransform(e, t) {
    var i;
    if (e instanceof Transform_1.Transform) {
      this.SplineTransform.Set(e.GetLocation(), e.GetRotation(), e.GetScale3D());
    } else {
      i = Vector_1.Vector.Create(e.Pos.X ?? 0, e.Pos.Y ?? 0, e.Pos.Z ?? 0);
      this.SplineTransform.SetLocation(i);
      i = Rotator_1.Rotator.Create(e.Rot?.Y ?? 0, e.Rot?.Z ?? 0, e.Rot?.X ?? 0);
      this.SplineTransform.SetRotation(i.Quaternion());
      i = Vector_1.Vector.Create(e.Scale?.X ?? 1, e.Scale?.Y ?? 1, e.Scale?.Z ?? 1);
      this.SplineTransform.SetScale3D(i);
    }
    if (t) {
      this.UpdateSplineCurves();
    }
  }
  SetReferenceUp(e) {
    e.Normalize();
    this.Q8c.DeepCopy(e);
  }
  get Position() {
    return this.vXs;
  }
  get Rotation() {
    return this.SXs;
  }
  get Scale() {
    return this.EXs;
  }
  get ReparamTable() {
    return this.MXs;
  }
  get WorldPositionList() {
    if (!(this.gih.length > 0)) {
      this.gih = [];
      for (let e = 0; e < this.GetSplinePointsNum(); e++) {
        var t = Vector_1.Vector.Create();
        this.GetWorldLocationAtSplinePoint(e, t);
        this.gih.push(t);
      }
    }
    return this.gih;
  }
  UpdateSplineCurves(e = 0) {
    var t = this.Position.length;
    var i = t - 1;
    var r = i * this.yXs + 1;
    for (let e = this.MXs.length; e < r; e++) {
      this.MXs[e] = new InterpCurvePointNumber(0);
    }
    for (let e = r; e < this.MXs.length; e++) {
      this.MXs.pop();
    }
    for (let e = 1; e < t; e++) {
      if (this.Position[e - 1].InVal >= this.Position[e].InVal) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Movement", 42, "TsAnimNotifyStateCurveMove曲线初始化异常,Position.Points的InVal非严格递增");
        }
        return false;
      }
    }
    let n = -0;
    let s = 0;
    if (e > 0) {
      s = e * this.yXs;
      n += this.ReparamTable[s].InVal;
    }
    for (let t = e; t < i; t++) {
      for (let e = 0; e < this.yXs; e++) {
        var o = e / this.yXs;
        var u = e === 0 ? 0 : this.IXs(t, o);
        const h = this.ReparamTable[s];
        h.InVal = u + n;
        h.OutVal = t + o;
        s++;
      }
      n += this.IXs(t, 1);
    }
    const h = this.ReparamTable[s];
    h.InVal = n;
    h.OutVal = i;
    return true;
  }
  IXs(e, t) {
    var i = this.Position.length;
    var r = this.Position[e];
    var i = this.Position[e === i - 1 ? 0 : e + 1];
    var e = r.OutVal;
    var n = r.LeaveTangent;
    var s = i.OutVal;
    var i = i.ArriveTangent;
    if (r.InterpMode === 0) {
      SplineCurve.jye.DeepCopy(e);
      SplineCurve.fHo.DeepCopy(s);
      SplineCurve.fHo.Subtraction(SplineCurve.jye, SplineCurve.jye);
      return SplineCurve.jye.Size() * t;
    }
    if (r.InterpMode === 2) {
      return 0;
    }
    SplineCurve.jye.DeepCopy(e);
    SplineCurve.fHo.DeepCopy(s);
    SplineCurve.pHo.DeepCopy(n);
    SplineCurve.vHo.DeepCopy(i);
    SplineCurve.jye.Subtraction(SplineCurve.fHo, SplineCurve.CXs);
    SplineCurve.CXs.MultiplyEqual(2);
    SplineCurve.CXs.AdditionEqual(SplineCurve.pHo);
    SplineCurve.CXs.AdditionEqual(SplineCurve.vHo);
    SplineCurve.CXs.MultiplyEqual(3);
    SplineCurve.Lz.DeepCopy(n);
    SplineCurve.Lz.MultiplyEqual(4);
    SplineCurve.Tz.DeepCopy(i);
    SplineCurve.Tz.MultiplyEqual(2);
    SplineCurve.fHo.Subtraction(SplineCurve.jye, SplineCurve.gXs);
    SplineCurve.gXs.MultiplyEqual(6);
    SplineCurve.gXs.SubtractionEqual(SplineCurve.Lz);
    SplineCurve.gXs.SubtractionEqual(SplineCurve.Tz);
    var o = t * 0.5;
    let u = -0;
    for (const v of LegendreGaussCoefficients) {
      var h = o * (1 + v[0]);
      SplineCurve.Lz.DeepCopy(SplineCurve.CXs);
      SplineCurve.Lz.MultiplyEqual(h);
      SplineCurve.Lz.AdditionEqual(SplineCurve.gXs);
      SplineCurve.Lz.MultiplyEqual(h);
      SplineCurve.Lz.AdditionEqual(SplineCurve.pHo);
      u += SplineCurve.Lz.Size() * v[1];
    }
    return u *= o;
  }
  GetSplineLength() {
    var e;
    if (this.Position.length > 0) {
      e = this.ReparamTable.length - 1;
      return this.ReparamTable[e].InVal;
    } else {
      return 0;
    }
  }
  GetSplineLengthAtPoint(e) {
    if (this.Position.length > 0) {
      e = this.yXs * e;
      return this.ReparamTable[e].InVal;
    } else {
      return 0;
    }
  }
  GetSplineLengthAtPointRange(e, t) {
    if (this.Position.length > t) {
      e = this.yXs * e;
      t = this.yXs * t;
      return this.ReparamTable[t].InVal - this.ReparamTable[e].InVal;
    } else {
      return 0;
    }
  }
  GetWorldLocationAtSplinePoint(e, t) {
    e = this.Position[e];
    SplineCurve.jye.DeepCopy(e.OutVal);
    this.SplineTransform.TransformPosition(SplineCurve.jye, t);
  }
  GetWorldLocationAtDistanceAlongSpline(e, t) {
    e = this.TXs(this.ReparamTable, e);
    this.LXs(e, 1, t);
  }
  GetLocationAtSplinePoint(e, t, i) {
    e = this.Position[e];
    SplineCurve.jye.DeepCopy(e.OutVal);
    if (t === 1) {
      this.SplineTransform.TransformPosition(SplineCurve.jye, i);
    } else {
      i.DeepCopy(SplineCurve.jye);
    }
  }
  GetLocationAtDistanceAlongSpline(e, t, i) {
    e = this.TXs(this.ReparamTable, e);
    this.LXs(e, t, i);
  }
  SetLocationAtSplinePoint(e, t, i, r) {
    var n = this.Position.length;
    if (e >= 0 && e < n) {
      if (i === 1) {
        this.SplineTransform.InverseTransformPosition(t, SplineCurve.jye);
      } else {
        SplineCurve.jye.DeepCopy(t);
      }
      this.Position[e].OutVal.X = SplineCurve.jye.X;
      this.Position[e].OutVal.Y = SplineCurve.jye.Y;
      this.Position[e].OutVal.Z = SplineCurve.jye.Z;
    }
    if (r) {
      this.UpdateSplineCurves(e - 1);
    }
  }
  GetTransformAtSplineIndex(e, t, i) {
    e = this.ReparamTable[e * this.yXs].InVal;
    e = this.TXs(this.ReparamTable, e);
    this.fih(e, t, i);
  }
  GetTransformAtRateAlongSpline(e, t, i) {
    var r = this.ReparamTable[this.ReparamTable.length - 1].InVal;
    var r = this.TXs(this.ReparamTable, r * e);
    this.fih(r, t, i);
  }
  GetTransformAtDistanceAlongSpline(e, t, i) {
    e = this.TXs(this.ReparamTable, e);
    this.fih(e, t, i);
  }
  GetInputKeyAtDistanceAlongSpline(e) {
    return this.TXs(this.ReparamTable, e);
  }
  GetNearestPositionIndexAtInputKey(e) {
    return this.PXs(this.Position, e);
  }
  fih(e, t, i) {
    this.LXs(e, 0, SplineCurve.jye);
    this.AXs(e, 0, SplineCurve.RTe);
    this.DXs(e, 0, SplineCurve.jJo);
    SplineCurve.Z_e.SetLocation(SplineCurve.jye);
    SplineCurve.Z_e.SetRotation(SplineCurve.jJo);
    SplineCurve.Z_e.SetScale3D(SplineCurve.RTe);
    if (t === 1) {
      SplineCurve.Z_e.ComposeTransforms(this.SplineTransform, i);
    }
  }
  GetDistanceAlongSplineAtSplinePoint(e) {
    e *= this.yXs;
    if (this.ReparamTable.length <= e) {
      return 0;
    } else {
      return this.ReparamTable[e].InVal;
    }
  }
  GetDistanceAlongSplineAtSplineInputKey(e) {
    var t;
    var i;
    var r = this.Position.length - 1;
    if (e >= 0 && e < r) {
      i = (t = MathUtils_1.MathUtils.GetFloatPointFloor(e)) * this.yXs;
      return this.ReparamTable[i].InVal + this.IXs(t, e - t);
    } else if (r <= e) {
      return this.GetSplineLength();
    } else {
      return 0;
    }
  }
  GetDirectionAtSplinePoint(e, t, i) {
    if (t === 1) {
      this.SplineTransform.TransformVector(this.Position[e].LeaveTangent, i);
    } else {
      i.DeepCopy(this.Position[e].LeaveTangent);
    }
    i.Normalize();
  }
  GetDirectionAtDistanceAlongSpline(e, t, i) {
    e = this.TXs(this.ReparamTable, e);
    this.pih(e, t, i);
  }
  pih(e, t, i) {
    this.xXs(this.Position, e, i);
    if (t === 1) {
      this.SplineTransform.TransformVector(i, i);
    }
    i.Normalize();
  }
  LXs(e, t, i) {
    this.UXs(this.Position, e, i);
    if (t === 1) {
      this.SplineTransform.TransformPosition(i, i);
    }
  }
  AXs(e, t, i) {
    if (this.Scale) {
      this.UXs(this.Scale, e, i);
    } else {
      i.DeepCopy(Vector_1.Vector.OneVectorProxy);
    }
    if (t === 1) {
      this.SplineTransform.TransformPosition(i, i);
    }
  }
  DXs(e, t, i) {
    this.xXs(this.Position, e, SplineCurve.sqn);
    SplineCurve.sqn.GetSafeNormal(SplineCurve.sqn);
    if (this.Rotation) {
      this.RXs(this.Rotation, e, SplineCurve.pXs);
      SplineCurve.pXs.Normalize();
      SplineCurve.Lz.DeepCopy(Vector_1.Vector.UpVectorProxy);
      SplineCurve.pXs.RotateVector(SplineCurve.Lz, SplineCurve.Lz);
    } else {
      this.SplineTransform.GetRotation().Inverse(SplineCurve.KJ);
      SplineCurve.KJ.RotateVector(this.Q8c, SplineCurve.Lz);
    }
    MathUtils_1.MathUtils.LookRotationForwardFirst(SplineCurve.sqn, SplineCurve.Lz, i);
    if (t === 1) {
      this.SplineTransform.GetRotation().Multiply(i, i);
    }
  }
  RXs(e, t, i, r = Quat_1.Quat.IdentityProxy) {
    var n = e.length;
    var s = n - 1;
    if (n === 0) {
      i.DeepCopy(r);
    } else {
      var o;
      var u;
      var n = this.PXs(e, t);
      if (n < 0) {
        i.DeepCopy(e[0].OutVal);
      } else {
        if (n !== s) {
          r = e[n];
          if ((u = (o = e[n + 1]).InVal - r.InVal) > 0 && r.InterpMode !== 2) {
            if ((t = (t - r.InVal) / u) < 0 || t > 1) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Movement", 42, "TsAnimNotifyStateCurveMove.InterpVectorEvalDerivative计算Alpha异常");
              }
              return;
            } else if (r.InterpMode === 0) {
              SplineCurve.az.DeepCopy(r.OutVal);
              SplineCurve.KJ.DeepCopy(o.OutVal);
              Quat_1.Quat.Slerp(SplineCurve.az, SplineCurve.KJ, t, i);
              return;
            } else {
              SplineCurve.az.DeepCopy(r.OutVal);
              SplineCurve.KJ.DeepCopy(r.LeaveTangent);
              SplineCurve.KJ.Multiply(u, SplineCurve.KJ);
              SplineCurve.QJ.DeepCopy(o.OutVal);
              SplineCurve.fXs.DeepCopy(o.ArriveTangent);
              SplineCurve.fXs.Multiply(u, SplineCurve.KJ);
              Quat_1.Quat.Squad(SplineCurve.az, SplineCurve.KJ, SplineCurve.QJ, SplineCurve.fXs, t, i);
              return;
            }
          } else {
            i.DeepCopy(e[n].OutVal);
            return;
          }
        }
        i.DeepCopy(e[s].OutVal);
      }
    }
  }
  UXs(e, t, i, r = Vector_1.Vector.ZeroVectorProxy) {
    var n = e.length;
    var s = n - 1;
    if (n === 0) {
      i.DeepCopy(r);
    } else {
      var o;
      var u;
      var n = this.PXs(e, t);
      if (n < 0) {
        i.DeepCopy(e[0].OutVal);
      } else {
        if (n !== s) {
          r = e[n];
          if ((u = (o = e[n + 1]).InVal - r.InVal) > 0 && r.InterpMode !== 2) {
            if ((t = (t - r.InVal) / u) < 0 || t > 1) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Movement", 42, "TsAnimNotifyStateCurveMove.InterpVectorEvalDerivative计算Alpha异常");
              }
              return;
            } else if (r.InterpMode === 0) {
              SplineCurve.Lz.DeepCopy(r.OutVal);
              SplineCurve.Tz.DeepCopy(o.OutVal);
              Vector_1.Vector.Lerp(SplineCurve.Lz, SplineCurve.Tz, t, i);
              return;
            } else {
              SplineCurve.Lz.DeepCopy(r.OutVal);
              SplineCurve.Tz.DeepCopy(r.LeaveTangent);
              SplineCurve.Tz.MultiplyEqual(u);
              SplineCurve.fHo.DeepCopy(o.OutVal);
              SplineCurve.pHo.DeepCopy(o.ArriveTangent);
              SplineCurve.pHo.MultiplyEqual(u);
              Vector_1.Vector.LerpCubic(SplineCurve.Lz, SplineCurve.Tz, SplineCurve.fHo, SplineCurve.pHo, t, i);
              return;
            }
          } else {
            i.DeepCopy(e[n].OutVal);
            return;
          }
        }
        i.DeepCopy(e[s].OutVal);
      }
    }
  }
  TXs(e, t, i = 0) {
    var r;
    var n;
    var s = e.length;
    var o = s - 1;
    if (s === 0) {
      return i;
    } else if ((s = this.PXs(e, t)) < 0) {
      return e[0].OutVal;
    } else if (s === o) {
      return e[o].OutVal;
    } else {
      o = e[s];
      if ((n = (r = e[s + 1]).InVal - o.InVal) > 0 && o.InterpMode !== 2) {
        if ((t = (t - o.InVal) / n) < 0 || t > 1) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Movement", 42, "TsAnimNotifyStateCurveMove.InterpVectorEvalDerivative计算Alpha异常");
          }
          return i;
        } else if (o.InterpMode === 0) {
          return MathUtils_1.MathUtils.Lerp(o.OutVal, r.OutVal, t);
        } else {
          return MathUtils_1.MathUtils.LerpCubic(o.OutVal, o.LeaveTangent * n, r.OutVal, r.ArriveTangent * n, t);
        }
      } else {
        return e[s].OutVal;
      }
    }
  }
  xXs(e, t, i, r = Vector_1.Vector.ZeroVectorProxy) {
    var n = e.length;
    var s = n - 1;
    if (n === 0) {
      i.DeepCopy(r);
    } else {
      var o;
      var u;
      var n = this.PXs(e, t);
      if (n < 0) {
        i.DeepCopy(e[0].LeaveTangent);
      } else {
        if (n !== s) {
          r = e[n];
          if ((u = (o = e[n + 1]).InVal - r.InVal) > 0 && r.InterpMode !== 2) {
            if (r.InterpMode === 0) {
              SplineCurve.Lz.DeepCopy(r.OutVal);
              i.DeepCopy(o.OutVal);
              i.SubtractionEqual(SplineCurve.Lz);
              i.DivisionEqual(u);
              return;
            } else if ((t = (t - r.InVal) / u) < 0 || t > 1) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Movement", 42, "TsAnimNotifyStateCurveMove.InterpVectorEvalDerivative计算Alpha异常");
              }
              return;
            } else {
              SplineCurve.Lz.DeepCopy(r.OutVal);
              SplineCurve.Tz.DeepCopy(r.LeaveTangent);
              SplineCurve.Tz.MultiplyEqual(u);
              SplineCurve.fHo.DeepCopy(o.OutVal);
              SplineCurve.pHo.DeepCopy(o.ArriveTangent);
              SplineCurve.pHo.MultiplyEqual(u);
              Vector_1.Vector.LerpCubicDerivative(SplineCurve.Lz, SplineCurve.Tz, SplineCurve.fHo, SplineCurve.pHo, t, i);
              i.DivisionEqual(u);
              return;
            }
          } else {
            i.DeepCopy(e[n].OutVal);
            return;
          }
        }
        i.DeepCopy(e[s].ArriveTangent);
      }
    }
  }
  PXs(e, t) {
    var i = e.length;
    var r = i - 1;
    if (t < e[0].InVal) {
      return -1;
    }
    if (t >= e[r].InVal) {
      return r;
    }
    let n = 0;
    let s = i;
    var o;
    for (Math.floor((n + s) / 2); s - n > 1;) {
      if (e[o = Math.floor((n + s) / 2)].InVal <= t) {
        n = o;
      } else {
        s = o;
      }
    }
    return n;
  }
}
(exports.SplineCurve = SplineCurve).jye = Vector_1.Vector.Create();
SplineCurve.RTe = Vector_1.Vector.Create();
SplineCurve.sqn = Vector_1.Vector.Create();
SplineCurve.Lz = Vector_1.Vector.Create();
SplineCurve.Tz = Vector_1.Vector.Create();
SplineCurve.fHo = Vector_1.Vector.Create();
SplineCurve.pHo = Vector_1.Vector.Create();
SplineCurve.vHo = Vector_1.Vector.Create();
SplineCurve.CXs = Vector_1.Vector.Create();
SplineCurve.gXs = Vector_1.Vector.Create();
SplineCurve.jJo = Quat_1.Quat.Create();
SplineCurve.az = Quat_1.Quat.Create();
SplineCurve.KJ = Quat_1.Quat.Create();
SplineCurve.QJ = Quat_1.Quat.Create();
SplineCurve.fXs = Quat_1.Quat.Create();
SplineCurve.pXs = Quat_1.Quat.Create();
SplineCurve.Z_e = Transform_1.Transform.Create(); //# sourceMappingURL=SplineCurve.js.map