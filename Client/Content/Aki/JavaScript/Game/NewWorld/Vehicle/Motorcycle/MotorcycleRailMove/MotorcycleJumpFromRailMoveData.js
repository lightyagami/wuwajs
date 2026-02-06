"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleJumpFromRailMoveData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const MotorcycleRailMoveConfigs_1 = require("./MotorcycleRailMoveConfigs");
const MotorcycleRailMoveDataBase_1 = require("./MotorcycleRailMoveDataBase");
class MotorcycleJumpFromRailMoveData extends MotorcycleRailMoveDataBase_1.MotorcycleRailMoveDataBase {
  constructor(t, i) {
    super("JumpFromRail", t, i);
    this.MoveConfig = new MotorcycleRailMoveConfigs_1.MotorcycleRailMoveConfig();
    this.Spline = undefined;
    this.SplinePointOptions = [];
    this.GravityDir = Vector_1.Vector.Create();
    this.JumpSideDir = 1;
    this.MoveUpdater = undefined;
    this.MoveGetter = undefined;
    this._ae = Vector_1.Vector.Create();
    this.uae = Vector_1.Vector.Create();
    this.NRm = Rotator_1.Rotator.Create();
    this.VRm = Rotator_1.Rotator.Create();
    this.jRm = Vector_1.Vector.Create();
    this.HRm = Vector_1.Vector.Create();
    this.I1e = Vector_1.Vector.Create();
    this.cce = Rotator_1.Rotator.Create();
    this.$Rm = 0;
    this.dHo = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
    this.fHo = Vector_1.Vector.Create();
    this.pHo = Vector_1.Vector.Create();
    this.vHo = Vector_1.Vector.Create();
    this.sBg = Transform_1.Transform.Create();
    this.vEf = false;
    this.EVf = 0;
  }
  get QRf() {
    return this.MoveConfig.JumpOffRailConfig;
  }
  get KRf() {
    return this.MoveConfig.JumpOffRailConfig.ParabolaMoveConfig;
  }
  get ojo() {
    return this.MoveConfig.JumpOffRailConfig.CommonConfig;
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
  OnEnter(i) {
    if (!this.Spline) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleJumpFromRailMoveData] OnEnter Failed: Spline is undefined", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    if (this.KRf.Duration <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleJumpFromRailMoveData] OnEnter Failed: Duration有误", ["SplineId", this.RelatedRail?.GetRailSplineId()], ["Duration", this.KRf.Duration]);
      }
      return false;
    }
    if (!this.MoveGetter?.(this._ae, this.NRm)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleJumpFromRailMoveData] OnEnter Failed: 拿不到位置旋转", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    this.I1e.FromUeVector(this._ae);
    this.cce.FromUeRotator(this.NRm);
    {
      var o = this.dHo;
      var s = this.Tz;
      var h = this.fHo;
      var e = this.pHo;
      var r = this.vHo;
      if (!i?.GetVelocity(o) && !this.MoveGetter?.(undefined, undefined, o)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleJumpFromRailMoveData] OnEnter Failed: 拿不到速度", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
        }
        return false;
      }
      if (o.IsNearlyZero(1)) {
        o.Reset();
      }
      this.cce.Quaternion().GetForwardVector(s);
      if (s.IsNearlyZero()) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleJumpFromRailMoveData] OnEnter Failed: 朝向出错", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
        }
        return false;
      }
      if (!o.IsNearlyZero() && MathUtils_1.MathUtils.DotProduct(o, s) < 0) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleJumpFromRailMoveData] OnEnter Failed: 朝向和运动方向相反", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
        }
        return false;
      }
      let t = 0;
      if (this.JumpSideDir === 0) {
        t = -1;
      } else if (this.JumpSideDir === 2) {
        t = 1;
      }
      h.Set(0, this.QRf.SideOffsetAbs * t, 0);
      this.NRm.Quaternion().RotateVector(h, h);
      this._ae.Addition(h, this.uae);
      o.Multiply(this.KRf.Duration, h);
      this.uae.Addition(h, this.uae);
      this.NRm.Quaternion().GetForwardVector(e);
      this.GravityDir.UnaryNegation(r);
      MathUtils_1.MathUtils.LookRotationForwardFirst(e, r, this.VRm);
    }
    var t;
    var a;
    var i = this.dHo;
    var s = this.Tz;
    var o = this.fHo;
    var h = this.pHo;
    this.uae.Subtraction(this._ae, i);
    var e = Vector_1.Vector.DotProduct(i, this.GravityDir);
    this.GravityDir.Multiply(e, s);
    i.Subtraction(s, o);
    o.Division(this.KRf.Duration, this.jRm);
    this.GravityDir.Multiply(this.KRf.GravityAccelerationAbs, h);
    s.Addition(h.MultiplyEqual(this.KRf.Duration * -0.5 * this.KRf.Duration), this.HRm);
    this.HRm.DivisionEqual(this.KRf.Duration);
    var l = this.OwnerEntity.GetComponent(217);
    for ([t, a] of this.ojo.ModifyVehicleTagsOnEnter) {
      if (a) {
        l?.AddTag(t);
      } else {
        l?.RemoveTag(t);
      }
    }
    return true;
  }
  OnExit() {
    var t;
    var i;
    var o = this.OwnerEntity.GetComponent(217);
    for ([t, i] of this.ojo.ModifyVehicleTagsOnExit) {
      if (i) {
        o?.AddTag(t);
      } else {
        o?.RemoveTag(t);
      }
    }
  }
  GetVelocity(t) {
    this.HRm.Addition(this.jRm, t);
    return true;
  }
  TickUpdateMove(t) {
    var t = Math.min(this.KRf.Duration - this.$Rm, t, this.IVf.MaxDeltaTimeForMoveUpdate);
    this.$Rm += t;
    var i = this.dHo;
    var o = this.Tz;
    var s = this.fHo;
    this.jRm.Addition(this.HRm, o);
    o.Multiply(t, s);
    this.GravityDir.Multiply(this.KRf.GravityAccelerationAbs * 0.5 * t * t, i);
    s.AdditionEqual(i);
    this.I1e.AdditionEqual(s);
    var o = this.dHo;
    this.GravityDir.Multiply(this.KRf.GravityAccelerationAbs * t, o);
    this.HRm.AdditionEqual(o);
    Rotator_1.Rotator.Lerp(this.NRm, this.VRm, this.$Rm / this.KRf.Duration, this.cce);
  }
  aBg() {
    var t;
    var i;
    if (this.ojo.EnableBlockingCheck && this.vEf) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleJumpFromRailMoveData] 检测到阻挡，不应用位移更新", ["BlockingTime", this.EVf], ["CurrentLocation", this.I1e]);
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
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleJumpFromRailMoveData] Finish move on blocking", ["BlockingTime", this.EVf], ["CurrentLocation", this.I1e]);
      }
    } else {
      this.IsFinishMove = this.$Rm >= this.KRf.Duration;
    }
  }
  TVf(t) {
    var i;
    var o;
    if (this.ojo.EnableBlockingCheck && !this.IsFinishMove && (i = this.OwnerEntity.GetComponent(247), o = this.OwnerEntity.GetComponent(249), i && o && o.VehicleMovement)) {
      i = this.vEf;
      this.sBg.Set(this.I1e, this.cce.Quaternion(), Vector_1.Vector.OneVectorProxy);
      this.vEf = !o.VehicleMovement.IsValidTransform(this.sBg.ToUeTransform(), undefined);
      if (this.vEf) {
        o = i ? Math.min(t, this.IVf.MaxDeltaTimeForMoveUpdate) : 0;
        this.EVf += o;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleJumpFromRailMoveData] Blocked", ["BlockingTime", this.EVf], ["CurrentLocation", this.I1e]);
        }
      } else {
        this.EVf = 0;
      }
    }
  }
}
exports.MotorcycleJumpFromRailMoveData = MotorcycleJumpFromRailMoveData;
//# sourceMappingURL=MotorcycleJumpFromRailMoveData.js.map