"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleJumpAlongRailMoveData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MotorcycleRailMoveConfigs_1 = require("./MotorcycleRailMoveConfigs");
const MotorcycleRailMoveDataBase_1 = require("./MotorcycleRailMoveDataBase");
const MotorcycleRailMoveDefine_1 = require("./MotorcycleRailMoveDefine");
const MotorcycleRailMoveUtils_1 = require("./MotorcycleRailMoveUtils");
class MotorcycleJumpAlongRailMoveData extends MotorcycleRailMoveDataBase_1.MotorcycleRailMoveDataBase {
  constructor(t, i) {
    super("JumpAlongRail", t, i);
    this.MoveConfig = new MotorcycleRailMoveConfigs_1.MotorcycleRailMoveConfig();
    this.TargetSpline = undefined;
    this.TargetIsForward = true;
    this.GravityDir = Vector_1.Vector.Create();
    this.MoveUpdater = undefined;
    this.MoveGetter = undefined;
    this._ae = Vector_1.Vector.Create();
    this.uae = Vector_1.Vector.Create();
    this.PRm = Rotator_1.Rotator.Create();
    this.ARm = Rotator_1.Rotator.Create();
    this.DRm = Vector_1.Vector.Create();
    this.URm = Vector_1.Vector.Create();
    this.I1e = Vector_1.Vector.Create();
    this.cce = Rotator_1.Rotator.Create();
    this.xRm = 0;
    this.AJf = new MotorcycleRailMoveDefine_1.RailMoveContext();
    this.dHo = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
    this.fHo = Vector_1.Vector.Create();
    this.pHo = Vector_1.Vector.Create();
    this.ayf = false;
    this.fqf = 0;
  }
  get oTf() {
    return this.MoveConfig.JumpAlongRailConfig.ParabolaMoveConfig;
  }
  get ojo() {
    return this.MoveConfig.JumpAlongRailConfig.CommonConfig;
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
    if (!this.TargetSpline) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleJumpAlongRailMoveData] OnEnter Failed: Spline is undefined", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    if (this.oTf.Duration <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleJumpAlongRailMoveData] OnEnter Failed: Duration有误", ["SplineId", this.RelatedRail?.GetRailSplineId()], ["Duration", this.oTf.Duration]);
      }
      return false;
    }
    if (!this.MoveGetter?.(this._ae, this.PRm)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleJumpAlongRailMoveData] OnEnter Failed: 拿不到位置旋转", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    this.I1e.FromUeVector(this._ae);
    this.cce.FromUeRotator(this.PRm);
    this.AJf.SourceLoc.FromUeVector(this._ae);
    this.AJf.SourceRot.FromUeRotator(this.PRm);
    this.AJf.RailSpline = this.TargetSpline;
    if (!t?.GetVelocity(this.AJf.SourceVel) && !this.MoveGetter(undefined, undefined, this.AJf.SourceVel)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleJumpAlongRailMoveData] OnEnter Failed: 拿不到速度", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    if (this.AJf.SourceVel.IsNearlyZero(1)) {
      this.AJf.SourceVel.Reset();
    }
    this.AJf.IsForward = this.TargetIsForward;
    if (!MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.CalcRailMoveTargetAdvanceBySpeed(this.AJf, this.oTf.Duration, this.oTf.MinSpeedAlongRail, this.oTf.MaxSpeedAlongRail)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleJumpAlongRailMoveData] OnEnter Failed: 计算终点失败", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    t = [MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckVehicleNotReverseMove, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckRailLenLeft];
    if (!MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.ExecCheckList(this.AJf, undefined, t, true, this.constructor.name)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleJumpAlongRailMoveData] OnEnter Failed: 检查不通过", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    this.uae.FromUeVector(this.AJf.RailMoveTarget.TargetLoc);
    this.ARm.FromUeRotator(this.AJf.RailMoveTarget.TargetRot);
    var i;
    var o;
    var t = this.dHo;
    var s = this.Tz;
    var e = this.fHo;
    var h = this.pHo;
    this.uae.Subtraction(this._ae, t);
    var r = Vector_1.Vector.DotProduct(t, this.GravityDir);
    this.GravityDir.Multiply(r, s);
    t.Subtraction(s, e);
    e.Division(this.oTf.Duration, this.DRm);
    this.GravityDir.Multiply(this.oTf.GravityAccelerationAbs, h);
    s.Addition(h.MultiplyEqual(this.oTf.Duration * -0.5 * this.oTf.Duration), this.URm);
    this.URm.DivisionEqual(this.oTf.Duration);
    var a = this.OwnerEntity.GetComponent(215);
    for ([i, o] of this.ojo.ModifyVehicleTagsOnEnter) {
      if (o) {
        a?.AddTag(i);
      } else {
        a?.RemoveTag(i);
      }
    }
    return true;
  }
  OnExit() {
    var t;
    var i;
    var o = this.OwnerEntity.GetComponent(215);
    for ([t, i] of this.ojo.ModifyVehicleTagsOnExit) {
      if (i) {
        o?.AddTag(t);
      } else {
        o?.RemoveTag(t);
      }
    }
  }
  GetVelocity(t) {
    this.URm.Addition(this.DRm, t);
    return true;
  }
  TickUpdateMove(t) {
    var t = Math.min(this.oTf.Duration - this.xRm, t, this.gqf.MaxDeltaTimeForMoveUpdate);
    this.xRm += t;
    var i = this.dHo;
    var o = this.Tz;
    var s = this.fHo;
    this.DRm.Addition(this.URm, o);
    o.Multiply(t, s);
    this.GravityDir.Multiply(this.oTf.GravityAccelerationAbs * 0.5 * t * t, i);
    s.AdditionEqual(i);
    this.I1e.AdditionEqual(s);
    var o = this.dHo;
    this.GravityDir.Multiply(this.oTf.GravityAccelerationAbs * t, o);
    this.URm.AdditionEqual(o);
    Rotator_1.Rotator.Lerp(this.PRm, this.ARm, this.xRm / this.oTf.Duration, this.cce);
    var i = this.dHo;
    var s = this.GetVelocity(i);
    this.MoveUpdater?.(this.I1e, this.cce, s ? i : undefined);
  }
  LRm() {
    if (this.ojo.EnableBlockingCheck && this.ayf && this.fqf > this.ojo.MaxBlockingTimeOut) {
      this.IsFinishMove = true;
      this.IsFinishMoveOnFailure = true;
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleJumpAlongRailMoveData] Finish move on blocking", ["BlockingTime", this.fqf], ["CurrentLocation", this.I1e]);
      }
    } else {
      this.IsFinishMove = this.xRm >= this.oTf.Duration;
    }
  }
  Cqf(t) {
    var i;
    var o;
    var s;
    if (this.ojo.EnableBlockingCheck && !this.IsFinishMove && (i = this.OwnerEntity.GetComponent(247), s = this.OwnerEntity.GetComponent(249), i && s && s.VehicleMovement)) {
      o = this.ayf;
      this.ayf = !s.VehicleMovement.IsValidTransform(i.ActorTransform, undefined);
      if (this.ayf) {
        s = o ? Math.min(t, this.gqf.MaxDeltaTimeForMoveUpdate) : 0;
        this.fqf += s;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleJumpAlongRailMoveData] Blocked", ["BlockingTime", this.fqf], ["CurrentLocation", this.I1e]);
        }
      } else {
        this.fqf = 0;
      }
    }
  }
}
exports.MotorcycleJumpAlongRailMoveData = MotorcycleJumpAlongRailMoveData;
//# sourceMappingURL=MotorcycleJumpAlongRailMoveData.js.map