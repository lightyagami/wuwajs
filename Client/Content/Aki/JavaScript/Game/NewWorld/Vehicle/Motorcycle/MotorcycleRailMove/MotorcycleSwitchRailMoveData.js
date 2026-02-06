"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleSwitchRailMoveData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const MotorcycleRailMoveConfigs_1 = require("./MotorcycleRailMoveConfigs");
const MotorcycleRailMoveDataBase_1 = require("./MotorcycleRailMoveDataBase");
const MotorcycleRailMoveDefine_1 = require("./MotorcycleRailMoveDefine");
const MotorcycleRailMoveUtils_1 = require("./MotorcycleRailMoveUtils");
class MotorcycleSwitchRailMoveData extends MotorcycleRailMoveDataBase_1.MotorcycleRailMoveDataBase {
  constructor(t, i) {
    super("SwitchRail", t, i);
    this.MoveConfig = new MotorcycleRailMoveConfigs_1.MotorcycleRailMoveConfig();
    this.TargetSpline = undefined;
    this.GravityDir = Vector_1.Vector.Create();
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
    this.FCg = new MotorcycleRailMoveDefine_1.RailMoveContext();
    this.dHo = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
    this.fHo = Vector_1.Vector.Create();
    this.pHo = Vector_1.Vector.Create();
    this.sBg = Transform_1.Transform.Create();
    this.vEf = false;
    this.EVf = 0;
  }
  get zRf() {
    return this.MoveConfig.SwitchRailConfig;
  }
  get KRf() {
    return this.MoveConfig.SwitchRailConfig.ParabolaMoveConfig;
  }
  get ojo() {
    return this.MoveConfig.SwitchRailConfig.CommonConfig;
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
    if (!this.TargetSpline) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleSwitchRailMoveData] OnEnter Failed: Spline is undefined", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    if (this.KRf.Duration <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleSwitchRailMoveData] OnEnter Failed: Duration有误", ["SplineId", this.RelatedRail?.GetRailSplineId()], ["Duration", this.KRf.Duration]);
      }
      return false;
    }
    if (!this.MoveGetter?.(this._ae, this.NRm)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleSwitchRailMoveData] OnEnter Failed: 拿不到位置旋转", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    this.I1e.FromUeVector(this._ae);
    this.cce.FromUeRotator(this.NRm);
    this.FCg.SourceLoc.FromUeVector(this._ae);
    this.FCg.SourceRot.FromUeRotator(this.NRm);
    this.FCg.RailSpline = this.TargetSpline;
    if (!t?.GetVelocity(this.FCg.SourceVel) && !this.MoveGetter(undefined, undefined, this.FCg.SourceVel)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleSwitchRailMoveData] OnEnter Failed: 拿不到速度", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    if (this.FCg.SourceVel.IsNearlyZero(1)) {
      this.FCg.SourceVel.Reset();
    }
    let i = true;
    t = [MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckVehicleNotReverseMove, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleUpAndRailUp, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleForwardAndRailTangent, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleVelocityAndRailTangent, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckRailLenLeft, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckRelativeLocation];
    this.FCg.IsForward = true;
    if (!(i = (i = MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.CalcRailMoveTargetAdvanceBySpeed(this.FCg, this.KRf.Duration, this.KRf.MinSpeedAlongRail, this.KRf.MaxSpeedAlongRail)) && MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.ExecCheckList(this.FCg, this.zRf.EnterRailCondition, t, true, this.constructor.name))) {
      this.FCg.IsForward = false;
      i = (i = MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.CalcRailMoveTargetAdvanceBySpeed(this.FCg, this.KRf.Duration, this.KRf.MinSpeedAlongRail, this.KRf.MaxSpeedAlongRail)) && MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.ExecCheckList(this.FCg, this.zRf.EnterRailCondition, t, true, this.constructor.name);
    }
    if (!i) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleSwitchRailMoveData] OnEnter Failed: 计算终点并检查失败", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    this.uae.FromUeVector(this.FCg.RailMoveTarget.TargetLoc);
    this.VRm.FromUeRotator(this.FCg.RailMoveTarget.TargetRot);
    var o;
    var s;
    var t = this.dHo;
    var e = this.Tz;
    var h = this.fHo;
    var r = this.pHo;
    this.uae.Subtraction(this._ae, t);
    var a = Vector_1.Vector.DotProduct(t, this.GravityDir);
    this.GravityDir.Multiply(a, e);
    t.Subtraction(e, h);
    h.Division(this.KRf.Duration, this.jRm);
    this.GravityDir.Multiply(this.KRf.GravityAccelerationAbs, r);
    e.Addition(r.MultiplyEqual(this.KRf.Duration * -0.5 * this.KRf.Duration), this.HRm);
    this.HRm.DivisionEqual(this.KRf.Duration);
    var l = this.OwnerEntity.GetComponent(217);
    for ([o, s] of this.ojo.ModifyVehicleTagsOnEnter) {
      if (s) {
        l?.AddTag(o);
      } else {
        l?.RemoveTag(o);
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
        Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleSwitchRailMoveData] 检测到阻挡，不应用位移更新", ["BlockingTime", this.EVf], ["CurrentLocation", this.I1e]);
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
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleSwitchRailMoveData] Finish move on blocking", ["BlockingTime", this.EVf], ["CurrentLocation", this.I1e]);
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
          Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleSwitchRailMoveData] Blocked", ["BlockingTime", this.EVf], ["CurrentLocation", this.I1e]);
        }
      } else {
        this.EVf = 0;
      }
    }
  }
}
exports.MotorcycleSwitchRailMoveData = MotorcycleSwitchRailMoveData;
//# sourceMappingURL=MotorcycleSwitchRailMoveData.js.map