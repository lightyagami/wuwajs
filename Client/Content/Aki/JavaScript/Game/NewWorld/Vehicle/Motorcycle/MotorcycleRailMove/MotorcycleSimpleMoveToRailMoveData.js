"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleSimpleMoveToRailMoveData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
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
    this.lwm = Quat_1.Quat.Create();
    this._wm = Quat_1.Quat.Create();
    this.Ql = 0;
    this.Cce = 0;
    this.I1e = Vector_1.Vector.Create();
    this.cce = Rotator_1.Rotator.Create();
    this.FCg = new MotorcycleRailMoveDefine_1.RailMoveContext();
    this.dHo = Vector_1.Vector.Create();
    this.H1g = Rotator_1.Rotator.Create();
    this.sBg = Transform_1.Transform.Create();
    this.vEf = false;
    this.EVf = 0;
  }
  get YRf() {
    return this.MoveConfig.DirectlyEnterRailConfig;
  }
  get WRf() {
    return this.MoveConfig.DirectlyEnterRailConfig.LinearMoveConfig;
  }
  get ojo() {
    return this.MoveConfig.DirectlyEnterRailConfig.CommonConfig;
  }
  get IVf() {
    return this.MoveConfig.BasicRailMoveConfig;
  }
  OnEnter(i) {
    if (!this.TargetSpline) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleSimpleMoveToRailMoveData] OnEnter Failed: Spline is undefined", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    var o = this.H1g;
    if (!this.MoveGetter?.(this._ae, o)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleSimpleMoveToRailMoveData] OnEnter Failed: 拿不到位置旋转", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    o.Quaternion(this.lwm);
    this.FCg.SourceLoc.FromUeVector(this._ae);
    this.lwm.Rotator(this.FCg.SourceRot);
    this.FCg.RailSpline = this.TargetSpline;
    if (!i?.GetVelocity(this.FCg.SourceVel) && !this.MoveGetter(undefined, undefined, this.FCg.SourceVel)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleSimpleMoveToRailMoveData] OnEnter Failed: 拿不到速度", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    if (this.FCg.SourceVel.IsNearlyZero(1)) {
      this.FCg.SourceVel.Reset();
    }
    let t = true;
    o = [MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckVehicleNotReverseMove, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleUpAndRailUp, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleForwardAndRailTangent, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleVelocityAndRailTangent, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckRailLenLeft, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckRelativeLocation];
    this.FCg.IsForward = true;
    if (!(t = (t = MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.CalcRailMoveTargetNotAdvanceBySpeed(this.FCg, this.YRf.LinearMoveConfig.MinSpeed, this.YRf.LinearMoveConfig.MaxSpeed)) && MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.ExecCheckList(this.FCg, this.YRf.EnterRailCondition, o, true, this.constructor.name))) {
      this.FCg.IsForward = false;
      t = (t = MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.CalcRailMoveTargetNotAdvanceBySpeed(this.FCg, this.YRf.LinearMoveConfig.MinSpeed, this.YRf.LinearMoveConfig.MaxSpeed)) && MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.ExecCheckList(this.FCg, this.YRf.EnterRailCondition, o, true, this.constructor.name);
    }
    if (!t) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleSimpleMoveToRailMoveData] OnEnter Failed: 计算终点并检查失败", ["SplineId", this.RelatedRail?.GetRailSplineId()]);
      }
      return false;
    }
    this.Due.FromUeVector(this.FCg.RailMoveTarget.TargetLoc);
    this.FCg.RailMoveTarget.TargetRot.Quaternion(this._wm);
    {
      i = this.dHo;
      this.Due.Subtraction(this._ae, i);
      o = i.Size();
      i.Normalize();
      let t = this.FCg.SourceVel.DotProduct(i);
      if (MathUtils_1.MathUtils.IsNearlyZero(t) || t < 0) {
        t = this.IVf.DefaultMoveSpeed;
      }
      t = MathUtils_1.MathUtils.Clamp(t, this.WRf.MinSpeed, this.WRf.MaxSpeed);
      i.Multiply(t, this.Anr);
      this.Ql = o / t;
    }
    var e;
    var s;
    var h = this.OwnerEntity.GetComponent(217);
    for ([e, s] of this.YRf.CommonConfig.ModifyVehicleTagsOnEnter) {
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
    var o = this.OwnerEntity.GetComponent(217);
    for ([t, i] of this.YRf.CommonConfig.ModifyVehicleTagsOnExit) {
      if (i) {
        o?.AddTag(t);
      } else {
        o?.RemoveTag(t);
      }
    }
  }
  OnTick(t) {
    this.TickUpdateMove(t);
    this.TVf(t);
    this.aBg();
    this.FRm();
  }
  GetVelocity(t) {
    t.DeepCopy(this.Anr);
    return true;
  }
  TickUpdateMove(t) {
    t = Math.min(this.Ql - this.Cce, t, this.IVf.MaxDeltaTimeForMoveUpdate);
    this.Cce += t;
    this.Anr.Multiply(this.Cce, this.I1e);
    this.I1e.AdditionEqual(this._ae);
    Quat_1.Quat.Slerp(this.lwm, this._wm, this.Cce / this.Ql, MathUtils_1.MathUtils.CommonTempQuat);
    MathUtils_1.MathUtils.CommonTempQuat.Rotator(this.cce);
  }
  aBg() {
    var t;
    var i;
    if (this.ojo.EnableBlockingCheck && this.vEf) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleSimpleMoveToRailMoveData] 检测到阻挡，不应用位移更新", ["BlockingTime", this.EVf], ["CurrentLocation", this.I1e]);
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
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleSimpleMoveToRailMoveData] Finish move on blocking", ["BlockingTime", this.EVf]);
      }
    } else {
      this.IsFinishMove = this.Cce >= this.Ql;
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
          Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleSimpleMoveToRailMoveData] Blocked", ["BlockingTime", this.EVf]);
        }
      } else {
        this.EVf = 0;
      }
    }
  }
}
exports.MotorcycleSimpleMoveToRailMoveData = MotorcycleSimpleMoveToRailMoveData;
//# sourceMappingURL=MotorcycleSimpleMoveToRailMoveData.js.map