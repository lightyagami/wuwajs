"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiCameraAnimationManager_1 = require("../../../../../Module/UiCameraAnimation/UiCameraAnimationManager");
class TsVehicleBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static UpdateVehiclePerformData(t, e, i, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 237);
    if (t) {
      (0, puerts_1.$set)(e, t.IsBeingImpacted);
      (0, puerts_1.$set)(i, t.CollisionDirection);
      (0, puerts_1.$set)(r, t.CollisionStrength);
    }
  }
  static UpdateDrivedVehiclePerformData(t, e, i, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 229)?.VehicleEntity?.GetComponent(237);
    if (t) {
      (0, puerts_1.$set)(e, t.IsBeingImpacted);
      (0, puerts_1.$set)(i, t.CollisionDirection);
      (0, puerts_1.$set)(r, t.CollisionStrength);
    }
  }
  static UpdateAnimInfo(t) {
    TsVehicleBlueprintFunctionLibrary.UpdateAnimInfoMove(t);
    TsVehicleBlueprintFunctionLibrary.UpdateAnimInfoUnifiedState(t);
  }
  static UpdateAnimInfoMove(t) {
    var e;
    var i;
    var r;
    var a = EntitySystem_1.EntitySystem.GetComponent(t, 235);
    if (a?.Valid && (e = a.MainAnimInstance?.LogicParams)?.IsValid() && (a = a.AnimLogicParamsSetter, (i = EntitySystem_1.EntitySystem.GetComponent(t, 234))?.Valid && (r = i.InputDirectProxy, a.InputDirect.Equals(r) || (a.InputDirect.DeepCopy(r), e.InputDirectRef = r.ToUeVectorOld()), r = i.InputRotatorProxy, a.InputRotator.Equals(r) || (a.InputRotator.DeepCopy(r), e.InputRotatorRef = r.ToUeRotator())), (i = EntitySystem_1.EntitySystem.GetComponent(t, 236))?.Valid) && (r = i.Acceleration, a.Acceleration.Equals(r) || (a.Acceleration.DeepCopy(r), e.AccelerationRef = r.ToUeVectorOld()), t = i.IsMoving, a.IsMoving !== t && (a.IsMoving = t, e.IsMovingRef = t), r = i.HasMoveInput, a.HasMoveInput !== r && (a.HasMoveInput = r, e.HasMoveInputRef = r), t = i.Speed, a.Speed !== t)) {
      a.Speed = t;
      e.SpeedRef = t;
    }
  }
  static UpdateAnimInfoUnifiedState(t) {
    var e;
    var i;
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 235);
    if (t?.Valid && (e = t.MainAnimInstance?.LogicParams)?.IsValid() && (t = t.AnimLogicParamsSetter, i = ModelManager_1.ModelManager.PlotModel.IsInInteraction || ModelManager_1.ModelManager.PlotModel.IsInPlot && ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !== "LevelD", t.IsInPerformingPlot !== i && (t.IsInPerformingPlot = i, e.bIsInPerformingPlot = i), i = ModelManager_1.ModelManager.PlotModel.IsInPlot && (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelA" || ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelB"), t.IsInSequence !== i && (t.IsInSequence = i, e.bIsInSequence = i), i = UiCameraAnimationManager_1.UiCameraAnimationManager.IsDisablePlayer(), t.IsInUiCamera !== i)) {
      t.IsInUiCamera = i;
      e.bIsInUiCamera = i;
    }
  }
  static GetAndResetEnterSprint(t) {
    var e;
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 245);
    return !!t && (e = t.IsEnterSprint, t.IsEnterSprint = false, e);
  }
  static GetDrivedVehicleSeatRot(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 229);
    if (!t?.VehicleEntity) {
      return false;
    }
    var i = t.Seat;
    if (i === -1) {
      return false;
    }
    t = t.VehicleEntity.GetComponent(245);
    if (!t?.IsWaterfallMove) {
      MathUtils_1.MathUtils.CommonTempRotator.Reset();
      if (!t?.GetDrivedVehicleSeatLocalRot(i, MathUtils_1.MathUtils.CommonTempRotator)) {
        return false;
      }
      t = (0, puerts_1.$unref)(e);
      t.Pitch = MathUtils_1.MathUtils.CommonTempRotator.Pitch;
      t.Yaw = MathUtils_1.MathUtils.CommonTempRotator.Yaw;
      t.Roll = MathUtils_1.MathUtils.CommonTempRotator.Roll;
    }
    return true;
  }
  static ConvertAngleToPassengerSpace(t, e) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 229);
    if (t?.IsOnVehicle) {
      t = -t.SeatReletiveTrans.GetRotation().Rotator().Yaw;
      return MathUtils_1.MathUtils.WrapAngle(e + t);
    } else {
      return 0;
    }
  }
  static GetVehicleVelocity(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 234);
    if (!t?.Actor?.IsValid()) {
      return false;
    }
    var i = MathUtils_1.MathUtils.CommonTempVector;
    i.Reset();
    t.Entity.GetComponent(233)?.GetVehicleVelocity(i);
    t = (0, puerts_1.$unref)(e);
    t.X = i.X;
    t.Y = i.Y;
    t.Z = i.Z;
    return true;
  }
  static GetDrivedVehicleVelocity(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 229);
    if (!t?.IsOnVehicle) {
      return false;
    }
    if (!t.VehicleEntity.GetComponent(234)?.Actor?.IsValid()) {
      return false;
    }
    var i = MathUtils_1.MathUtils.CommonTempVector;
    i.Reset();
    t.VehicleEntity.GetComponent(233)?.GetVehicleVelocity(i);
    t = (0, puerts_1.$unref)(e);
    t.X = i.X;
    t.Y = i.Y;
    t.Z = i.Z;
    return true;
  }
  static GetVehicleRotiationSpeed(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 234);
    if (t?.Actor?.IsValid()) {
      return t.SimulatedRotYawSpeed;
    } else {
      return 0;
    }
  }
  static GetDrivedVehicleRotiationSpeed(t) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 229);
    if (t?.IsOnVehicle && (t = t.VehicleEntity.GetComponent(234))?.Actor?.IsValid()) {
      return t.SimulatedRotYawSpeed;
    } else {
      return 0;
    }
  }
}
exports.default = TsVehicleBlueprintFunctionLibrary;
//# sourceMappingURL=TsVehicleBlueprintFunctionLibrary.js.map