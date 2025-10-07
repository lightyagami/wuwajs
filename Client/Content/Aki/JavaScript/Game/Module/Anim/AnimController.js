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
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "p.KuroHumanIK.CVarPredictionMaxIterateCount 0");
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
    var a = EntitySystem_1.EntitySystem.GetComponent(t, 178);
    if (a?.Valid && (e = a.MainAnimInstance.LogicParams, a = a.AnimLogicParamsSetter, (n = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid && (r = n.InputDirectProxy, a.InputDirect.Equals(r) || (a.InputDirect.DeepCopy(r), e.InputDirectRef = r.ToUeVectorOld()), r = n.InputRotatorProxy, a.InputRotator.Equals(r) || (a.InputRotator.DeepCopy(r), e.InputRotatorRef = r.ToUeRotator())), (n = EntitySystem_1.EntitySystem.GetComponent(t, 45))?.Valid && (r = n.Acceleration, a.Acceleration.Equals(r) || (a.Acceleration.DeepCopy(r), e.AccelerationRef = r.ToUeVectorOld()), r = n.IsMoving, a.IsMoving !== r && (a.IsMoving = r, e.IsMovingRef = r), r = n.HasMoveInput, a.HasMoveInput !== r && (a.HasMoveInput = r, e.HasMoveInputRef = r), r = n.Speed, a.Speed !== r && (a.Speed = r, e.SpeedRef = r), r = n.IsJump, a.IsJump !== r && (a.IsJump = r, e.IsJumpRef = r), r = n.GroundedTimeUe, a.GroundedTime !== r && (a.GroundedTime = r, e.GroundedTimeRef = r), r = n.IsFallingIntoWater, a.IsFallingIntoWater !== r && (a.IsFallingIntoWater = r, e.IsFallingIntoWaterRef = r), r = n.JumpUpRate, a.JumpUpRate !== r && (a.JumpUpRate = r, e.JumpUpRateRef = r), r = n.ForceExitStateStop, a.ForceExitStateStop !== r) && (a.ForceExitStateStop = r, e.ForceExitStateStopRef = r), (n = EntitySystem_1.EntitySystem.GetComponent(t, 34))?.Valid && (r = n.GetTsClimbInfo(), a.ClimbInfo.Equals(r) || (a.ClimbInfo.DeepCopy(r), e.ClimbInfoRef = n.GetClimbInfoNew()), r = n.GetTsClimbState(), a.ClimbState.Equals(r) || (a.ClimbState.DeepCopy(r), e.ClimbStateRef = n.GetClimbStateNew()), r = n.GetOnWallAngle(), a.ClimbOnWallAngle !== r) && (a.ClimbOnWallAngle = r, e.ClimbOnWallAngleRef = r), (n = EntitySystem_1.EntitySystem.GetComponent(t, 77))?.Valid && (r = n.SprintSwimOffset, a.SprintSwimOffset !== r && (a.SprintSwimOffset = r, e.SprintSwimOffsetRef = r), r = n.SprintSwimOffsetLerpSpeed, a.SprintSwimOffsetLerpSpeed !== r) && (a.SprintSwimOffsetLerpSpeed = r, e.SprintSwimOffsetLerpSpeedRef = r), (n = EntitySystem_1.EntitySystem.GetComponent(t, 35))?.Valid && (r = n.SlideForward, a.SlideForward.Equals(r) || (a.SlideForward.DeepCopy(r), e.SlideForwardRef = r.ToUeVectorOld()), r = n.SlideSwitchThisFrame, a.SlideSwitchThisFrame !== r && (a.SlideSwitchThisFrame = r, e.SlideSwitchThisFrameRef = r), r = n.StandMode, a.SlideStandMode !== r) && (a.SlideStandMode = r, e.SlideStandModeRef = r), (n = EntitySystem_1.EntitySystem.GetComponent(t, 109))?.Valid) && (r = n.Active, a.IsInSplineMove !== r)) {
      a.IsInSplineMove = r;
      e.bIsInSplineMove = r;
    }
  }
  static UpdateAnimInfoMeshAnim(t) {
    var e;
    var n;
    var r;
    var a = EntitySystem_1.EntitySystem.GetComponent(t, 178);
    if (a?.Valid && (e = a.MainAnimInstance.LogicParams, n = a.AnimLogicParamsSetter, r = a.BattleIdleEndTime, n.BattleIdleTime !== r && (n.BattleIdleTime = r, e.BattleIdleTimeRef = r), r = a.DegMovementSlope, n.DegMovementSlope !== r && (n.DegMovementSlope = r, e.DegMovementSlopeRef = r), r = a.GetTsSightDirect(), n.SightDirect.Equals(r) || (n.SightDirect.DeepCopy(r), e.SightDirectRef = r.ToUeVectorOld()), r = a.DisableBlink, n.DisableBlink !== r && (n.DisableBlink = r, e.bDisableBlink = r), a = EntitySystem_1.EntitySystem.GetComponent(t, 72)) && (r = a.GetRagRollQuitState(), n.RagQuitState !== r)) {
      n.RagQuitState = r;
      e.RagQuitStateRef = r;
    }
  }
  static UpdateAnimInfoHit(e) {
    var n = EntitySystem_1.EntitySystem.GetComponent(e, 178);
    if (n?.Valid) {
      e = EntitySystem_1.EntitySystem.GetComponent(e, 61);
      if (e) {
        var r = n.MainAnimInstance.LogicParams;
        var n = n.AnimLogicParamsSetter;
        var a = e.GetEnterFkAndReset();
        if (n.EnterFk !== a) {
          n.EnterFk = a;
          r.EnterFkRef = a;
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
        a = e.BeHitSocketName;
        if (!n.BeHitSocketName.op_Equality(a)) {
          n.BeHitSocketName = a;
          r.BeHitSocketNameRef = a;
        }
      }
    }
  }
  static UpdateAnimInfoUnifiedState(t) {
    var e;
    var n;
    var r;
    var a = EntitySystem_1.EntitySystem.GetComponent(t, 178);
    if (a?.Valid && (n = EntitySystem_1.EntitySystem.GetComponent(t, 176)) && (e = a.MainAnimInstance.LogicParams, a = a.AnimLogicParamsSetter, r = n.MoveState, a.CharMoveState !== r && (a.CharMoveState = r, e.CharMoveStateRef = r), r = n.PositionState, a.CharPositionState !== r && (a.CharPositionState = r, e.CharPositionStateRef = r), r = n.DirectionState, a.CharCameraState !== r && (a.CharCameraState = r, e.CharCameraStateRef = r), (n = EntitySystem_1.EntitySystem.GetComponent(t, 40)) && a.SkillTarget !== (n.SkillTarget?.Id ?? 0) && (a.SkillTarget = n.SkillTarget?.Id ?? 0, e.SkillTarget = n.SkillTarget?.Entity?.GetComponent(1)?.Owner), r = n.LastActivateSkillTime, a.LastActiveSkillTime !== r && (a.LastActiveSkillTime = r, e.LastActiveSkillTime = r), t = ModelManager_1.ModelManager.PlotModel.IsInInteraction || ModelManager_1.ModelManager.PlotModel.IsInPlot && ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !== "LevelD", a.IsInPerformingPlot !== t && (a.IsInPerformingPlot = t, e.bIsInPerformingPlot = t), n = ModelManager_1.ModelManager.PlotModel.IsInPlot && (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelA" || ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelB"), a.IsInSequence !== n && (a.IsInSequence = n, e.bIsInSequence = n), r = UiCameraAnimationManager_1.UiCameraAnimationManager.IsDisablePlayer(), a.IsInUiCamera !== r)) {
      a.IsInUiCamera = r;
      e.bIsInUiCamera = r;
    }
  }
  static UpdateAnimInfoSceneInteract(t) {
    var e;
    var n;
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 178);
    if (r?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 29)) && (e = r.MainAnimInstance.LogicParams, r = r.AnimLogicParamsSetter, n = t.GetSitDownState(), r.SitDown !== n && (r.SitDown = n, e.bSitDown = n), n = t.SitDownTypeIndex, r.SitDownType !== n && (r.SitDownType = n, e.SitDownType = n), n = t.EnterSitDownIndex, r.SitDownDirect !== n && (r.SitDownDirect = n, e.SitDownDirect = n), n = t.LeaveSitDownIndex, r.StandUpDirect !== n)) {
      r.StandUpDirect = n;
      e.StandUpDirect = n;
    }
  }
  static UpdateAnimInfoHoldingHands(t) {
    var e;
    var n;
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 178);
    if (r?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 298)) && (e = r.MainAnimInstance.LogicParams, r = r.AnimLogicParamsSetter, (n = t.GetHandIkTarget(0)) && !r.LeftHandIkTarget.Equals(n) && (r.LeftHandIkTarget.DeepCopy(n), n = t.GetHandIkTargetUe(0)) && (e.LeftHandIKTargetCS = n), n = t.GetHandIkTarget(1)) && !r.RightHandIkTarget.Equals(n) && (r.RightHandIkTarget.DeepCopy(n), r = t.GetHandIkTargetUe(1))) {
      e.RightHandIKTargetCS = r;
    }
  }
  static UpdateMonsterAnimInfoMove(t) {
    var e;
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 178);
    if (n?.Valid && (e = n.MainAnimInstance.LogicParams, n = n.AnimLogicParamsSetter, (t = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid)) {
      t = t.InputDirectProxy;
      if (!n.InputDirect.Equals(t)) {
        n.InputDirect.DeepCopy(t);
        e.InputDirectRef = t.ToUeVectorOld();
      }
    }
  }
  static UpdateMonsterAnimInfoSkill(t) {
    var e;
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 178);
    if (n?.Valid && (e = n.MainAnimInstance.LogicParams, n = n.AnimLogicParamsSetter, t = EntitySystem_1.EntitySystem.GetComponent(t, 40)) && n.SkillTarget !== (t.SkillTarget?.Id ?? 0)) {
      n.SkillTarget = t.SkillTarget?.Id ?? 0;
      e.SkillTarget = t.SkillTarget?.Entity?.GetComponent(1)?.Owner;
    }
  }
  static UpdateMonsterAnimInfoHit(t) {
    var e;
    var n;
    var r;
    var a = EntitySystem_1.EntitySystem.GetComponent(t, 178);
    if (a?.Valid && (r = EntitySystem_1.EntitySystem.GetComponent(t, 61)) && (e = a.MainAnimInstance.LogicParams, a = a.AnimLogicParamsSetter, n = r.GetEnterFkAndReset(), a.EnterFk !== n && (a.EnterFk = n, e.EnterFkRef = n), r?.BeHitBones && r?.BeHitBones?.length > 0 && a.BeHitBone !== r.BeHitBones[0] && (a.BeHitBone = r.BeHitBones[0], e.BeHitBoneRef = r.BeHitBones[0]), n = BlackboardController_1.BlackboardController.GetEntityIdByEntity(t, "HateTarget")) && (r = EntitySystem_1.EntitySystem.GetComponent(n, 1), a.HateTarget !== n)) {
      a.HateTarget = n;
      e.HateTarget = r?.Owner;
    }
  }
  static UpdateMonsterAnimInfoUnifiedState(t) {
    var e;
    var n;
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 178);
    if (r?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 102)) && (e = r.MainAnimInstance.LogicParams, r = r.AnimLogicParamsSetter, n = t.MoveState, r.CharMoveState !== n && (r.CharMoveState = n, e.CharMoveStateRef = n), n = t.PositionState, r.CharPositionState !== n && (r.CharPositionState = n, e.CharPositionStateRef = n), n = t.DirectionState, r.CharCameraState !== n)) {
      r.CharCameraState = n;
      e.CharCameraStateRef = n;
    }
  }
  static UpdateNpcAnimInfoMove(t) {
    var e;
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 178);
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
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 178);
    if (r?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 102)) && (e = r.MainAnimInstance.LogicParams, r = r.AnimLogicParamsSetter, n = t.MoveState, r.CharMoveState !== n && (r.CharMoveState = n, e.CharMoveStateRef = n), n = t.PositionState, r.CharPositionState !== n && (r.CharPositionState = n, e.CharPositionStateRef = n), n = t.DirectionState, r.CharCameraState !== n)) {
      r.CharCameraState = n;
      e.CharCameraStateRef = n;
    }
  }
}
(exports.AnimController = AnimController).UpdateAnimInfo = t => {
  AnimController.UpdateAnimInfoMove(t);
  AnimController.UpdateAnimInfoMeshAnim(t);
  AnimController.UpdateAnimInfoHit(t);
  AnimController.UpdateAnimInfoUnifiedState(t);
  AnimController.UpdateAnimInfoSceneInteract(t);
  AnimController.UpdateAnimInfoHoldingHands(t);
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