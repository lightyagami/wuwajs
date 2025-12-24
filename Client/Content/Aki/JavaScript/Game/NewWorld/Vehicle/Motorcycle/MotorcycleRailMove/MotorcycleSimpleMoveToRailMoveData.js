"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleSimpleMoveToRailMoveData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const MotorcycleRailMoveConfigs_1 = require("./MotorcycleRailMoveConfigs");
const MotorcycleRailMoveDataBase_1 = require("./MotorcycleRailMoveDataBase");
const MotorcycleRailMoveDefine_1 = require("./MotorcycleRailMoveDefine");
const MotorcycleRailMoveUtils_1 = require("./MotorcycleRailMoveUtils");
class MotorcycleSimpleMoveToRailMoveData extends MotorcycleRailMoveDataBase_1.MotorcycleRailMoveDataBase {
  constructor(t, i) {
    super("SimpleMoveToRail", t, i);
    this.MoveConfig = new MotorcycleRailMoveConfigs_1.MotorcycleRailMoveConfig();
    this.TargetSpline = undefined;
    this.MoveUpdater = undefined;
    this.MoveGetter = undefined;
    this._ae = Vector_1.Vector.Create();
    this.Due = Vector_1.Vector.Create();
    this.Anr = Vector_1.Vector.Create();
    this.JRm = Quat_1.Quat.Create();
    this.ZRm = Quat_1.Quat.Create();
    this.Ql = 0;
    this.Cce = 0;
    this.AJf = new MotorcycleRailMoveDefine_1.RailMoveContext();
    this.dHo = Vector_1.Vector.Create();
    this.KKf = Rotator_1.Rotator.Create();
    this.ayf = false;
    this.fqf = 0;
  }
  get sTf() {
    return this.MoveConfig.DirectlyEnterRailConfig;
  }
  get iTf() {
    return this.MoveConfig.DirectlyEnterRailConfig.LinearMoveConfig;
  }
  get ojo() {
    return this.MoveConfig.DirectlyEnterRailConfig.CommonConfig;
  }
  get gqf() {
    return this.MoveConfig.BasicRailMoveConfig;
  }
  OnEnter(i) {
    if (!this.TargetSpline) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleSimpleMoveToRailMoveData] OnEnter Failed: Spline is undefined", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    var o = this.KKf;
    if (!this.MoveGetter?.(this._ae, o)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleSimpleMoveToRailMoveData] OnEnter Failed: 拿不到位置旋转", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    o.Quaternion(this.JRm);
    this.AJf.SourceLoc.FromUeVector(this._ae);
    this.JRm.Rotator(this.AJf.SourceRot);
    this.AJf.RailSpline = this.TargetSpline;
    if (!i?.GetVelocity(this.AJf.SourceVel) && !this.MoveGetter(undefined, undefined, this.AJf.SourceVel)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleSimpleMoveToRailMoveData] OnEnter Failed: 拿不到速度", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    if (this.AJf.SourceVel.IsNearlyZero(1)) {
      this.AJf.SourceVel.Reset();
    }
    let t = true;
    o = [MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckVehicleNotReverseMove, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleUpAndRailUp, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleForwardAndRailTangent, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleVelocityAndRailTangent, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckRailLenLeft, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckRelativeLocation];
    this.AJf.IsForward = true;
    if (!(t = (t = MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.CalcRailMoveTargetNotAdvanceBySpeed(this.AJf, this.sTf.LinearMoveConfig.MinSpeed, this.sTf.LinearMoveConfig.MaxSpeed)) && MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.ExecCheckList(this.AJf, this.sTf.EnterRailCondition, o, true, this.constructor.name))) {
      this.AJf.IsForward = false;
      t = (t = MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.CalcRailMoveTargetNotAdvanceBySpeed(this.AJf, this.sTf.LinearMoveConfig.MinSpeed, this.sTf.LinearMoveConfig.MaxSpeed)) && MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.ExecCheckList(this.AJf, this.sTf.EnterRailCondition, o, true, this.constructor.name);
    }
    if (!t) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleSimpleMoveToRailMoveData] OnEnter Failed: 计算终点并检查失败", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    this.Due.FromUeVector(this.AJf.RailMoveTarget.TargetLoc);
    this.AJf.RailMoveTarget.TargetRot.Quaternion(this.ZRm);
    {
      i = this.dHo;
      this.Due.Subtraction(this._ae, i);
      o = i.Size();
      i.Normalize();
      let t = this.AJf.SourceVel.DotProduct(i);
      if (MathUtils_1.MathUtils.IsNearlyZero(t) || t < 0) {
        t = this.gqf.DefaultMoveSpeed;
      }
      t = MathUtils_1.MathUtils.Clamp(t, this.iTf.MinSpeed, this.iTf.MaxSpeed);
      i.Multiply(t, this.Anr);
      this.Ql = o / t;
    }
    var e;
    var s;
    var h = this.OwnerEntity.GetComponent(215);
    for ([e, s] of this.sTf.CommonConfig.ModifyVehicleTagsOnEnter) {
      if (s) {
        h?.AddTag(e);
      } else {
        h?.RemoveTag(e);
      }
    }
    return true;
  }
  OnExit() {
    var t;
    var i;
    var o = this.OwnerEntity.GetComponent(215);
    for ([t, i] of this.sTf.CommonConfig.ModifyVehicleTagsOnExit) {
      if (i) {
        o?.AddTag(t);
      } else {
        o?.RemoveTag(t);
      }
    }
  }
  OnTick(t) {
    this.TickUpdateMove(t);
    this.Cqf(t);
    this.LRm();
  }
  GetVelocity(t) {
    t.DeepCopy(this.Anr);
    return true;
  }
  TickUpdateMove(t) {
    t = Math.min(this.Ql - this.Cce, t, this.gqf.MaxDeltaTimeForMoveUpdate);
    this.Cce += t;
    t = this.dHo;
    this.Anr.Multiply(this.Cce, t);
    t.AdditionEqual(this._ae);
    Quat_1.Quat.Slerp(this.JRm, this.ZRm, this.Cce / this.Ql, MathUtils_1.MathUtils.CommonTempQuat);
    this.MoveUpdater?.(t, MathUtils_1.MathUtils.CommonTempQuat.Rotator(), this.Anr);
  }
  LRm() {
    if (this.ojo.EnableBlockingCheck && this.ayf && this.fqf > this.ojo.MaxBlockingTimeOut) {
      this.IsFinishMove = true;
      this.IsFinishMoveOnFailure = true;
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleSimpleMoveToRailMoveData] Finish move on blocking", ["BlockingTime", this.fqf]);
      }
    } else {
      this.IsFinishMove = this.Cce >= this.Ql;
    }
  }
  Cqf(t) {
    var i;
    var o;
    var e;
    if (this.ojo.EnableBlockingCheck && !this.IsFinishMove && (i = this.OwnerEntity.GetComponent(247), e = this.OwnerEntity.GetComponent(249), i && e && e.VehicleMovement)) {
      o = this.ayf;
      this.ayf = !e.VehicleMovement.IsValidTransform(i.ActorTransform, undefined);
      if (this.ayf) {
        e = o ? Math.min(t, this.gqf.MaxDeltaTimeForMoveUpdate) : 0;
        this.fqf += e;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleSimpleMoveToRailMoveData] Blocked", ["BlockingTime", this.fqf]);
        }
      } else {
        this.fqf = 0;
      }
    }
  }
}
exports.MotorcycleSimpleMoveToRailMoveData = MotorcycleSimpleMoveToRailMoveData;
//# sourceMappingURL=MotorcycleSimpleMoveToRailMoveData.js.map