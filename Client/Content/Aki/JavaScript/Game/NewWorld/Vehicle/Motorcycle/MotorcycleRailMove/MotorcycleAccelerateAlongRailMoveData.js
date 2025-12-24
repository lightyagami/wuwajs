"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleAccelerateAlongRailMoveData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
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
    this.RRm = 0;
    this.wRm = true;
    this.I1e = Vector_1.Vector.Create();
    this.cce = Rotator_1.Rotator.Create();
    this.dHo = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
    this.fHo = Vector_1.Vector.Create();
    this.pHo = Vector_1.Vector.Create();
    this.vHo = Vector_1.Vector.Create();
    this.ayf = false;
    this.fqf = 0;
    this.VQf = -1;
  }
  get iTf() {
    return this.MoveConfig.AccelerateAlongRailConfig.LinearMoveConfig;
  }
  get ojo() {
    return this.MoveConfig.AccelerateAlongRailConfig.CommonConfig;
  }
  get gqf() {
    return this.MoveConfig.BasicRailMoveConfig;
  }
  OnTick(t) {
    this.TickUpdateMove(t);
    this.Cqf(t);
    this.LRm();
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
    this.RRm = MathUtils_1.MathUtils.Clamp(this.Spline.GetDistanceAlongSplineAtSplineInputKey(i), 0, this.Spline.GetSplineLength());
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
    this.Spline.GetDirectionAtDistanceAlongSpline(this.RRm, 1, e);
    t = Vector_1.Vector.DotProduct(e, s);
    if (MathUtils_1.MathUtils.IsNearlyZero(t)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleAccelerateAlongRailMoveData] OnEnter Failed: 朝向和样条方向点乘为0", ["SplineId", this.RelatedRail?.GetRailSplineId()], ["SplineDir", e], ["CurrentRotForward", s]);
      }
      return false;
    }
    this.wRm = t > 0;
    if (!this.wRm) {
      e.UnaryNegation(e);
    }
    var r;
    var a;
    var h = Vector_1.Vector.DotProduct(e, i);
    this.lLo = MathUtils_1.MathUtils.Clamp(Math.abs(h), this.iTf.MinSpeed, this.iTf.MaxSpeed);
    this.Spline.GetQuaternionAtDistanceAlongSpline(this.RRm, 1, MathUtils_1.MathUtils.CommonTempQuat);
    MathUtils_1.MathUtils.CommonTempQuat.GetUpVector(o);
    MathUtils_1.MathUtils.LookRotationForwardFirst(e, o, this.cce);
    var l = this.OwnerEntity.GetComponent(215);
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
    var s = this.OwnerEntity.GetComponent(215);
    for ([t, i] of this.ojo.ModifyVehicleTagsOnExit) {
      if (i) {
        s?.AddTag(t);
      } else {
        s?.RemoveTag(t);
      }
    }
    if (this.VQf !== -1) {
      this.HQf(this.VQf);
    }
  }
  GetVelocity(t) {
    if (this.Spline) {
      t.Reset();
      this.Spline.GetDirectionAtDistanceAlongSpline(this.RRm, 1, t);
      t.MultiplyEqual(MathUtils_1.MathUtils.Clamp(Math.abs(this.lLo), this.iTf.MinSpeed, this.iTf.MaxSpeed));
      if (!this.wRm) {
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
      this.Txa = Math.abs(o?.MaxSpeed ?? this.gqf.DefaultMoveSpeed);
      this.qsn = Math.abs(o?.AbsAcceleration ?? 0);
      if (MathUtils_1.MathUtils.IsNearlyZero(this.lLo) && MathUtils_1.MathUtils.IsNearlyZero(this.qsn)) {
        this.lLo = this.gqf.DefaultMoveSpeed;
      }
      var o = Math.min(e, this.gqf.MaxDeltaTimeForMoveUpdate);
      var e = MathUtils_1.MathUtils.Clamp(Math.abs(this.lLo), this.iTf.MinSpeed, this.iTf.MaxSpeed);
      var r = MathUtils_1.MathUtils.Clamp(Math.abs(this.Txa), this.iTf.MinSpeed, this.iTf.MaxSpeed);
      var a = Math.abs(this.qsn) * (r - e > 0 ? 1 : -1);
      var l = Math.abs(r - e);
      var n = this.wRm ? Math.abs(this.Spline.GetSplineLength() - this.RRm) : Math.abs(0 - this.RRm);
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
      if (this.wRm) {
        this.lLo = MathUtils_1.MathUtils.Clamp(e + t, 0, r);
        this.RRm = MathUtils_1.MathUtils.Clamp(this.RRm + (s + h), 0, this.Spline.GetSplineLength());
      } else {
        this.lLo = MathUtils_1.MathUtils.Clamp(e + t, 0, r);
        this.RRm = MathUtils_1.MathUtils.Clamp(this.RRm - (s + h), 0, this.Spline.GetSplineLength());
      }
      this.Spline.GetLocationAtDistanceAlongSpline(this.RRm, 1, this.I1e);
      a = this.dHo;
      o = this.Tz;
      this.Spline.GetDirectionAtDistanceAlongSpline(this.RRm, 1, a);
      if (!this.wRm) {
        a.UnaryNegation(a);
      }
      this.Spline.GetQuaternionAtDistanceAlongSpline(this.RRm, 1, MathUtils_1.MathUtils.CommonTempQuat);
      MathUtils_1.MathUtils.CommonTempQuat.GetUpVector(o);
      MathUtils_1.MathUtils.LookRotationForwardFirst(a, o, this.cce);
      this.jQf();
      l = this.dHo;
      n = this.GetVelocity(l);
      this.MoveUpdater?.(this.I1e, this.cce, n ? l : undefined);
    }
  }
  LRm() {
    if (this.ojo.EnableBlockingCheck && this.ayf && this.fqf > this.ojo.MaxBlockingTimeOut) {
      this.IsFinishMove = true;
      this.IsFinishMoveOnFailure = true;
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleAccelerateAlongRailMoveData] Finish move on blocking", ["BlockingTime", this.fqf], ["CurrentLocation", this.I1e]);
      }
    } else if (this.Spline) {
      if (this.wRm) {
        this.IsFinishMove = this.RRm >= this.Spline.GetSplineLength();
      } else {
        this.IsFinishMove = this.RRm <= 0;
      }
    }
  }
  Cqf(t) {
    var i;
    var s;
    var h;
    if (this.ojo.EnableBlockingCheck && !this.IsFinishMove && (i = this.OwnerEntity.GetComponent(247), h = this.OwnerEntity.GetComponent(249), i && h && h.VehicleMovement)) {
      s = this.ayf;
      this.ayf = !h.VehicleMovement.IsValidTransform(i.ActorTransform, undefined);
      if (this.ayf) {
        h = s ? Math.min(t, this.gqf.MaxDeltaTimeForMoveUpdate) : 0;
        this.fqf += h;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleAccelerateAlongRailMoveData] Blocked", ["BlockingTime", this.fqf], ["CurrentLocation", this.I1e]);
        }
      } else {
        this.fqf = 0;
      }
    }
  }
  jQf() {
    var t = this.IsFinishMove ? this.GetCurrentSegmentPointIndex() : -1;
    if (t !== undefined && this.VQf !== t) {
      if (t === -1) {
        this.HQf(this.VQf);
        this.VQf = t;
      } else if (this.VQf === -1) {
        this.VQf = t;
        this.$Qf(this.VQf);
      } else if (this.wRm) {
        while (this.VQf < t) {
          this.HQf(this.VQf);
          this.VQf++;
          this.$Qf(this.VQf);
        }
      } else {
        while (this.VQf > t) {
          this.HQf(this.VQf);
          this.VQf--;
          this.$Qf(this.VQf);
        }
      }
    }
  }
  $Qf(t) {
    if (t !== -1 && (t = this.SplinePointOptions[t]) && t.SubCameraTag) {
      this.OwnerEntity.GetComponent(215)?.AddTag(t.SubCameraTag);
    }
  }
  HQf(t) {
    if (t !== -1 && (t = this.SplinePointOptions[t]) && t.SubCameraTag) {
      this.OwnerEntity.GetComponent(215)?.RemoveTag(t.SubCameraTag);
    }
  }
  GetCurrentSegmentPointOption() {
    var t;
    if (this.Spline) {
      t = this.Spline.GetInputKeyAtDistanceAlongSpline(this.RRm);
      t = this.Spline.GetNearestPositionIndexAtInputKey(t);
      return this.SplinePointOptions[t];
    }
  }
  GetCurrentSegmentPointIndex() {
    var t;
    if (this.Spline) {
      t = this.Spline.GetInputKeyAtDistanceAlongSpline(this.RRm);
      return this.Spline.GetNearestPositionIndexAtInputKey(t);
    }
  }
  GetIsMoveAlongSplineForward() {
    return this.wRm;
  }
}
exports.MotorcycleAccelerateAlongRailMoveData = MotorcycleAccelerateAlongRailMoveData;
//# sourceMappingURL=MotorcycleAccelerateAlongRailMoveData.js.map