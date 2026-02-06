"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const BlackboardController_1 = require("../../World/Controller/BlackboardController");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
class AnimController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Controller", 24, "AnimController.OnInit");
    }
    cpp_1.UKuroAnimJsSubsystem.RegisterUpdateAnimInfoFunction(GlobalData_1.GlobalData.GameInstance, AnimController.UpdateAnimInfo);
    cpp_1.UKuroAnimJsSubsystem.RegisterUpdateMonsterInfoFunction(GlobalData_1.GlobalData.GameInstance, AnimController.UpdateMonsterAnimInfo);
    cpp_1.UKuroAnimJsSubsystem.RegisterUpdateNpcInfoFunction(GlobalData_1.GlobalData.GameInstance, AnimController.UpdateNpcAnimInfo);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "p.KuroHumanIK.CVarExtendClimbTraceRadius 0");
    return true;
  }
  static OnClear() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Controller", 24, "AnimController.OnClear");
    }
    cpp_1.UKuroAnimJsSubsystem.UnregisterUpdateAnimInfoFunction(GlobalData_1.GlobalData.GameInstance);
    return true;
  }
  static RegisterUpdateAnimInfoEntity(t) {
    cpp_1.UKuroAnimJsSubsystem.RegisterEntity(GlobalData_1.GlobalData.GameInstance, t);
  }
  static UnregisterUpdateAnimInfoEntity(t) {
    cpp_1.UKuroAnimJsSubsystem.UnregisterEntity(GlobalData_1.GlobalData.GameInstance, t);
  }
  static UpdateAnimInfoMove(t) {
    var e;
    var n;
    var r;
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 188);
    if (o?.Valid && (e = o.MainAnimInstance.LogicParams, o = o.AnimLogicParamsSetter, (n = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid && (r = n.InputDirectProxy, o.InputDirect.Equals(r) || (o.InputDirect.DeepCopy(r), e.InputDirectRef = r.ToUeVectorOld()), r = n.InputRotatorProxy, o.InputRotator.Equals(r) || (o.InputRotator.DeepCopy(r), e.InputRotatorRef = r.ToUeRotator())), (n = EntitySystem_1.EntitySystem.GetComponent(t, 48))?.Valid && (r = n.Acceleration, o.Acceleration.Equals(r) || (o.Acceleration.DeepCopy(r), e.AccelerationRef = r.ToUeVectorOld()), r = n.IsMoving, o.IsMoving !== r && (o.IsMoving = r, e.IsMovingRef = r), r = n.HasMoveInput, o.HasMoveInput !== r && (o.HasMoveInput = r, e.HasMoveInputRef = r), r = n.Speed, o.Speed !== r && (o.Speed = r, e.SpeedRef = r), r = n.IsJump, o.IsJump !== r && (o.IsJump = r, e.IsJumpRef = r), r = n.GroundedTimeUe, o.GroundedTime !== r && (o.GroundedTime = r, e.GroundedTimeRef = r), r = n.IsFallingIntoWater, o.IsFallingIntoWater !== r && (o.IsFallingIntoWater = r, e.IsFallingIntoWaterRef = r), r = n.JumpUpRate, o.JumpUpRate !== r && (o.JumpUpRate = r, e.JumpUpRateRef = r), r = n.ForceExitStateStop, o.ForceExitStateStop !== r) && (o.ForceExitStateStop = r, e.ForceExitStateStopRef = r), (n = EntitySystem_1.EntitySystem.GetComponent(t, 39))?.Valid && (r = n.FloatingLocalDirection, o.FloatingLocalDirection.Equals(r) || (o.FloatingLocalDirection.DeepCopy(r), e.FloatingLocalDirectionRef = r.ToUeVectorOld()), r = n.FloatingMoveMix, o.FloatingMoveMix !== r) && (o.FloatingMoveMix = r, e.FloatingMoveMixRef = r), (n = EntitySystem_1.EntitySystem.GetComponent(t, 36))?.Valid && (r = n.GetTsClimbInfo(), o.ClimbInfo.Equals(r) || (o.ClimbInfo.DeepCopy(r), e.ClimbInfoRef = n.GetClimbInfoNew()), r = n.GetTsClimbState(), o.ClimbState.Equals(r) || (o.ClimbState.DeepCopy(r), e.ClimbStateRef = n.GetClimbStateNew()), r = n.GetOnWallAngle(), o.ClimbOnWallAngle !== r) && (o.ClimbOnWallAngle = r, e.ClimbOnWallAngleRef = r), (n = EntitySystem_1.EntitySystem.GetComponent(t, 82))?.Valid && (r = n.SprintSwimOffset, o.SprintSwimOffset !== r && (o.SprintSwimOffset = r, e.SprintSwimOffsetRef = r), r = n.SprintSwimOffsetLerpSpeed, o.SprintSwimOffsetLerpSpeed !== r) && (o.SprintSwimOffsetLerpSpeed = r, e.SprintSwimOffsetLerpSpeedRef = r), (n = EntitySystem_1.EntitySystem.GetComponent(t, 37))?.Valid && (r = n.SlideForward, o.SlideForward.Equals(r) || (o.SlideForward.DeepCopy(r), e.SlideForwardRef = r.ToUeVectorOld()), r = n.SlideSwitchThisFrame, o.SlideSwitchThisFrame !== r && (o.SlideSwitchThisFrame = r, e.SlideSwitchThisFrameRef = r), r = n.StandMode, o.SlideStandMode !== r) && (o.SlideStandMode = r, e.SlideStandModeRef = r), (n = EntitySystem_1.EntitySystem.GetComponent(t, 118))?.Valid) && (r = n.Active, o.IsInSplineMove !== r)) {
      o.IsInSplineMove = r;
      e.bIsInSplineMove = r;
    }
  }
  static UpdateAnimInfoMeshAnim(t) {
    var e;
    var n;
    var r;
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 188);
    if (o?.Valid && (e = o.MainAnimInstance.LogicParams, n = o.AnimLogicParamsSetter, r = o.BattleIdleEndTime, n.BattleIdleTime !== r && (n.BattleIdleTime = r, e.BattleIdleTimeRef = r), r = o.DegMovementSlope, n.DegMovementSlope !== r && (n.DegMovementSlope = r, e.DegMovementSlopeRef = r), r = o.GetTsSightDirect(), n.SightDirect.Equals(r) || (n.SightDirect.DeepCopy(r), e.SightDirectRef = r.ToUeVectorOld()), r = o.DisableBlink, n.DisableBlink !== r && (n.DisableBlink = r, e.bDisableBlink = r), o = EntitySystem_1.EntitySystem.GetComponent(t, 77)) && (r = o.GetRagRollQuitState(), n.RagQuitState !== r)) {
      n.RagQuitState = r;
      e.RagQuitStateRef = r;
    }
  }
  static UpdateAnimInfoHit(e) {
    var n = EntitySystem_1.EntitySystem.GetComponent(e, 188);
    if (n?.Valid) {
      e = EntitySystem_1.EntitySystem.GetComponent(e, 66);
      if (e) {
        var r = n.MainAnimInstance.LogicParams;
        var n = n.AnimLogicParamsSetter;
        var o = e.GetEnterFkAndReset();
        if (n.EnterFk !== o) {
          n.EnterFk = o;
          r.EnterFkRef = o;
        }
        let t = e.BeHitDirect;
        if (!n.BeHitDirect.Equals(t)) {
          n.BeHitDirect.DeepCopy(t);
          r.BeHitDirectRef = t.ToUeVectorOld();
        }
        t = e.BeHitLocation;
        if (!n.BeHitLocation.Equals(t)) {
          n.BeHitLocation.DeepCopy(t);
          r.BeHitLocationRef = t.ToUeVectorOld();
        }
        o = e.BeHitSocketName;
        if (!n.BeHitSocketName.op_Equality(o)) {
          n.BeHitSocketName = o;
          r.BeHitSocketNameRef = o;
        }
      }
    }
  }
  static UpdateAnimInfoUnifiedState(t) {
    var e;
    var n;
    var r;
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 188);
    if (o?.Valid && (n = EntitySystem_1.EntitySystem.GetComponent(t, 186)) && (e = o.MainAnimInstance.LogicParams, o = o.AnimLogicParamsSetter, r = n.MoveState, o.CharMoveState !== r && (o.CharMoveState = r, e.CharMoveStateRef = r), r = n.PositionState, o.CharPositionState !== r && (o.CharPositionState = r, e.CharPositionStateRef = r), r = n.DirectionState, o.CharCameraState !== r && (o.CharCameraState = r, e.CharCameraStateRef = r), (n = EntitySystem_1.EntitySystem.GetComponent(t, 43)) && o.SkillTarget !== (n.SkillTarget?.Id ?? 0) && (o.SkillTarget = n.SkillTarget?.Id ?? 0, e.SkillTarget = n.SkillTarget?.Entity?.GetComponent(1)?.Owner), r = n.LastActivateSkillTime, o.LastActiveSkillTime !== r && (o.LastActiveSkillTime = r, e.LastActiveSkillTime = r), t = ModelManager_1.ModelManager.PlotModel.IsInInteraction || ModelManager_1.ModelManager.PlotModel.IsInPlot && ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !== "LevelD", o.IsInPerformingPlot !== t && (o.IsInPerformingPlot = t, e.bIsInPerformingPlot = t), n = ModelManager_1.ModelManager.PlotModel.IsInPlot && (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelA" || ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelB"), o.IsInSequence !== n && (o.IsInSequence = n, e.bIsInSequence = n), r = !!ModelManager_1.ModelManager.TeleportModel?.IsTeleport || !!ModelManager_1.ModelManager.GameModeModel?.Loading, t = UiCameraAnimationManager_1.UiCameraAnimationManager.IsDisablePlayer() || r, o.IsInUiCamera !== t)) {
      o.IsInUiCamera = t;
      e.bIsInUiCamera = t;
    }
  }
  static UpdateAnimInfoSceneInteract(t) {
    var e;
    var n;
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 188);
    if (r?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 29)) && (e = r.MainAnimInstance.LogicParams, r = r.AnimLogicParamsSetter, n = t.GetSitDownState(), r.SitDown !== n && (r.SitDown = n, e.bSitDown = n), n = t.SitDownTypeIndex, r.SitDownType !== n && (r.SitDownType = n, e.SitDownType = n), n = t.EnterSitDownIndex, r.SitDownDirect !== n && (r.SitDownDirect = n, e.SitDownDirect = n), n = t.LeaveSitDownIndex, r.StandUpDirect !== n)) {
      r.StandUpDirect = n;
      e.StandUpDirect = n;
    }
  }
  static UpdateAnimInfoVehicle(t) {
    var e;
    var n;
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 188);
    if (r?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 242)) && (e = r.MainAnimInstance.LogicParams, r = r.AnimLogicParamsSetter, n = t.IsOnVehicle, r.IsOnVehicle !== n && (r.IsOnVehicle = n, e.IsOnVehicle = n), n = t.VehicleTypeInt, r.VehicleType !== n && (r.VehicleType = n, e.VehicleType = n), n = t.IsLeavingVehicle, r.IsLeavingVehicle !== n)) {
      r.IsLeavingVehicle = n;
      e.IsLeavingVehicle = n;
    }
  }
  static UpdateAnimInfoHoldingHands(o) {
    var i = EntitySystem_1.EntitySystem.GetComponent(o, 188);
    if (i?.Valid) {
      var a = i.MainAnimInstance.LogicParams;
      var i = i.AnimLogicParamsSetter;
      let t = undefined;
      let e = undefined;
      let n = undefined;
      let r = undefined;
      var l = EntitySystem_1.EntitySystem.GetComponent(o, 242);
      if (l) {
        [e, t] = l.GetHandIkTarget();
        [r, n] = l.GetHandIkTargetUe();
      }
      var l = EntitySystem_1.EntitySystem.GetComponent(o, 323);
      if (l) {
        if (!t) {
          t = l.GetHandIkTarget(0);
          n = l.GetHandIkTargetUe(0);
        }
        if (!e) {
          e = l.GetHandIkTarget(1);
          r = l.GetHandIkTargetUe(1);
        }
      }
      if (!i.LeftHandIkTarget.Equals(t)) {
        i.LeftHandIkTarget.DeepCopy(t);
        if (o = n) {
          a.LeftHandIKTargetCS = o;
        } else {
          a.LeftHandIKTargetCS.Alpha = 0;
        }
      }
      if (!i.RightHandIkTarget.Equals(e)) {
        i.RightHandIkTarget.DeepCopy(e);
        if (l = r) {
          a.RightHandIKTargetCS = l;
        } else {
          a.RightHandIKTargetCS.Alpha = 0;
        }
      }
    }
  }
  static UpdateMonsterAnimInfoMove(t) {
    var e;
    var n;
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 188);
    if (r?.Valid) {
      e = r.MainAnimInstance.LogicParams;
      n = r.AnimLogicParamsSetter;
      if ((t = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid) {
        t = t.InputDirectProxy;
        if (!n.InputDirect.Equals(t)) {
          n.InputDirect.DeepCopy(t);
          e.InputDirectRef = t.ToUeVectorOld();
        }
      }
      t = r.GetTsSightDirect();
      if (!n.SightDirect.Equals(t)) {
        n.SightDirect.DeepCopy(t);
        e.SightDirectRef = t.ToUeVectorOld();
      }
    }
  }
  static UpdateMonsterAnimInfoSkill(t) {
    var e;
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 188);
    if (n?.Valid && (e = n.MainAnimInstance.LogicParams, n = n.AnimLogicParamsSetter, t = EntitySystem_1.EntitySystem.GetComponent(t, 43)) && n.SkillTarget !== (t.SkillTarget?.Id ?? 0)) {
      n.SkillTarget = t.SkillTarget?.Id ?? 0;
      e.SkillTarget = t.SkillTarget?.Entity?.GetComponent(1)?.Owner;
    }
  }
  static UpdateMonsterAnimInfoHit(t) {
    var e;
    var n;
    var r;
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 188);
    if (o?.Valid && (r = EntitySystem_1.EntitySystem.GetComponent(t, 66)) && (e = o.MainAnimInstance.LogicParams, o = o.AnimLogicParamsSetter, n = r.GetEnterFkAndReset(), o.EnterFk !== n && (o.EnterFk = n, e.EnterFkRef = n), r?.BeHitBones && r?.BeHitBones?.length > 0 && o.BeHitBone !== r.BeHitBones[0] && (o.BeHitBone = r.BeHitBones[0], e.BeHitBoneRef = r.BeHitBones[0]), n = BlackboardController_1.BlackboardController.GetEntityIdByEntity(t, "HateTarget")) && (r = EntitySystem_1.EntitySystem.GetComponent(n, 1), o.HateTarget !== n)) {
      o.HateTarget = n;
      e.HateTarget = r?.Owner;
    }
  }
  static UpdateMonsterAnimInfoUnifiedState(t) {
    var e;
    var n;
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 188);
    if (r?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 111)) && (e = r.MainAnimInstance.LogicParams, r = r.AnimLogicParamsSetter, n = t.MoveState, r.CharMoveState !== n && (r.CharMoveState = n, e.CharMoveStateRef = n), n = t.PositionState, r.CharPositionState !== n && (r.CharPositionState = n, e.CharPositionStateRef = n), n = t.DirectionState, r.CharCameraState !== n)) {
      r.CharCameraState = n;
      e.CharCameraStateRef = n;
    }
  }
  static UpdateNpcAnimInfoMove(t) {
    var e;
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 188);
    if (n?.Valid && (e = n.MainAnimInstance.LogicParams, n = n.AnimLogicParamsSetter, (t = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid)) {
      t = t.InputDirectProxy;
      if (!n.InputDirect.Equals(t)) {
        n.InputDirect.DeepCopy(t);
        e.InputDirectRef = t.ToUeVectorOld();
      }
    }
  }
  static UpdateNpcAnimInfoUnifiedState(t) {
    var e;
    var n;
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 188);
    if (r?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 111)) && (e = r.MainAnimInstance.LogicParams, r = r.AnimLogicParamsSetter, n = t.MoveState, r.CharMoveState !== n && (r.CharMoveState = n, e.CharMoveStateRef = n), n = t.PositionState, r.CharPositionState !== n && (r.CharPositionState = n, e.CharPositionStateRef = n), n = t.DirectionState, r.CharCameraState !== n)) {
      r.CharCameraState = n;
      e.CharCameraStateRef = n;
    }
  }
}
(exports.AnimController = AnimController).ForceDisableAnimOptimizationCache = new Set();
AnimController.CacheForceDisableAnimOptimization = t => {
  AnimController.ForceDisableAnimOptimizationCache.add(t);
};
AnimController.ConsumeForceDisableAnimOptimization = t => AnimController.ForceDisableAnimOptimizationCache.delete(t);
AnimController.ClearForceDisableAnimOptimizationCache = () => {
  AnimController.ForceDisableAnimOptimizationCache.clear();
};
AnimController.UpdateAnimInfo = t => {
  AnimController.UpdateAnimInfoMove(t);
  AnimController.UpdateAnimInfoMeshAnim(t);
  AnimController.UpdateAnimInfoHit(t);
  AnimController.UpdateAnimInfoUnifiedState(t);
  AnimController.UpdateAnimInfoSceneInteract(t);
  AnimController.UpdateAnimInfoHoldingHands(t);
  AnimController.UpdateAnimInfoVehicle(t);
};
AnimController.UpdateMonsterAnimInfo = t => {
  AnimController.UpdateMonsterAnimInfoHit(t);
  AnimController.UpdateMonsterAnimInfoMove(t);
  AnimController.UpdateMonsterAnimInfoSkill(t);
  AnimController.UpdateMonsterAnimInfoUnifiedState(t);
  AnimController.UpdateAnimInfoHoldingHands(t);
};
AnimController.UpdateNpcAnimInfo = t => {
  AnimController.UpdateNpcAnimInfoMove(t);
  AnimController.UpdateNpcAnimInfoUnifiedState(t);
}; //# sourceMappingURL=AnimController.js.map