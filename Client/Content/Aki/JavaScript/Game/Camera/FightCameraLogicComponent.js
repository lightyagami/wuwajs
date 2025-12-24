"use strict";

var FightCameraLogicComponent_1;
var __decorate = this && this.__decorate || function (t, i, s, h) {
  var e;
  var a = arguments.length;
  var r = a < 3 ? i : h === null ? h = Object.getOwnPropertyDescriptor(i, s) : h;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, s, h);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (e = t[o]) {
        r = (a < 3 ? e(r) : a > 3 ? e(i, s, r) : e(i, s)) || r;
      }
    }
  }
  if (a > 3 && r) {
    Object.defineProperty(i, s, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightCameraLogicComponent = exports.VirtualCamera = exports.CLEAN_TARGET_SPEED_THRESHOLD = exports.WALKING_CAMERA_SHAKE_CURVE_PATH = exports.WALKING_CAMERA_SHAKE_PATH = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const Time_1 = require("../../Core/Common/Time");
const CommonParamById_1 = require("../../Core/Define/ConfigCommon/CommonParamById");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const CurveUtils_1 = require("../../Core/Utils/Curve/CurveUtils");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const Global_1 = require("../Global");
const GlobalData_1 = require("../GlobalData");
const CloudGameManager_1 = require("../Manager/CloudGameManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines");
const CharacterUnifiedStateTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const CharacterGlideComponent_1 = require("../NewWorld/Character/Common/Component/CharacterGlideComponent");
const BaseLockOnComponent_1 = require("../NewWorld/Character/Common/Component/LockOn/BaseLockOnComponent");
const RenderUtil_1 = require("../Render/Utils/RenderUtil");
const ColorUtils_1 = require("../Utils/ColorUtils");
const GravityUtils_1 = require("../Utils/GravityUtils");
const CameraCollision_1 = require("./CameraCollision");
const CameraRotationZone_1 = require("./CameraRotationZone");
const CameraTransformBuffer_1 = require("./CameraTransformBuffer");
const CameraUtility_1 = require("./CameraUtility");
const CameraAdjustController_1 = require("./FightCameraController/CameraAdjustController");
const CameraAutoController_1 = require("./FightCameraController/CameraAutoController");
const CameraClimbController_1 = require("./FightCameraController/CameraClimbController");
const CameraConfigController_1 = require("./FightCameraController/CameraConfigController");
const CameraDialogueController_1 = require("./FightCameraController/CameraDialogueController");
const CameraExploreController_1 = require("./FightCameraController/CameraExploreController");
const CameraFixedController_1 = require("./FightCameraController/CameraFixedController");
const CameraFocusController_1 = require("./FightCameraController/CameraFocusController");
const CameraGuideController_1 = require("./FightCameraController/CameraGuideController");
const CameraHookController_1 = require("./FightCameraController/CameraHookController");
const CameraInputController_1 = require("./FightCameraController/CameraInputController");
const CameraModifyController_1 = require("./FightCameraController/CameraModifyController");
const CameraRotatorController_1 = require("./FightCameraController/CameraRotatorController");
const CameraSidestepController_1 = require("./FightCameraController/CameraSidestepController");
const CameraSpecialGameplayController_1 = require("./FightCameraController/CameraSpecialGameplayController");
const CameraSplineMoveController_1 = require("./FightCameraController/CameraSplineMoveController");
const SettlementCamera_1 = require("./SettlementCamera");
const CONFIG_PATH = "/Game/Aki/Data/Camera/DA_FightcameraConfig.DA_FightCameraConfig";
const MOBILE_CONFIG_PATH = "/Game/Aki/Data/Camera/DA_FightCameraConfig_Mobile.DA_FightCameraConfig_Mobile";
exports.WALKING_CAMERA_SHAKE_PATH = "/Game/Aki/Character/Role/Common/Data/CameraShake/Camera/NCS_Role_Walking.NCS_Role_Walking_C";
exports.WALKING_CAMERA_SHAKE_CURVE_PATH = "/Game/Aki/Character/Role/Common/Data/CameraShake/Camera/CameraShake_Curve_Walking.CameraShake_Curve_Walking";
const CAMERA_LOCATION_NEARLY_DISTANCE = 1;
const LOOK_AT_FORWARD_DISTANCE = 1000;
const RESET_FOCUS_ROTATION_TIME = 0.2;
const MAX_TARGET_HAS_BLOCK_TIME = 1000;
const SHOW_TARGET_VALID_TIME = 100;
const BREAK_BLEND_OUT_TIME = 0.2;
const LANDSCAPE_LOD_SCALE_FOV = 80;
const CAMER_TARGET_BUFFER_TIME = 0.25;
const MAX_DIAGNOSTIC_OUTPUT_TIME = 5;
const VALID_DISGNOSTIC_DISTANCE_SQR = 900;
const vehicleWaterFall = 401464757;
const hideHeadTag = 1878618325;
const MAX_NAN_OUTPUT_TIME = 5;
const POINT_SIZE = 20;
const LINELEHGTH = 2000;
const LINE_SIZE = 5;
const CIRCLE_SEGMENT = 48;
const CAMERA_DIRECTION_LENGTH = 500;
const CAMERA_DIRECTION_ARROW_SIZE = 2000;
exports.CLEAN_TARGET_SPEED_THRESHOLD = 70;
class VirtualCamera {
  constructor() {
    this.ArmOffset = Vector_1.Vector.Create();
    this.ArmLength = 0;
    this.MinArmLength = 0;
    this.MaxArmLength = 0;
    this.YawLimitMin = 0;
    this.YawLimitMax = 0;
    this.PitchLimitMin = 0;
    this.PitchLimitMax = 0;
    this.LookDownOffsetZ = 0;
    this.LookUpOffsetZ = 0;
    this.CameraOffset = Vector_1.Vector.Create();
    this.Fov = 0;
    this.EnableDynamicFov = false;
    this.DynamicFov = 0;
    this.DynamicFovMin = 0;
    this.DynamicFovMax = 0;
    this.DynamicFovParamMin = 0;
    this.DynamicFovParamMax = 0;
    this.DynamicFovLerpSpeed = 0;
    this.ArmLocation = Vector_1.Vector.Create();
    this.ArmRotation = Rotator_1.Rotator.Create();
    this.ZoomModifier = 1;
    this.WorldYawMin = 0;
    this.WorldYawMax = 0;
    this.CameraOffsetFloatUpMin = 0;
    this.CameraOffsetFloatUpMax = 0;
  }
  ClearObject() {
    return true;
  }
}
exports.VirtualCamera = VirtualCamera;
let FightCameraLogicComponent = FightCameraLogicComponent_1 = class FightCameraLogicComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ArmLength = 0;
    this.ArmOffsetX = 0;
    this.ArmOffsetY = 0;
    this.ArmOffsetZ = 0;
    this.MinArmLength = 0;
    this.MaxArmLength = 0;
    this.CameraOffsetX = 0;
    this.CameraOffsetY = 0;
    this.CameraOffsetZ = 0;
    this.Fov = 0;
    this.CameraLocationFadeTime = 0;
    this.CollisionProbeSize = 0;
    this.NearCollisionProbeSize = 0;
    this.CurrentCollisionSize = 0;
    this.CheckCollisionProbeSize = 0;
    this.CheckWidth = 0;
    this.CollisionAdditionalHeightInWater = 0;
    this.DefaultPitchHorizontalOffset = 0;
    this.DefaultPitchVerticalOffset = 0;
    this.DefaultPitchInRangeMin = 0;
    this.DefaultPitchInRangeCenter = 0;
    this.DefaultPitchInRangeMax = 0;
    this.DefaultPitchOutRangeMin = 0;
    this.DefaultPitchOutRangeCenter = 0;
    this.DefaultPitchOutRangeMax = 0;
    this.FloatUpArmLengthMin = 0;
    this.FloatUpArmLengthMax = 0;
    this.CameraOffsetFloatUpArmLengthMin = 0;
    this.CameraOffsetFloatUpArmLengthMax = 0;
    this.CameraOffsetFloatUpMin = 0;
    this.CameraOffsetFloatUpMax = 0;
    this.MaxDistance = 0;
    this.InSpeed = 0;
    this.OutSpeed = 0;
    this.CenterCollisionSize = 0;
    this.CollisionSizePercentage = 0;
    this.SPn = 0;
    this.yPn = 0;
    this.CompleteHideDistance = 0;
    this.StartHidePitch = 0;
    this.CompleteHidePitch = 0;
    this.StartDitherValue = 0;
    this.YawLimitMin = 0;
    this.YawLimitMax = 0;
    this.PitchLimitMin = 0;
    this.PitchLimitMax = 0;
    this.LookDownOffsetZ = 0;
    this.LookUpOffsetZ = 0;
    this.ArmCenterUpSpeedMin = 0;
    this.ArmCenterUpSpeedMax = 0;
    this.ArmCenterUpEdgeMin = 0;
    this.ArmCenterUpEdgeMax = 0;
    this.ArmCenterUpCurve = undefined;
    this.ArmCenterForwardSpeedMin = 0;
    this.ArmCenterForwardSpeedMax = 0;
    this.ArmCenterForwardEdgeMin = 0;
    this.ArmCenterForwardEdgeMax = 0;
    this.ArmCenterForwardCurve = undefined;
    this.ArmCenterRightSpeedMin = 0;
    this.ArmCenterRightSpeedMax = 0;
    this.ArmCenterRightEdgeMin = 0;
    this.ArmCenterRightEdgeMax = 0;
    this.ArmCenterRightCurve = undefined;
    this.ArmCenterRightReverseSpeed = 0;
    this.ArmCenterRightReverseRotationEdge = 0;
    this.InitialCameraPitch = 0;
    this.CameraRotateToTargetMinAlpha = 0;
    this.CameraRotateToTargetMaxAlpha = 0;
    this.CameraRotateToTargetCurve = undefined;
    this.IsDisableResetFocus = 0;
    this.AdditionPitchMax = 0;
    this.AdditionPitchMin = 0;
    this.AdditionPitchDeltaHeight = 0;
    this.AdditionPitchCurve = undefined;
    this.WorldYawMin = 0;
    this.WorldYawMax = 0;
    this.CameraZoneMode = 0;
    this.YawZoneSpeedMin = 0;
    this.YawZoneSpeedMax = 0;
    this.YawSoftZoneMin = 0;
    this.YawSoftZoneMax = 0;
    this.YawDeadZoneMin = 0;
    this.YawDeadZoneMax = 0;
    this.YawSoftZoneSpeedRatio = 0;
    this.YawDeadZoneTransToSoftZoneSpeedRatio = 0;
    this.YawTransToForwardSpeedRatio = 0;
    this.YawInputEnableTime = 0;
    this.YawRollbackEnableTime = 0;
    this.PitchInputEnableTime = 0;
    this.PitchRollbackEnableTime = 0;
    this.PitchSoftZoneMin = 0;
    this.PitchSoftZoneMax = 0;
    this.PitchDeadZoneMin = 0;
    this.PitchDeadZoneMax = 0;
    this.PitchBasis = 0;
    this.PitchZoneSpeedMin = 0;
    this.PitchZoneSpeedMax = 0;
    this.CharAddArmLength = 0;
    this.CharAddZ = 0;
    this.EnableDynamicFov = 0;
    this.DynamicFovMin = 0;
    this.DynamicFovMax = 0;
    this.DynamicFovParamMin = 0;
    this.DynamicFovParamMax = 0;
    this.DynamicFovLerpSpeed = 0;
    this.DynamicFovCurve = undefined;
    this.TargetDynamicFov = 0;
    this.seg = 0;
    this.aeg = 0.15;
    this.LastFrameCameraArmLocationSocketName = FNameUtil_1.FNameUtil.EMPTY;
    this.CameraArmLocationSocketName = FNameUtil_1.FNameUtil.EMPTY;
    this.EnableFocusOnVehicle = false;
    this.AttachToVehicle = false;
    this.cPr = false;
    this.Character = undefined;
    this.CharacterController = undefined;
    this.CharacterEntityHandle = undefined;
    this.CharacterInputComponent = undefined;
    this.mPr = undefined;
    this.CharacterDriveVehicleComponent = undefined;
    this.CharacterMoveEnterState = CharacterUnifiedStateTypes_1.ECharMoveState.Other;
    this.FollowShooterEntityHandle = undefined;
    this.FollowShooterTagComponentInternal = undefined;
    this.IsSpecificLockTarget = false;
    this.SpecificLockTargetType = 0;
    this.TargetEntity = undefined;
    this.dPr = undefined;
    this.TargetSocketName = undefined;
    this.CPr = undefined;
    this.IsFollowing = true;
    this.RestoreFollowingOnChangeRole = false;
    this.ArmLocationFadeElapseTime = -0;
    this.VehicleEntityHandle = undefined;
    this.VehicleActorComponent = undefined;
    this.VehicleMoveComponent = undefined;
    this.VehicleInputComponent = undefined;
    this.VehicleAnimationComponent = undefined;
    this.BaseVehiclePerformComponent = undefined;
    this.GongduolaPerformComponent = undefined;
    this.PlayerRotator = Rotator_1.Rotator.Create();
    this.PlayerLocation = Vector_1.Vector.Create();
    this.PlayerLocationForDither = Vector_1.Vector.Create();
    this.LastFramePlayerLocation = Vector_1.Vector.Create();
    this.PlayerVelocity = Vector_1.Vector.Create();
    this.TargetLocation = Vector_1.Vector.Create();
    this.PlayerVehicleDeltaLocation = Vector_1.Vector.Create();
    this.PlayerMoveVector = Vector_1.Vector.Create();
    this.TempArmLength = 0;
    this.TmpArmLocation = Vector_1.Vector.Create();
    this.gPr = false;
    this.fPr = -0;
    this.Fading = false;
    this.EUo = false;
    this.pPr = false;
    this.vPr = false;
    this.MPr = false;
    this.FadeDuration = -0;
    this.MUo = undefined;
    this.IsUniqueFade = false;
    this.vUo = -0;
    this.CurrentCamera = new VirtualCamera();
    this.CameraLocation = Vector_1.Vector.Create();
    this.CameraForward = Vector_1.Vector.Create();
    this.LastCamera = new VirtualCamera();
    this.DesiredCamera = new VirtualCamera();
    this.DebugDesiredCameraProps = new Map();
    this.DebugCurrentCameraProps = new Map();
    this.DebugLogicComponentsProps = new Map();
    this.DebugControllersProps = new Map();
    this.DebugControllerModifications = new Map();
    this.DebugCameraPropsRaw = undefined;
    this.CameraConfigController = new CameraConfigController_1.CameraConfigController(this);
    this.CameraFocusController = new CameraFocusController_1.CameraFocusController(this);
    this.CameraInputController = new CameraInputController_1.CameraInputController(this);
    this.CameraModifyController = new CameraModifyController_1.CameraModifyController(this);
    this.CameraAdjustController = new CameraAdjustController_1.CameraAdjustController(this);
    this.CameraSidestepController = new CameraSidestepController_1.CameraSidestepController(this);
    this.CameraAutoController = new CameraAutoController_1.CameraAutoController(this);
    this.CameraGuideController = new CameraGuideController_1.CameraGuideController(this);
    this.CameraRunningController = new CameraExploreController_1.CameraExploreController(this);
    this.CameraRotatorController = new CameraRotatorController_1.CameraRotatorController(this);
    this.CameraDialogueController = new CameraDialogueController_1.CameraDialogueController(this);
    this.CameraFixedController = new CameraFixedController_1.CameraFixedController(this);
    this.CameraClimbController = new CameraClimbController_1.CameraClimbController(this);
    this.CameraHookController = new CameraHookController_1.CameraHookController(this);
    this.CameraSplineMoveController = new CameraSplineMoveController_1.CameraSplineMoveController(this);
    this.CameraSpecialGameplayController = new CameraSpecialGameplayController_1.CameraSpecialGameplayController(this);
    this.EPr = [this.CameraConfigController, this.CameraModifyController, this.CameraInputController, this.CameraFocusController, this.CameraHookController, this.CameraDialogueController, this.CameraFixedController, this.CameraGuideController, this.CameraAdjustController, this.CameraSidestepController, this.CameraAutoController, this.CameraRunningController, this.CameraClimbController, this.CameraSplineMoveController, this.CameraRotatorController, this.CameraSpecialGameplayController];
    this.Nl1 = [this.CameraConfigController];
    this.Vl1 = [this.CameraModifyController, this.CameraInputController, this.CameraFocusController, this.CameraHookController, this.CameraDialogueController, this.CameraFixedController, this.CameraGuideController, this.CameraAdjustController, this.CameraSidestepController, this.CameraAutoController, this.CameraRunningController, this.CameraClimbController, this.CameraSplineMoveController, this.CameraRotatorController, this.CameraSpecialGameplayController];
    this.CameraRotation = Rotator_1.Rotator.Create();
    this.IsModifiedArmLocation = false;
    this.IsModifiedArmLength = false;
    this.IsModifiedArmOffset = false;
    this.IsModifiedZoomModifier = false;
    this.IsModifiedArmRotationYaw = false;
    this.IsModifiedArmRotationPitch = false;
    this.IsModifiedArmRotationRoll = false;
    this.IsModifiedCameraOffset = false;
    this.IsModifiedFov = false;
    this.SPr = 0;
    this.ele = undefined;
    this.yPr = Vector_1.Vector.Create();
    this.k7a = Vector_1.Vector.Create();
    this.N7a = Vector_1.Vector.Create();
    this.F7a = Quat_1.Quat.Create();
    this.V7a = Quat_1.Quat.Create();
    this.M1h = Vector_1.Vector.Create();
    this.TempVector = Vector_1.Vector.Create();
    this.TempVector2 = Vector_1.Vector.Create();
    this.TempVector3 = Vector_1.Vector.Create();
    this.TempVector4 = Vector_1.Vector.Create();
    this.TempRotator = Rotator_1.Rotator.Create();
    this.TempQuat = Quat_1.Quat.Create();
    this.TempQuat2 = Quat_1.Quat.Create();
    this.TempQuat3 = Quat_1.Quat.Create();
    this.TempQuatInverse = Quat_1.Quat.Create();
    this.TempDesireLocation = Vector_1.Vector.Create();
    this.IPr = true;
    this.Initialized = false;
    this.CameraConfig = undefined;
    this.DefaultConfigs = new Map();
    this.DefaultCurveConfigs = new Map();
    this.$ = new Map();
    this.C1e = new Map();
    this.VehicleConfigs = new Map();
    this.VehicleCurveConfigs = new Map();
    this.thm = new Map();
    this.ihm = new Map();
    this.CameraCollision = undefined;
    this.CameraRotationZone = undefined;
    this.CameraTransformBuffer = undefined;
    this.SettlementCamera = undefined;
    this.QZh = undefined;
    this.KZh = undefined;
    this.zzc = false;
    this.Jzc = undefined;
    this.Zzc = undefined;
    this.pYi = undefined;
    this.CurrentArmCenterForwardEdgeMin = 0;
    this.CurrentArmCenterForwardEdgeMax = 0;
    this.CurrentArmCenterRightEdgeMin = 0;
    this.CurrentArmCenterRightEdgeMax = 0;
    this.CurrentArmCenterUpEdgeMin = 0;
    this.CurrentArmCenterUpEdgeMax = 0;
    this.pTn = 0;
    this.vTn = 0;
    this.yP_ = 0;
    this.SP_ = 0;
    this.EnableVehicleWaterFallCamera = false;
    this.LastFrameAttachToVehicle = false;
    this.TPr = 0;
    this.dW1 = MAX_NAN_OUTPUT_TIME;
    this.GravityMode = 2;
    this.GravityDirect = Vector_1.Vector.Create(0, 0, -1);
    this.GravityUp = Vector_1.Vector.Create(0, 0, 1);
    this.GravityQuat = Quat_1.Quat.Create();
    this.GravityInverseQuat = Quat_1.Quat.Create();
    this.CameraRotationInGravity = Rotator_1.Rotator.Create();
    this.PlayerLocationInGravity = Vector_1.Vector.Create();
    this.PlayerRotatorInGravity = Rotator_1.Rotator.Create();
    this.feu = true;
    this.geu = new Map();
    this.Ceu = false;
    this.peu = 0;
    this.veu = 0;
    this.zQu = 1;
    this.LPr = false;
    this.DPr = Vector_1.Vector.Create(0, 0, 0);
    this.RPr = Rotator_1.Rotator.Create(0, 0, 0);
    this.fii = (0, puerts_1.$ref)(undefined);
    this.UPr = (0, puerts_1.$ref)(0);
    this.APr = (0, puerts_1.$ref)(0);
    this.H6_ = CAMER_TARGET_BUFFER_TIME;
    this.$6_ = 0;
    this.W6_ = false;
    this.PPr = (t, i) => {
      if (ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.Id) === this.CharacterEntityHandle) {
        this.CharacterController = i;
      }
    };
    this.xPr = (t, i) => {
      if (ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.Id) === this.CharacterEntityHandle) {
        this.CharacterController = undefined;
      }
    };
    this.CQm = t => {
      this.SetFollowShooter(t);
    };
    this.pQm = () => {
      this.SetFollowShooter(undefined);
    };
    this.MEu = (t, i) => {
      TimerSystem_1.TimerSystem.Next(() => {
        this.zQu = ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation;
      });
    };
    this.cae = Vector_1.Vector.Create();
    this.wPr = Vector_1.Vector.Create();
    this.Ilt = t => {
      if (!t?.KeepCameraRelativeRotation) {
        this.ResetInitialCameraRotation();
      }
    };
    this.nye = () => {
      if (!ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel) {
        this.ResetFightCameraLogic(false);
        this.ResetInitialCameraRotation();
      }
    };
    this.BPr = t => {
      if (!t) {
        this.ResetFightCameraLogic(false);
      }
    };
    this.xJd = (t, i = undefined) => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Camera", 57, "Adjust相机恢复");
      }
      this.CameraConfigController.DisableHookConfig(t);
      RenderUtil_1.RenderUtil.EnableVelocityScreenSizeCull();
      this.ExitCameraSpline();
      this.ExitDepthOfField();
      ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.PlayerComponent.SetPlayCameraSequenceEnabled(true);
      ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitFixSceneSubCamera(i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetCameraAimVisible, false, 0);
      ModelManager_1.ModelManager.InteractionModel.RecoverInteractFromLock();
      ControllerHolder_1.ControllerHolder.CameraController.SetHideHeadEnable(false, 0);
    };
    this.M6l = t => {
      if (t.IsRolePassenger(true) && t.VehicleEntity?.Valid) {
        this.VehicleEntityHandle = ModelManager_1.ModelManager.CharacterModel.GetHandle(t.VehicleEntity.Id);
        this.VehicleActorComponent = t.VehicleEntity.GetComponent(247);
        this.VehicleMoveComponent = t.VehicleEntity.GetComponent(249);
        this.VehicleInputComponent = t.VehicleEntity.GetComponent(253);
        this.VehicleAnimationComponent = t.VehicleEntity.GetComponent(248);
        this.BaseVehiclePerformComponent = t.VehicleEntity.GetComponent(246);
        this.GongduolaPerformComponent = t.VehicleEntity.GetComponent(260);
        this.CameraRotationZone.SetVehicle(this.VehicleEntityHandle);
      }
    };
    this.E6l = t => {
      if (t.IsRolePassenger(true)) {
        this.VehicleEntityHandle = undefined;
        this.VehicleActorComponent = undefined;
        this.VehicleMoveComponent = undefined;
        this.VehicleInputComponent = undefined;
        this.VehicleAnimationComponent = undefined;
        this.BaseVehiclePerformComponent = undefined;
        this.GongduolaPerformComponent = undefined;
        this.PlayerVehicleDeltaLocation.Reset();
        this.CameraRotationZone.SetVehicle(undefined);
      }
    };
    this.sa1 = t => {
      if (t.IsRolePassenger(true) && t.VehicleEntity?.Valid) {
        if (this.VehicleActorComponent?.Valid && this.VehicleAnimationComponent?.Valid) {
          this.GetPlayerLocation(this.TempVector2);
          this.VehicleAnimationComponent.GetCameraPosition(this.TempVector3);
          this.TempVector2.Subtraction(this.TempVector3, this.PlayerVehicleDeltaLocation);
          (this.VehicleAnimationComponent.HasModelBuffer() ? (this.TempQuat.DeepCopy(this.VehicleAnimationComponent.GetMeshTransform().GetRotation()), this.TempQuat) : this.VehicleActorComponent.ActorQuatProxy).Inverse(this.TempQuat);
          this.TempQuat.RotateVector(this.PlayerVehicleDeltaLocation, this.PlayerVehicleDeltaLocation);
        } else {
          this.PlayerVehicleDeltaLocation.Reset();
        }
      }
    };
    this.hUe = (t, i) => {
      this.CharacterMoveEnterState = i;
      TimerSystem_1.TimerSystem.Next(t => {
        this.CharacterMoveEnterState = CharacterUnifiedStateTypes_1.ECharMoveState.Other;
      });
    };
    this.Udc = (t, i) => {
      this.Ddc();
    };
    this.UWi = (t, i) => {
      if (t === vehicleWaterFall && !this.EnableVehicleWaterFallCamera && !this.W6_) {
        this.W6_ = true;
        this.$6_ = 0;
      }
    };
    this.aZc = (t, i) => {
      ModelManager_1.ModelManager.CameraModel.SetHideHeadEnabled(i, 1);
    };
  }
  get StartHideDistance() {
    return this.SPn;
  }
  set StartHideDistance(t) {
    this.SPn = t;
    this.yPn = t * t;
  }
  get StartHideDistanceSquared() {
    return this.yPn;
  }
  get IsTargetLocationValid() {
    return !this.TargetLocation.ContainsNaN();
  }
  get CameraActor() {
    return this.ele.CameraActor;
  }
  get FinalCameraDistance() {
    return this.TPr;
  }
  GetArmLengthWithSetting(t) {
    return MathUtils_1.MathUtils.Lerp(t.ArmLength, t.MaxArmLength, ModelManager_1.ModelManager.CameraModel.CameraSettingArmLengthPercentage);
  }
  GetArmLengthWithSettingAndZoom(t, i = true) {
    var s = this.GetArmLengthWithSetting(t) * t.ZoomModifier;
    if (i) {
      return MathUtils_1.MathUtils.Clamp(s, t.MinArmLength, t.MaxArmLength);
    } else {
      return s;
    }
  }
  static TArrayToArray(i) {
    if (!i) {
      return [];
    }
    var s = [];
    var h = i.Num();
    for (let t = 0; t < h; t++) {
      s.push(i.Get(t));
    }
    return s;
  }
  static TMapToMap(i) {
    if (!(i.Num() < 0)) {
      var s = new Map();
      for (let t = 0; t < i.Num(); t++) {
        var h = i.GetKey(t);
        s.set(h, i.Get(h));
      }
      return s;
    }
  }
  static TMapListToMap(t) {
    if (t.length !== 0) {
      var i = new Map();
      for (const h of t) {
        for (let t = 0; t < h.Num(); t++) {
          var s = h.GetKey(t);
          i.set(s, h.Get(s));
        }
      }
      return i;
    }
  }
  static TMapToCurveMap(i) {
    if (!(i.Num() < 0)) {
      var s = new Map();
      for (let t = 0; t < i.Num(); t++) {
        var h = i.GetKey(t);
        s.set(h, CurveUtils_1.CurveUtils.CreateCurveByStruct(i.Get(h)));
      }
      return s;
    }
  }
  static TMapListToCurveMap(t) {
    if (t.length !== 0) {
      var i = new Map();
      for (const h of t) {
        for (let t = 0; t < h.Num(); t++) {
          var s = h.GetKey(t);
          i.set(s, CurveUtils_1.CurveUtils.CreateCurveByStruct(h.Get(s)));
        }
      }
      return i;
    }
  }
  SetConfigMap(t, i) {
    this.$.set(t, i);
  }
  SetCurveConfigMap(t, i) {
    this.C1e.set(t, i);
  }
  SetVehicleConfigMap(t, i) {
    this.thm.set(t, i);
  }
  SetVehicleCurveConfigMap(t, i) {
    this.ihm.set(t, i);
  }
  f1e(t, i) {
    this[t] = i;
  }
  p1e(t, i) {
    this[t] = i;
  }
  SetConfigs(t, i, s, h, e, a, r, o) {
    if (!!o || !FNameUtil_1.FNameUtil.IsEmpty(a) || r === 1) {
      this.CameraArmLocationSocketName = a;
    }
    if (t) {
      for (var [n, l] of t) {
        n = this.$.get(n);
        this.f1e(n, l);
      }
      for (var [_, C] of this.$) {
        if (this[C] === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "CameraDefault缺少配置", ["tagName", e], ["key", _], ["value", C]);
          }
          this.f1e(C, 1);
        }
      }
      if ((this.ArmCenterForwardEdgeMin >= 0 || this.ArmCenterRightEdgeMin >= 0 || this.ArmCenterUpEdgeMin >= 0 || this.ArmCenterForwardEdgeMax <= 0 || this.ArmCenterRightEdgeMax <= 0 || this.ArmCenterUpEdgeMax <= 0) && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 57, "CameraDefault配置上下界有误", ["tagName", e], ["ForwardMin", this.ArmCenterForwardEdgeMin], ["RightMin", this.ArmCenterRightEdgeMin], ["UpMin", this.ArmCenterUpEdgeMin], ["ForwardMax", this.ArmCenterForwardEdgeMax], ["RightMax", this.ArmCenterRightEdgeMax], ["UpMax", this.ArmCenterUpEdgeMax]);
      }
    }
    if (i) {
      for (var [m, v] of i) {
        m = this.C1e.get(m);
        this.p1e(m, v);
      }
      for (var [M, d] of this.C1e) {
        if (this[d] === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "CameraDefault缺少曲线配置", ["tagName", e], ["key", M], ["value", d]);
          }
          this.p1e(d, CurveUtils_1.CurveUtils.CreateCurve(0));
        }
      }
    }
    if (s) {
      for (var [c, u] of s) {
        c = this.thm.get(c);
        this.f1e(c, u);
      }
    }
    if (h) {
      for (var [p, g] of h) {
        p = this.ihm.get(p);
        this.p1e(p, g);
      }
    }
  }
  ResetDefaultConfig() {
    this.SetConfigs(this.DefaultConfigs, this.DefaultCurveConfigs, this.VehicleConfigs, this.VehicleCurveConfigs, "DefaultConfig", this.CameraConfigController.GetDefaultConfig().CameraArmLocationSocketName, this.CameraConfigController.GetDefaultConfig().CameraArmLocationSocketOverrideType, true);
  }
  ApplyConfig() {
    this.DesiredCamera.ArmLength = this.ArmLength;
    this.DesiredCamera.MinArmLength = this.MinArmLength;
    this.DesiredCamera.MaxArmLength = this.MaxArmLength;
    this.DesiredCamera.YawLimitMin = this.YawLimitMin;
    this.DesiredCamera.YawLimitMax = this.YawLimitMax;
    this.DesiredCamera.PitchLimitMin = CameraUtility_1.CameraUtility.GetValidPitchAngle(this.PitchLimitMin, true);
    this.DesiredCamera.PitchLimitMax = CameraUtility_1.CameraUtility.GetValidPitchAngle(this.PitchLimitMax, false);
    this.DesiredCamera.LookDownOffsetZ = this.LookDownOffsetZ;
    this.DesiredCamera.LookUpOffsetZ = this.LookUpOffsetZ;
    this.DesiredCamera.CameraOffset.X = this.CameraOffsetX;
    this.DesiredCamera.CameraOffset.Y = this.CameraOffsetY;
    this.DesiredCamera.CameraOffset.Z = this.CameraOffsetZ;
    this.DesiredCamera.ArmOffset.X = this.ArmOffsetX;
    this.DesiredCamera.ArmOffset.Y = this.ArmOffsetY;
    this.DesiredCamera.ArmOffset.Z = this.ArmOffsetZ;
    this.DesiredCamera.Fov = this.Fov;
    this.DesiredCamera.EnableDynamicFov = this.EnableDynamicFov > 0;
    this.DesiredCamera.DynamicFovMin = this.DynamicFovMin;
    this.DesiredCamera.DynamicFovMax = this.DynamicFovMax;
    this.DesiredCamera.DynamicFovParamMin = this.DynamicFovParamMin;
    this.DesiredCamera.DynamicFovParamMax = this.DynamicFovParamMax;
    this.DesiredCamera.DynamicFovLerpSpeed = this.DynamicFovLerpSpeed;
    this.DesiredCamera.WorldYawMin = this.WorldYawMin;
    this.DesiredCamera.WorldYawMax = this.WorldYawMax;
    this.DesiredCamera.CameraOffsetFloatUpMin = this.CameraOffsetFloatUpMin;
    this.DesiredCamera.CameraOffsetFloatUpMax = this.CameraOffsetFloatUpMax;
    if (!this.Initialized) {
      this.CopyVirtualCamera(this.CurrentCamera, this.DesiredCamera);
      this.Initialized = true;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateCameraInfo, this.CharacterEntityHandle.Id);
  }
  OnInit() {
    this.SetConfigMap(1, "ArmLength");
    this.SetConfigMap(2, "MinArmLength");
    this.SetConfigMap(3, "MaxArmLength");
    this.SetConfigMap(6, "CameraOffsetX");
    this.SetConfigMap(7, "CameraOffsetY");
    this.SetConfigMap(8, "CameraOffsetZ");
    this.SetConfigMap(62, "ArmOffsetX");
    this.SetConfigMap(63, "ArmOffsetY");
    this.SetConfigMap(64, "ArmOffsetZ");
    this.SetConfigMap(5, "Fov");
    this.SetConfigMap(35, "MaxDistance");
    this.SetConfigMap(36, "InSpeed");
    this.SetConfigMap(37, "OutSpeed");
    this.SetConfigMap(39, "CenterCollisionSize");
    this.SetConfigMap(38, "CollisionSizePercentage");
    this.SetConfigMap(9, "CameraLocationFadeTime");
    this.SetConfigMap(11, "CollisionProbeSize");
    this.SetConfigMap(32, "NearCollisionProbeSize");
    this.SetConfigMap(30, "CheckCollisionProbeSize");
    this.SetConfigMap(31, "CheckWidth");
    this.SetConfigMap(10, "CollisionAdditionalHeightInWater");
    this.SetConfigMap(12, "DefaultPitchHorizontalOffset");
    this.SetConfigMap(13, "DefaultPitchVerticalOffset");
    this.SetConfigMap(14, "DefaultPitchInRangeMin");
    this.SetConfigMap(15, "DefaultPitchInRangeCenter");
    this.SetConfigMap(16, "DefaultPitchInRangeMax");
    this.SetConfigMap(17, "DefaultPitchOutRangeMin");
    this.SetConfigMap(18, "DefaultPitchOutRangeCenter");
    this.SetConfigMap(19, "DefaultPitchOutRangeMax");
    this.SetConfigMap(24, "FloatUpArmLengthMin");
    this.SetConfigMap(25, "FloatUpArmLengthMax");
    this.SetConfigMap(88, "CameraOffsetFloatUpArmLengthMin");
    this.SetConfigMap(89, "CameraOffsetFloatUpArmLengthMax");
    this.SetConfigMap(90, "CameraOffsetFloatUpMin");
    this.SetConfigMap(91, "CameraOffsetFloatUpMax");
    this.SetConfigMap(40, "StartHideDistance");
    this.SetConfigMap(41, "CompleteHideDistance");
    this.SetConfigMap(42, "StartHidePitch");
    this.SetConfigMap(43, "CompleteHidePitch");
    this.SetConfigMap(44, "StartDitherValue");
    this.SetConfigMap(33, "YawLimitMin");
    this.SetConfigMap(34, "YawLimitMax");
    this.SetConfigMap(45, "PitchLimitMin");
    this.SetConfigMap(46, "PitchLimitMax");
    this.SetConfigMap(20, "ArmCenterUpSpeedMin");
    this.SetConfigMap(21, "ArmCenterUpSpeedMax");
    this.SetConfigMap(22, "ArmCenterUpEdgeMin");
    this.SetConfigMap(23, "ArmCenterUpEdgeMax");
    this.SetCurveConfigMap(23, "ArmCenterUpCurve");
    this.SetConfigMap(26, "ArmCenterForwardSpeedMin");
    this.SetConfigMap(27, "ArmCenterForwardSpeedMax");
    this.SetConfigMap(28, "ArmCenterForwardEdgeMin");
    this.SetConfigMap(29, "ArmCenterForwardEdgeMax");
    this.SetCurveConfigMap(29, "ArmCenterForwardCurve");
    this.SetConfigMap(47, "ArmCenterRightSpeedMin");
    this.SetConfigMap(48, "ArmCenterRightSpeedMax");
    this.SetConfigMap(49, "ArmCenterRightEdgeMin");
    this.SetConfigMap(50, "ArmCenterRightEdgeMax");
    this.SetCurveConfigMap(50, "ArmCenterRightCurve");
    this.SetConfigMap(75, "ArmCenterRightReverseSpeed");
    this.SetConfigMap(76, "ArmCenterRightReverseRotationEdge");
    this.SetConfigMap(51, "LookDownOffsetZ");
    this.SetConfigMap(52, "LookUpOffsetZ");
    this.SetConfigMap(54, "CameraRotateToTargetMaxAlpha");
    this.SetConfigMap(53, "CameraRotateToTargetMinAlpha");
    this.SetCurveConfigMap(55, "CameraRotateToTargetCurve");
    this.SetConfigMap(56, "IsDisableResetFocus");
    this.SetConfigMap(57, "AdditionPitchMin");
    this.SetConfigMap(58, "AdditionPitchMax");
    this.SetConfigMap(59, "AdditionPitchDeltaHeight");
    this.SetCurveConfigMap(59, "AdditionPitchCurve");
    this.SetConfigMap(60, "WorldYawMin");
    this.SetConfigMap(61, "WorldYawMax");
    this.SetConfigMap(70, "CameraZoneMode");
    this.SetConfigMap(66, "YawSoftZoneMin");
    this.SetConfigMap(66, "YawSoftZoneMin");
    this.SetConfigMap(67, "YawSoftZoneMax");
    this.SetConfigMap(68, "YawDeadZoneMin");
    this.SetConfigMap(69, "YawDeadZoneMax");
    this.SetConfigMap(71, "YawZoneSpeedMin");
    this.SetConfigMap(72, "YawZoneSpeedMax");
    this.SetConfigMap(108, "YawSoftZoneSpeedRatio");
    this.SetConfigMap(73, "YawDeadZoneTransToSoftZoneSpeedRatio");
    this.SetConfigMap(74, "YawTransToForwardSpeedRatio");
    this.SetConfigMap(77, "YawInputEnableTime");
    this.SetConfigMap(78, "YawRollbackEnableTime");
    this.SetConfigMap(79, "PitchInputEnableTime");
    this.SetConfigMap(80, "PitchRollbackEnableTime");
    this.SetConfigMap(81, "PitchSoftZoneMin");
    this.SetConfigMap(82, "PitchSoftZoneMax");
    this.SetConfigMap(83, "PitchDeadZoneMin");
    this.SetConfigMap(84, "PitchDeadZoneMax");
    this.SetConfigMap(85, "PitchBasis");
    this.SetConfigMap(86, "PitchZoneSpeedMin");
    this.SetConfigMap(87, "PitchZoneSpeedMax");
    this.SetConfigMap(92, "CharAddArmLength");
    this.SetConfigMap(93, "CharAddZ");
    this.SetConfigMap(102, "EnableDynamicFov");
    this.SetConfigMap(103, "DynamicFovMin");
    this.SetConfigMap(104, "DynamicFovMax");
    this.SetConfigMap(105, "DynamicFovParamMin");
    this.SetConfigMap(106, "DynamicFovParamMax");
    this.SetConfigMap(107, "DynamicFovLerpSpeed");
    this.SetCurveConfigMap(104, "DynamicFovCurve");
    this.SetVehicleConfigMap(1, "EnableFocusOnVehicle");
    this.SetVehicleConfigMap(2, "AttachToVehicle");
    this.InitialCameraPitch = CommonParamById_1.configCommonParamById.GetFloatConfig("InitialCameraPitch");
    this.CameraCollision = new CameraCollision_1.CameraCollision();
    this.CameraCollision.Init(this);
    this.CameraRotationZone = new CameraRotationZone_1.CameraRotationZone();
    this.CameraRotationZone.Init(this);
    this.SettlementCamera = new SettlementCamera_1.SettlementCamera();
    this.SettlementCamera.Init(this);
    this.CameraTransformBuffer = new CameraTransformBuffer_1.CameraTransformBuffer();
    this.CameraTransformBuffer.Init(this);
    this.AddUnResetProperty("LastCamera", "DesiredCamera", "CameraConfigController", "CameraFocusController", "CameraInputController", "CameraModifyController", "CameraAdjustController", "CameraSidestepController", "CameraAutoController", "CameraGuideController", "CameraRunningController", "CameraRotatorController", "CameraDialogueController", "CameraFixedController", "CameraClimbController", "CameraHookController", "CameraSplineMoveController", "CameraCollision", "CameraRotationZone", "SettlementCamera", "CameraTransformBuffer");
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAfterAttachVehicle, this.sa1);
    return true;
  }
  LoadConfig() {
    this.ele = this.Entity.GetComponent(4);
    var t = Info_1.Info.IsMobileInputModel() || CloudGameManager_1.CloudGameManager.IsCloudGame ? MOBILE_CONFIG_PATH : CONFIG_PATH;
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BP_FightCameraConfig_C, t => {
      this.CameraConfig = t;
      this.DefaultConfigs = FightCameraLogicComponent_1.TMapToMap(t.基础);
      this.DefaultCurveConfigs = FightCameraLogicComponent_1.TMapToCurveMap(t.基础曲线配置);
      this.VehicleConfigs = FightCameraLogicComponent_1.TMapToMap(t.载具镜头);
      this.VehicleCurveConfigs = FightCameraLogicComponent_1.TMapToCurveMap(t.载具镜头曲线配置);
      this.CameraFocusController.SetDefaultConfigs(t.锁定镜头, t.锁定镜头曲线配置);
      this.CameraInputController.SetDefaultConfigs(t.镜头输入, t.镜头输入曲线配置);
      this.CameraModifyController.SetDefaultConfigs(t.Modify镜头, t.Modify镜头曲线配置);
      this.CameraAdjustController.SetDefaultConfigs(t.技能修正, t.技能修正曲线配置);
      this.CameraSidestepController.SetDefaultConfigs(t.移动自动镜头, t.移动自动镜头曲线配置);
      this.CameraAutoController.SetDefaultConfigs(t.自动镜头, t.自动镜头曲线配置);
      this.CameraGuideController.SetDefaultConfigs(t.引导镜头, t.引导镜头曲线配置);
      this.CameraRunningController.SetDefaultConfigs(t.跑图镜头, t.跑图镜头曲线配置);
      this.CameraDialogueController.SetDefaultConfigs(t.对话镜头, t.对话镜头曲线配置);
      this.CameraFixedController.SetDefaultConfigs(t.对话镜头, t.对话镜头曲线配置);
      this.CameraClimbController.SetDefaultConfigs(t.攀爬镜头, t.攀爬镜头曲线配置);
      this.CameraCollision?.SetCameraConfig(t.基础.Get(11), t.基础.Get(65));
    });
  }
  ApplyCameraModify(t, i, s, h, e, a, r = BREAK_BLEND_OUT_TIME, o = undefined, n = undefined, l = undefined, _ = "", C = undefined) {
    return this.CameraModifyController.ApplyCameraModify(t, i, s, h, r, e, a, o, n, l, _, C);
  }
  StopCameraModify(t, i) {
    this.CameraModifyController.StopCameraModify(t, i);
  }
  HasCameraModify() {
    return this.CameraModifyController.IsModified;
  }
  GetCameraModifyInstance() {
    return this.CameraModifyController.ModifyInstance;
  }
  ApplyCameraGuide(t, i, s, h, e, a, r, o = false, n = false, l = 0, _ = false, C, m = false) {
    this.CameraGuideController.ApplyCameraGuide(t, i, s, h, e, a, r, o, n, l, _, C, m);
  }
  CameraGuideFinishStaying() {
    this.CameraGuideController.CameraGuideFinishStaying();
  }
  ApplyCameraHook(t, i = undefined) {
    this.CameraHookController.ApplyCameraHook(t, i);
  }
  ExitCameraHook(t = true) {
    this.CameraHookController.ExitCameraHook(t);
  }
  ExitCameraGuide() {
    this.CameraGuideController.ExitCameraGuide();
  }
  ExitCameraGuideAtOnce() {
    this.CameraGuideController.ExitCameraGuideAtOnce();
  }
  ApplyDepthOfField(t, i, s, h) {
    var e = this.CameraActor?.CameraComponent?.PostProcessSettings;
    if (e && (t !== undefined && (e.bOverride_DepthOfFieldFstop = true, e.DepthOfFieldFstop = t), i !== undefined ? (e.bOverride_DepthOfFieldFocalDistance = true, e.DepthOfFieldFocalDistance = i) : (e.bOverride_DepthOfFieldFocalDistance = true, this.LPr = true), s !== undefined && (e.bOverride_DepthOfFieldDepthBlurAmount = true, e.DepthOfFieldDepthBlurAmount = s), h !== undefined)) {
      e.bOverride_DepthOfFieldDepthBlurRadius = true;
      e.DepthOfFieldDepthBlurRadius = h;
    }
  }
  ApplyRadialBlur(t, i, s, h, e, a) {
    var r = this.CameraActor?.CameraComponent?.PostProcessSettings;
    if (r) {
      if (t !== undefined) {
        r.bOverride_KuroRadialBlurIntensity = true;
        r.KuroRadialBlurIntensity = t;
      } else {
        r.bOverride_KuroRadialBlurIntensity = false;
      }
      if (i !== undefined) {
        r.bOverride_KuroRadialBlurCenter = true;
        r.KuroRadialBlurCenter = i;
      } else {
        r.bOverride_KuroRadialBlurCenter = false;
      }
      if (s !== undefined) {
        r.bOverride_KuroRadialBlurRadius = true;
        r.KuroRadialBlurRadius = s;
      } else {
        r.bOverride_KuroRadialBlurRadius = false;
      }
      if (h !== undefined) {
        r.bOverride_KuroRadialBlurHardness = true;
        r.KuroRadialBlurHardness = h;
      } else {
        r.bOverride_KuroRadialBlurHardness = false;
      }
      if (e !== undefined) {
        r.bOverride_KuroRadialBlurPassNumber = true;
        r.KuroRadialBlurPassNumber = e;
      } else {
        r.bOverride_KuroRadialBlurPassNumber = false;
      }
      if (a !== undefined) {
        r.bOverride_KuroRadialBlurSampleNumber = true;
        r.KuroRadialBlurSampleNumber = a;
      } else {
        r.bOverride_KuroRadialBlurSampleNumber = false;
      }
    }
  }
  ExitDepthOfField() {
    var t = this.CameraActor?.CameraComponent?.PostProcessSettings;
    if (t) {
      t.bOverride_DepthOfFieldFstop = false;
      t.bOverride_DepthOfFieldFocalDistance = false;
      t.bOverride_DepthOfFieldDepthBlurAmount = false;
      t.bOverride_DepthOfFieldDepthBlurRadius = false;
    }
    this.LPr = false;
  }
  ExitRadialBlur() {
    var t = this.CameraActor?.CameraComponent?.PostProcessSettings;
    if (t) {
      t.bOverride_KuroRadialBlurIntensity = false;
      t.bOverride_KuroRadialBlurCenter = false;
      t.bOverride_KuroRadialBlurRadius = false;
      t.bOverride_KuroRadialBlurHardness = false;
      t.bOverride_KuroRadialBlurPassNumber = false;
      t.bOverride_KuroRadialBlurSampleNumber = false;
    }
  }
  ApplyCameraSpline(t, i, s, h) {
    this.CameraSplineMoveController.ApplyCameraSpline(t, i, s, h);
  }
  ExitCameraSpline() {
    this.CameraSplineMoveController.EndCameraSpline();
  }
  EnterCameraExplore(t, i, s, h, e, a, r) {
    this.CameraRunningController.EnterCameraExplore(t, i, s, h, e, a, r);
  }
  ExitCameraExplore(t) {
    this.CameraRunningController.ExitCameraExplore(t);
  }
  EnterSequenceDialogue(t, i = false, s = undefined, h = undefined) {
    if (this.cPr) {
      this.CameraDialogueController.EnterSequenceDialogue(t, i, s, h);
    }
  }
  AdjustDialogueCamera(t, i, s, h) {
    this.CameraDialogueController.AdjustDialogueParams(t, i, s, h);
  }
  ExitSequenceDialogue() {
    this.CameraDialogueController.ExitSequenceDialogue();
  }
  SetRotation(t) {
    if (!t || t.ContainsNaN()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 57, "rotation is invalid: ", ["rotation", t]);
      }
    } else {
      this.DesiredCamera.ArmRotation.DeepCopy(t);
      this.CurrentCamera.ArmRotation.DeepCopy(t);
      this.SetRotationInternal(t);
      this.CurrentCamera.ArmRotation.Quaternion().RotateVector(Vector_1.Vector.ForwardVectorProxy, this.CameraForward);
    }
  }
  SetPawn(t) {
    if (t instanceof TsBaseCharacter_1.default) {
      this.SetCharacter(t);
    } else if (!t?.IsValid()) {
      this.SetCharacter(undefined);
    }
  }
  SetCharacter(t) {
    if (ModelManager_1.ModelManager.CameraModel?.ViewHideHeadEnabled && this.Character !== t) {
      ModelManager_1.ModelManager.CameraModel.SetHideHeadEnabled(false, 1);
    }
    if (this.CharacterEntityHandle?.Valid) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.CharacterEntityHandle.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.hUe);
      EventSystem_1.EventSystem.RemoveWithTarget(this.CharacterEntityHandle.Entity, EventDefine_1.EEventName.CharGravityDirectChanged, this.Udc);
    }
    if (this.mPr?.Valid) {
      this.mPr.RemoveTagAddOrRemoveListener(vehicleWaterFall, this.UWi);
      this.mPr.RemoveTagAddOrRemoveListener(hideHeadTag, this.aZc);
    }
    this.Character?.SetDitherEffect(1, 1);
    if (this.RestoreFollowingOnChangeRole) {
      this.IsFollowing = true;
    }
    if (this.Character = t) {
      this.cPr = this.Character?.IsValid() ?? false;
      this.CharacterEntityHandle = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Character.EntityId);
      this.CharacterInputComponent = this.CharacterEntityHandle?.Entity?.GetComponent(65);
      this.CharacterController = this.CharacterInputComponent?.CharacterController;
      this.mPr = this.CharacterEntityHandle?.Entity?.GetComponent(215);
      this.CharacterDriveVehicleComponent = this.CharacterEntityHandle?.Entity?.GetComponent(242);
      this.Character.SetDitherEffect(1, 1);
      this.CameraCollision.SetCharacter(t);
      this.CameraRotationZone.SetCharacter(this.CharacterEntityHandle);
      t = this.CharacterEntityHandle.Entity.GetComponent(0).GetRoleConfig();
      this.SPr = t.CameraFloatHeight;
      if (this.ContainsTag(1674960297) || this.GetUsingGoBattle()) {
        this.ResetArmLocation(true, this.CameraLocationFadeTime);
      }
      this.Ddc();
      this.hZc();
      EventSystem_1.EventSystem.AddWithTarget(this.CharacterEntityHandle.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.hUe);
      EventSystem_1.EventSystem.AddWithTarget(this.CharacterEntityHandle.Entity, EventDefine_1.EEventName.CharGravityDirectChanged, this.Udc);
      if (this.mPr?.Valid) {
        this.mPr.AddTagAddOrRemoveListener(vehicleWaterFall, this.UWi);
        this.mPr.AddTagAddOrRemoveListener(hideHeadTag, this.aZc);
      }
    } else {
      this.cPr = false;
      this.CharacterEntityHandle = undefined;
      this.CharacterInputComponent = undefined;
      this.mPr = undefined;
      this.CharacterDriveVehicleComponent = undefined;
      this.CharacterController = undefined;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CameraCharacterChanged, this.CharacterEntityHandle);
  }
  SetFollowShooter(t) {
    this.FollowShooterEntityHandle = t;
    if (this.FollowShooterEntityHandle) {
      this.FollowShooterTagComponentInternal = this.FollowShooterEntityHandle?.Entity?.GetComponent(215);
    } else {
      this.FollowShooterTagComponentInternal = undefined;
    }
  }
  bPr(t) {
    CameraUtility_1.CameraUtility.GetSocketLocation(undefined, this.TargetSocketName, t, this.TargetEntity);
  }
  ResetArmLengthAndRotation(t) {
    if (this.cPr) {
      this.DesiredCamera.ArmLength = this.ArmLength;
      this.SetRotation(CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator().op_Addition(t));
    }
  }
  ResetInitialCameraRotation() {
    CameraUtility_1.CameraUtility.SetPitchInGravity(this.CameraRotation, this.InitialCameraPitch, this.CameraRotation);
    this.SetRotation(this.CameraRotation.ToUeRotator());
  }
  GetCharacter() {
    return this.Character;
  }
  CopyVirtualCamera(t, i, s = false) {
    t.ArmLength = i.ArmLength;
    t.MinArmLength = i.MinArmLength;
    t.MaxArmLength = i.MaxArmLength;
    if (t.ArmLength < MathUtils_1.MathUtils.SmallNumber) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 6, "ArmLength is Zero");
      }
      t.ArmLength = 1;
    }
    if (t.MinArmLength < MathUtils_1.MathUtils.SmallNumber) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 6, "MinArmLength is Zero");
      }
      t.MinArmLength = 1;
    }
    if (t.MaxArmLength < MathUtils_1.MathUtils.SmallNumber) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 6, "MaxArmLength is Zero");
      }
      t.MaxArmLength = 1;
    }
    if (s && this.Character && this.TPn(i.YawLimitMin, i.YawLimitMax)) {
      s = Math.abs(MathUtils_1.MathUtils.WrapAngle(i.ArmRotation.Yaw - this.PlayerRotatorInGravity.Yaw));
      t.YawLimitMin = -Math.abs(s);
      t.YawLimitMax = Math.abs(s);
    } else {
      t.YawLimitMin = i.YawLimitMin;
      t.YawLimitMax = i.YawLimitMax;
    }
    t.PitchLimitMin = CameraUtility_1.CameraUtility.GetValidPitchAngle(i.PitchLimitMin, true);
    t.PitchLimitMax = CameraUtility_1.CameraUtility.GetValidPitchAngle(i.PitchLimitMax, false);
    t.LookDownOffsetZ = i.LookDownOffsetZ;
    t.LookUpOffsetZ = i.LookUpOffsetZ;
    t.WorldYawMin = i.WorldYawMin;
    t.WorldYawMax = i.WorldYawMax;
    t.CameraOffsetFloatUpMin = i.CameraOffsetFloatUpMin;
    t.CameraOffsetFloatUpMax = i.CameraOffsetFloatUpMax;
    t.ArmOffset.DeepCopy(i.ArmOffset);
    t.CameraOffset.DeepCopy(i.CameraOffset);
    t.ArmLocation.DeepCopy(i.ArmLocation);
    t.ArmRotation.DeepCopy(i.ArmRotation);
    t.Fov = i.Fov;
    t.EnableDynamicFov = i.EnableDynamicFov;
    t.DynamicFov = i.DynamicFov;
    t.DynamicFovMin = i.DynamicFovMin;
    t.DynamicFovMax = i.DynamicFovMax;
    t.DynamicFovParamMin = i.DynamicFovParamMin;
    t.DynamicFovParamMax = i.DynamicFovParamMax;
    t.DynamicFovLerpSpeed = i.DynamicFovLerpSpeed;
    if (t.Fov < MathUtils_1.MathUtils.SmallNumber) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 6, "Fov is Zero");
      }
      t.Fov = 1;
    }
    t.ZoomModifier = i.ZoomModifier;
    if (t.ZoomModifier < MathUtils_1.MathUtils.SmallNumber) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 57, "ZoomModifier is Zero");
      }
      t.ZoomModifier = 1;
    }
  }
  StartFade(t, i, s, h, e, a, r) {
    this.CurrentCamera.ArmRotation.Pitch = MathUtils_1.MathUtils.StandardizingPitch(this.CurrentCamera.ArmRotation.Pitch);
    this.CopyVirtualCamera(this.LastCamera, this.CurrentCamera, true);
    this.EUo = s;
    this.pPr = h;
    this.vPr = e;
    this.MPr = a;
    this.Fading = true;
    this.FadeDuration = !r && this.IsUniqueFade ? Math.max(this.FadeDuration - this.vUo, 0) : t;
    this.vUo = 0;
    this.MUo = i;
    this.IsUniqueFade = r;
    this.yP_ = this.SP_;
    if (this.FadeDuration > 0 && !this.MUo) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 6, "No Fade Curve.");
      }
      this.MUo = CurveUtils_1.CurveUtils.CreateCurve(0);
    }
  }
  ResetArmLocation(t, i = 0) {
    if (t) {
      this.gPr = true;
      this.fPr = i;
      this.ArmLocationFadeElapseTime = 0;
    }
  }
  SetArmLocation(t) {
    if (!this.IsModifiedArmLocation) {
      this.DesiredCamera.ArmLocation.DeepCopy(t);
      this.IsModifiedArmLocation = true;
    }
  }
  OnStart() {
    this.LoadConfig();
    this.CameraCollision.InitTraceElements();
    this.CurrentCollisionSize = 0;
    this.pTn = -1;
    this.SetCameraGravityMode(2);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSequenceCameraStatus, this.BPr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharPossessed, this.PPr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUnpossessed, this.xPr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerPossessed, this.CQm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerUnPossessed, this.pQm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.MEu);
    for (const t of this.EPr) {
      t.OnStart();
    }
    return true;
  }
  OnEnd() {
    this.CameraCollision.Clear();
    this.CameraRotationZone.Clear();
    this.SettlementCamera.Clear();
    this.CameraTransformBuffer.Clear();
    this.CameraConfig = undefined;
    this.ele = undefined;
    this.zQu = 1;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSequenceCameraStatus, this.BPr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharPossessed, this.PPr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUnpossessed, this.xPr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerPossessed, this.CQm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerUnPossessed, this.pQm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.MEu);
    for (const t of this.EPr) {
      t.OnEnd();
    }
    return true;
  }
  ForceTickOutSide() {
    this.OnAfterTick(0);
  }
  OnAfterTick(t) {
    this.yeu();
    this.Seu();
    this.cPr = this.Character?.IsValid() ?? false;
    if (this.CameraActor?.IsValid() && this.cPr) {
      if (ModelManager_1.ModelManager.CameraModel.CameraMode !== 0) {
        if (!ControllerHolder_1.ControllerHolder.PhotographController.IsOpenPhotograph() && !ModelManager_1.ModelManager.CameraModel?.ViewHideHeadEnabled && (ModelManager_1.ModelManager.CameraModel.CameraMode !== 1 || !ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera?.PlayerComponent?.IsDitherEffectEnabled)) {
          this.Character.SetDitherEffect(1, 1);
        }
        this.CameraCollision?.ResetAllNpcDither();
      } else {
        t = t * MathUtils_1.MathUtils.MillisecondToSecond * this.zQu;
        this.GetCameraTargetMoveVector(this.PlayerMoveVector);
        this.qPr();
        FightCameraLogicComponent_1.Uza.Start();
        this.GPr();
        this.jl1(t);
        this.Hl1(t);
        this.Bdc();
        this.RefreshPlayerLocation(t);
        this.zUf(t);
        this.kdc();
        this.nvm();
        this.$l1(t);
        FightCameraLogicComponent_1.Uza.Stop();
        if (this.OPr()) {
          this.DesiredCamera.ArmLength = MathUtils_1.MathUtils.Clamp(this.DesiredCamera.ArmLength, this.DesiredCamera.MinArmLength, this.DesiredCamera.MaxArmLength);
        }
        this.kPr(t);
        this.DUo();
        this.LUo(t);
        this.FPr(t);
        this.RUo(t);
        this.VPr(t);
        FightCameraLogicComponent_1.Oza.Start();
        this.ZQi(t);
        this.HPr();
        this.jPr();
        this.MTn();
        FightCameraLogicComponent_1.Oza.Stop();
        this.CharacterController?.SetControlRotation(this.CurrentCamera.ArmRotation.ToUeRotator());
        this.LastFramePlayerLocation.DeepCopy(this.PlayerLocation);
        this.LastFrameAttachToVehicle = this.AttachToVehicle;
        this.LastFrameCameraArmLocationSocketName = this.CameraArmLocationSocketName;
        this.$Zh();
        this.eJc();
        this.Meu();
      }
    }
  }
  jl1(t) {
    for (const i of this.Nl1) {
      i.Update(t);
    }
  }
  $l1(t) {
    for (const i of this.Vl1) {
      i.Update(t);
    }
  }
  OPr() {
    return !this.CameraModifyController?.ModifySettings?.IsModifiedArmLength && !this.CameraModifyController?.ModifyArmLength && (!this.CameraModifyController.IsModifyFadeOut || !this.CameraModifyController?.ModifyFadeOutData?.ModifyArmLength);
  }
  GetConfigMapValue(t) {
    return String(this.$.get(t));
  }
  GPr() {
    this.IsModifiedArmLocation = false;
    this.IsModifiedArmLength = false;
    this.IsModifiedArmOffset = false;
    this.IsModifiedZoomModifier = false;
    this.IsModifiedArmRotationYaw = false;
    this.IsModifiedArmRotationPitch = false;
    this.IsModifiedArmRotationRoll = false;
    this.IsModifiedCameraOffset = false;
    this.IsModifiedFov = false;
  }
  XPr(t, i, s, h, e, a, r, o) {
    var n = t - i;
    var r = Math.abs(n) / ((r - a) / 2);
    var a = MathUtils_1.MathUtils.Lerp(h, e, o.GetCurrentValue(r)) * s;
    if (n < 0) {
      return MathUtils_1.MathUtils.Clamp(t + a, t, i);
    } else {
      return MathUtils_1.MathUtils.Clamp(t - a, i, t);
    }
  }
  $Pr(t, i, s, h, e, a, r, o) {
    var n = t - i;
    if (n < 0) {
      const l = MathUtils_1.MathUtils.Lerp(h, e, o.GetCurrentValue(n / a));
      const _ = l * s;
      return MathUtils_1.MathUtils.Clamp(t + _, i + a, i);
    }
    const l = MathUtils_1.MathUtils.Lerp(h, e, o.GetCurrentValue(n / r));
    const _ = l * s;
    return MathUtils_1.MathUtils.Clamp(t - _, i, i + r);
  }
  S1h(t, i, s, h, e, a, r, o) {
    var n = t - i;
    var h = MathUtils_1.MathUtils.Lerp(h, e, o.GetCurrentValue(Math.abs(n) / Math.abs(a))) * s;
    if (this.CameraRotationZone.IsHasPitchHorizontalMovement()) {
      if (this.CameraRotationZone.IsPitchRollback()) {
        if (n > 0) {
          return t - MathUtils_1.MathUtils.Clamp(h, 0, n);
        } else {
          return t + MathUtils_1.MathUtils.Clamp(h, 0, -n);
        }
      } else {
        return t;
      }
    } else if (this.CameraRotationZone.IsHasPitchUpMovement()) {
      return MathUtils_1.MathUtils.Clamp(t - h, i + a, i + r);
    } else {
      return MathUtils_1.MathUtils.Clamp(t + h, i + a, i + r);
    }
  }
  jgm(t, i, s, h, e, a, r, o, n, l) {
    var _ = this.Character.CharacterActorComponent.InputDirectProxy;
    if (MathUtils_1.MathUtils.IsNearlyZero(_.Y, MathUtils_1.MathUtils.KindaSmallNumber)) {
      var C = t - i;
      if (C > 0) {
        const M = a * s;
        var m = MathUtils_1.MathUtils.Clamp(M, 0, C);
        return MathUtils_1.MathUtils.Clamp(t - m, i + r, i + o);
      }
      const M = a * s;
      m = MathUtils_1.MathUtils.Clamp(M, 0, -C);
      return MathUtils_1.MathUtils.Clamp(t + m, i + r, i + o);
    }
    if (!this.CameraRotationZone.IsYawInputEnable()) {
      return t;
    }
    a = this.PlayerRotatorInGravity.Yaw;
    C = CameraUtility_1.CameraUtility.GetYawInGravity(this.CameraRotation);
    m = MathUtils_1.MathUtils.WrapAngle(C - a);
    if (_.Y < 0) {
      if (m < 0) {
        return t;
      }
      const v = MathUtils_1.MathUtils.Lerp(h, e, n.GetCurrentValue(m / l));
      const M = v * s;
      return MathUtils_1.MathUtils.Clamp(t - M, i + r, i + o);
    }
    if (m > 0) {
      return t;
    }
    const v = MathUtils_1.MathUtils.Lerp(h, e, n.GetCurrentValue(-m / l));
    const M = v * s;
    return MathUtils_1.MathUtils.Clamp(t + M, i + r, i + o);
  }
  Hgm(t, i, s, h, e, a, r, o, n, l) {
    var _ = this.TempVector3;
    this.GetCameraTargetInput(_);
    if (!this.CameraRotationZone.IsHasYawHorizontalMovement()) {
      var C = t - i;
      if (C > 0) {
        const M = a * s;
        var m = MathUtils_1.MathUtils.Clamp(M, 0, C);
        return MathUtils_1.MathUtils.Clamp(t - m, i + r, i + o);
      }
      const M = a * s;
      m = MathUtils_1.MathUtils.Clamp(M, 0, -C);
      return MathUtils_1.MathUtils.Clamp(t + m, i + r, i + o);
    }
    if (!this.CameraRotationZone.IsYawInputEnable()) {
      return t;
    }
    a = Math.abs(this.PlayerRotatorInGravity.Roll);
    if (_.Y < 0) {
      const v = MathUtils_1.MathUtils.Lerp(h, e, n.GetCurrentValue(a / l));
      const M = v * s;
      return MathUtils_1.MathUtils.Clamp(t - M, i + r, i + o);
    }
    const v = MathUtils_1.MathUtils.Lerp(h, e, n.GetCurrentValue(a / l));
    const M = v * s;
    return MathUtils_1.MathUtils.Clamp(t + M, i + r, i + o);
  }
  kPr(t) {
    var i;
    if (this.IsFollowing) {
      this.CameraRotationZone.UpdateInputState(t);
      this.H7a();
      this.V7a.RotateVector(this.PlayerLocation, this.TempVector);
      this.V7a.RotateVector(this.TmpArmLocation, this.TempVector2);
      this.CurrentArmCenterForwardEdgeMin = this.XPr(this.CurrentArmCenterForwardEdgeMin, this.ArmCenterForwardEdgeMin, t, this.ArmCenterForwardSpeedMin, this.ArmCenterForwardSpeedMax, this.ArmCenterForwardEdgeMin, this.ArmCenterForwardEdgeMax, this.ArmCenterForwardCurve);
      this.CurrentArmCenterForwardEdgeMax = this.XPr(this.CurrentArmCenterForwardEdgeMax, this.ArmCenterForwardEdgeMax, t, this.ArmCenterForwardSpeedMin, this.ArmCenterForwardSpeedMax, this.ArmCenterForwardEdgeMin, this.ArmCenterForwardEdgeMax, this.ArmCenterForwardCurve);
      this.CurrentArmCenterRightEdgeMin = this.XPr(this.CurrentArmCenterRightEdgeMin, this.ArmCenterRightEdgeMin, t, this.ArmCenterRightSpeedMin, this.ArmCenterRightSpeedMax, this.ArmCenterRightEdgeMin, this.ArmCenterRightEdgeMax, this.ArmCenterRightCurve);
      this.CurrentArmCenterRightEdgeMax = this.XPr(this.CurrentArmCenterRightEdgeMax, this.ArmCenterRightEdgeMax, t, this.ArmCenterRightSpeedMin, this.ArmCenterRightSpeedMax, this.ArmCenterRightEdgeMin, this.ArmCenterRightEdgeMax, this.ArmCenterRightCurve);
      this.CurrentArmCenterUpEdgeMin = this.XPr(this.CurrentArmCenterUpEdgeMin, this.ArmCenterUpEdgeMin, t, this.ArmCenterUpSpeedMin, this.ArmCenterUpSpeedMax, this.ArmCenterUpEdgeMin, this.ArmCenterUpEdgeMax, this.ArmCenterUpCurve);
      this.CurrentArmCenterUpEdgeMax = this.XPr(this.CurrentArmCenterUpEdgeMax, this.ArmCenterUpEdgeMax, t, this.ArmCenterUpSpeedMin, this.ArmCenterUpSpeedMax, this.ArmCenterUpEdgeMin, this.ArmCenterUpEdgeMax, this.ArmCenterUpCurve);
      this.$gm(t);
      this.Wgm(t);
      this.Qgm(t);
      this.TempVector2.Subtraction(this.TempVector, this.M1h);
      this.F7a.RotateVector(this.TempVector2, this.TmpArmLocation);
    }
    if (!this.IsModifiedArmLocation) {
      if (this.gPr) {
        this.wPr.Reset();
        this.DesiredCamera.ArmLocation.Subtraction(this.TmpArmLocation, this.wPr);
        if (this.wPr.GetAbsMax() < CAMERA_LOCATION_NEARLY_DISTANCE) {
          this.DesiredCamera.ArmLocation.DeepCopy(this.TmpArmLocation);
          this.gPr = false;
        } else {
          this.ArmLocationFadeElapseTime += t;
          if ((i = this.fPr - this.ArmLocationFadeElapseTime) < MathUtils_1.MathUtils.KindaSmallNumber) {
            this.gPr = false;
            this.DesiredCamera.ArmLocation.DeepCopy(this.TmpArmLocation);
          } else {
            t = this.wPr.MultiplyEqual(-t / i);
            this.DesiredCamera.ArmLocation.AdditionEqual(t);
          }
        }
      } else {
        this.DesiredCamera.ArmLocation.DeepCopy(this.TmpArmLocation);
      }
    }
  }
  $gm(t) {
    if (this.CameraZoneMode === 1) {
      this.TempVector2.X = this.S1h(this.M1h.X + this.TempVector.X, this.TempVector.X, t, this.ArmCenterForwardSpeedMin, this.ArmCenterForwardSpeedMax, this.CurrentArmCenterForwardEdgeMin, this.CurrentArmCenterForwardEdgeMax, this.ArmCenterForwardCurve);
    } else {
      this.TempVector2.X = this.$Pr(this.TempVector2.X, this.TempVector.X, t, this.ArmCenterForwardSpeedMin, this.ArmCenterForwardSpeedMax, this.CurrentArmCenterForwardEdgeMin, this.CurrentArmCenterForwardEdgeMax, this.ArmCenterForwardCurve);
    }
  }
  Wgm(t) {
    if (this.CameraZoneMode === 1) {
      this.TempVector2.Y = this.jgm(this.M1h.Y + this.TempVector.Y, this.TempVector.Y, t, this.ArmCenterRightSpeedMin, this.ArmCenterRightSpeedMax, this.ArmCenterRightReverseSpeed, this.CurrentArmCenterRightEdgeMin, this.CurrentArmCenterRightEdgeMax, this.ArmCenterRightCurve, this.ArmCenterRightReverseRotationEdge);
    } else if (this.CameraZoneMode === 3) {
      this.TempVector2.Y = this.Hgm(this.M1h.Y + this.TempVector.Y, this.TempVector.Y, t, this.ArmCenterRightSpeedMin, this.ArmCenterRightSpeedMax, this.ArmCenterRightReverseSpeed, this.CurrentArmCenterRightEdgeMin, this.CurrentArmCenterRightEdgeMax, this.ArmCenterRightCurve, this.ArmCenterRightReverseRotationEdge);
    } else {
      this.TempVector2.Y = this.$Pr(this.TempVector2.Y, this.TempVector.Y, t, this.ArmCenterRightSpeedMin, this.ArmCenterRightSpeedMax, this.CurrentArmCenterRightEdgeMin, this.CurrentArmCenterRightEdgeMax, this.ArmCenterRightCurve);
    }
  }
  Qgm(t) {
    if (this.CameraZoneMode === 1) {
      this.TempVector2.Z = this.S1h(this.M1h.Z + this.TempVector.Z, this.TempVector.Z, t, this.ArmCenterUpSpeedMin, this.ArmCenterUpSpeedMax, this.CurrentArmCenterUpEdgeMin, this.CurrentArmCenterUpEdgeMax, this.ArmCenterUpCurve);
    } else {
      this.TempVector2.Z = this.$Pr(this.TempVector2.Z, this.TempVector.Z, t, this.ArmCenterUpSpeedMin, this.ArmCenterUpSpeedMax, this.CurrentArmCenterUpEdgeMin, this.CurrentArmCenterUpEdgeMax, this.ArmCenterUpCurve);
    }
  }
  YPr() {
    this.SP_ = this.Fading ? this.SP_ : MathUtils_1.MathUtils.RangeClamp(this.TempArmLength, this.CameraOffsetFloatUpArmLengthMin, this.CameraOffsetFloatUpArmLengthMax, 0, 1);
    return MathUtils_1.MathUtils.Lerp(this.CurrentCamera.CameraOffsetFloatUpMin, this.CurrentCamera.CameraOffsetFloatUpMax, this.SP_) + MathUtils_1.MathUtils.RangeClamp(this.TempArmLength, this.FloatUpArmLengthMax, this.FloatUpArmLengthMin, 0, this.SPr);
  }
  Hl1(t) {
    if (this.Fading) {
      this.vUo += t;
      if (!!MathUtils_1.MathUtils.IsNearlyZero(this.FadeDuration) || !(this.vUo >= this.FadeDuration)) {
        t = this.MUo.GetCurrentValue(MathUtils_1.MathUtils.IsNearlyZero(this.FadeDuration) ? 1 : this.vUo / this.FadeDuration);
        if (this.EUo && !this.IsModifiedArmLength) {
          this.CurrentCamera.ArmLength = MathUtils_1.MathUtils.Lerp(this.LastCamera.ArmLength, this.DesiredCamera.ArmLength, t);
        } else {
          this.EUo = false;
          this.CurrentCamera.ArmLength = this.DesiredCamera.ArmLength;
        }
        this.CurrentCamera.MinArmLength = MathUtils_1.MathUtils.Lerp(this.LastCamera.MinArmLength, this.DesiredCamera.MinArmLength, t);
        this.CurrentCamera.MaxArmLength = MathUtils_1.MathUtils.Lerp(this.LastCamera.MaxArmLength, this.DesiredCamera.MaxArmLength, t);
      }
    }
  }
  RUo(t) {
    var i;
    var s;
    if (this.Fading) {
      if (this.vUo >= this.FadeDuration) {
        this.Fading = false;
        this.vUo = 0;
        this.IsUniqueFade = false;
        this.yP_ = this.SP_;
        this.CopyVirtualCamera(this.CurrentCamera, this.DesiredCamera);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdjustCameraSync);
      } else {
        this.CurrentCamera.ArmLocation.DeepCopy(this.DesiredCamera.ArmLocation);
        this.CurrentCamera.ZoomModifier = this.DesiredCamera.ZoomModifier;
        i = this.MUo.GetCurrentValue(this.vUo / this.FadeDuration);
        this.CurrentCamera.YawLimitMin = MathUtils_1.MathUtils.Lerp(this.LastCamera.YawLimitMin, this.DesiredCamera.YawLimitMin, i);
        this.CurrentCamera.YawLimitMax = MathUtils_1.MathUtils.Lerp(this.LastCamera.YawLimitMax, this.DesiredCamera.YawLimitMax, i);
        this.CurrentCamera.PitchLimitMin = CameraUtility_1.CameraUtility.GetValidPitchAngle(MathUtils_1.MathUtils.Lerp(this.LastCamera.PitchLimitMin, this.DesiredCamera.PitchLimitMin, i), true);
        this.CurrentCamera.PitchLimitMax = CameraUtility_1.CameraUtility.GetValidPitchAngle(MathUtils_1.MathUtils.Lerp(this.LastCamera.PitchLimitMax, this.DesiredCamera.PitchLimitMax, i), false);
        this.CurrentCamera.LookDownOffsetZ = MathUtils_1.MathUtils.Lerp(this.LastCamera.LookDownOffsetZ, this.DesiredCamera.LookDownOffsetZ, i);
        this.CurrentCamera.LookUpOffsetZ = MathUtils_1.MathUtils.Lerp(this.LastCamera.LookUpOffsetZ, this.DesiredCamera.LookUpOffsetZ, i);
        this.CurrentCamera.WorldYawMin = MathUtils_1.MathUtils.Lerp(this.LastCamera.WorldYawMin, this.DesiredCamera.WorldYawMin, i);
        this.CurrentCamera.WorldYawMax = MathUtils_1.MathUtils.Lerp(this.LastCamera.WorldYawMax, this.DesiredCamera.WorldYawMax, i);
        this.CurrentCamera.CameraOffsetFloatUpMin = MathUtils_1.MathUtils.Lerp(this.LastCamera.CameraOffsetFloatUpMin, this.DesiredCamera.CameraOffsetFloatUpMin, i);
        this.CurrentCamera.CameraOffsetFloatUpMax = MathUtils_1.MathUtils.Lerp(this.LastCamera.CameraOffsetFloatUpMax, this.DesiredCamera.CameraOffsetFloatUpMax, i);
        s = MathUtils_1.MathUtils.RangeClamp(this.TempArmLength, this.CameraOffsetFloatUpArmLengthMin, this.CameraOffsetFloatUpArmLengthMax, 0, 1);
        this.SP_ = MathUtils_1.MathUtils.Lerp(this.yP_, s, i);
        if (this.pPr) {
          Vector_1.Vector.Lerp(this.LastCamera.ArmOffset, this.DesiredCamera.ArmOffset, i, this.CurrentCamera.ArmOffset);
        } else {
          this.pPr = false;
          this.CurrentCamera.ArmOffset.DeepCopy(this.DesiredCamera.ArmOffset);
        }
        if (this.vPr) {
          Vector_1.Vector.Lerp(this.LastCamera.CameraOffset, this.DesiredCamera.CameraOffset, i, this.CurrentCamera.CameraOffset);
        } else {
          this.vPr = false;
          this.CurrentCamera.CameraOffset.DeepCopy(this.DesiredCamera.CameraOffset);
        }
        this.CurrentCamera.ArmRotation.DeepCopy(this.DesiredCamera.ArmRotation);
        this.CurrentCamera.EnableDynamicFov = this.DesiredCamera.EnableDynamicFov;
        this.CurrentCamera.DynamicFovMin = MathUtils_1.MathUtils.Lerp(this.LastCamera.DynamicFovMin, this.DesiredCamera.DynamicFovMin, i);
        this.CurrentCamera.DynamicFovMax = MathUtils_1.MathUtils.Lerp(this.LastCamera.DynamicFovMax, this.DesiredCamera.DynamicFovMax, i);
        this.CurrentCamera.DynamicFovParamMax = MathUtils_1.MathUtils.Lerp(this.LastCamera.DynamicFovParamMin, this.DesiredCamera.DynamicFovParamMax, i);
        this.CurrentCamera.DynamicFovLerpSpeed = MathUtils_1.MathUtils.Lerp(this.LastCamera.DynamicFovLerpSpeed, this.DesiredCamera.DynamicFovLerpSpeed, i);
        if (this.MPr && !this.IsModifiedFov) {
          this.CurrentCamera.Fov = MathUtils_1.MathUtils.Lerp(this.LastCamera.EnableDynamicFov ? this.LastCamera.DynamicFov : this.LastCamera.Fov, this.DesiredCamera.Fov, i);
        } else {
          this.MPr = false;
          this.CurrentCamera.Fov = this.DesiredCamera.Fov;
        }
      }
    } else {
      this.CopyVirtualCamera(this.CurrentCamera, this.DesiredCamera);
    }
  }
  VPr(i) {
    if (this.cPr) {
      var t = this.YPr() + this.CharAddZ;
      var s = this.CurrentCamera.ArmRotation;
      if (!this.CameraModifyController.IsModified && !this.CameraModifyController.IsModifyFadeOut) {
        this.ClearRollInGravity(s);
      }
      if (this.CameraGuideController.ForceUsingCameraGuideParameters) {
        this.cae.DeepCopy(this.PlayerLocation);
      } else {
        this.cae.DeepCopy(this.CurrentCamera.ArmLocation);
      }
      var h = this.cae;
      this.TempVector.DeepCopy(UE.KismetMathLibrary.Conv_VectorDoubleToVector(this.Character.CharacterActorComponent.ActorTransform.TransformVectorNoScale(this.CurrentCamera.ArmOffset.ToUeVector(true))));
      h.AdditionEqual(this.TempVector);
      h.AdditionEqual(this.CameraAutoController.CurrentAutoCameraArmOffset);
      h.AdditionEqual(this.CameraGuideController.CurrentCameraArmOffset);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Character?.CharacterActorComponent, h, t);
      s.Quaternion(this.TempQuat);
      this.TempQuat.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.CameraForward);
      this.CurrentCamera.ArmRotation.Vector(this.yPr);
      this.CameraForward.Multiply(-this.TempArmLength, this.yPr);
      h.Addition(this.yPr, this.TempDesireLocation);
      this.TempVector.DeepCopy(this.CurrentCamera.CameraOffset);
      if (this.CameraFocusController.AddCameraOffsetY !== undefined) {
        this.TempVector.Y += this.CameraFocusController.AddCameraOffsetY;
      }
      this.TempQuat.RotateVector(this.TempVector, this.yPr);
      this.TempDesireLocation.AdditionEqual(this.yPr);
      this.CameraLocation.DeepCopy(this.CameraCollision.CheckCollision(this.PlayerLocation, this.TempDesireLocation, i));
      this.SetRotationInternal(s);
      if (this.CameraLocation.ContainsNaN()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, "CameraLocation Contains NaN: " + this.CameraLocation.ToString());
        }
        if (this.dW1 > 0) {
          t = MathUtils_1.MathUtils.CheckNanObject(this);
          h = t[0];
          i = t[1];
          if (h) {
            --this.dW1;
            let t = "";
            for (const e of i) {
              t += e + "->";
            }
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Camera", 57, "CameraLocation Contains NaN Detail:", ["path", t]);
            }
          }
        }
      } else {
        this.CameraActor.D_K2_SetActorLocationAndRotation(this.CameraLocation.ToUeVector(true), s.ToUeRotator(), true, undefined, false);
      }
      this.CameraLocation.Subtraction(this.PlayerLocation, this.TempVector);
      this.TPr = this.TempVector.Size();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 22, "Character 不存在");
    }
  }
  DUo() {
    if (this.CameraGuideController.IsCameraSpecificArmLengthEnabled) {
      this.TempArmLength = this.CameraGuideController.CurrentCameraSpecificArmLength;
    } else {
      this.TempArmLength = this.GetRawArmLength();
    }
  }
  GetRawArmLength() {
    let t = 0;
    t = this.CameraModifyController.IsModified || this.CameraModifyController.IsModifyFadeOut ? this.GetArmLengthWithSettingAndZoom(this.CurrentCamera, false) : this.GetArmLengthWithSettingAndZoom(this.CurrentCamera, true);
    return t = (t = (t += this.CameraAutoController.CurrentAutoCameraArmLengthAddition) + this.CameraGuideController.CurrentCameraArmLengthAddition) + this.CharAddArmLength;
  }
  LUo(t) {
    let i = 0;
    this.CameraRotationZone.UpdatePitchZone(t);
    if (this.IsInNormalGravityMode()) {
      i = MathUtils_1.MathUtils.Clamp(this.DesiredCamera.ArmRotation.Pitch, this.CurrentCamera.PitchLimitMin, this.CurrentCamera.PitchLimitMax);
      this.DesiredCamera.ArmRotation.Pitch = i;
    } else {
      this.DesiredCamera.ArmRotation.Quaternion(this.TempQuat);
      this.TempQuat.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.TempVector);
      i = Math.asin(this.TempVector.DotProduct(this.GravityUp)) * MathUtils_1.MathUtils.RadToDeg;
      t = MathUtils_1.MathUtils.Clamp(i, this.CurrentCamera.PitchLimitMin, this.CurrentCamera.PitchLimitMax);
      if (i !== t) {
        this.TempRotator.Set(t - i, 0, 0);
        this.TempRotator.Quaternion(this.TempQuat2);
        this.TempQuat.Multiply(this.TempQuat2, this.TempQuat3);
        this.TempQuat3.Rotator(this.DesiredCamera.ArmRotation);
        i = t;
      }
    }
    let s = this.CurrentCamera.PitchLimitMax;
    let h = this.DesiredCamera.LookUpOffsetZ;
    if (i < 0) {
      i = Math.abs(i);
      s = Math.abs(this.CurrentCamera.PitchLimitMin);
      h = this.DesiredCamera.LookDownOffsetZ;
    }
    t = MathUtils_1.MathUtils.RangeClamp(i, 0, s, 0, h);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Character?.CharacterActorComponent, this.DesiredCamera.ArmLocation, t);
  }
  FPr(t) {
    let i = 0;
    this.CameraRotationZone.UpdateYawZone(t);
    var t = this.CurrentCamera.YawLimitMin;
    var s = this.CurrentCamera.YawLimitMax;
    var h = (s - t) % 360;
    if (MathUtils_1.MathUtils.IsNearlyZero(h) || MathUtils_1.MathUtils.IsNearlyEqual(h, 360)) {
      if (this.IsInNormalGravityMode()) {
        this.DesiredCamera.ArmRotation.Yaw = MathUtils_1.MathUtils.Clamp(MathUtils_1.MathUtils.WrapAngle(this.DesiredCamera.ArmRotation.Yaw), this.CurrentCamera.WorldYawMin, this.CurrentCamera.WorldYawMax);
      } else {
        h = CameraUtility_1.CameraUtility.GetYawInGravity(this.DesiredCamera.ArmRotation);
        h = MathUtils_1.MathUtils.Clamp(h, this.CurrentCamera.WorldYawMin, this.CurrentCamera.WorldYawMax);
        CameraUtility_1.CameraUtility.SetYawInGravity(this.DesiredCamera.ArmRotation, h, this.DesiredCamera.ArmRotation);
      }
    } else {
      var h = this.PlayerRotatorInGravity.Yaw;
      var e = CameraUtility_1.CameraUtility.GetYawInGravity(this.DesiredCamera.ArmRotation);
      var e = MathUtils_1.MathUtils.WrapAngle(e - h);
      if (e < t) {
        i = MathUtils_1.MathUtils.WrapAngle(h + t);
      } else {
        if (!(s < e)) {
          return;
        }
        i = MathUtils_1.MathUtils.WrapAngle(h + s);
      }
      CameraUtility_1.CameraUtility.SetYawInGravity(this.DesiredCamera.ArmRotation, MathUtils_1.MathUtils.Clamp(i, this.CurrentCamera.WorldYawMin, this.CurrentCamera.WorldYawMax), this.DesiredCamera.ArmRotation);
    }
  }
  TPn(t, i) {
    return !MathUtils_1.MathUtils.IsNearlyEqual(t, -MathUtils_1.PI_DEG) || !MathUtils_1.MathUtils.IsNearlyEqual(i, MathUtils_1.PI_DEG);
  }
  qPr() {
    var t;
    var i;
    var s;
    if (this.cPr) {
      this.IsSpecificLockTarget = false;
      if (i = ModelManager_1.ModelManager.CameraModel?.GetCameraSpecificLockTarget()) {
        t = i.Type;
        this.IsSpecificLockTarget = true;
        if ((this.SpecificLockTargetType = t) === 0) {
          this.TargetEntity = ModelManager_1.ModelManager.CharacterModel.GetHandle(i.EntityId);
          this.bPr(this.TargetLocation);
        } else {
          this.TargetLocation.DeepCopy(i.Location);
        }
      } else if ((t = this.CharacterEntityHandle?.Entity?.GetComponent(33))?.Valid) {
        if (this.mPr?.HasTag(428837378)) {
          if (this.TargetEntity) {
            this.CameraInputController.SetAimAssistTarget(this.TargetEntity, this.TargetSocketName);
            this.TargetEntity = undefined;
            this.TargetSocketName = undefined;
            this.dPr = undefined;
            t.ExitLockDirection();
          }
        } else {
          i = t?.GetTargetInfo();
          s = this.mPr?.HasAnyTag([-1150819426, 1260125908]);
          if (i?.ShowTarget?.Valid && (s || i.LastSetTime + SHOW_TARGET_VALID_TIME > Time_1.Time.WorldTime)) {
            this.TargetEntity = i?.ShowTarget;
            this.TargetSocketName = FNameUtil_1.FNameUtil.GetDynamicFName(i.SocketName);
            this.dPr = this.TargetEntity.Entity.GetComponent(215);
          }
          if (i?.ShowTarget?.Valid) {
            if (this.TargetEntity && this.zPr(t, s)) {
              this.TargetEntity = undefined;
              this.TargetSocketName = undefined;
              this.dPr = undefined;
              t.SetShowTarget(undefined);
            }
          } else {
            this.TargetEntity = undefined;
            this.TargetSocketName = undefined;
            this.dPr = undefined;
          }
        }
      }
    }
  }
  zPr(t, i) {
    if (!this.TargetEntity.Valid || !this.TargetEntity.Entity.Active) {
      return true;
    }
    var s = this.TargetEntity.Entity.GetComponent(1);
    var h = this.CharacterEntityHandle.Entity.GetComponent(3);
    if (!s?.Valid || !h?.Valid) {
      return true;
    }
    if (i) {
      this.bPr(this.TargetLocation);
    } else {
      i = this.mPr;
      if (i?.Valid) {
        if (i.HasTag(504239013)) {
          return true;
        }
        if (!this.dPr?.HasAnyTag(BaseLockOnComponent_1.lockOnEnhancedTags) && t.SpeedUpCleanTarget()) {
          return true;
        }
      }
      i = this.CharacterEntityHandle.Entity.GetComponent(65);
      if (i?.Valid && this.CameraFocusController.ShouldSoftUnlock()) {
        return true;
      }
      this.bPr(this.TargetLocation);
      if (this.IsTargetLocationValid && t.TraceDetectBlock(h.ActorLocationProxy, this.TargetLocation, s.Owner)) {
        if (this.CPr) {
          if (this.CPr < Time_1.Time.Now) {
            return true;
          }
        } else {
          this.CPr = Time_1.Time.Now + MAX_TARGET_HAS_BLOCK_TIME;
        }
      } else {
        this.CPr = undefined;
      }
    }
    return false;
  }
  H7a() {
    let t = undefined;
    var i;
    t = this.IsInNormalGravityMode() ? Vector_1.Vector.UpVectorProxy : this.GravityUp;
    if (!this.k7a.Equals(t) || !this.N7a.Equals(this.CameraForward)) {
      this.k7a.DeepCopy(t);
      this.N7a.DeepCopy(this.CameraForward);
      this.TempVector.DeepCopy(this.CameraForward);
      if ((i = this.TempVector.DotProduct(t)) > 1 - MathUtils_1.MathUtils.KindaSmallNumber) {
        this.CameraRotation.Quaternion(this.TempQuat);
        this.TempQuat.RotateVector(Vector_1.Vector.DownVectorProxy, this.TempVector);
      } else if (-i > 1 - MathUtils_1.MathUtils.KindaSmallNumber) {
        this.CameraRotation.Quaternion(this.TempQuat);
        this.TempQuat.RotateVector(Vector_1.Vector.UpVectorProxy, this.TempVector);
      }
      MathUtils_1.MathUtils.LookRotationUpFirst(this.TempVector, t, this.F7a);
      this.F7a.Inverse(this.V7a);
    }
  }
  SetInputEnable(t, i) {
    this.CameraInputController.SetInputEnable(t, i);
  }
  Bdc() {
    if (!this.Wnm()) {
      this.PlayerRotator.FromUeRotator(this.Character.CharacterActorComponent.ActorRotationProxy);
    }
    CameraUtility_1.CameraUtility.GetRotatorInGravity(this.PlayerRotator, this.PlayerRotatorInGravity);
  }
  RefreshPlayerLocation(t) {
    if (!this.Qnm(t)) {
      this.GetPlayerLocation(this.PlayerLocation);
      if (this.ContainsTag(-648310348) && (t = this.CharacterEntityHandle?.Entity.GetComponent(0)) && (t = ModelManager_1.ModelManager.CreatureModel.GetEntityId(t.GetSummonerId()), t = EntitySystem_1.EntitySystem.GetComponent(t, 1))) {
        this.CameraCollision.TraceCheckPlayerLocation(t.ActorLocationProxy, this.PlayerLocation, this.PlayerLocation);
      }
    }
  }
  kdc() {
    CameraUtility_1.CameraUtility.GetVectorInGravity(this.PlayerLocation, this.PlayerLocationInGravity);
  }
  zUf(t) {
    this.CameraTransformBuffer.BufferPlayerLocation(t, this.PlayerLocation);
  }
  nvm() {
    this.GetCameraTargetVelocity(this.PlayerVelocity);
  }
  ZQi(t) {
    var i;
    var s;
    this.vTn = this.CameraActor.CameraComponent.FieldOfView;
    if (this.CurrentCamera.EnableDynamicFov && this.xzf()) {
      s = MathUtils_1.MathUtils.Clamp(MathUtils_1.MathUtils.GetRangePct(this.CurrentCamera.DynamicFovParamMin, this.CurrentCamera.DynamicFovParamMax, this.PlayerVelocity.Size()), 0, 1);
      i = 1 - Math.exp(-t / this.aeg);
      this.seg = MathUtils_1.MathUtils.Lerp(this.seg, s, i);
      if (this.PlayerMoveVector.X <= 0 || Math.abs(this.seg - s) < 0.01) {
        this.seg = s;
      }
      i = this.DynamicFovCurve.GetCurrentValue(this.seg);
      s = MathUtils_1.MathUtils.Lerp(this.CurrentCamera.DynamicFovMin, this.CurrentCamera.DynamicFovMax, i);
      this.TargetDynamicFov = Math.abs(this.TargetDynamicFov - s) > 0.5 ? s : this.TargetDynamicFov;
      if (!MathUtils_1.MathUtils.IsNearlyEqual(this.vTn, this.TargetDynamicFov, MathCommon_1.MathCommon.KindaSmallNumber)) {
        if (this.TargetDynamicFov > this.vTn) {
          this.CurrentCamera.DynamicFov = Math.min(this.TargetDynamicFov, this.vTn + this.CurrentCamera.DynamicFovLerpSpeed * t);
        } else {
          this.CurrentCamera.DynamicFov = Math.max(this.TargetDynamicFov, this.vTn - this.CurrentCamera.DynamicFovLerpSpeed * t);
        }
        this.CurrentCamera.Fov = this.CurrentCamera.DynamicFov;
        this.CameraActor.CameraComponent.FieldOfView = this.CurrentCamera.Fov;
      }
    } else if (!MathUtils_1.MathUtils.IsNearlyEqual(this.vTn, this.CurrentCamera.Fov, MathCommon_1.MathCommon.KindaSmallNumber)) {
      this.CameraActor.CameraComponent.FieldOfView = this.CurrentCamera.Fov;
    }
    this.DesiredCamera.DynamicFov = this.CurrentCamera.DynamicFov;
    this.DesiredCamera.EnableDynamicFov = this.CurrentCamera.EnableDynamicFov;
  }
  xzf() {
    return !this.CameraGuideController.ForceUsingCameraGuideParameters;
  }
  GetPlayerLocation(t) {
    if (FNameUtil_1.FNameUtil.IsEmpty(this.CameraArmLocationSocketName)) {
      this.CharacterEntityHandle?.Entity.GetComponent(186).GetCameraPosition(t);
      if (this.Character?.Mesh) {
        this.TempVector.FromUeVector(this.Character.Mesh.D_GetSocketLocation(CharacterNameDefines_1.CharacterNameDefines.ROOT));
        t.AdditionEqual(this.TempVector);
        this.TempVector.FromUeVector(this.Character.Mesh.D_K2_GetComponentLocation());
        t.SubtractionEqual(this.TempVector);
      }
    } else {
      CameraUtility_1.CameraUtility.GetSocketLocation(undefined, this.CameraArmLocationSocketName, t, this.CharacterEntityHandle);
    }
  }
  GetCameraTargetRotator(t) {
    if (this.CharacterDriveVehicleComponent?.IsOnVehicle && this.VehicleActorComponent?.Valid) {
      t.DeepCopy(this.VehicleActorComponent.ActorRotationProxy);
    } else {
      t.DeepCopy(this.PlayerRotator);
    }
  }
  GetCameraTargetInput(t) {
    if (this.EnableFocusOnVehicle && this.VehicleActorComponent?.Valid) {
      t.DeepCopy(this.VehicleActorComponent.InputDirectProxy);
    } else {
      t.DeepCopy(this.Character.CharacterActorComponent.InputDirectProxy);
    }
  }
  GetCameraTargetMoveVector(t) {
    (this.EnableFocusOnVehicle && this.VehicleInputComponent?.Valid ? this.VehicleInputComponent : this.CharacterInputComponent).GetMoveVector(t);
  }
  GetCameraTargetVelocity(t) {
    if (this.EnableFocusOnVehicle && this.VehicleActorComponent?.Valid) {
      t.DeepCopy(this.VehicleActorComponent.ActorVelocityProxy);
    } else {
      t.DeepCopy(this.Character.CharacterActorComponent.ActorVelocityProxy);
    }
  }
  CheckPositionInScreen(t, i, s, h, e) {
    var a = Global_1.Global.CharacterController;
    return !!UE.GameplayStatics.D_ProjectWorldToScreen(a, t.ToUeVector(), this.fii, false) && (a = (0, puerts_1.$unref)(this.fii), this.GetScreenPositionIsInRange(a, i, s, h, e));
  }
  GetScreenPositionIsInRange(t, i, s, h, e) {
    Global_1.Global.CharacterController.GetViewportSize(this.UPr, this.APr);
    var a = (0, puerts_1.$unref)(this.UPr);
    var r = (0, puerts_1.$unref)(this.APr);
    return t.X > a * i && t.X < a * s && t.Y > r * h && t.Y < r * e;
  }
  AdjustPitch(t) {
    var i = this.Character.CharacterActorComponent;
    this.TempVector.DeepCopy(t);
    var t = GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(i, this.TempVector);
    var s = this.TempVector.Size() + this.DefaultPitchHorizontalOffset;
    var t = t + this.DefaultPitchVerticalOffset;
    let h = Math.atan2(t, s) * MathUtils_1.MathUtils.RadToDeg;
    h = h < this.DefaultPitchInRangeCenter ? MathUtils_1.MathUtils.RangeClamp(h, this.DefaultPitchInRangeMin, this.DefaultPitchInRangeCenter, this.DefaultPitchOutRangeMin, this.DefaultPitchOutRangeCenter) : MathUtils_1.MathUtils.RangeClamp(h, this.DefaultPitchInRangeCenter, this.DefaultPitchInRangeMax, this.DefaultPitchOutRangeCenter, this.DefaultPitchOutRangeMax);
    if (this.TargetEntity?.Valid && (t = this.TargetEntity.Entity.GetComponent(3)) && (s = i.FloorLocation, t.FloorLocation.Subtraction(s, this.TempVector), (t = GravityUtils_1.GravityUtils.GetZnInGravityForActor(i, this.TempVector)) < 0)) {
      h += MathUtils_1.MathUtils.Lerp(this.AdditionPitchMax, this.AdditionPitchMin, this.AdditionPitchCurve.GetCurrentValue(Math.abs(t) / this.AdditionPitchDeltaHeight));
    }
    return h;
  }
  ContainsTag(t) {
    return !!this.cPr && !!this.mPr.HasTag(t);
  }
  ContainsAnyTag(t) {
    return !!this.cPr && !!this.mPr.HasAnyTag(t);
  }
  GetUsingGoBattle() {
    return !!this.cPr && this.CharacterEntityHandle.Entity.GetComponent(99).GoBattleSkill;
  }
  TargetContainsTag(t) {
    return this.dPr?.HasTag(t) ?? false;
  }
  AccompanyContainsTag(t) {
    return this.FollowShooterTagComponentInternal?.HasTag(t) ?? false;
  }
  SetRotationInternal(t) {
    this.CameraRotation.DeepCopy(t);
    if (this.IsInNormalGravityMode()) {
      this.CameraRotationInGravity.DeepCopy(this.CameraRotation);
    } else {
      GravityUtils_1.GravityUtils.GetRotatorInGravity(this.CameraRotation, this.GravityInverseQuat, this.CameraRotationInGravity);
    }
    if (this.cPr) {
      this.CharacterController?.SetControlRotation(this.CameraRotation.ToUeRotator());
    }
  }
  SetIsDitherEffectEnable(t) {
    this.IPr = t;
  }
  HPr() {
    if (this.cPr && this.Character.CharacterActorComponent?.Active && ModelManager_1.ModelManager.CameraModel.CameraMode !== 1 && !this.mPr?.HasTag(-2100129479) && this.IPr) {
      var s = this.CharacterEntityHandle?.Entity?.CheckGetComponent(0)?.GetCreatureDataId();
      if (!s || !ModelManager_1.ModelManager.CameraModel.DitherEntityGroups.Has(s)) {
        this.GetPlayerLocation(this.PlayerLocationForDither);
        s = Vector_1.Vector.DistSquared(this.PlayerLocationForDither, this.CameraLocation);
        let t = 1;
        if (s < this.yPn) {
          t = MathUtils_1.MathUtils.RangeClamp(Math.sqrt(s), this.StartHideDistance, this.CompleteHideDistance, this.StartDitherValue, 0.01);
        }
        s = this.GetCameraPitchInGravity();
        let i = 1;
        if (s > this.StartHidePitch) {
          i = MathUtils_1.MathUtils.RangeClamp(s, this.StartHidePitch, this.CompleteHidePitch, this.StartDitherValue, 0.01);
        }
        s = Math.min(t, i);
        this.Character.SetDitherEffect(s, 1);
      }
    }
  }
  jPr() {
    var t;
    if (this.LPr && (t = this.CameraActor?.CameraComponent?.PostProcessSettings)) {
      t.DepthOfFieldFocalDistance = Vector_1.Vector.Dist(this.PlayerLocation, this.CameraLocation);
    }
  }
  MTn() {
    var t;
    if ((!(this.vTn < LANDSCAPE_LOD_SCALE_FOV) || !(this.CurrentCamera.Fov < LANDSCAPE_LOD_SCALE_FOV)) && (!(this.vTn >= LANDSCAPE_LOD_SCALE_FOV) || !(this.CurrentCamera.Fov >= LANDSCAPE_LOD_SCALE_FOV))) {
      t = this.CurrentCamera.Fov >= LANDSCAPE_LOD_SCALE_FOV ? 0 : this.pTn;
      UE.LandscapeProxy.SetKuroLandscapeFOVFactorByCamera(t);
    }
  }
  SetCameraGravityMode(t, i = Vector_1.Vector.DownVectorProxy) {
    if (i.IsNormalized()) {
      if (this.GravityMode !== t && (this.GravityMode = t, this.GravityMode === 0 ? (this.GravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy), this.GravityDirect.UnaryNegation(this.GravityUp)) : this.GravityMode === 1 ? (this.GravityDirect.DeepCopy(i), this.GravityDirect.UnaryNegation(this.GravityUp)) : this.GravityMode === 2 && (this.GravityDirect.DeepCopy(GravityUtils_1.GravityUtils.GetGravityDirectForActor(this.Character?.CharacterActorComponent)), this.GravityUp.DeepCopy(GravityUtils_1.GravityUtils.GetGravityUpForActor(this.Character?.CharacterActorComponent))), Quat_1.Quat.FindBetween(Vector_1.Vector.UpVectorProxy, this.GravityUp, this.GravityQuat), this.GravityQuat.Inverse(this.GravityInverseQuat), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Camera", 57, "SetCameraGravityMode", ["this.CameraGravityMode", this.GravityMode], ["this.CameraGravityDirect", this.GravityDirect], ["this.CameraGravityUp", this.GravityUp], ["this.GravityQuaternion", this.GravityQuat]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Camera", 57, "设置相机重力方向失败，因为不是归一化的向量", ["gravityDirect", i]);
    }
  }
  IsInNormalGravityMode() {
    return this.GravityMode === 0 || MathUtils_1.MathUtils.IsNearlyEqual(this.GravityDirect.Z, -1, MathCommon_1.MathCommon.KindaSmallNumber);
  }
  Ddc() {
    if (this.GravityMode === 2 && (this.GravityDirect.DeepCopy(GravityUtils_1.GravityUtils.GetGravityDirectForActor(this.Character?.CharacterActorComponent)), this.GravityUp.DeepCopy(GravityUtils_1.GravityUtils.GetGravityUpForActor(this.Character?.CharacterActorComponent)), Quat_1.Quat.FindBetween(Vector_1.Vector.UpVectorProxy, this.GravityUp, this.GravityQuat), this.GravityQuat.Inverse(this.GravityInverseQuat), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Camera", 57, "CharGravityDirectChanged", ["this.CameraGravityMode", this.GravityMode], ["this.CameraGravityDirect", this.GravityDirect], ["this.CameraGravityUp", this.GravityUp], ["this.GravityQuaternion", this.GravityQuat], ["this.GravityInverseQuat", this.GravityInverseQuat]);
    }
  }
  ResetFightCameraLogic(t = true, i = false) {
    if (i) {
      this.V7a.RotateVector(this.PlayerLocation, this.TempVector2);
      this.V7a.RotateVector(this.TmpArmLocation, this.TempVector3);
      this.TempVector3.SubtractionEqual(this.TempVector2);
      this.GetPlayerLocation(this.PlayerLocation);
      this.H7a();
      this.V7a.RotateVector(this.PlayerLocation, this.TempVector2);
      this.TempVector3.AdditionEqual(this.TempVector2);
      this.F7a.RotateVector(this.TempVector3, this.TmpArmLocation);
      this.CurrentCamera.ArmLocation.DeepCopy(this.TmpArmLocation);
      this.CameraCollision.SetCameraBlendPauseType(1);
    } else {
      this.GetPlayerLocation(this.PlayerLocation);
      this.CurrentCamera.ArmLocation.DeepCopy(this.PlayerLocation);
      this.TmpArmLocation.DeepCopy(this.PlayerLocation);
      this.CameraInputController.ResetCameraInput();
      this.CameraCollision.ResetBlendData();
    }
    if (this.CameraConfigController.CheckIfInAdjustCamera() && t) {
      this.RestoreCameraFromAdjust();
    }
    this.ResetBufferLocation();
  }
  PlaySettlementCamera(t = "Battle") {
    this.SettlementCamera.PlaySettlementCamera(t);
  }
  PlayCameraRotator(t, i, s, h) {
    this.CameraRotatorController.PlayCameraRotator(t, i, s, h);
  }
  PlayCameraRotatorWithCurve(t, i, s, h, e = undefined, a = true, r = 0, o) {
    this.CameraRotatorController.PlayCameraRotatorWithCurve(t, i, s, h, this.CameraRotateToTargetMinAlpha, this.CameraRotateToTargetMaxAlpha, e || this.CameraRotateToTargetCurve, a, r, o);
  }
  PlayCameraRotatorWithCurveSustaining(t, i, s, h, e) {
    this.CameraRotatorController.BeginCameraSustainingRotator(t, i, s, this.CameraRotateToTargetMinAlpha, this.CameraRotateToTargetMaxAlpha, h, e);
  }
  PlayCameraEulerRotator(t, i) {
    this.CameraRotatorController.PlayCameraEulerRotator(t, i);
  }
  PlayCameraEulerRotatorWithCurve(t, i, s = undefined, h = true, e = 0) {
    this.CameraRotatorController.PlayCameraEulerRotatorWithCurve(t, i, this.CameraRotateToTargetMinAlpha, this.CameraRotateToTargetMaxAlpha, s || this.CameraRotateToTargetCurve, h, e);
  }
  ResetFocus() {
    var t = this.Character.CharacterActorComponent;
    t.ActorForwardProxy.Multiply(LOOK_AT_FORWARD_DISTANCE, this.DPr);
    this.DPr.AdditionEqual(t.ActorLocationProxy);
    this.PlayCameraRotatorWithCurve(t.ActorLocationProxy, this.DPr, this.RPr, RESET_FOCUS_ROTATION_TIME);
  }
  ResetCameraInput() {
    this.CameraInputController.ResetCameraInput();
  }
  EnterSpecialGameplayCamera(t) {
    this.CameraSpecialGameplayController.EnterSpecialGameplayController(t);
    return this.CameraSpecialGameplayController.CameraActor;
  }
  ExitSpecialGameplayCamera() {
    this.CameraSpecialGameplayController.ExitSpecialGameplayController();
  }
  RestoreCameraFromAdjust(t, i = undefined) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 45, "Adjust相机恢复");
    }
    if (ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.IsCameraAberrationEnable()) {
      ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.EnableOrthographicToPerspectiveView(() => {
        this.xJd(t, i);
      });
    } else {
      this.xJd(t, i);
    }
  }
  GetCameraPitchInGravity() {
    if (this.IsInNormalGravityMode()) {
      return MathUtils_1.MathUtils.WrapAngle(this.CameraRotation.Pitch);
    } else {
      return Math.asin(this.CameraForward.DotProduct(this.GravityUp)) * MathUtils_1.MathUtils.RadToDeg;
    }
  }
  ClearRollInGravity(t) {
    if (this.IsInNormalGravityMode()) {
      t.Roll = 0;
    } else {
      t.Quaternion(this.TempQuat);
      this.TempQuat.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.TempVector);
      MathUtils_1.MathUtils.LookRotationForwardFirst(this.TempVector, this.GravityUp, this.TempQuat);
      this.TempQuat.Rotator(t);
    }
  }
  SetCameraCollisionEnable(t) {
    this.CameraCollision?.SetCameraCollisionEnable(t);
  }
  yeu() {
    var t;
    var i;
    if (!this.feu || (t = this.CameraLocation, i = this.PlayerLocation, (t = Vector_1.Vector.DistSquared(t, i) * MathUtils_1.MathUtils.KindaSmallNumber) <= VALID_DISGNOSTIC_DISTANCE_SQR) || (i = Math.floor(Math.log10(t)), this.geu.has(i) && this.geu.get(i) >= MAX_DIAGNOSTIC_OUTPUT_TIME)) {
      this.Ceu = false;
    } else {
      this.peu = i;
      this.veu = t;
      this.Ceu = true;
    }
  }
  Seu() {
    var t;
    var i;
    var s;
    var h;
    var e;
    var a;
    if (this.Ceu && (t = this.CameraLocation, i = this.PlayerLocation, s = this.Character?.CharacterActorComponent?.ActorLocationProxy, h = ModelManager_1.ModelManager.GameModeModel.LoadingPhase, e = GlobalData_1.GlobalData.World?.GetName(), a = this.peu, this.geu.has(a) ? this.geu.set(a, this.geu.get(a) + 1) : this.geu.set(a, 1), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Camera", 57, "[DiagnosticCameraDistanceBeforeTick]", ["exp", a], ["count", this.geu.get(a)], ["isValidDistance", false], ["distanceSquared(m)", this.veu.toFixed(2)], ["realPlayerLocation", s?.ToString() ?? ""], ["playerLocation", i.ToString()], ["cameraLocation", t.ToString()], ["gravityDirect", this.GravityDirect.ToString()], ["loadingPhase", h], ["worldName", e], ["cameraMode", ModelManager_1.ModelManager.CameraModel.CameraMode], ["maxArmLength", this.MaxArmLength], ["modify", this.CameraModifyController.ModifyMontage?.GetName()]);
    }
  }
  Meu() {
    var t;
    var i;
    var s;
    var h;
    var e;
    var a;
    var r;
    if (this.Ceu && (t = this.CameraLocation, i = this.PlayerLocation, s = this.Character?.CharacterActorComponent?.ActorLocationProxy, h = ModelManager_1.ModelManager.GameModeModel.LoadingPhase, e = GlobalData_1.GlobalData.World?.GetName(), a = this.peu, r = Vector_1.Vector.DistSquared(t, i) * MathUtils_1.MathUtils.KindaSmallNumber, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Camera", 57, "[DiagnosticCameraDistanceAfterTick]", ["exp", a], ["count", this.geu.get(a)], ["isValidDistance ", r <= VALID_DISGNOSTIC_DISTANCE_SQR], ["distanceSquared(m)", this.veu.toFixed(2)], ["realPlayerLocation", s?.ToString() ?? ""], ["playerLocation", i.ToString()], ["cameraLocation", t.ToString()], ["gravityDirect", this.GravityDirect.ToString()], ["loadingPhase", h], ["worldName", e], ["cameraMode", ModelManager_1.ModelManager.CameraModel.CameraMode], ["maxArmLength", this.MaxArmLength], ["modify", this.CameraModifyController.ModifyMontage?.GetName()]);
    }
  }
  Wnm() {
    if (!this.VehicleEntityHandle) {
      return false;
    }
    if (!this.EnableFocusOnVehicle) {
      if (!this.CharacterDriveVehicleComponent?.Valid || !this.CharacterDriveVehicleComponent?.IsOnVehicle || !this.VehicleActorComponent?.Valid || !this.GongduolaPerformComponent?.Valid) {
        return false;
      }
      if (!this.ContainsTag(vehicleWaterFall) || !this.GongduolaPerformComponent.IsWaterfallDynamicGravity) {
        return false;
      }
    }
    this.PlayerRotator.DeepCopy(this.VehicleActorComponent.ActorRotationProxy);
    return true;
  }
  Qnm(t) {
    if (!this.VehicleEntityHandle) {
      return false;
    }
    if (this.AttachToVehicle) {
      this.VehicleAnimationComponent.GetCameraPosition(this.PlayerLocation, this.CameraArmLocationSocketName);
    } else {
      if (!this.CharacterDriveVehicleComponent?.Valid || !this.CharacterDriveVehicleComponent?.IsOnVehicle || !this.VehicleActorComponent?.Valid || !this.GongduolaPerformComponent?.Valid) {
        return false;
      }
      if (!this.W6_) {
        if (this.ContainsTag(vehicleWaterFall) && this.GongduolaPerformComponent.IsWaterfallDynamicGravity) {
          const h = this.TempVector4;
          this.VehicleActorComponent.ActorQuatProxy.RotateVector(this.PlayerVehicleDeltaLocation, h);
          this.VehicleAnimationComponent.GetCameraPosition(this.PlayerLocation);
          this.PlayerLocation.AdditionEqual(h);
          return true;
        }
        return false;
      }
      const h = this.TempVector4;
      this.VehicleActorComponent.ActorQuatProxy.RotateVector(this.PlayerVehicleDeltaLocation, h);
      var i = this.TempVector2;
      var s = this.TempVector3;
      if (this.ContainsTag(vehicleWaterFall) && this.GongduolaPerformComponent.IsWaterfallDynamicGravity) {
        this.GetPlayerLocation(i);
        this.VehicleAnimationComponent.GetCameraPosition(s);
        s.AdditionEqual(h);
      } else {
        this.VehicleAnimationComponent.GetCameraPosition(i);
        i.AdditionEqual(h);
        this.GetPlayerLocation(s);
      }
      this.$6_ += t;
      var t = MathUtils_1.MathUtils.Clamp(this.$6_ / this.H6_, 0, 1);
      this.W6_ = t < 1;
      Vector_1.Vector.Lerp(i, s, t, this.PlayerLocation);
    }
    return true;
  }
  $Zh() {
    var t;
    var i;
    if (this.CharacterEntityHandle?.Entity?.GetComponent(184)?.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Soar || this.CharacterEntityHandle?.Entity?.GetComponent(203)?.HasTag(-53663352) || (this.QZh ||= ResourceSystem_1.ResourceSystem.GetLoadedAsset(CharacterGlideComponent_1.SOAR_CAMERA_SHAKE_CURVE_PATH, UE.CurveFloat), t = this.Character?.CharacterActorComponent?.ActorVelocityProxy.Size() ?? 0, (t = this.QZh.GetFloatValue(t)) <= 0)) {
      if (this.KZh) {
        Global_1.Global.CharacterCameraManager.StopCameraShake(this.KZh);
        this.KZh = undefined;
      }
    } else if (this.KZh) {
      this.KZh.ShakeScale = t;
    } else {
      i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(CharacterGlideComponent_1.SOAR_CAMERA_SHAKE_PATH, UE.Class);
      this.KZh = Global_1.Global.CharacterCameraManager.StartCameraShake(i, t);
    }
  }
  eJc() {
    var t;
    if (this.KZh || !this.ContainsTag(-2125810220)) {
      if (this.pYi) {
        Global_1.Global.CharacterCameraManager.StopCameraShake(this.pYi);
        this.pYi = undefined;
      }
    } else {
      if (!this.zzc) {
        this.zzc = true;
        ResourceSystem_1.ResourceSystem.LoadAsync(exports.WALKING_CAMERA_SHAKE_CURVE_PATH, UE.CurveFloat, t => {
          this.Jzc = t;
        });
        ResourceSystem_1.ResourceSystem.LoadAsync(exports.WALKING_CAMERA_SHAKE_PATH, UE.Class, t => {
          this.Zzc = t;
        });
      }
      if (this.Jzc && this.Zzc) {
        t = this.Character?.CharacterActorComponent?.ActorVelocityProxy.Size() ?? 0;
        t = this.Jzc.GetFloatValue(t);
        if (this.pYi) {
          this.pYi.ShakeScale = t;
        } else {
          this.pYi = Global_1.Global.CharacterCameraManager.StartCameraShake(this.Zzc, t);
        }
      }
    }
  }
  hZc() {
    ModelManager_1.ModelManager.CameraModel.SetHideHeadEnabled(this.mPr?.HasTag(hideHeadTag) ?? false, 1);
  }
  ResetBufferLocation() {
    this.CameraTransformBuffer?.StopBufferPlayerLocation();
    this.LastFrameAttachToVehicle = this.AttachToVehicle;
  }
  OnClear() {
    this.zQu = 1;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAfterAttachVehicle, this.sa1);
    if (this.CharacterEntityHandle?.Valid) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.CharacterEntityHandle.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.hUe);
    }
    if (this.mPr?.Valid) {
      this.mPr.RemoveTagAddOrRemoveListener(vehicleWaterFall, this.UWi);
    }
    return true;
  }
};
FightCameraLogicComponent.Rza = Stats_1.Stat.Create("UpdatePlayerStat");
FightCameraLogicComponent.Uza = Stats_1.Stat.Create("UpdateControllerStat");
FightCameraLogicComponent.xza = Stats_1.Stat.Create("ClampArmLengthStat");
FightCameraLogicComponent.Pza = Stats_1.Stat.Create("UpdateArmLocationStat");
FightCameraLogicComponent.MP_ = Stats_1.Stat.Create("UpdateArmLengthStat");
FightCameraLogicComponent.wza = Stats_1.Stat.Create("UpdatePitchStat");
FightCameraLogicComponent.Bza = Stats_1.Stat.Create("UpdateYawStat");
FightCameraLogicComponent.bza = Stats_1.Stat.Create("UpdateFadingStat");
FightCameraLogicComponent.qza = Stats_1.Stat.Create("UpdateActorTransStat");
FightCameraLogicComponent.Oza = Stats_1.Stat.Create("CameraPostStat");
FightCameraLogicComponent.Gza = new Map();
FightCameraLogicComponent = FightCameraLogicComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(5)], FightCameraLogicComponent);
exports.FightCameraLogicComponent = FightCameraLogicComponent; //# sourceMappingURL=FightCameraLogicComponent.js.map