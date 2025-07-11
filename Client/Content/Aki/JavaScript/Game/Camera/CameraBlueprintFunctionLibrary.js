"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const Global_1 = require("../Global");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const UiCameraAnimationManager_1 = require("../Module/UiCameraAnimation/UiCameraAnimationManager");
const GravityUtils_1 = require("../Utils/GravityUtils");
const CameraUtility_1 = require("./CameraUtility");
class CameraBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static get TmpVector() {
    this.TmpVectorInternal ||= Vector_1.Vector.Create();
    return this.TmpVectorInternal;
  }
  static get TmpQuat() {
    this.TmpQuatInternal ||= Quat_1.Quat.Create();
    return this.TmpQuatInternal;
  }
  static OnPossess(r) {
    ControllerHolder_1.ControllerHolder.CameraController.OnPossess(r);
  }
  static GetCameraMode() {
    return ControllerHolder_1.ControllerHolder.CameraController.Model.CameraMode;
  }
  static GetSequenceCameraActor() {
    return ControllerHolder_1.ControllerHolder.CameraController.Model.SequenceCamera.PlayerComponent.GetCurrentLevelSequenceActor();
  }
  static EnterCameraMode(r, e, a, t) {
    ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(r, e, a, t);
  }
  static ExitCameraMode(r, e, a, t) {
    ControllerHolder_1.ControllerHolder.CameraController.ExitCameraMode(r, e, a, t);
  }
  static SetCameraRotation(r) {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(r);
  }
  static IsTargetSocketLocationValid() {
    return ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.IsTargetLocationValid;
  }
  static GetTargetSocketLocation() {
    return ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.TargetLocation.ToUeVector();
  }
  static GetFightCameraLocation() {
    return ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraLocation.ToUeVector();
  }
  static GetFightCameraRotation() {
    return ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraRotation.ToUeRotator();
  }
  static GetFightCameraActor() {
    return ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraActor;
  }
  static SetFightCameraFollow(r) {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.IsFollowing = r;
  }
  static ApplyCameraModify(r, e, a, t, i, o, l, n, c, C, u, s, _) {
    if (CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(ModelManager_1.ModelManager.CreatureModel.GetEntityById(u), o, s, (0, puerts_1.$unref)(_))) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraModify(r, e, a, t, o, l, i, n, c, undefined, C);
    }
  }
  static ApplyCameraGuide(r, e, a, t, i, o, l, n, c) {
    CameraBlueprintFunctionLibrary.CacheLookAtVector ||= Vector_1.Vector.Create();
    CameraBlueprintFunctionLibrary.CacheLookAtVector1 ||= Vector_1.Vector.Create();
    CameraBlueprintFunctionLibrary.CacheLookAtVector.FromUeVector(r);
    let C = undefined;
    if (!o.IsNearlyZero(MathUtils_1.MathUtils.KindaSmallNumber)) {
      CameraBlueprintFunctionLibrary.CacheLookAtVector1.FromUeVector(o);
      C = CameraBlueprintFunctionLibrary.CacheLookAtVector1;
    }
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(CameraBlueprintFunctionLibrary.CacheLookAtVector, e, a, t, i, C, l === 0 ? undefined : l, n, c);
  }
  static ExitCameraGuide() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 57, "[CameraLookAt] ExitCameraGuide");
    }
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ExitCameraGuide();
  }
  static EnterCameraExplore(r, e, a, t, i, o, l) {
    e = UE.KismetMathLibrary.Conv_VectorToVectorDouble(e);
    a = UE.KismetMathLibrary.Conv_VectorToVectorDouble(a);
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.EnterCameraExplore(r, e, a, t, i, o, l);
  }
  static ExitCameraExplore(r) {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ExitCameraExplore(r);
  }
  static PlayCameraSequence(r, e, a, t, i, o, l, n, c, C, u, s, _, m) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    return !!e && !!(e = e.Entity?.GetComponent(3)?.Actor) && !!CameraUtility_1.CameraUtility.CheckCameraSequenceCondition(e, r) && ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.PlayerComponent.PlayCameraSequence(a, t, i, e, FNameUtil_1.FNameUtil.GetDynamicFName(o), FNameUtil_1.FNameUtil.GetDynamicFName(l), n, c, C, u, s, _, m);
  }
  static GetWidgetCameraActor() {
    return ControllerHolder_1.ControllerHolder.CameraController.WidgetCamera.DisplayComponent.CineCamera;
  }
  static SetWidgetCameraBlendParams(r, e, a, t, i, o, l, n, c, C, u) {
    l = UE.KismetMathLibrary.Conv_VectorToVectorDouble(l);
    ControllerHolder_1.ControllerHolder.CameraController.WidgetCamera.BlendComponent.SetBlendParams(r, e, a, t, i, o, l, n, c, C, u);
  }
  static PlayCameraOrbital(r, e, a, t, i) {
    ControllerHolder_1.ControllerHolder.CameraController.OrbitalCamera.PlayerComponent.PlayCameraOrbital(r, e, a, t, i);
  }
  static StopCameraOrbital() {
    ControllerHolder_1.ControllerHolder.CameraController.OrbitalCamera.PlayerComponent.StopCameraOrbital();
  }
  static ResetFightCameraPitchAndArmLength() {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(Rotator_1.Rotator.ZeroRotator);
  }
  static EnterSequenceDialogue(r) {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraDialogueController.EnterSequenceDialogue(Vector_1.Vector.Create(r.D_K2_GetActorLocation()));
  }
  static ExitSequenceDialogue() {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraDialogueController.ExitSequenceDialogue();
  }
  static ReloadCameraConfig() {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.LoadConfig();
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraConfigController.LoadConfig();
  }
  static SetAimAssistMode(r) {
    ModelManager_1.ModelManager.CameraModel.SetAimAssistMode(r);
  }
  static IsRoleOnCameraRight() {
    var r = Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(1);
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    e.CameraRotation.Quaternion(CameraBlueprintFunctionLibrary.TmpQuat);
    CameraBlueprintFunctionLibrary.TmpQuat.RotateVector(Vector_1.Vector.RightVectorProxy, CameraBlueprintFunctionLibrary.TmpVector);
    return r.ActorLocationProxy.DotProduct(CameraBlueprintFunctionLibrary.TmpVector) - e.CameraLocation.DotProduct(CameraBlueprintFunctionLibrary.TmpVector) > 0;
  }
  static GetIsCameraTargetInScreen() {
    var r = ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    return !!r?.IsTargetLocationValid && r.CheckPositionInScreen(r.TargetLocation, r.CameraAdjustController.CheckInScreenMinX, r.CameraAdjustController.CheckInScreenMaxX, r.CameraAdjustController.CheckInScreenMinY, r.CameraAdjustController.CheckInScreenMaxY);
  }
  static EnterSpecialGameplayCamera(r) {
    var e = ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    if (e) {
      return e.EnterSpecialGameplayCamera(r);
    }
  }
  static ExitSpecialGameplayCamera() {
    var r = ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    if (r) {
      r.ExitSpecialGameplayCamera();
    }
  }
  static ExitSpecialGameplayCamera2() {
    var r = ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    if (r) {
      r.ExitSpecialGameplayCamera();
    }
  }
  static SetAimAssistModeByKey(r, e) {
    ModelManager_1.ModelManager.CameraModel?.SetAimAssistModeWithKey(r, e);
  }
  static ClearAimAssistModeByKey(r) {
    ModelManager_1.ModelManager.CameraModel?.ClearAimAssistModeWithKey(r);
  }
  static SetSequenceCameraCollisionState(r) {
    var e = ModelManager_1.ModelManager?.CameraModel?.SequenceCamera?.PlayerComponent;
    if (e) {
      e.SetCameraCollisionState(r);
    }
  }
  static SetXRayState(r) {
    var e = ControllerHolder_1.ControllerHolder.CameraController.FightCamera?.LogicComponent?.CameraCollision;
    if (e && (e.IsPlayerXRayEnable = r, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Camera", 57, "CameraBlueprintFunctionLibrary SetXRayState", ["isEnable", r]);
    }
  }
  static EnableCameraSpecificLockTarget(r, e) {
    var a;
    if (ModelManager_1.ModelManager?.CameraModel) {
      a = ModelManager_1.ModelManager.CameraModel.EnableCameraSpecificLockEntity(r, e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Camera", 57, "CameraBlueprintFunctionLibrary EnableCameraSpecificLockTarget", ["entityId", r], ["priority", e], ["id", a]);
      }
      return a;
    } else {
      return -1;
    }
  }
  static DisableCameraSpecificLockOnTarget(r) {
    if (ModelManager_1.ModelManager?.CameraModel && (ModelManager_1.ModelManager.CameraModel.DisableCameraSpecificLockEntity(r), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Camera", 57, "CameraBlueprintFunctionLibrary DisableCameraSpecificLockOnTarget", ["id", r]);
    }
  }
  static IsCameraSpecificLockEnable() {
    return !!ModelManager_1.ModelManager?.CameraModel?.GetCameraSpecificLockEntity();
  }
  static GetCameraSpecificLockEntityId() {
    return ModelManager_1.ModelManager?.CameraModel?.GetCameraSpecificLockEntity()?.EntityId ?? -1;
  }
  static SetCameraGravityMode(r, e) {
    var a = ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    if (a?.Valid) {
      CameraBlueprintFunctionLibrary.TmpVector.DeepCopy(e ?? Vector_1.Vector.DownVectorProxy);
      a.SetCameraGravityMode(r, CameraBlueprintFunctionLibrary.TmpVector);
    }
  }
  static GetCameraGravityMode() {
    var r = ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    if (r?.Valid) {
      return r.GravityMode;
    } else {
      return 0;
    }
  }
  static GetCameraGravityDirect() {
    var r = ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    if (r?.Valid) {
      return r.GravityDirect.ToUeVector();
    } else {
      return Vector_1.Vector.DownVectorDouble;
    }
  }
  static GetCameraGravityUp() {
    var r = ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    if (r?.Valid) {
      return r.GravityUp.ToUeVector();
    } else {
      return Vector_1.Vector.UpVectorDouble;
    }
  }
  static GetCameraRotationInGravity() {
    var r = ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    if (r?.Valid) {
      return r.CameraRotationInGravity.ToUeRotator();
    } else {
      return Rotator_1.Rotator.ZeroRotator;
    }
  }
  static GetPlayerLocationInGravity() {
    var r = ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    if (r?.Valid) {
      return r.PlayerLocationInGravity.ToUeVector();
    } else {
      return Vector_1.Vector.ZeroVectorDouble;
    }
  }
  static GetPlayerRotatorInGravity() {
    var r = ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    if (r?.Valid) {
      return r.PlayerRotatorInGravity.ToUeRotator();
    } else {
      return Rotator_1.Rotator.ZeroRotator;
    }
  }
}
CameraBlueprintFunctionLibrary.CacheLookAtVector = undefined;
CameraBlueprintFunctionLibrary.CacheLookAtVector1 = undefined;
CameraBlueprintFunctionLibrary.TmpVectorInternal = undefined;
CameraBlueprintFunctionLibrary.TmpQuatInternal = undefined;
exports.default = CameraBlueprintFunctionLibrary; //# sourceMappingURL=CameraBlueprintFunctionLibrary.js.map