"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Time_1 = require("../../Core/Common/Time");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const Global_1 = require("../Global");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const CameraParams_1 = require("./CameraParams");
const CameraUtility_1 = require("./CameraUtility");
const SECOND_TO_MILLISECOND = 1000;
const CONSTRAIN_ASPECT_RATIO = 1.76;
const constrainAspectRatioGameplayTag = 1831918996;
class CameraController extends ControllerBase_1.ControllerBase {
  static get Model() {
    return ModelManager_1.ModelManager.CameraModel;
  }
  static get FightCamera() {
    return this.Model.FightCamera;
  }
  static get SequenceCamera() {
    return this.Model.SequenceCamera;
  }
  static get WidgetCamera() {
    return this.Model.WidgetCamera;
  }
  static get SceneCamera() {
    return this.Model.SceneCamera;
  }
  static get OrbitalCamera() {
    return this.Model.OrbitalCamera;
  }
  static get FreeCamera() {
    return this.Model.FreeCamera;
  }
  static get CameraLocation() {
    return this.Model.CameraLocation;
  }
  static get CameraRotator() {
    return this.Model.CameraRotator;
  }
  static get CameraDitherStartHideDistance() {
    return this.Model.CameraDitherStartHideDistance;
  }
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, CameraController.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BeforeLoadMap, CameraController.SMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AfterLoadMap, CameraController.yMe);
    return super.OnInit();
  }
  static OnPossess(e) {
    if (this.Model) {
      this.FightCamera.LogicComponent.SetPawn(e);
      this.SequenceCamera.PlayerComponent.SetPawn(e);
    }
  }
  static SetViewTarget(e, t, a = 0, r = 0, i = 0, o, s) {
    var n;
    if (e?.IsValid()) {
      if (n = this.GetPlayerController()) {
        n.bShouldPerformFullTickWhenPaused = true;
        this.Model.CurrentCameraActor = e;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Camera", 33, "绑定相机 SetViewTarget", ["name", e.GetName()], ["blendTime", a], ["reason", t]);
        }
        n.SetViewTargetWithBlend(e, CameraUtility_1.CameraUtility.CharacterMovementBaseIsMoving() ? 0 : a, r, i, o ?? false, s ?? false);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CameraViewTargetChanged, CameraUtility_1.CameraUtility.CharacterMovementBaseIsMoving() ? 0 : a);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Camera", 6, "Camera not valid");
    }
  }
  static ResetViewTarget(e = 0, t = 0, a = 0) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 33, "绑定相机 ResetViewTarget", ["name", this.Model.CurrentCameraActor.GetName()]);
    }
    this.GetPlayerController().SetViewTargetWithBlend(this.Model.CurrentCameraActor, e, t, a, true, true);
  }
  static OnTick(e) {
    if (this.Model.CurrentCameraActor?.IsValid()) {
      this.Model.CameraLocation.FromUeVector(this.Model.CurrentCameraActor.D_K2_GetActorLocation());
      this.Model.CameraRotator.DeepCopy(this.Model.CurrentCameraActor.K2_GetActorRotation());
      this.Model.CameraTransform = this.Model.CurrentCameraActor.D_GetTransform();
      this.UpdateCameraDitherRadius();
    }
  }
  static EnterCameraMode(e, t = 0, a = 0, r = 0, i = () => {}, o = false) {
    if (e === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 14, "战斗镜头不应主动切换，应由其他镜头退出时被动切换");
      }
      return false;
    } else {
      this.Model.EnableMode(e);
      if (this.Model.IsInHigherMode(e)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Camera", 6, "意图进入较低优先级的镜头", ["CurrentMode", this.Model.CameraMode], ["NewMode", e]);
        }
        if (o && i) {
          i();
        }
        return false;
      } else {
        return this.uhe(e, t, a, r, i);
      }
    }
  }
  static ExitCameraMode(e, t = 0, a = 0, r = 0, i = () => {}) {
    if (e === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 14, "战斗镜头不应主动切换，应由其他镜头退出时被动切换");
      }
      return false;
    } else {
      this.Model.DisableMode(e);
      return this.uhe(this.Model.GetNextMode(), t, a, r, i);
    }
  }
  static GetCameraRotation(e) {
    var t = this.FightCamera?.LogicComponent;
    if (this.Model.CameraMode === 0 && !CameraController?.IsInCameraModeBlending && t) {
      e.FromUeRotator(t.CameraRotation);
    } else {
      e.FromUeRotator(Global_1.Global.CharacterCameraManager.GetCameraRotation());
    }
    return e;
  }
  static uhe(e, t = 0, a = 0, r = 0, i = () => {}) {
    var o = this.Model;
    if (o.CameraMode === e) {
      return false;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 78, "CameraManager.SwitchCameraMode:切换镜头模式", ["mode", e]);
    }
    o.SetCameraMode(e);
    let s = undefined;
    if (e === 1 || e === 3) {
      Global_1.Global.CharacterCameraManager.StopAllCameraShakes();
    }
    switch (e) {
      case 0:
        s = this.FightCamera.DisplayComponent.CameraActor;
        break;
      case 1:
        s = this.SequenceCamera.DisplayComponent.CineCamera;
        break;
      case 2:
        s = this.WidgetCamera.DisplayComponent.CineCamera;
        break;
      case 3:
        s = this.SceneCamera.DisplayComponent.CineCamera;
        break;
      case 4:
        s = this.OrbitalCamera.DisplayComponent.CineCamera;
        break;
      case 5:
        s = this.FreeCamera.DisplayComponent.CameraActor;
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, "CameraManager.SwitchCameraMode: 错误的镜头模式 ", ["mode", e]);
        }
        return false;
    }
    o = t * ModelManager_1.ModelManager.CharacterModel.SelfCenteredTimeDilation;
    this.SetViewTarget(s, "SwitchMode", o, a, r, true, true);
    if (o > 0) {
      this.IsInCameraModeBlending = true;
      TimerSystem_1.TimerSystem.Delay(() => {
        this.IsInCameraModeBlending = false;
        if (i) {
          i();
        }
      }, o * SECOND_TO_MILLISECOND);
    } else {
      this.IsInCameraModeBlending = false;
      if (i) {
        i();
      }
    }
    return true;
  }
  static RefreshSequenceCamera() {
    if (this.Model.CameraMode === 1) {
      this.SetViewTarget(this.SequenceCamera.DisplayComponent.CineCamera, "RefreshMode");
    }
  }
  static EnterDialogueMode(e, t = false, a = undefined, r = undefined) {
    this.FightCamera.LogicComponent.EnterSequenceDialogue(e, t, a, r);
  }
  static ExitDialogMode() {
    this.FightCamera.LogicComponent.ExitSequenceDialogue();
  }
  static EnterCameraExplore(e, t, a, r, i, o, s) {
    this.FightCamera.LogicComponent.EnterCameraExplore(e, t, a, r, i, o, s);
  }
  static ExitCameraExplore(e) {
    this.FightCamera.LogicComponent.ExitCameraExplore(e);
  }
  static SpawnCameraActor() {
    var e = this.SpawnActor(UE.CameraActor.StaticClass());
    e.CameraComponent.bConstrainAspectRatio = false;
    return e;
  }
  static SetInputEnable(e, t) {
    this.FightCamera.LogicComponent.CameraInputController.SetInputEnable(e, t);
  }
  static SpawnCineCamera() {
    return this.SpawnActor(UE.BP_CineCamera_C.StaticClass());
  }
  static SpawnActor(e) {
    return ActorSystem_1.ActorSystem.Get(e, MathUtils_1.MathUtils.DefaultTransformDouble);
  }
  static GetCharacter() {
    return Global_1.Global.BaseCharacter;
  }
  static GetPlayerController() {
    return Global_1.Global.CharacterController;
  }
  static GetCameraConfigs(e = undefined) {
    var t = (0, puerts_1.$ref)(UE.NewArray(UE.SCamera_Setting));
    UE.BPL_CameraUtility_C.DtGetCameraConfigs(t, e, GlobalData_1.GlobalData.World);
    return (0, puerts_1.$unref)(t);
  }
  static GetCameraConfigList(e = undefined) {
    var t = (0, puerts_1.$ref)(UE.NewArray(UE.SCameraConfig));
    UE.BPL_CameraUtility_C.DtGetCameraConfigList(t, e, GlobalData_1.GlobalData.World);
    return (0, puerts_1.$unref)(t);
  }
  static GetPlayerCameraManager() {
    return Global_1.Global.CharacterCameraManager;
  }
  static SetTimeDilation(e) {
    ModelManager_1.ModelManager.CameraModel.FightCamera.SetTimeDilation(e);
    ModelManager_1.ModelManager.CameraModel.SequenceCamera.SetTimeDilation(e);
    ModelManager_1.ModelManager.CameraModel.WidgetCamera.SetTimeDilation(e);
    ModelManager_1.ModelManager.CameraModel.OrbitalCamera.SetTimeDilation(e);
    ModelManager_1.ModelManager.CameraModel.FreeCamera?.SetTimeDilation(e);
    Global_1.Global.CharacterCameraManager.CameraModifyCustomTimeDilation = e;
  }
  static PlayWorldCameraShake(e, t, a, r, i, o) {
    if (!this.IsSettlementCamera() && !this.IsSequenceCameraInCinematic()) {
      if (CameraController.Model.ShakeModify > 0) {
        UE.GameplayStatics.D_PlayWorldCameraShakeWithModifier(GlobalData_1.GlobalData.World, e, t, a, r, i, o, CameraController.Model.ShakeModify, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      }
      this.PlayForceFeedbackFromCameraShake(e);
    }
  }
  static PlayCameraShake(e, t = undefined, a = undefined, r = undefined, i = false, o = false) {
    if (!Global_1.Global.CharacterCameraManager?.IsValid() || this.IsSettlementCamera() || this.IsSequenceCameraInCinematic()) {
      return -1;
    } else {
      t = Global_1.Global.CharacterCameraManager.StartCameraShake(e, t, a, r, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      if (i) {
        this.PlayForceFeedbackFromCameraShake(e);
      }
      if (o && t) {
        this.Model.CameraShakeMap.set(++this.Model.CameraShakeInstanceId, t);
      }
      return this.Model.CameraShakeInstanceId;
    }
  }
  static StopCameraShake(e, t = false) {
    var a;
    if (this.Model?.CameraShakeMap.has(e) && Global_1.Global.CharacterCameraManager?.IsValid() && (a = this.Model.CameraShakeMap.get(e), this.Model.CameraShakeMap.delete(e), a?.IsValid()) && (Global_1.Global.CharacterCameraManager.StopCameraShake(a, true), t)) {
      this.StopForceFeedbackFromCameraShake(a.GetClass());
    }
  }
  static PlayForceFeedbackFromCameraShake(e) {
    if (Info_1.Info.IsInGamepad() && e?.IsChildOf(UE.BP_CameraShakeAndForceFeedback_C.StaticClass()) && (e = UE.KuroStaticLibrary.GetDefaultObject(e).ForceFeedbackEffect) && Global_1.Global.CharacterController) {
      ControllerHolder_1.ControllerHolder.GamepadController.PlayKuroForceFeedback(e, undefined, false, false, false, "CameraController");
    }
  }
  static StopForceFeedbackFromCameraShake(e) {
    if (Info_1.Info.IsInGamepad() && e?.IsChildOf(UE.BP_CameraShakeAndForceFeedback_C.StaticClass()) && (e = UE.KuroStaticLibrary.GetDefaultObject(e).ForceFeedbackEffect) && Global_1.Global.CharacterController) {
      ControllerHolder_1.ControllerHolder.GamepadController.StopKuroForceFeedback(e, undefined);
    }
  }
  static LoadCharacterCameraConfig(e) {
    this.FightCamera.LogicComponent.CameraConfigController.LoadCharacterConfig(e);
  }
  static UnloadCharacterCameraConfig(e) {
    this.FightCamera.LogicComponent.CameraConfigController.UnloadCharacterConfig(e);
  }
  static ReturnLockOnCameraMode(t = 0, a = 0, r = 0, i = () => {}) {
    if (this.Model.CameraMode !== 0) {
      let e = this.Model.CameraMode;
      while (e !== 0) {
        this.Model.DisableMode(e);
        e = this.Model.GetNextMode();
      }
      this.uhe(e, t, a, r, i);
    }
  }
  static IsSequenceCameraInCinematic() {
    var e = CameraController.SequenceCamera?.GetComponent(10);
    return !!e?.Valid && e.GetIsInCinematic();
  }
  static UpdateCameraDitherRadius() {
    if (!(Time_1.Time.Now < this.Model.NextFindStartHideDistanceTime)) {
      this.Model.NextFindStartHideDistanceTime = Time_1.Time.Now + CameraParams_1.FIND_DITHER_START_HIDE_DISTANCE_PERIOD;
      var e;
      var t = [];
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(CameraParams_1.DITHER_START_HIDE_DISTANCE_THRESHOLD, 248, t);
      this.Model.CameraDitherStartHideDistance = this.FightCamera.LogicComponent.StartHideDistance;
      for (const a of t) {
        if (a.Entity?.Active) {
          if (!!(e = a.Entity.GetComponent(3)) && !(e.StartHideDistance <= this.Model.CameraDitherStartHideDistance)) {
            this.Model.CameraDitherStartHideDistance = e.StartHideDistance;
          }
        }
      }
    }
  }
  static IsSettlementCamera() {
    return !!this.FightCamera?.LogicComponent?.SettlementCamera && this.FightCamera.LogicComponent.SettlementCamera.IsPlayingSettlementCamera();
  }
  static StopAllCameraShakes() {
    Global_1.Global.CharacterCameraManager.StopAllCameraShakes();
  }
  static SetHideHeadEnable(e, t) {
    this.Model.SetHideHeadEnabled(e, t);
  }
  static uml(e) {
    var t;
    var a;
    var r = this.FightCamera?.LogicComponent?.CameraActor;
    if (r?.IsValid() && Global_1.Global.CharacterController) {
      if (r.CameraComponent.bConstrainAspectRatio !== e && !(t = (0, puerts_1.$ref)(0), a = (0, puerts_1.$ref)(0), Global_1.Global.CharacterController.GetViewportSize(t, a), (0, puerts_1.$unref)(t) / (0, puerts_1.$unref)(a) >= CONSTRAIN_ASPECT_RATIO)) {
        r.CameraComponent.bConstrainAspectRatio = e;
      }
    }
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BeforeLoadMap, CameraController.SMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AfterLoadMap, CameraController.yMe);
    return super.OnClear();
  }
}
(exports.CameraController = CameraController).IsInCameraModeBlending = false;
CameraController.xie = (e, t) => {
  if (t?.Valid && (t = t.Entity.GetComponent(215))?.Valid) {
    t.RemoveTagAddOrRemoveListener(constrainAspectRatioGameplayTag, CameraController.cml);
  }
  if (e?.Valid && (t = e.Entity.GetComponent(215))?.Valid) {
    t.AddTagAddOrRemoveListener(constrainAspectRatioGameplayTag, CameraController.cml);
    CameraController.uml(t.HasTag(constrainAspectRatioGameplayTag));
  }
};
CameraController.cml = (e, t) => {
  CameraController.uml(t);
};
CameraController.SMe = () => {
  var e = CameraController.GetPlayerCameraManager()?.AnimCameraActor;
  if (e?.IsValid()) {
    ModelManager_1.ModelManager.SeamlessTravelModel.AddSeamlessTravelActor(e);
  }
};
CameraController.yMe = () => {
  var e = CameraController.GetPlayerCameraManager()?.AnimCameraActor;
  if (e?.IsValid()) {
    ModelManager_1.ModelManager.SeamlessTravelModel.RemoveSeamlessTravelActor(e);
  }
}; //# sourceMappingURL=CameraController.js.map