"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleRailMoveUtils = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const MotorcycleRailMoveDefine_1 = require("./MotorcycleRailMoveDefine");
class MotorcycleRailMoveUtils {
  static ExecCheckList(e, o, r = [], i = false, a) {
    for (let t = 0; t < r.length; t++) {
      if (!(0, r[t])(e, o)) {
        if (i && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("MotorRailMove", 39, "[MotorcycleRailMoveUtils] ExecCheckList not pass", ["Source", a], ["CheckerIndex", t]);
        }
        return false;
      }
    }
    if (i && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("MotorRailMove", 39, "[MotorcycleRailMoveUtils] ExecCheckList pass", ["Source", a]);
    }
    return true;
  }
  static CalcRailMoveTargetNotAdvanceBySpeed(t, e, o) {
    var r = t.RailSpline;
    if (!r) {
      return false;
    }
    var i = t.IsForward;
    var a = t.RailMoveTarget;
    var l = t.SourceLoc;
    var t = t.SourceVel;
    a.TargetSpline = r;
    a.IsForward = i;
    a.TargetSplineInputKey = r.FindInputKeyClosestToWorldLocation(l);
    a.TargetSplineDist = r.GetDistanceAlongSplineAtSplineInputKey(a.TargetSplineInputKey);
    r.GetDirectionAtSplineInputKey(a.TargetSplineInputKey, 1, a.TargetSplineDir);
    r.GetRotationAtSplineInputKey(a.TargetSplineInputKey, 1, a.TargetSplineRot);
    r.GetLocationAtSplineInputKey(a.TargetSplineInputKey, 1, a.TargetLoc);
    var l = this.dHo;
    var r = this.Tz;
    if (i) {
      r.DeepCopy(a.TargetSplineDir);
    } else {
      a.TargetSplineDir.UnaryNegation(r);
    }
    i = (i = t.DotProduct(r)) > 0 ? i : 0;
    i = MathUtils_1.MathUtils.Clamp(i, e, o);
    a.TargetSplineDir.Multiply(i, a.TargetVel);
    return !r.IsZero() && (MathUtils_1.MathUtils.LookRotationForwardFirst(r, a.TargetSplineRot.Quaternion().GetUpVector(l), a.TargetRot), true);
  }
  static CalcRailMoveTargetAdvanceBySpeed(t, e, o, r) {
    var i = t.RailSpline;
    if (!i) {
      return false;
    }
    var a = t.IsForward;
    var l = t.RailMoveTarget;
    var M = t.SourceLoc;
    var t = t.SourceVel;
    l.TargetSpline = i;
    l.IsForward = a;
    var s = i.GetSplineLength();
    var c = i.FindInputKeyClosestToWorldLocation(M);
    var _ = MathUtils_1.MathUtils.Clamp(i.GetDistanceAlongSplineAtSplineInputKey(c), 0, s);
    var h = this.dHo;
    var v = this.Tz;
    var U = this.fHo;
    var n = this.pHo;
    var R = this.vHo;
    i.GetDirectionAtSplineInputKey(c, 1, h);
    i.GetLocationAtSplineInputKey(c, 1, v);
    if (a) {
      n.DeepCopy(h);
    } else {
      h.UnaryNegation(n);
    }
    var c = Vector_1.Vector.PointPlaneDist(M, v, n);
    var h = (h = t.DotProduct(n)) > 0 ? h : 0;
    h = MathUtils_1.MathUtils.Clamp(h, o, r);
    let u = 0;
    u = h === 0 ? 0 : c < 0 ? h * Math.max(0, e - -c / h) : h * e;
    l.TargetSplineDist = a ? MathUtils_1.MathUtils.Clamp(_ + u, 0, s) : MathUtils_1.MathUtils.Clamp(_ - u, 0, s);
    l.TargetSplineInputKey = i.GetInputKeyAtDistanceAlongSpline(l.TargetSplineDist);
    i.GetRotationAtSplineInputKey(l.TargetSplineInputKey, 1, l.TargetSplineRot);
    i.GetDirectionAtSplineInputKey(l.TargetSplineInputKey, 1, l.TargetSplineDir);
    i.GetLocationAtSplineInputKey(l.TargetSplineInputKey, 1, l.TargetLoc);
    if (a) {
      R.DeepCopy(l.TargetSplineDir);
    } else {
      l.TargetSplineDir.UnaryNegation(R);
    }
    return !R.IsZero() && (MathUtils_1.MathUtils.LookRotationForwardFirst(R, l.TargetSplineRot.Quaternion().GetUpVector(U), l.TargetRot), R.Multiply(h, l.TargetVel), true);
  }
  static GetDistanceFromTargetToRail(t, e) {
    if (e(MathUtils_1.MathUtils.CommonTempVector)) {
      e = t.D_FindInputKeyClosestToWorldLocation(MathUtils_1.MathUtils.CommonTempVector.ToUeVector());
      t = t.D_GetLocationAtSplineInputKey(e, 1);
      return MathUtils_1.MathUtils.VectorDistance(t, MathUtils_1.MathUtils.CommonTempVector);
    } else {
      return -1;
    }
  }
  static GetRailRelativeSideOfTarget(t, e) {
    var o = this.dHo;
    var r = this.Tz;
    var i = this.KKf;
    if (e(o, i)) {
      e = t.D_FindInputKeyClosestToWorldLocation(o.ToUeVector());
      r.FromUeVector(t.D_GetLocationAtSplineInputKey(e, 1));
      r.SubtractionEqual(o);
      i.Quaternion(MathUtils_1.MathUtils.CommonTempQuat).UnRotateVector(r, r);
      if (MathUtils_1.MathUtils.IsNearlyZero(r.Y)) {
        return 1;
      } else if (r.Y < 0) {
        return 0;
      } else {
        return 2;
      }
    }
  }
  static UpdateRailMoveConfig(t, e, o) {
    var r = MotorcycleRailMoveDefine_1.DEFAULT_MOTOR_RAIL_MOVE_CONFIG_NAME;
    if (t !== r) {
      this.UpdateRailMoveConfig(r, e, o);
    }
    var r = o(t);
    if (r) {
      e.UpdateFromUeData(r);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveUtils] UpdateRailMoveConfig失败，找不到对应行的数据", ["targetRowName", t]);
    }
  }
}
exports.MotorcycleRailMoveUtils = MotorcycleRailMoveUtils;
(_a = MotorcycleRailMoveUtils).dHo = Vector_1.Vector.Create();
MotorcycleRailMoveUtils.Tz = Vector_1.Vector.Create();
MotorcycleRailMoveUtils.fHo = Vector_1.Vector.Create();
MotorcycleRailMoveUtils.pHo = Vector_1.Vector.Create();
MotorcycleRailMoveUtils.vHo = Vector_1.Vector.Create();
MotorcycleRailMoveUtils.KKf = Rotator_1.Rotator.Create();
MotorcycleRailMoveUtils.RailMoveCheckerCheckRelativeLocation = (t, e) => {
  if (!e) {
    return false;
  }
  var o = t.RailMoveTarget;
  var t = t.SourceLoc;
  var r = o.IsForward;
  if (!o.TargetSpline) {
    return false;
  }
  if (r && MathUtils_1.MathUtils.IsNearlyZero(o.TargetSplineDist) || !r && MathUtils_1.MathUtils.IsNearlyZero(o.TargetSpline.GetSplineLength() - o.TargetSplineDist)) {
    return true;
  }
  r = _a.dHo;
  t.Subtraction(o.TargetLoc, r);
  o.TargetRot.Quaternion().UnRotateVector(r, r);
  let i = 0;
  if (MathUtils_1.MathUtils.IsNearlyZero(r.Z)) {
    i = MathUtils_1.MathUtils.IsNearlyZero(r.Y) ? 0 : 90;
  } else if ((i = Math.atan(Math.abs(r.Y) / r.Z) * MathCommon_1.MathCommon.RadToDeg) < 0) {
    i += 180;
  }
  return i <= e.MaxAngleBetweenTargetUpAndDirPlaneProjectionOfTargetToCurrent;
};
MotorcycleRailMoveUtils.RailMoveCheckerCheckVehicleNotReverseMove = t => {
  var e = _a.dHo;
  t.SourceRot.Quaternion().GetForwardVector(e);
  return !(t.SourceVel.DotProduct(e) < 0);
};
MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleUpAndRailUp = (t, e) => {
  var o;
  var r;
  return !!e && !(o = _a.dHo, r = _a.dHo, t.RailMoveTarget.TargetSplineRot.Quaternion().GetUpVector(r), t.SourceRot.Quaternion().GetUpVector(o), MathUtils_1.MathUtils.GetAngleByVectorDot(r, o) > e.MaxAngleBetweenUpAndRailUp);
};
MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleForwardAndRailTangent = (t, e) => {
  if (!e) {
    return false;
  }
  var o = _a.dHo;
  var r = _a.Tz;
  if (t.RailMoveTarget.IsForward) {
    r.DeepCopy(t.RailMoveTarget.TargetSplineDir);
  } else {
    t.RailMoveTarget.TargetSplineDir.UnaryNegation(r);
  }
  if (r.IsZero()) {
    return false;
  }
  t.SourceRot.Quaternion().GetForwardVector(o);
  t = MathUtils_1.MathUtils.GetAngleByVectorDot(r, o);
  return !(Math.abs(t) > e.MaxAngleBetweenForwardAndRailTangent);
};
MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleVelocityAndRailTangent = (t, e) => {
  if (!e) {
    return false;
  }
  var o = _a.dHo;
  if (t.RailMoveTarget.IsForward) {
    o.DeepCopy(t.RailMoveTarget.TargetSplineDir);
  } else {
    t.RailMoveTarget.TargetSplineDir.UnaryNegation(o);
  }
  if (o.IsZero()) {
    return false;
  }
  if (!t.SourceVel.IsNearlyZero()) {
    o = MathUtils_1.MathUtils.GetAngleByVectorDot(o, t.SourceVel);
    if (Math.abs(o) > e.MaxAngleBetweenVelocityAndRailTangent) {
      return false;
    }
  }
  return true;
};
MotorcycleRailMoveUtils.RailMoveCheckerCheckRailLenLeft = (t, e) => {
  var t = t.RailMoveTarget;
  var o = t.IsForward;
  return !!t.TargetSpline && (o ? t.TargetSpline.GetSplineLength() - t.TargetSplineDist > (e?.MinRailLenLeftAfterEnterRail ?? 0) : t.TargetSplineDist > (e?.MinRailLenLeftAfterEnterRail ?? 0));
}; //# sourceMappingURL=MotorcycleRailMoveUtils.js.map