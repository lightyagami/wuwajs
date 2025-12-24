"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleJumpFromRailMoveData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
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
    this.PRm = Rotator_1.Rotator.Create();
    this.ARm = Rotator_1.Rotator.Create();
    this.DRm = Vector_1.Vector.Create();
    this.URm = Vector_1.Vector.Create();
    this.I1e = Vector_1.Vector.Create();
    this.cce = Rotator_1.Rotator.Create();
    this.xRm = 0;
    this.dHo = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
    this.fHo = Vector_1.Vector.Create();
    this.pHo = Vector_1.Vector.Create();
    this.vHo = Vector_1.Vector.Create();
    this.ayf = false;
    this.fqf = 0;
  }
  get rTf() {
    return this.MoveConfig.JumpOffRailConfig;
  }
  get oTf() {
    return this.MoveConfig.JumpOffRailConfig.ParabolaMoveConfig;
  }
  get ojo() {
    return this.MoveConfig.JumpOffRailConfig.CommonConfig;
  }
  get gqf() {
    return this.MoveConfig.BasicRailMoveConfig;
  }
  OnTick(t) {
    this.TickUpdateMove(t);
    this.Cqf(t);
    this.LRm();
  }
  OnEnter(i) {
    if (!this.Spline) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleJumpFromRailMoveData] OnEnter Failed: Spline is undefined", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    if (this.oTf.Duration <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleJumpFromRailMoveData] OnEnter Failed: Duration有误", ["SplineId", this.RelatedRail?.GetRailSplineId()], ["Duration", this.oTf.Duration]);
      }
      return false;
    }
    if (!this.MoveGetter?.(this._ae, this.PRm)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleJumpFromRailMoveData] OnEnter Failed: 拿不到位置旋转", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    this.I1e.FromUeVector(this._ae);
    this.cce.FromUeRotator(this.PRm);
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
      h.Set(0, this.rTf.SideOffsetAbs * t, 0);
      this.PRm.Quaternion().RotateVector(h, h);
      this._ae.Addition(h, this.uae);
      o.Multiply(this.oTf.Duration, h);
      this.uae.Addition(h, this.uae);
      this.PRm.Quaternion().GetForwardVector(e);
      this.GravityDir.UnaryNegation(r);
      MathUtils_1.MathUtils.LookRotationForwardFirst(e, r, this.ARm);
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
    o.Division(this.oTf.Duration, this.DRm);
    this.GravityDir.Multiply(this.oTf.GravityAccelerationAbs, h);
    s.Addition(h.MultiplyEqual(this.oTf.Duration * -0.5 * this.oTf.Duration), this.URm);
    this.URm.DivisionEqual(this.oTf.Duration);
    var l = this.OwnerEntity.GetComponent(215);
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
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleJumpFromRailMoveData] Finish move on blocking", ["BlockingTime", this.fqf], ["CurrentLocation", this.I1e]);
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
          Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleJumpFromRailMoveData] Blocked", ["BlockingTime", this.fqf], ["CurrentLocation", this.I1e]);
        }
      } else {
        this.fqf = 0;
      }
    }
  }
}
exports.MotorcycleJumpFromRailMoveData = MotorcycleJumpFromRailMoveData;
//# sourceMappingURL=MotorcycleJumpFromRailMoveData.js.map