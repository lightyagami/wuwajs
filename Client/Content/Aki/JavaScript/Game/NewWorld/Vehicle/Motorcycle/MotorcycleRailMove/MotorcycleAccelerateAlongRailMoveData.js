"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleAccelerateAlongRailMoveData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const MotorcycleRailMoveConfigs_1 = require("./MotorcycleRailMoveConfigs");
const MotorcycleRailMoveDataBase_1 = require("./MotorcycleRailMoveDataBase");
class MotorcycleAccelerateAlongRailMoveData extends MotorcycleRailMoveDataBase_1.MotorcycleRailMoveDataBase {
  constructor(t, i) {
    super("AccelerateAlongRail", t, i);
    this.MoveConfig = new MotorcycleRailMoveConfigs_1.MotorcycleRailMoveConfig();
    this.Spline = undefined;
    this.SplinePointOptions = [];
    this.MoveUpdater = undefined;
    this.MoveGetter = undefined;
    this.lLo = 0;
    this.Txa = 0;
    this.qsn = 0;
    this.ORm = 0;
    this.GRm = true;
    this.I1e = Vector_1.Vector.Create();
    this.cce = Rotator_1.Rotator.Create();
    this.dHo = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
    this.fHo = Vector_1.Vector.Create();
    this.pHo = Vector_1.Vector.Create();
    this.vHo = Vector_1.Vector.Create();
    this.sBg = Transform_1.Transform.Create();
    this.vEf = false;
    this.EVf = 0;
    this.fag = -1;
  }
  get WRf() {
    return this.MoveConfig.AccelerateAlongRailConfig.LinearMoveConfig;
  }
  get ojo() {
    return this.MoveConfig.AccelerateAlongRailConfig.CommonConfig;
  }
  get IVf() {
    return this.MoveConfig.BasicRailMoveConfig;
  }
  OnTick(t) {
    this.TickUpdateMove(t);
    this.TVf(t);
    this.aBg();
    this.FRm();
  }
  OnEnter(t) {
    if (!this.Spline) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleAccelerateAlongRailMoveData] OnEnter Failed: Spline is undefined", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    if (!this.MoveGetter?.(this.I1e, this.cce)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleAccelerateAlongRailMoveData] OnEnter Failed: 拿不到位置旋转", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    var i = this.Spline.FindInputKeyClosestToWorldLocation(this.I1e);
    this.ORm = MathUtils_1.MathUtils.Clamp(this.Spline.GetDistanceAlongSplineAtSplineInputKey(i), 0, this.Spline.GetSplineLength());
    this.Spline.GetLocationAtSplineInputKey(i, 1, this.I1e);
    var i = this.dHo;
    var s = this.Tz;
    var h = this.fHo;
    var e = this.pHo;
    var o = this.vHo;
    if (!t?.GetVelocity(i) && !this.MoveGetter(undefined, undefined, i)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleAccelerateAlongRailMoveData] OnEnter Failed: 拿不到速度", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    if (i.IsNearlyZero(1)) {
      i.Reset();
    }
    this.cce.Quaternion().GetForwardVector(s);
    if (s.IsNearlyZero()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleAccelerateAlongRailMoveData] OnEnter Failed: 朝向出错", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    t = MathUtils_1.MathUtils.DotProduct(i, s);
    if (!i.IsNearlyZero() && t < 0 && (s.Multiply(t, h), i.SubtractionEqual(h), i.IsNearlyZero(1))) {
      i.Reset();
    }
    this.Spline.GetDirectionAtDistanceAlongSpline(this.ORm, 1, e);
    t = Vector_1.Vector.DotProduct(e, s);
    if (MathUtils_1.MathUtils.IsNearlyZero(t)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleAccelerateAlongRailMoveData] OnEnter Failed: 朝向和样条方向点乘为0", ["SplineId", this.RelatedRail?.GetRailSplineId()], ["SplineDir", e], ["CurrentRotForward", s]);
      }
      return false;
    }
    this.GRm = t > 0;
    if (!this.GRm) {
      e.UnaryNegation(e);
    }
    var r;
    var a;
    var h = Vector_1.Vector.DotProduct(e, i);
    this.lLo = MathUtils_1.MathUtils.Clamp(Math.abs(h), this.WRf.MinSpeed, this.WRf.MaxSpeed);
    this.Spline.GetQuaternionAtDistanceAlongSpline(this.ORm, 1, MathUtils_1.MathUtils.CommonTempQuat);
    MathUtils_1.MathUtils.CommonTempQuat.GetUpVector(o);
    MathUtils_1.MathUtils.LookRotationForwardFirst(e, o, this.cce);
    var l = this.OwnerEntity.GetComponent(217);
    for ([r, a] of this.ojo.ModifyVehicleTagsOnEnter) {
      if (a) {
        l?.AddTag(r);
      } else {
        l?.RemoveTag(r);
      }
    }
    return true;
  }
  OnExit() {
    var t;
    var i;
    var s = this.OwnerEntity.GetComponent(217);
    for ([t, i] of this.ojo.ModifyVehicleTagsOnExit) {
      if (i) {
        s?.AddTag(t);
      } else {
        s?.RemoveTag(t);
      }
    }
    if (this.fag !== -1) {
      this.gag(this.fag);
    }
  }
  GetVelocity(t) {
    if (this.Spline) {
      t.Reset();
      this.Spline.GetDirectionAtDistanceAlongSpline(this.ORm, 1, t);
      t.MultiplyEqual(MathUtils_1.MathUtils.Clamp(Math.abs(this.lLo), this.WRf.MinSpeed, this.WRf.MaxSpeed));
      if (!this.GRm) {
        t.MultiplyEqual(-1);
      }
      return true;
    } else {
      return super.GetVelocity(t);
    }
  }
  TickUpdateMove(e) {
    if (this.Spline) {
      var o = this.GetCurrentSegmentPointOption();
      this.Txa = Math.abs(o?.MaxSpeed ?? this.IVf.DefaultMoveSpeed);
      this.qsn = Math.abs(o?.AbsAcceleration ?? 0);
      if (MathUtils_1.MathUtils.IsNearlyZero(this.lLo) && MathUtils_1.MathUtils.IsNearlyZero(this.qsn)) {
        this.lLo = this.IVf.DefaultMoveSpeed;
      }
      var o = Math.min(e, this.IVf.MaxDeltaTimeForMoveUpdate);
      var e = MathUtils_1.MathUtils.Clamp(Math.abs(this.lLo), this.WRf.MinSpeed, this.WRf.MaxSpeed);
      var r = MathUtils_1.MathUtils.Clamp(Math.abs(this.Txa), this.WRf.MinSpeed, this.WRf.MaxSpeed);
      var a = Math.abs(this.qsn) * (r - e > 0 ? 1 : -1);
      var l = Math.abs(r - e);
      var n = this.GRm ? Math.abs(this.Spline.GetSplineLength() - this.ORm) : Math.abs(0 - this.ORm);
      let t = a * o;
      let i = o;
      if (a != 0 && Math.abs(t) > l) {
        t = l;
        i = t / a;
      }
      let s = e * i + a * 0.5 * i * i;
      if (s > n) {
        s = n;
        i = a == 0 ? (t = 0, s / e) : (t = Math.sqrt(a * 2 * s + e * e) - e) / a;
      }
      l = o - i;
      let h = (e + t) * l;
      if (s + h > n) {
        h = n - s;
        t;
      }
      if (this.GRm) {
        this.lLo = MathUtils_1.MathUtils.Clamp(e + t, 0, r);
        this.ORm = MathUtils_1.MathUtils.Clamp(this.ORm + (s + h), 0, this.Spline.GetSplineLength());
      } else {
        this.lLo = MathUtils_1.MathUtils.Clamp(e + t, 0, r);
        this.ORm = MathUtils_1.MathUtils.Clamp(this.ORm - (s + h), 0, this.Spline.GetSplineLength());
      }
      this.Spline.GetLocationAtDistanceAlongSpline(this.ORm, 1, this.I1e);
      a = this.dHo;
      o = this.Tz;
      this.Spline.GetDirectionAtDistanceAlongSpline(this.ORm, 1, a);
      if (!this.GRm) {
        a.UnaryNegation(a);
      }
      this.Spline.GetQuaternionAtDistanceAlongSpline(this.ORm, 1, MathUtils_1.MathUtils.CommonTempQuat);
      MathUtils_1.MathUtils.CommonTempQuat.GetUpVector(o);
      MathUtils_1.MathUtils.LookRotationForwardFirst(a, o, this.cce);
      this.Cag();
    }
  }
  aBg() {
    var t;
    var i;
    if (this.ojo.EnableBlockingCheck && this.vEf) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleAccelerateAlongRailMoveData] 检测到阻挡，不应用位移更新", ["BlockingTime", this.EVf], ["CurrentLocation", this.I1e]);
      }
    } else {
      t = this.dHo;
      i = this.GetVelocity(t);
      this.MoveUpdater?.(this.I1e, this.cce, i ? t : undefined, this.ojo.EnableBlockingCheck);
    }
  }
  FRm() {
    if (this.ojo.EnableBlockingCheck && this.vEf && this.EVf > this.ojo.MaxBlockingTimeOut) {
      this.IsFinishMove = true;
      this.IsFinishMoveOnFailure = true;
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleAccelerateAlongRailMoveData] Finish move on blocking", ["BlockingTime", this.EVf], ["CurrentLocation", this.I1e]);
      }
    } else if (this.Spline) {
      if (this.GRm) {
        this.IsFinishMove = this.ORm >= this.Spline.GetSplineLength();
      } else {
        this.IsFinishMove = this.ORm <= 0;
      }
    }
  }
  TVf(t) {
    var i;
    var s;
    if (this.ojo.EnableBlockingCheck && !this.IsFinishMove && (i = this.OwnerEntity.GetComponent(247), s = this.OwnerEntity.GetComponent(249), i && s && s.VehicleMovement)) {
      i = this.vEf;
      this.sBg.Set(this.I1e, this.cce.Quaternion(), Vector_1.Vector.OneVectorProxy);
      this.vEf = !s.VehicleMovement.IsValidTransform(this.sBg.ToUeTransform(), undefined);
      if (this.vEf) {
        s = i ? Math.min(t, this.IVf.MaxDeltaTimeForMoveUpdate) : 0;
        this.EVf += s;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleAccelerateAlongRailMoveData] Blocked", ["BlockingTime", this.EVf], ["CurrentLocation", this.I1e]);
        }
      } else {
        this.EVf = 0;
      }
    }
  }
  Cag() {
    var t = this.IsFinishMove ? this.GetCurrentSegmentPointIndex() : -1;
    if (t !== undefined && this.fag !== t) {
      if (t === -1) {
        this.gag(this.fag);
        this.fag = t;
      } else if (this.fag === -1) {
        this.fag = t;
        this.pag(this.fag);
      } else if (this.GRm) {
        while (this.fag < t) {
          this.gag(this.fag);
          this.fag++;
          this.pag(this.fag);
        }
      } else {
        while (this.fag > t) {
          this.gag(this.fag);
          this.fag--;
          this.pag(this.fag);
        }
      }
    }
  }
  pag(t) {
    if (t !== -1 && (t = this.SplinePointOptions[t]) && t.SubCameraTag) {
      this.OwnerEntity.GetComponent(217)?.AddTag(t.SubCameraTag);
    }
  }
  gag(t) {
    if (t !== -1 && (t = this.SplinePointOptions[t]) && t.SubCameraTag) {
      this.OwnerEntity.GetComponent(217)?.RemoveTag(t.SubCameraTag);
    }
  }
  GetCurrentSegmentPointOption() {
    var t;
    if (this.Spline) {
      t = this.Spline.GetInputKeyAtDistanceAlongSpline(this.ORm);
      t = this.Spline.GetNearestPositionIndexAtInputKey(t);
      return this.SplinePointOptions[t];
    }
  }
  GetCurrentSegmentPointIndex() {
    var t;
    if (this.Spline) {
      t = this.Spline.GetInputKeyAtDistanceAlongSpline(this.ORm);
      return this.Spline.GetNearestPositionIndexAtInputKey(t);
    }
  }
  GetIsMoveAlongSplineForward() {
    return this.GRm;
  }
}
exports.MotorcycleAccelerateAlongRailMoveData = MotorcycleAccelerateAlongRailMoveData;
//# sourceMappingURL=MotorcycleAccelerateAlongRailMoveData.js.map