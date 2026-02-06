"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowMotorRailTransitionAction = undefined;
const Log_1 = require("../../../Core/Common/Log");
const SplineCurve_1 = require("../../../Core/Utils/Curve/SplineCurve");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const ModelManager_1 = require("../../Manager/ModelManager");
const MotorcycleJumpToRailMoveData_1 = require("../../NewWorld/Vehicle/Motorcycle/MotorcycleRailMove/MotorcycleJumpToRailMoveData");
const MotorcycleRailMoveConfigs_1 = require("../../NewWorld/Vehicle/Motorcycle/MotorcycleRailMove/MotorcycleRailMoveConfigs");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowMotorRailTransitionAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.E0 = 0;
    this.zun = 0;
    this.Hte = undefined;
    this.NRf = undefined;
    this.DEf = (i, o, e) => {
      if (this.Hte && (i && o ? this.Hte.SetActorLocationAndRotation(i.ToUeVector(), o.ToUeRotator(), "LevelFlowMotorRailTransitionAction", false) : i ? this.Hte.SetActorLocation(i.ToUeVector(), "LevelFlowMotorRailTransitionAction", false) : o && this.Hte.SetActorRotation(o.ToUeRotator(), "LevelFlowMotorRailTransitionAction", false), e)) {
        o = (i = this.Hte.VehicleMoveComp)?.VehicleMovement;
        i?.SetForceSpeed(e);
        if ((i = o?.WheelDisplayInfosObj) && i.DisplayInfos.Num() >= 2) {
          o = e.Size();
          i.DisplayInfos.Get(0).WheelSpeed = o;
          i.DisplayInfos.Get(1).WheelSpeed = o;
          i.DisplayInfos.Get(0).WheelAccel = 0;
          i.DisplayInfos.Get(1).WheelAccel = 0;
        }
        this.Hte.ResetCachedVelocityTime();
      }
    };
    this.UEf = (i, o, e) => {
      return !!this.Hte && (i && i.DeepCopy(this.Hte.ActorLocationProxy), o && o.DeepCopy(this.Hte.ActorRotationProxy), !e || !!this.NRf?.GetVelocity(e) || !((i = this.Hte.Actor?.VehicleMovementComponent)?.IsValid() ? (e.FromUeVector(i.Velocity), 0) : !(o = this.Hte.Owner?.D_GetVelocity()) || (e.FromUeVector(o), 0)));
    };
  }
  Init(i, o) {
    this.E0 = i;
    this.zun = o;
    return this;
  }
  OnExecute() {
    var i;
    var o;
    var e;
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.E0);
    if (t?.IsInit && t.Entity) {
      t = t.Entity;
      this.Hte = t.GetComponent(247);
      if (this.Hte) {
        if (t.GetComponent(249)) {
          o = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(this.zun, t.Id, 1);
          (i = new SplineCurve_1.SplineCurve()).Init(o.SplineCurves.Position, o.SplineCurves.ReparamTable.Points, o.SplineCurves.Rotation, o.SplineCurves.Scale);
          i.SetSplineTransform(Transform_1.Transform.Create(o.D_GetSocketTransform(undefined)), true);
          o = new MotorcycleRailMoveConfigs_1.MotorcycleRailMoveConfig();
          (e = new MotorcycleJumpToRailMoveData_1.MotorcycleJumpToRailMoveData(t, undefined)).MoveConfig.DeepCopy(o);
          e.TargetSpline = i;
          e.GravityDir.DeepCopy(GravityUtils_1.GravityUtils.GetGravityDirectForActor(this.Hte));
          e.MoveUpdater = this.DEf;
          e.MoveGetter = this.UEf;
          (this.NRf = e).Enter(undefined);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelFlow", 58, "[MoveWithSpline]实体没有MoveComp", ["EntityId", t.Id]);
          }
          this.FinishExecute(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, "[MoveWithSpline]实体没有ActorComp", ["EntityId", t.Id]);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "[MoveWithSpline]实体无效", ["EntityId", this.E0]);
      }
      this.FinishExecute(false);
    }
  }
  OnTick(i) {
    if (this.NRf) {
      if (this.NRf.IsFinishMove) {
        this.FinishExecute(true);
      } else {
        this.NRf?.Tick(i);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["EntityId", this.E0], ["SplineEntityId", this.zun]);
    }
  }
}
exports.LevelFlowMotorRailTransitionAction = LevelFlowMotorRailTransitionAction;
//# sourceMappingURL=LevelFlowMotorRailTransitionAction.js.map