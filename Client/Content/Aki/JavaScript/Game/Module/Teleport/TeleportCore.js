"use strict";

var __decorate = this && this.__decorate || function (e, t, r, o) {
  var l;
  var a = arguments.length;
  var i = a < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, r) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, r, o);
  } else {
    for (var _ = e.length - 1; _ >= 0; _--) {
      if (l = e[_]) {
        i = (a < 3 ? l(i) : a > 3 ? l(t, r, i) : l(t, r)) || i;
      }
    }
  }
  if (a > 3 && i) {
    Object.defineProperty(t, r, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportCore = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const CameraUtility_1 = require("../../Camera/CameraUtility");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const WorldController_1 = require("../../World/Controller/WorldController");
const TeleportContextHolder_1 = require("./TeleportContextHolder");
const TeleportMisc_1 = require("./TeleportMisc");
const DELAYCLOSETIME = 1500;
const SKIP_FALL_INJURE_TIME = 1000;
class TeleportCore extends TeleportContextHolder_1.TeleportContextHolder {
  constructor() {
    super(...arguments);
    this.WIo = undefined;
    this.cRf = 0;
    this.dLe = () => {
      this.Okm();
      this.Flm(true);
    };
  }
  async TeleportPlayerNoLoading(e) {
    var t;
    var r;
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
    if (e && !this.m2f()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 79, "传送失败: 获取当前驾驶载具实体失败");
      }
      return false;
    }
    this.Dlm(true);
    if (e) {
      if (t = (r = this.m2f())?.GetComponent(70)) {
        t.CollectSampleAndSend(true);
        t.SetEnableMovementSync(false);
      }
      t = r?.GetComponent(247);
      this.Ulm(t);
    } else {
      r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(1);
      this.Ulm(r);
    }
    this.EmitTeleportStartEvent(o);
    this.uRf(false);
    if (e) {
      this.jlm();
      this.Hlm();
    } else {
      this.Okm();
      this.xlm();
      this.Blm();
      this.qlm();
    }
    this.uRf(true);
    ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("TeleportEntity");
    this.TeleportContext.TeleportStreamingHelper.FlushWorldPartitionUnloadingStreamingCells();
    if (this.TeleportContext.NeedWaitStreaming) {
      await this.CheckLiveLocationStreamingCompleted();
    }
    ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("TeleportEntity");
    this.Olm();
    if (e && this.TeleportContext.NeedRequestToServer) {
      await this.WaitServerResponse();
    }
    if (e) {
      this.TeleportContext.TeleportEntity.GetComponent(70)?.SetEnableMovementSync(true);
    }
    this.Glm();
    return true;
  }
  async TeleportPlayerWithLoading(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e) {
      r = this.m2f()?.GetComponent(247);
      this.Ulm(r);
    } else {
      r = t?.Entity?.GetComponent(1);
      this.Ulm(r);
    }
    this.Dlm(false);
    this.EmitTeleportStartEvent(t?.Entity);
    ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("TeleportPlayerWithLoading");
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 3;
    await this.TeleportContext.TeleportTransitionHelper.PlayTeleportTransition();
    if (TeleportMisc_1.TeleportMisc.BackToGameIfTargetPositionInvalid(ModelManager_1.ModelManager.TeleportModel.TargetPosition, this.TeleportContext.ClientReason)) {
      return false;
    }
    ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(GlobalData_1.GlobalData.World, this.TeleportContext.ClientReason);
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 4;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportOpenLoadingEnd);
    if (t?.Entity && ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(t)?.Valid) {
      EventSystem_1.EventSystem.EmitWithTarget(t.Entity, EventDefine_1.EEventName.TeleportOpenLoadingEnd);
    }
    if (!e && !this.TeleportContext.Seamless) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
      this.dLe();
    }
    var r = !this.TeleportContext.Seamless || Info_1.Info.IsLowMemoryDevice;
    if (r) {
      ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
    }
    this.HandleTimeDilationBeforeTeleport();
    if (this.TeleportContext.Seamless) {
      await this.TeleportContext.TeleportSeamlessHelper?.SeamlessTeleportStart();
    }
    await this.Vlm(r);
    ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("TeleportPlayerWithLoading");
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 15;
    ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(Protocol_1.Aki.Protocol.Nks.Proto_Normal);
    await this.WaitRenderAssetsStreamingCompleted();
    if (this.TeleportContext.Seamless) {
      await this.TeleportContext.TeleportSeamlessHelper?.SeamlessTeleportPreEnd();
    }
    await this.WaitTeamLoaded();
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CloseLoading");
    if (e) {
      this.jlm();
      this.Hlm();
    } else {
      this.xlm();
      this.Blm();
      if (!this.TeleportContext.Seamless) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
        this.Flm(false);
      }
      this.qlm();
    }
    ModelManager_1.ModelManager.GameModeModel?.StopIndependentStreaming(ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTriggerOrUndefined());
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 16;
    ControllerHolder_1.ControllerHolder.RoleAudioController.SetUpdateAudioDynamicTrace(true);
    ResourceSystem_1.ResourceSystem.SetLoadModeInGame(GlobalData_1.GlobalData.World, this.TeleportContext.ClientReason);
    if (r) {
      ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
    }
    await this.HandleTakeVehicleDuringTeleport();
    await this.WaitRollbackCompleted();
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 19;
    await this.TeleportContext.TeleportTransitionHelper.WaitTeleportTransition();
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 20;
    cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CloseLoading");
    if (this.TeleportContext.NeedRequestToServer) {
      await this.WaitServerResponse();
    }
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.TeleportFinish");
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = true;
    ControllerHolder_1.ControllerHolder.PerfSightController.MarkLevelLoadCompleted();
    this.HandleTimeDilationAfterTeleport();
    this.Glm();
    cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.TeleportFinish");
    cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport");
    return true;
  }
  async TeleportElevatorAndPlayerSeparately() {
    this.Dlm(true);
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
    var t = e?.GetComponent(1);
    this.Ulm(t);
    this.EmitTeleportStartEvent(e);
    this.TeleportContext.ElevatorEntity.GetComponent(1).SetActorLocation(this.TeleportContext.TargetPosition);
    this.Okm();
    this.xlm();
    this.Blm();
    this.qlm();
    ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("TeleportEntity");
    await this.CheckLiveLocationStreamingCompleted();
    ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("TeleportEntity");
    this.Olm();
    this.Glm();
    return true;
  }
  async FakeTeleportPlayerWithLoading() {
    var e = this.TeleportContext.ClientReason;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "伪传送: 开始", ["原因", this.TeleportContext.ServerReason], ["Reason", e]);
    }
    ModelManager_1.ModelManager.CharacterModel.ExitAllSelfCenteredMode();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "传送: 慢放解除", ["Reason", e]);
    }
    if (this.TeleportContext.ServerReason === Protocol_1.Aki.Protocol.v4s.cVu) {
      await this.TeleportContext.TeleportTransitionHelper.WaitTeleportTransition();
    }
    await this.WaitServerResponse();
    await this.TeleportContext.TeleportFinishRequest.Promise;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportComplete, this.TeleportContext);
    return true;
  }
  uRf(e) {
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 79, "传送: 开启运动模糊", ["MotionBlurValue", this.cRf]);
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.Amount " + this.cRf);
    } else {
      this.cRf = UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.MotionBlur.Amount");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 79, "传送: 关闭运动模糊", ["MotionBlurValue", this.cRf]);
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.InvalidSeveralFrameOcculusion 30");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.Amount 0");
    }
  }
  Ulm(e) {
    var t = ModelManager_1.ModelManager.TeleportModel;
    if (e?.Valid) {
      t.StartPosition.DeepCopy(e.ActorLocationProxy);
      t.StartRotation.DeepCopy(e.ActorRotationProxy);
      t.StartGravityDirect.DeepCopy(e.ActorGravityDirectProxy);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "传送: RecordStartAndTargetTransformData时BaseActorComponent还未加载完毕");
    }
    var r = this.TeleportContext.TargetPosition;
    var o = this.TeleportContext.TargetGravityDirect;
    var l = this.TeleportContext.TargetRotation;
    t.TargetPosition.DeepCopy(r);
    if (o) {
      t.TargetGravityDirect.DeepCopy(o);
    } else {
      t.TargetGravityDirect.DeepCopy(t.StartGravityDirect);
    }
    if (!t.TargetGravityDirect.Normalize()) {
      t.TargetGravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy);
    }
    var r = MathUtils_1.MathUtils.IsNearlyEqual(t.TargetGravityDirect.Z, -1);
    if (r && t.TargetGravityDirect.Inequality(Vector_1.Vector.DownVectorProxy)) {
      t.TargetGravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy);
    }
    if (l) {
      t.TargetRotation.DeepCopy(l);
    } else if (e?.Valid) {
      Quat_1.Quat.FindBetween(e.ActorGravityDirectProxy, t.TargetGravityDirect, MathUtils_1.MathUtils.CommonTempQuat);
      o = Quat_1.Quat.Create();
      MathUtils_1.MathUtils.CommonTempQuat.Multiply(e.ActorRotationProxy.Quaternion(), o);
      o.Rotator(t.TargetRotation);
    } else {
      t.TargetRotation.Reset();
    }
    var r = t.TargetGravityDirect.Multiply(-1, Vector_1.Vector.Create());
    t.TargetRotation.Quaternion().GetForwardVector(MathUtils_1.MathUtils.CommonTempVector);
    MathUtils_1.MathUtils.LookRotationUpFirst(MathUtils_1.MathUtils.CommonTempVector, r, t.TargetRotation);
  }
  async Vlm(e) {
    ControllerHolder_1.ControllerHolder.PerfSightController.StartPersistentOrDungeon();
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport");
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CheckVoxelStreaming");
    ModelManager_1.ModelManager.GameModeModel.StartIndependentStreaming(this.TeleportContext.TargetPosition);
    this.TeleportContext.TeleportStreamingHelper.FlushWorldPartitionUnloadingStreamingCells();
    if (e) {
      ControllerHolder_1.ControllerHolder.WorldController.ManuallyClearStreamingPool();
    }
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 11;
    await this.TeleportContext.TeleportStreamingHelper.CheckStreamingCompleted(true);
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 12;
    cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CheckVoxelStreaming");
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CheckStreaming");
    if (e) {
      ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
    }
    ControllerHolder_1.ControllerHolder.GameModeController.AddOrRemoveRenderAssetsQueryViewInfo(this.TeleportContext.TargetPosition, ResourceSystem_1.WAIT_RENDER_ASSET_DURATION);
    if (ModelManager_1.ModelManager.GameModeModel.PreAwakeEntityDuringLoad) {
      await this.PreAwakeEntitiesFromPending();
    }
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 13;
    await this.TeleportContext.TeleportStreamingHelper.CheckStreamingCompleted();
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 14;
    cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CheckStreaming");
    if (e) {
      ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
      ControllerHolder_1.ControllerHolder.WorldController.ManuallyResetStreamingPool();
    }
  }
  EmitTeleportStartEvent(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportStart, true);
    if (e) {
      EventSystem_1.EventSystem.EmitWithTarget(e, EventDefine_1.EEventName.TeleportStartEntity, true);
    }
  }
  xlm() {
    var e = ModelManager_1.ModelManager.TeleportModel;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity.GetComponent(3);
    if (t) {
      t.SetInputRotator(e.TargetRotation);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 79, "传送: 设置输入Rotator", ["当前Rotator", t.InputRotatorProxy], ["目标Rotator", e.TargetRotation]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Teleport", 79, "传送: HandleCharacterInput失败, 找不到当前编队实体的CharacterActorComponent");
    }
  }
  Blm() {
    var e;
    var t = ModelManager_1.ModelManager.TeleportModel;
    var r = t.TeleportContext;
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    var l = o?.Entity.GetComponent(3);
    if (l) {
      o?.Entity?.GetComponent(186)?.StopModelBuffer();
      l.SetActorRotation(t.TargetRotation.ToUeRotator(), "TeleportController", false);
      l.MoveComp?.SetGravityDirectWithoutRotate(t.TargetGravityDirect);
      l.TeleportAndFindStandLocation(t.TargetPosition);
      if (r.KeepSpeedRelativeRotation) {
        r = Vector_1.Vector.Create();
        t.StartRotation.Quaternion().Inverse(MathUtils_1.MathUtils.CommonTempQuat);
        MathUtils_1.MathUtils.CommonTempQuat.RotateVector(l.ActorVelocityProxy, r);
        e = Vector_1.Vector.Create();
        t.TargetRotation.Quaternion().RotateVector(r, e);
        l.MoveComp?.SetForceSpeed(e);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 79, "传送: 设置玩家位置(保持相对速度)", ["当前位置", t.StartPosition], ["当前旋转", t.StartRotation], ["当前重力", t.StartGravityDirect], ["当前速度", l.ActorVelocityProxy], ["目标位置", t.TargetPosition], ["目标旋转", t.TargetRotation], ["目标重力", t.TargetGravityDirect], ["目标速度", e]);
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 79, "传送: 设置玩家位置", ["当前位置", t.StartPosition], ["当前旋转", t.StartRotation], ["当前重力", t.StartGravityDirect], ["目标位置", t.TargetPosition], ["目标旋转", t.TargetRotation], ["目标重力", t.TargetGravityDirect]);
      }
      EventSystem_1.EventSystem.EmitWithTarget(o.Entity, EventDefine_1.EEventName.TeleportChangeLocation);
      ControllerHolder_1.ControllerHolder.RoleTriggerController.UpdateTransform();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Teleport", 79, "传送: HandleCharacterTransform失败, 找不到当前编队实体的CharacterActorComponent");
    }
  }
  Okm() {
    if (this.WIo) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.WIo);
    }
    ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = true;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "传送: 关闭跌落伤害");
    }
    this.WIo = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = false;
      this.WIo = undefined;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 79, "传送: 恢复跌落伤害");
      }
    }, SKIP_FALL_INJURE_TIME);
  }
  jlm() {
    var e;
    var t = ModelManager_1.ModelManager.TeleportModel;
    var r = t.TeleportContext;
    var o = this.m2f();
    if (o?.Valid) {
      e = o.GetComponent(247);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 79, "传送: 设置载具位置", ["当前位置", t.StartPosition], ["当前旋转", t.StartRotation], ["当前重力", t.StartGravityDirect], ["当前速度", e.ActorVelocityProxy], ["目标位置", t.TargetPosition], ["目标旋转", t.TargetRotation], ["目标重力", t.TargetGravityDirect], ["目标速度", r.TargetSpeed || Vector_1.Vector.ZeroVectorProxy]);
      }
      e.SetActorRotation(t.TargetRotation.ToUeRotator(), "Teleport.HandleVehicleTransform");
      e.VehicleMoveComp?.SetGravityDirectWithoutRotate(t.TargetGravityDirect);
      t = Vector_1.Vector.Create(t.TargetPosition);
      e.SetActorLocation(t.ToUeVector(), "Teleport.HandleVehicleTransform", false);
      e.VehicleMoveComp?.SetForceSpeed(r.TargetSpeed || Vector_1.Vector.ZeroVectorProxy);
      o.GetComponent(119)?.ForceClearUpdate();
      o.GetComponent(70)?.ClearReplaySamples();
      EventSystem_1.EventSystem.EmitWithTarget(o, EventDefine_1.EEventName.TeleportChangeLocation);
      ControllerHolder_1.ControllerHolder.RoleTriggerController.UpdateTransform();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Teleport", 79, "传送载具: 实体已无效", ["CreatureDataId", o?.CheckGetComponent(0)?.GetCreatureDataId()]);
    }
  }
  m2f() {
    var e = ModelManager_1.ModelManager.TeleportModel.TeleportContext;
    if (e.TeleportEntity) {
      return e.TeleportEntity;
    }
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
    if (t) {
      var t = t?.GetComponent(1);
      if (t) {
        t = t.Entity?.GetComponent(242)?.VehicleEntity;
        return e.TeleportEntity = t;
      }
    }
  }
  qlm() {
    var e;
    var t;
    var r = ModelManager_1.ModelManager.TeleportModel;
    var o = r.TeleportContext;
    var l = ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraRotation;
    if (o.KeepCameraRelativeRotation) {
      e = Quat_1.Quat.Create();
      r.StartRotation.Quaternion().Inverse(MathUtils_1.MathUtils.CommonTempQuat);
      MathUtils_1.MathUtils.CommonTempQuat.Multiply(l.Quaternion(), e);
      t = Quat_1.Quat.Create();
      r.TargetRotation.Quaternion().Multiply(e, t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 79, "传送: 镜头调整(保持相对旋转)", ["角色当前旋转", r.StartRotation], ["角色目标旋转", r.TargetRotation], ["相机当前旋转", l], ["相机目标旋转", t.Rotator()], ["相机相对角色旋转", e.Rotator()], ["bRestoreAdjust", false], ["bTeleport", true]);
      }
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(t.Rotator().ToUeRotator());
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(false, true);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 79, "传送: 镜头调整", ["相机当前旋转", l], ["相机目标旋转", CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator()], ["bRestoreAdjust", o.NeedRestoreCamera], ["bTeleport", false]);
      }
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator());
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(o.NeedRestoreCamera);
    }
  }
  Hlm() {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(ModelManager_1.ModelManager.TeleportModel.TargetRotation.ToUeRotator());
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(this.TeleportContext.NeedRestoreCamera);
  }
  Flm(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t?.Valid && (t = t.Entity.GetComponent(3))?.Valid && t.Actor?.IsValid() && t.Actor.CharacterMovement?.IsValid()) {
      e = e ? 0 : t.Actor.CharacterMovement.DefaultLandMovementMode;
      t.Actor.KuroSetMovementMode({
        Mode: e,
        Context: "[TeleportController.HandleCharacterMovementMode]"
      });
    }
  }
  async CheckLiveLocationStreamingCompleted() {
    if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() || !!ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 11;
      await this.TeleportContext.TeleportStreamingHelper.CheckLiveLocationStreamingCompleted(true);
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 12;
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 13;
      await this.TeleportContext.TeleportStreamingHelper.CheckLiveLocationStreamingCompleted(false);
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 14;
    }
  }
  async WaitServerResponse() {
    var e = new Protocol_1.Aki.Protocol.pCs();
    Net_1.Net.Call(21130, e, e => {
      this.TeleportContext.TeleportFinishRequest.SetResult(true);
    });
    await this.TeleportContext.TeleportFinishRequest.Promise;
  }
  Olm() {
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 15;
    ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(Protocol_1.Aki.Protocol.Nks.Proto_Normal);
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 16;
  }
  async PreAwakeEntitiesFromPending() {
    await ControllerHolder_1.ControllerHolder.CreatureController.PreAwakeEntitiesFromPending(Protocol_1.Aki.Protocol.Nks.Proto_SceneInit);
  }
  async WaitRenderAssetsStreamingCompleted() {
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CheckRenderAssets");
    await ControllerHolder_1.ControllerHolder.GameModeController.CheckRenderAssetsStreamingCompleted(this.TeleportContext.TargetPosition, "传送");
    cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CheckRenderAssets");
  }
  async WaitTeamLoaded() {
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.LoadTeam");
    await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
    cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.LoadTeam");
  }
  async HandleTakeVehicleDuringTeleport() {
    if (this.TeleportContext.ServerReason !== Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 79, "传送: 更新载具状态(开始)");
      }
      await ControllerHolder_1.ControllerHolder.VehicleController.UpdatePlayerVehiclePerform();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 79, "传送: 更新载具状态(完成)");
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "传送: 无需更新载具状态");
    }
  }
  async WaitRollbackCompleted() {
    if (this.TeleportContext.ServerReason === Protocol_1.Aki.Protocol.v4s.Proto_BtRollbackFailed) {
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.TeleportContext.TeleportWaitRequest?.SetResult(true);
      }, DELAYCLOSETIME);
      await this.TeleportContext.TeleportWaitRequest?.Promise;
    }
  }
  HandleTimeDilationBeforeTeleport() {
    ControllerHolder_1.ControllerHolder.GameModeController.ForceDisableGamePaused(true);
  }
  HandleTimeDilationAfterTeleport() {
    ControllerHolder_1.ControllerHolder.GameModeController.ForceDisableGamePaused(false);
    ControllerHolder_1.ControllerHolder.CommonQteController.RecoverTimeDilationAfterTeleport();
  }
  Dlm(e) {
    ModelManager_1.ModelManager.GameModeModel.SetBornInfo(this.TeleportContext.TargetPosition, this.TeleportContext.TargetRotation);
    ModelManager_1.ModelManager.GameModeModel.IsTeleport = true;
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 2;
    ModelManager_1.ModelManager.GameModeModel.RenderAssetDone = e;
    ControllerHolder_1.ControllerHolder.WorldController.SetEnableWorldOriginTickCheck(this.TeleportContext.ClientReason, false);
    WorldController_1.WorldController.StartWorldOriginInLoadingMode("Teleport");
    ModelManager_1.ModelManager.CharacterModel.ExitAllSelfCenteredMode();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "传送: 慢放解除", ["Reason", this.TeleportContext.ClientReason]);
    }
  }
  Glm() {
    ControllerHolder_1.ControllerHolder.RoleAudioController.SetUpdateAudioDynamicTrace(true);
    ModelManager_1.ModelManager.GameModeModel.IsTeleport = false;
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 1;
    ControllerHolder_1.ControllerHolder.WorldController.SetEnableWorldOriginTickCheck(this.TeleportContext.ClientReason, true);
    WorldController_1.WorldController.EndWorldOriginInLoadingMode("Teleport", this.TeleportContext.TargetPosition);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportComplete, this.TeleportContext);
  }
}
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "==========传送:")], TeleportCore.prototype, "TeleportPlayerNoLoading", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "==========传送:")], TeleportCore.prototype, "TeleportPlayerWithLoading", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "==========传送:")], TeleportCore.prototype, "TeleportElevatorAndPlayerSeparately", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "==========伪传送:")], TeleportCore.prototype, "FakeTeleportPlayerWithLoading", null);
__decorate([(0, Log_1.logDecorator)("Teleport", 79, "传送: 发送传送开始事件")], TeleportCore.prototype, "EmitTeleportStartEvent", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 流送检测")], TeleportCore.prototype, "CheckLiveLocationStreamingCompleted", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 通知服务器传送完成")], TeleportCore.prototype, "WaitServerResponse", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 预唤醒实体")], TeleportCore.prototype, "PreAwakeEntitiesFromPending", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 等待场景渲染资源完成")], TeleportCore.prototype, "WaitRenderAssetsStreamingCompleted", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 等待编队加载")], TeleportCore.prototype, "WaitTeamLoaded", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 处理传送过程中乘坐载具")], TeleportCore.prototype, "HandleTakeVehicleDuringTeleport", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 回退强制延迟1.5秒")], TeleportCore.prototype, "WaitRollbackCompleted", null);
__decorate([(0, Log_1.logDecorator)("Teleport", 79, "传送: 传送前解除时停")], TeleportCore.prototype, "HandleTimeDilationBeforeTeleport", null);
__decorate([(0, Log_1.logDecorator)("Teleport", 79, "传送: 传送后恢复时停")], TeleportCore.prototype, "HandleTimeDilationAfterTeleport", null);
exports.TeleportCore = TeleportCore; //# sourceMappingURL=TeleportCore.js.map