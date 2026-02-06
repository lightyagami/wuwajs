"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraModel = exports.CameraSpecificLocLocation = exports.CameraSpecificLockEntity = exports.CameraSpecificLockTarget = exports.SeqCameraThings = exports.cameraModeFree = exports.cameraModeOrbital = exports.cameraModeScene = exports.cameraModeSequence = exports.cameraModeWidget = exports.cameraModeLockOn = exports.cameraModeDefault = exports.EHideHeadDisabledEnum = exports.CAMER_DEFAULT_NEAR_CLIP = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Time_1 = require("../../Core/Common/Time");
const DisjointSet_1 = require("../../Core/Container/DisjointSet");
const PriorityQueue_1 = require("../../Core/Container/PriorityQueue");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../Core/Framework/ModelBase");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../GameSettings/GameSettingsManager");
const Global_1 = require("../Global");
const ModelManager_1 = require("../Manager/ModelManager");
const CameraMovieModeController_1 = require("./CameraSubModeController/CameraMovieModeController");
const CameraUtility_1 = require("./CameraUtility");
const FightCamera_1 = require("./FightCamera");
const FreeCamera_1 = require("./FreeCamera");
const OrbitalCamera_1 = require("./OrbitalCamera");
const SceneCamera_1 = require("./SceneCamera");
const SequenceCamera_1 = require("./SequenceCamera");
const WidgetCamera_1 = require("./WidgetCamera");
const CAMERA_TICK_PRIORITY = -100;
const CAMERA_DEFAULT_SENSITIVITY = 50;
const CAMERA_MAX_SENSITIVITY = 100;
const CAMERA_MIN_SENSITIVITY = 0;
const CAMERA_DEFAULT_SENSITIVITY_MODIFIER = 1;
const CAMERA_MAX_SENSITIVITY_MODIFIER = 2;
const CAMERA_MIN_SENSITIVITY_MODIFIER = 0.1;
const MOTION_BLUR_DEFAULT_VALUE = 50;
const MOTION_BLUR_MAX_VALUE = 100;
const MOTION_BLUR_MIN_VALUE = 0;
const MOTION_BLUR_DEFAULT_MODIFIER = 0.25;
const MOTION_BLUR_MAX_MODIFIER = 0.4;
const MOTION_BLUR_MIN_MODIFIER = 0.1;
const CAMERA_DEFAULT_REVERSE = false;
const CAMERA_ADDITION_ARM_LENGTH_VALUE_MAX = 100;
const CAMERA_ADDITION_ARM_LENGTH_VALUE_DEFAULT = 50;
const CAMERA_ADDITION_ARM_LENGTH_VALUE_MIN = 0;
const CAMERA_SHAKE_MODIFIER_MIN = 0;
const CAMERA_SHAKE_MODIFIER_MAX = 2;
var EHideHeadDisabledEnum;
exports.CAMER_DEFAULT_NEAR_CLIP = 10;
(EHideHeadDisabledEnum = exports.EHideHeadDisabledEnum ||= {}).UI = "UI";
exports.cameraModeDefault = new UE.FName("KuroDefault");
exports.cameraModeLockOn = new UE.FName("KuroLockOn");
exports.cameraModeWidget = new UE.FName("KuroWidget");
exports.cameraModeSequence = new UE.FName("KuroSequence");
exports.cameraModeScene = new UE.FName("KuroScene");
exports.cameraModeOrbital = new UE.FName("KuroOrbital");
exports.cameraModeFree = new UE.FName("KuroFree");
class SeqCameraThings {
  constructor() {
    this.CameraLocation = Vector_1.Vector.Create().ToUeVector();
    this.CameraRotation = Rotator_1.Rotator.Create().ToUeRotator();
    this.CameraScale = Vector_1.Vector.Create().ToUeVector();
    this.OriginRootTransform = undefined;
    this.ConstrainAspectRatio = false;
    this.CurrentAperture = 0;
    this.CurrentFocalLength = 0;
    this.FocusSettings = undefined;
    this.LensSettings = undefined;
    this.FieldOfView = 0;
  }
}
exports.SeqCameraThings = SeqCameraThings;
class CameraSpecificLockTarget {
  constructor(t, e, i) {
    this.Type = t;
    this.Id = e;
    this.Priority = i;
    this.MarkDelete = false;
  }
  IsValid() {
    return true;
  }
}
class CameraSpecificLockEntity extends (exports.CameraSpecificLockTarget = CameraSpecificLockTarget) {
  constructor(t, e, i) {
    super(0, i, e);
    this.EntityId = t;
    this.Priority = e;
    this.Id = i;
  }
  IsValid() {
    return ModelManager_1.ModelManager.CharacterModel.GetHandle(this.EntityId)?.Valid ?? false;
  }
}
exports.CameraSpecificLockEntity = CameraSpecificLockEntity;
class CameraSpecificLocLocation extends CameraSpecificLockTarget {
  constructor(t, e, i) {
    super(1, i, e);
    this.Location = t;
    this.Priority = e;
    this.Id = i;
  }
}
exports.CameraSpecificLocLocation = CameraSpecificLocLocation;
class CameraModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.AimAssistDebugDraw = false;
    this.CameraDebugToolEnabled = false;
    this.CameraDebugToolDrawRotator = false;
    this.CameraDebugToolDrawCameraCollision = false;
    this.CameraDebugToolDrawSpringArm = false;
    this.CameraDebugToolDrawFocusTargetLine = false;
    this.CameraDebugToolDrawSpringArmEdgeRange = false;
    this.CameraDebugToolDrawLockCameraMoveLine = false;
    this.CameraDebugToolDrawSettlementCamera = false;
    this.CameraDebugToolDrawCameraZone = false;
    this.CameraDebugToolDrawCameraRotator = false;
    this.UiCameraDebugToolEnabled = false;
    this.CurrentCameraActor = undefined;
    this.CameraLocation = Vector_1.Vector.Create();
    this.CameraRotator = Rotator_1.Rotator.Create();
    this.CameraTransform = undefined;
    this.CameraDitherStartHideDistance = 0;
    this.NextFindStartHideDistanceTime = 0;
    this.dhe = undefined;
    this.Che = undefined;
    this.ghe = 0;
    this.fhe = undefined;
    this.phe = undefined;
    this.vhe = undefined;
    this.ei1 = undefined;
    this.Mhe = undefined;
    this.Ehe = new Array();
    this.She = new Array();
    this.yhe = new Array();
    this.CameraMovieModeController = undefined;
    this.Ihe = false;
    this.The = undefined;
    this.Lhe = 1;
    this.rwa = 1;
    this.owa = new Map();
    this.nwa = this.rwa;
    this.CameraShakeInstanceId = -1;
    this.CameraShakeMap = new Map();
    this.Rhe = CAMERA_DEFAULT_SENSITIVITY;
    this.Uhe = CAMERA_DEFAULT_SENSITIVITY;
    this.Ahe = CAMERA_DEFAULT_SENSITIVITY;
    this.Phe = CAMERA_DEFAULT_SENSITIVITY;
    this.IsEnableSpecificCameraSensitivity = false;
    this.SpecificCameraBaseYawSensitivity = 1;
    this.SpecificCameraBasePitchSensitivity = 1;
    this.SpecificCameraAimingYawSensitivity = 1;
    this.SpecificCameraAimingPitchSensitivity = 1;
    this.xhe = CAMERA_DEFAULT_REVERSE;
    this.whe = CAMERA_DEFAULT_REVERSE;
    this.Bhe = CAMERA_DEFAULT_REVERSE;
    this.bhe = CAMERA_DEFAULT_REVERSE;
    this.qhe = true;
    this.Ghe = MOTION_BLUR_DEFAULT_VALUE;
    this.IsEnableResetFocus = true;
    this.IsEnableSidestepCamera = true;
    this.h6a = true;
    this.CameraSettingFightAdditionArmLength = CAMERA_ADDITION_ARM_LENGTH_VALUE_DEFAULT;
    this.CameraSettingNormalAdditionArmLength = CAMERA_ADDITION_ARM_LENGTH_VALUE_DEFAULT;
    this.Nhe = undefined;
    this.Ohe = true;
    this.l6a = new Set();
    this.WWu = 0;
    this.qQd = new Map();
    this.GQd = new PriorityQueue_1.PriorityQueue(CameraModel.CompareCameraSpecificLockIdPriority);
    this.DitherEntityGroups = new DisjointSet_1.DisjointSet();
    this.sZc = new Set();
    this.wtg = new Set();
    this.OQf = -1;
    this.OnCameraViewTargetChanged = () => {
      if (this.LogicHideHeadEnabled) {
        if (this.CameraMode === 2) {
          this.SetHideHeadDisabled(true, EHideHeadDisabledEnum.UI);
        } else {
          this.SetHideHeadDisabled(false, EHideHeadDisabledEnum.UI);
        }
        this.FightCamera?.LogicComponent?.ForceTickOutSide();
        this.FightCamera?.LogicComponent?.Character?.CharRenderingComponent?.UpdateMaterialEffectsOnly();
      }
    };
  }
  get CameraBaseYawSensitivity() {
    return this.Rhe;
  }
  get CameraBasePitchSensitivity() {
    return this.Uhe;
  }
  get CameraAimingYawSensitivity() {
    return this.Ahe;
  }
  get CameraAimingPitchSensitivity() {
    return this.Phe;
  }
  get IsEnableSoftLockCameraExternal() {
    return this.h6a;
  }
  static CompareCameraSpecificLockIdPriority(t, e) {
    if (t.Priority === e.Priority) {
      return -1;
    } else {
      return e.Priority - t.Priority;
    }
  }
  get CameraBaseYawSensitivityInputModifier() {
    var t;
    if (this.IsEnableSpecificCameraSensitivity) {
      return this.SpecificCameraBaseYawSensitivity;
    } else if ((this.FightCamera?.LogicComponent?.CameraInputController.SpecificCameraBaseYawSensitivity ?? -1) > 0) {
      return this.FightCamera.LogicComponent.CameraInputController.SpecificCameraBaseYawSensitivity;
    } else {
      t = (t = this.Rhe) < CAMERA_DEFAULT_SENSITIVITY ? MathUtils_1.MathUtils.RangeClamp(t, CAMERA_MIN_SENSITIVITY, CAMERA_DEFAULT_SENSITIVITY, CAMERA_MIN_SENSITIVITY_MODIFIER, CAMERA_DEFAULT_SENSITIVITY_MODIFIER) : MathUtils_1.MathUtils.RangeClamp(t, CAMERA_DEFAULT_SENSITIVITY, CAMERA_MAX_SENSITIVITY, CAMERA_DEFAULT_SENSITIVITY_MODIFIER, CAMERA_MAX_SENSITIVITY_MODIFIER);
      if (this.xhe) {
        return -t;
      } else {
        return t;
      }
    }
  }
  get CameraBasePitchSensitivityInputModifier() {
    var t;
    if (this.IsEnableSpecificCameraSensitivity) {
      return this.SpecificCameraBasePitchSensitivity;
    } else if ((this.FightCamera?.LogicComponent?.CameraInputController.SpecificCameraBasePitchSensitivity ?? -1) > 0) {
      return this.FightCamera.LogicComponent.CameraInputController.SpecificCameraBasePitchSensitivity;
    } else {
      t = (t = this.Uhe) < CAMERA_DEFAULT_SENSITIVITY ? MathUtils_1.MathUtils.RangeClamp(t, CAMERA_MIN_SENSITIVITY, CAMERA_DEFAULT_SENSITIVITY, CAMERA_MIN_SENSITIVITY_MODIFIER, CAMERA_DEFAULT_SENSITIVITY_MODIFIER) : MathUtils_1.MathUtils.RangeClamp(t, CAMERA_DEFAULT_SENSITIVITY, CAMERA_MAX_SENSITIVITY, CAMERA_DEFAULT_SENSITIVITY_MODIFIER, CAMERA_MAX_SENSITIVITY_MODIFIER);
      if (this.whe) {
        return -t;
      } else {
        return t;
      }
    }
  }
  get CameraAimingYawSensitivityInputModifier() {
    var t;
    if (this.IsEnableSpecificCameraSensitivity) {
      return this.SpecificCameraAimingYawSensitivity;
    } else if ((this.FightCamera?.LogicComponent?.CameraInputController.SpecificCameraAimingYawSensitivity ?? -1) > 0) {
      return this.FightCamera.LogicComponent.CameraInputController.SpecificCameraAimingYawSensitivity;
    } else {
      t = (t = this.Ahe) < CAMERA_DEFAULT_SENSITIVITY ? MathUtils_1.MathUtils.RangeClamp(t, CAMERA_MIN_SENSITIVITY, CAMERA_DEFAULT_SENSITIVITY, CAMERA_MIN_SENSITIVITY_MODIFIER, CAMERA_DEFAULT_SENSITIVITY_MODIFIER) : MathUtils_1.MathUtils.RangeClamp(t, CAMERA_DEFAULT_SENSITIVITY, CAMERA_MAX_SENSITIVITY, CAMERA_DEFAULT_SENSITIVITY_MODIFIER, CAMERA_MAX_SENSITIVITY_MODIFIER);
      if (this.Bhe) {
        return -t;
      } else {
        return t;
      }
    }
  }
  get CameraAimingPitchSensitivityInputModifier() {
    var t;
    if (this.IsEnableSpecificCameraSensitivity) {
      return this.SpecificCameraAimingPitchSensitivity;
    } else if ((this.FightCamera?.LogicComponent?.CameraInputController.SpecificCameraAimingPitchSensitivity ?? -1) > 0) {
      return this.FightCamera.LogicComponent.CameraInputController.SpecificCameraAimingPitchSensitivity;
    } else {
      t = (t = this.Phe) < CAMERA_DEFAULT_SENSITIVITY ? MathUtils_1.MathUtils.RangeClamp(t, CAMERA_MIN_SENSITIVITY, CAMERA_DEFAULT_SENSITIVITY, CAMERA_MIN_SENSITIVITY_MODIFIER, CAMERA_DEFAULT_SENSITIVITY_MODIFIER) : MathUtils_1.MathUtils.RangeClamp(t, CAMERA_DEFAULT_SENSITIVITY, CAMERA_MAX_SENSITIVITY, CAMERA_DEFAULT_SENSITIVITY_MODIFIER, CAMERA_MAX_SENSITIVITY_MODIFIER);
      if (this.bhe) {
        return -t;
      } else {
        return t;
      }
    }
  }
  get IsCameraResetPitch() {
    return this.qhe;
  }
  get MotionBlurModifier() {
    if (this.Ghe < MOTION_BLUR_DEFAULT_VALUE) {
      return MathUtils_1.MathUtils.RangeClamp(this.Ghe, MOTION_BLUR_MIN_VALUE, MOTION_BLUR_DEFAULT_VALUE, MOTION_BLUR_MIN_MODIFIER, MOTION_BLUR_DEFAULT_MODIFIER);
    } else {
      return MathUtils_1.MathUtils.RangeClamp(this.Ghe, MOTION_BLUR_DEFAULT_VALUE, MOTION_BLUR_MAX_VALUE, MOTION_BLUR_DEFAULT_MODIFIER, MOTION_BLUR_MAX_MODIFIER);
    }
  }
  get CameraSettingArmLengthPercentage() {
    if (this.FightCamera.LogicComponent.ContainsTag(1996802261)) {
      return MathUtils_1.MathUtils.RangeClamp(this.CameraSettingFightAdditionArmLength, CAMERA_ADDITION_ARM_LENGTH_VALUE_MIN, CAMERA_ADDITION_ARM_LENGTH_VALUE_MAX, 0, 1);
    } else {
      return MathUtils_1.MathUtils.RangeClamp(this.CameraSettingNormalAdditionArmLength, CAMERA_ADDITION_ARM_LENGTH_VALUE_MIN, CAMERA_ADDITION_ARM_LENGTH_VALUE_MAX, 0, 1);
    }
  }
  get AimAssistMode() {
    return this.nwa;
  }
  get FightCamera() {
    return this.dhe;
  }
  get SequenceCamera() {
    return this.Che;
  }
  get CurSeqCameraIndex() {
    return this.ghe;
  }
  get WidgetCamera() {
    return this.fhe;
  }
  get SceneCamera() {
    return this.phe;
  }
  get OrbitalCamera() {
    return this.vhe;
  }
  get FreeCamera() {
    return this.ei1;
  }
  get CameraMode() {
    return this.Mhe;
  }
  get ShakeModify() {
    return this.Lhe;
  }
  get FightCameraFinalDistance() {
    return this.FightCamera?.LogicComponent?.FinalCameraDistance ?? 0;
  }
  get ViewHideHeadEnabled() {
    return this.wtg.size <= 0 && this.sZc.size > 0;
  }
  get LogicHideHeadEnabled() {
    return this.sZc.size > 0;
  }
  SetHideHeadEnabled(t, e) {
    var i = this.sZc.has(e);
    if ((!t || !i) && (!!t || !!i)) {
      if (t) {
        this.sZc.add(e);
      } else {
        this.sZc.delete(e);
        Object.values(EHideHeadDisabledEnum).forEach(t => {
          this.SetHideHeadDisabled(false, t);
        });
      }
      this.Ptg();
    }
  }
  SetHideHeadDisabled(t, e) {
    var i = this.wtg.has(e);
    if ((!t || !i) && (!!t || !!i)) {
      if (t) {
        this.wtg.add(e);
      } else {
        this.wtg.delete(e);
      }
      this.Ptg();
    }
  }
  Ptg() {
    if (this.ViewHideHeadEnabled) {
      if (this.FightCamera?.LogicComponent?.ContainsTag(1325052483)) {
        this.FightCamera?.LogicComponent?.Character?.CharRenderingComponent?.SetDitherUseHeadMaskHideEffect(true);
      } else {
        this.FightCamera?.LogicComponent?.Character?.CharRenderingComponent?.SetDitherApplyHeadsOnly();
      }
      this.FightCamera?.LogicComponent?.Character?.CharRenderingComponent?.SetDitherEffect(0, 1);
      this.FightCamera?.LogicComponent?.Character?.CharRenderingComponent?.UpdateMaterialEffectsOnly();
      this.FightCamera?.LogicComponent?.VehicleActorComponent?.EnterFirstPersonMode();
    } else {
      if (this.FightCamera?.LogicComponent?.ContainsTag(1325052483)) {
        this.FightCamera?.LogicComponent?.Character?.CharRenderingComponent?.SetDitherUseHeadMaskHideEffect(false);
      } else {
        this.FightCamera?.LogicComponent?.Character?.CharRenderingComponent?.SetDitherApplyAll();
      }
      this.FightCamera?.LogicComponent?.Character?.CharRenderingComponent?.SetDitherEffect(1, 1);
      this.FightCamera?.LogicComponent?.Character?.CharRenderingComponent?.UpdateMaterialEffectsOnly();
      this.FightCamera?.LogicComponent?.VehicleActorComponent?.ExitFirstPersonMode();
    }
  }
  SetHidePlayer(t) {
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (e?.Valid) {
      if (t) {
        this.OQf = e.DisableActor("LevelEventAdjustPlayerCamera.HidePlayer");
      } else if (this.OQf !== -1) {
        e.EnableActor(this.OQf);
      }
    } else {
      this.OQf = -1;
    }
  }
  SetCameraShakeModify(t) {
    this.Lhe = MathUtils_1.MathUtils.Clamp(t, CAMERA_SHAKE_MODIFIER_MIN, CAMERA_SHAKE_MODIFIER_MAX);
  }
  SetCameraMode(t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CameraModeChanged, t, this.Mhe);
    this.Mhe = t;
    Global_1.Global.CharacterController.ClientSetCameraMode(CameraUtility_1.CameraUtility.GetCameraMode(t));
  }
  RefreshAimAssetMode() {
    if (this.owa.size === 0) {
      this.nwa = this.rwa;
    } else {
      this.nwa = 0;
      for (var [, t] of this.owa) {
        this.nwa = Math.max(this.nwa, t);
      }
    }
  }
  SetAimAssistMode(t) {
    this.rwa = t;
    this.RefreshAimAssetMode();
  }
  SetAimAssistModeWithKey(t, e) {
    this.owa.set(t, e);
    this.RefreshAimAssetMode();
  }
  ClearAimAssistModeWithKey(t) {
    this.owa.delete(t);
    this.RefreshAimAssetMode();
  }
  SetIsCameraResetPitch(t) {
    this.qhe = t;
  }
  SetCameraBaseYawSensitivity(t) {
    this.Rhe = MathUtils_1.MathUtils.Clamp(t, CAMERA_MIN_SENSITIVITY, CAMERA_MAX_SENSITIVITY);
  }
  SetCameraBasePitchSensitivity(t) {
    this.Uhe = MathUtils_1.MathUtils.Clamp(t, CAMERA_MIN_SENSITIVITY, CAMERA_MAX_SENSITIVITY);
  }
  SetCameraAimingYawSensitivity(t) {
    this.Ahe = MathUtils_1.MathUtils.Clamp(t, CAMERA_MIN_SENSITIVITY, CAMERA_MAX_SENSITIVITY);
  }
  SetCameraAimingPitchSensitivity(t) {
    this.Phe = MathUtils_1.MathUtils.Clamp(t, CAMERA_MIN_SENSITIVITY, CAMERA_MAX_SENSITIVITY);
  }
  SetCameraBaseYawReverse(t) {
    this.xhe = t;
  }
  SetCameraBasePitchReverse(t) {
    this.whe = t;
  }
  SetCameraAimingYawReverse(t) {
    this.Bhe = t;
  }
  SetCameraAimingPitchReverse(t) {
    this.bhe = t;
  }
  SetMotionBlurValue(t) {
    this.Ghe = MathUtils_1.MathUtils.Clamp(t, MOTION_BLUR_MIN_VALUE, MOTION_BLUR_MAX_VALUE);
    GameSettingsManager_1.GameSettingsManager.HandleValueChange(GameSettingsDefine_1.EFunction.MOTIONBLUR, this.Ghe, 0);
  }
  get Blending() {
    return this.Ihe;
  }
  SetBlending(t) {
    this.Ihe = t;
  }
  get BlendTimerId() {
    return this.The;
  }
  SetBlendTimerId(t) {
    this.The = t;
  }
  EnableMode(t) {
    this.Ehe[t] = true;
  }
  DisableMode(t) {
    this.Ehe[t] = false;
  }
  IsModeEnabled(t) {
    return this.Ehe[t];
  }
  GetNextMode() {
    for (const t of this.She) {
      if (this.Ehe[t]) {
        return t;
      }
    }
    return 0;
  }
  IsInHigherMode(t) {
    return this.yhe[this.CameraMode] > this.yhe[t];
  }
  SetAimAssistEnable(t) {
    this.Ohe = t;
  }
  GetAimAssistEnable() {
    return this.Ohe;
  }
  EnableSoftLock(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "开启软锁状态", ["reason", t]);
    }
    this.l6a.add(++CameraModel._6a);
    return CameraModel._6a;
  }
  DisableSoftLock(t, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "关闭软锁状态", ["reason", e]);
    }
    if (this.l6a.has(t)) {
      this.l6a.delete(t);
    }
  }
  SetSettingSoftLockState(t) {
    this.h6a = t;
  }
  IsSoftLockEnable() {
    return this.h6a || this.l6a.size > 0;
  }
  EnableCameraSpecificLockEntity(t, e) {
    t = new CameraSpecificLockEntity(t, e, ++this.WWu);
    this.GQd.Push(t);
    this.qQd.set(t.Id, t);
    return t.Id;
  }
  EnableCameraSpecificLockLocation(t, e) {
    t = new CameraSpecificLocLocation(t, e, ++this.WWu);
    this.GQd.Push(t);
    this.qQd.set(t.Id, t);
    return t.Id;
  }
  DisableCameraSpecificLockTarget(t) {
    t = this.qQd.get(t);
    if (t) {
      t.MarkDelete = true;
    }
  }
  GetCameraSpecificLockTarget() {
    while (!this.GQd.Empty) {
      var t = this.GQd.Top;
      if (!t) {
        return;
      }
      if (!t.MarkDelete && t.IsValid()) {
        return t;
      }
      this.GQd.Pop();
      this.qQd.delete(t.Id);
    }
  }
  PlaySpecialMovieCamera(t, e = undefined) {
    if (this.CameraMovieModeController) {
      this.CameraMovieModeController.PlaySpecialMovieCamera(t, e);
    }
  }
  IsPlayingSpecialMovieCamera(t) {
    return !!this.CameraMovieModeController && this.CameraMovieModeController.IsPlayingSpecialMovieCamera(t);
  }
  PlayMovieCamera(t, e = -1, i = undefined) {
    if (this.CameraMovieModeController) {
      this.CameraMovieModeController.PlayMovieCamera(t, e, i);
    }
  }
  PauseMovieCamera() {
    if (this.CameraMovieModeController) {
      this.CameraMovieModeController.PauseMovieCamera();
    }
  }
  ResumeMovieCamera() {
    if (this.CameraMovieModeController) {
      this.CameraMovieModeController.ResumeMovieCamera();
    }
  }
  StopMovieCamera(t = undefined, e = "外部调用,停止播放") {
    if (this.CameraMovieModeController) {
      this.CameraMovieModeController.StopMovieCamera(t, e);
    }
  }
  HasLockTarget() {
    return !!this.FightCamera?.LogicComponent && !!this.FightCamera.LogicComponent.TargetEntity?.Valid && this.FightCamera.LogicComponent.IsTargetLocationValid;
  }
  GetLockTargetLocation(t) {
    t.Reset();
    return !!this.HasLockTarget() && (t.DeepCopy(this.FightCamera.LogicComponent.TargetLocation), true);
  }
  OnInit() {
    this.Che = EntitySystem_1.EntitySystem.Create(SequenceCamera_1.SequenceCamera, CAMERA_TICK_PRIORITY);
    EntitySystem_1.EntitySystem.Init(this.Che);
    EntitySystem_1.EntitySystem.Start(this.Che);
    EntitySystem_1.EntitySystem.Activate(this.Che);
    EntitySystem_1.EntitySystem.PostActive(this.Che);
    this.Che.SetTimeDilation(Time_1.Time.TimeDilation);
    this.dhe = EntitySystem_1.EntitySystem.Create(FightCamera_1.FightCamera, CAMERA_TICK_PRIORITY);
    EntitySystem_1.EntitySystem.Init(this.dhe);
    EntitySystem_1.EntitySystem.Start(this.dhe);
    EntitySystem_1.EntitySystem.Activate(this.dhe);
    EntitySystem_1.EntitySystem.PostActive(this.dhe);
    this.dhe.SetTimeDilation(Time_1.Time.TimeDilation);
    this.fhe = EntitySystem_1.EntitySystem.Create(WidgetCamera_1.WidgetCamera, CAMERA_TICK_PRIORITY);
    EntitySystem_1.EntitySystem.Init(this.fhe);
    EntitySystem_1.EntitySystem.Start(this.fhe);
    EntitySystem_1.EntitySystem.Activate(this.fhe);
    EntitySystem_1.EntitySystem.PostActive(this.fhe);
    this.fhe.SetTimeDilation(Time_1.Time.TimeDilation);
    this.phe = EntitySystem_1.EntitySystem.Create(SceneCamera_1.SceneCamera, CAMERA_TICK_PRIORITY);
    EntitySystem_1.EntitySystem.Init(this.phe);
    EntitySystem_1.EntitySystem.Start(this.phe);
    EntitySystem_1.EntitySystem.Activate(this.phe);
    EntitySystem_1.EntitySystem.PostActive(this.phe);
    this.phe.SetTimeDilation(Time_1.Time.TimeDilation);
    this.vhe = EntitySystem_1.EntitySystem.Create(OrbitalCamera_1.OrbitalCamera, CAMERA_TICK_PRIORITY);
    EntitySystem_1.EntitySystem.Init(this.vhe);
    EntitySystem_1.EntitySystem.Start(this.vhe);
    EntitySystem_1.EntitySystem.Activate(this.vhe);
    EntitySystem_1.EntitySystem.PostActive(this.vhe);
    this.vhe.SetTimeDilation(Time_1.Time.TimeDilation);
    Global_1.Global.CharacterCameraManager.CameraModifyCustomTimeDilation = Time_1.Time.TimeDilation;
    this.CameraTransform = new UE.TransformDouble();
    this.CameraMovieModeController = new CameraMovieModeController_1.CameraMovieModeController();
    this.CameraMovieModeController.Start();
    for (let t = 0; t < 6; ++t) {
      this.Ehe.push(false);
      this.yhe.push(0);
    }
    this.Ehe[0] = true;
    this.She.push(1);
    this.She.push(2);
    this.She.push(3);
    this.She.push(4);
    this.She.push(5);
    this.She.push(0);
    for (let t = 0; t < this.She.length; ++t) {
      this.yhe[this.She[t]] = this.She.length - t;
    }
    this.Nhe = undefined;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CameraViewTargetChanged, this.OnCameraViewTargetChanged);
    return this.dhe.Valid && this.Che.Valid && this.fhe.Valid && this.phe.Valid && this.vhe.Valid;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CameraViewTargetChanged, this.OnCameraViewTargetChanged);
    this.GQd.Clear();
    this.qQd.clear();
    Global_1.Global.CharacterCameraManager.CameraModifyCustomTimeDilation = 1;
    var t = EntitySystem_1.EntitySystem.Destroy(this.dhe);
    this.dhe = undefined;
    t &&= EntitySystem_1.EntitySystem.Destroy(this.Che);
    this.Che = undefined;
    t &&= EntitySystem_1.EntitySystem.Destroy(this.fhe);
    this.fhe = undefined;
    t &&= EntitySystem_1.EntitySystem.Destroy(this.phe);
    this.phe = undefined;
    t &&= EntitySystem_1.EntitySystem.Destroy(this.vhe);
    this.vhe = undefined;
    t &&= this.DestroyFreeCamera();
    this.CameraTransform = undefined;
    this.Nhe = undefined;
    this.CameraMovieModeController?.End();
    this.CameraMovieModeController = undefined;
    this.DitherEntityGroups.Clear();
    return t;
  }
  SaveSeqCamera() {
    this.Nhe = this.SequenceCamera?.PlayerComponent?.SaveSeqCamera();
  }
  GetSavedSeqCameraThings() {
    return this.Nhe;
  }
  ResetSavedSeqCameraThings() {
    this.Nhe = undefined;
  }
  IsToLockOnCameraMode() {
    return this.CameraMode === 0;
  }
  IsToSceneCameraMode() {
    return this.CameraMode === 3;
  }
  CreateFreeCamera() {
    this.ei1 = EntitySystem_1.EntitySystem.Create(FreeCamera_1.FreeCamera, CAMERA_TICK_PRIORITY);
    EntitySystem_1.EntitySystem.Init(this.ei1);
    EntitySystem_1.EntitySystem.Start(this.ei1);
    EntitySystem_1.EntitySystem.Activate(this.ei1);
    EntitySystem_1.EntitySystem.PostActive(this.ei1);
    this.ei1.SetTimeDilation(Time_1.Time.TimeDilation);
    return this.ei1.Valid;
  }
  DestroyFreeCamera() {
    var t;
    return !this.ei1 || (t = EntitySystem_1.EntitySystem.Destroy(this.ei1), this.ei1 = undefined, t);
  }
}
(exports.CameraModel = CameraModel)._6a = 0;
//# sourceMappingURL=CameraModel.js.map