"use strict";

var _a;
var __decorate = this && this.__decorate || function (e, r, t, o) {
  var l;
  var a = arguments.length;
  var n = a < 3 ? r : o === null ? o = Object.getOwnPropertyDescriptor(r, t) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, r, t, o);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (l = e[i]) {
        n = (a < 3 ? l(n) : a > 3 ? l(r, t, n) : l(r, t)) || n;
      }
    }
  }
  if (a > 3 && n) {
    Object.defineProperty(r, t, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportControllerNew = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const CameraUtility_1 = require("../../Camera/CameraUtility");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ReconnectDefine_1 = require("../ReConnect/ReconnectDefine");
const TeleportSeamlessHelper_1 = require("./TeleportSeamlessHelper");
const TeleportStreamingHelper_1 = require("./TeleportStreamingHelper");
const TeleportTransitionHelper_1 = require("./TeleportTransitionHelper");
const DELAYCLOSETIME = 1500;
const SKIP_FALL_INJURE_TIME = 1000;
class TeleportControllerNew extends ControllerBase_1.ControllerBase {
  static async TeleportPlayer(e, r, t = undefined, o = undefined, l = 2) {
    switch (l) {
      case 0:
        if (this.tnm()) {
          return this.FakeTeleportPlayerWithLoading(e);
        } else {
          return this.TeleportPlayerWithLoading(e, false, r, t, o);
        }
      case 1:
        return this.TeleportPlayerWithoutLoading(e, r, t, o);
      case 2:
        if (this.QueryCanTeleportNoLoading(r)) {
          return this.TeleportPlayerWithoutLoading(e, r, t, o);
        } else {
          return this.TeleportPlayerWithLoading(e, false, r, t, o);
        }
      default:
        return false;
    }
  }
  static tnm() {
    var e = ModelManager_1.ModelManager.TeleportModel;
    return (e.TeleportReason === Protocol_1.Aki.Protocol.v4s.SL_ || e.TeleportReason === Protocol_1.Aki.Protocol.v4s.Xvs || e.TeleportReason === Protocol_1.Aki.Protocol.v4s.Proto_Fall) && !!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || e.TeleportReason === Protocol_1.Aki.Protocol.v4s.cVu && !!ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot();
  }
  static async TeleportPlayerWithoutLoading(e, r, t = undefined, o = undefined, l = true) {
    this.nnm(e, r, t, true, l);
    this.snm(ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity, r, t, o);
    this.EmitTeleportStartEvent(ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity);
    this.anm();
    this.hnm();
    this.sIm();
    this._nm(l);
    ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("TeleportEntity");
    TeleportStreamingHelper_1.TeleportStreamingHelper.FlushWorldPartitionUnloadingStreamingCells();
    await this.CheckLiveLocationStreamingCompleted();
    ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("TeleportEntity");
    this.unm();
    this.cnm(e);
    this.EmitTeleportCompleteEvent();
    return true;
  }
  static async TeleportElevatorAndPlayerSeparately(e, r, t, o = undefined, l = undefined) {
    this.nnm(t, r, o, true);
    e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    this.snm(e, r, o, l);
    this.EmitTeleportStartEvent(ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity);
    e.Entity.GetComponent(1).SetActorLocation(r);
    this.anm();
    this.hnm();
    this.sIm();
    this._nm();
    ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("TeleportEntity");
    await this.CheckLiveLocationStreamingCompleted();
    ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("TeleportEntity");
    this.unm();
    this.cnm(t);
    this.EmitTeleportCompleteEvent();
    return true;
  }
  static async TeleportPlayerWithVehicle(e, r, t = undefined, o = undefined, l = false, a = undefined) {
    var n = ModelManager_1.ModelManager.TeleportModel;
    var i = "TeleportVehicle";
    var _ = a?.x9n;
    var a = a?.f5n;
    n.TeleportReason = _;
    n.Option = a;
    var _ = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    n.TeleportEntityHandle = _;
    if (l && this.QueryCanTeleportNoLoading(r)) {
      this.snm(_, r, t, o);
      this.nnm(i, r, t, false);
      this.EmitTeleportStartEvent(_);
      ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("TeleportPlayerWithEntity");
      await this.CheckLiveLocationStreamingCompleted();
      ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("TeleportPlayerWithEntity");
      this.unm();
      await this.WaitServerResponse();
      this.gnm();
      this.Cnm();
      this.cnm(i);
      this.EmitTeleportCompleteEvent();
      return true;
    } else {
      return this.TeleportPlayerWithLoading(i, true, r, t, o);
    }
  }
  static QueryCanTeleportNoLoading(e) {
    var r;
    var t;
    if (Global_1.Global.BaseCharacter?.IsValid()) {
      return !ModelManager_1.ModelManager.GameModeModel.UseWorldPartition || (r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass()), (t = new UE.WorldPartitionStreamingQuerySource()).Location = e.op_ToVector(), t.bUseGridLoadingRange = false, t.Radius = ResourceSystem_1.STREAMING_SOURCE_RADIUS, (e = UE.NewArray(UE.WorldPartitionStreamingQuerySource)).Add(t), r.IsStreamingCompleted(2, e, false, undefined, undefined, true));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 79, "查询是否可以无加载传送:失败,找不到当前玩家");
      }
      return false;
    }
  }
  static async TeleportPlayerWithLoading(e, r, t, o = undefined, l = undefined) {
    var a = ModelManager_1.ModelManager.TeleportModel;
    var n = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    this.snm(n, t, o, l);
    this.nnm(e, t, o, false);
    this.EmitTeleportStartEvent(n);
    ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("TeleportPlayerWithLoading");
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 3;
    await TeleportTransitionHelper_1.TeleportTransitionHelper.PlayTeleportTransition(a.TeleportReason, a.Option);
    if (ControllerHolder_1.ControllerHolder.TeleportControllerNew.BackToGameIfTargetPositionInvalid(a.TargetPosition, e)) {
      return false;
    }
    ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(GlobalData_1.GlobalData.World, e);
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 4;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportOpenLoadingEnd);
    if (n?.Entity && ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(n)?.Valid) {
      EventSystem_1.EventSystem.EmitWithTarget(n.Entity, EventDefine_1.EEventName.TeleportOpenLoadingEnd);
    }
    if (!r && a.TeleportMode !== 4) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
      this.dLe();
    }
    l = this.mnm(a.TeleportMode);
    if (l) {
      ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
    }
    this.HandleTimeDilationBeforeTeleport();
    if (a.TeleportMode === 4) {
      await TeleportSeamlessHelper_1.TeleportSeamlessHelper.SeamlessTeleportStart();
    }
    await this.fnm(l, t);
    ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("TeleportPlayerWithLoading");
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 15;
    ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(Protocol_1.Aki.Protocol.Nks.Proto_Normal);
    await this.WaitRenderAssetsStreamingCompleted(t);
    if (a.TeleportMode === 4) {
      await TeleportSeamlessHelper_1.TeleportSeamlessHelper.SeamlessTeleportPreEnd();
    }
    await this.WaitTeamLoaded();
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CloseLoading");
    if (r) {
      this.gnm();
      this.Cnm();
    } else {
      this.anm();
      this.hnm();
      if (a.TeleportMode !== 4) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
        this.dnm(false);
      }
      this._nm();
    }
    ModelManager_1.ModelManager.GameModeModel?.StopIndependentStreaming(ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTriggerOrUndefined());
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 16;
    ControllerHolder_1.ControllerHolder.RoleAudioController.SetUpdateAudioDynamicTrace(true);
    ResourceSystem_1.ResourceSystem.SetLoadModeInGame(GlobalData_1.GlobalData.World, e);
    if (l) {
      ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
    }
    await this.HandleTakeVehicleDuringTeleport();
    await this.WaitRollbackCompleted();
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 19;
    await TeleportTransitionHelper_1.TeleportTransitionHelper.WaitTeleportTransition(a.TeleportReason, a.Option);
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 20;
    cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CloseLoading");
    if (a.WaitServerResponse) {
      await this.WaitServerResponse();
    }
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.TeleportFinish");
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = true;
    this.cnm(e);
    ControllerHolder_1.ControllerHolder.PerfSightController.MarkLevelLoadCompleted();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotTeleportToPositionFinished);
    this.EmitTeleportCompleteEvent();
    this.HandleTimeDilationAfterTeleport();
    cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.TeleportFinish");
    cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport");
    return true;
  }
  static async FakeTeleportPlayerWithLoading(e) {
    var r = ModelManager_1.ModelManager.TeleportModel;
    if (r.IsTeleport) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Teleport", 79, "伪传送: 无法调用, 已经在传送中", ["Reason", e]);
      }
      return false;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 79, "伪传送: 开始", ["原因", r.TeleportReason], ["Reason", e]);
      }
      r.IsTeleport = true;
      ModelManager_1.ModelManager.CharacterModel.ExitAllSelfCenteredMode();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 79, "传送:慢放解除", ["Reason", e]);
      }
      r.CreatePromise();
      if (r.TeleportReason === Protocol_1.Aki.Protocol.v4s.cVu) {
        await TeleportTransitionHelper_1.TeleportTransitionHelper.WaitTeleportTransition(r.TeleportReason, undefined);
      }
      await this.WaitServerResponse();
      await r.TeleportFinishRequest.Promise;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotTeleportToPositionFinished);
      r.ResetPromise();
      r.IsTeleport = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 79, "伪传送: 完成", ["Reason", e]);
      }
      ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
      return true;
    }
  }
  static mnm(e) {
    return e !== 4;
  }
  static snm(e, r, t, o) {
    var l;
    if (e) {
      l = ModelManager_1.ModelManager.TeleportModel;
      if ((e = ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(e))?.Valid) {
        l.StartPosition.DeepCopy(e.ActorLocationProxy);
        l.StartRotation.DeepCopy(e.ActorRotationProxy);
        l.StartGravityDirect.DeepCopy(e.ActorGravityDirectProxy);
      }
      l.TargetPosition.DeepCopy(r);
      if (o) {
        l.TargetGravityDirect.DeepCopy(o);
      } else {
        l.TargetGravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy);
      }
      if (!l.TargetGravityDirect.Normalize()) {
        l.TargetGravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy);
      }
      if (MathUtils_1.MathUtils.IsNearlyEqual(l.TargetGravityDirect.Z, -1) && l.TargetGravityDirect.Inequality(Vector_1.Vector.DownVectorProxy)) {
        l.TargetGravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy);
      }
      if (t) {
        l.TargetRotation.DeepCopy(t);
      } else if (e?.Valid) {
        Quat_1.Quat.FindBetween(e.ActorGravityDirectProxy, l.TargetGravityDirect, MathUtils_1.MathUtils.CommonTempQuat);
        r = Quat_1.Quat.Create();
        MathUtils_1.MathUtils.CommonTempQuat.Multiply(e.ActorRotationProxy.Quaternion(), r);
        r.Rotator(l.TargetRotation);
      } else {
        l.TargetRotation.Reset();
      }
      o = l.TargetGravityDirect.Multiply(-1, Vector_1.Vector.Create());
      l.TargetRotation.Quaternion().GetForwardVector(MathUtils_1.MathUtils.CommonTempVector);
      MathUtils_1.MathUtils.LookRotationUpFirst(MathUtils_1.MathUtils.CommonTempVector, o, l.TargetRotation);
    }
  }
  static async fnm(e, r) {
    ControllerHolder_1.ControllerHolder.PerfSightController.StartPersistentOrDungeon();
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport");
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CheckVoxelStreaming");
    ModelManager_1.ModelManager.GameModeModel.StartIndependentStreaming(ModelManager_1.ModelManager.TeleportModel.TargetPosition.ToUeVector());
    TeleportStreamingHelper_1.TeleportStreamingHelper.FlushWorldPartitionUnloadingStreamingCells();
    if (e) {
      ControllerHolder_1.ControllerHolder.WorldController.ManuallyClearStreamingPool();
    }
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 11;
    await TeleportStreamingHelper_1.TeleportStreamingHelper.CheckStreamingCompleted(true);
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 12;
    cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CheckVoxelStreaming");
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CheckStreaming");
    if (e) {
      ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
    }
    ControllerHolder_1.ControllerHolder.GameModeController.AddOrRemoveRenderAssetsQueryViewInfo(r, ResourceSystem_1.WAIT_RENDER_ASSET_DURATION);
    if (ModelManager_1.ModelManager.GameModeModel.PreAwakeEntityDuringLoad) {
      await this.PreAwakeEntitiesFromPending();
    }
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 13;
    await TeleportStreamingHelper_1.TeleportStreamingHelper.CheckStreamingCompleted();
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 14;
    cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CheckStreaming");
    if (e) {
      ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
      ControllerHolder_1.ControllerHolder.WorldController.ManuallyResetStreamingPool();
    }
  }
  static EmitTeleportStartEvent(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportStart, true);
    if (e) {
      EventSystem_1.EventSystem.EmitWithTarget(e, EventDefine_1.EEventName.TeleportStartEntity, true);
    }
  }
  static EmitTeleportCompleteEvent() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportComplete);
  }
  static anm() {
    var e = ModelManager_1.ModelManager.TeleportModel;
    var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity.GetComponent(3);
    if (r) {
      r.SetInputRotator(e.TargetRotation);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Teleport", 79, "传送失败, 找不到当前编队实体的CharacterActorComponent");
    }
  }
  static hnm() {
    var e = ModelManager_1.ModelManager.TeleportModel;
    var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    var t = r?.Entity.GetComponent(3);
    if (t) {
      r?.Entity?.GetComponent(181)?.StopModelBuffer();
      t.SetActorRotation(e.TargetRotation.ToUeRotator(), "TeleportController", false);
      t.MoveComp?.SetGravityDirectWithoutRotate(e.TargetGravityDirect);
      t.TeleportAndFindStandLocation(e.TargetPosition);
      EventSystem_1.EventSystem.EmitWithTarget(r.Entity, EventDefine_1.EEventName.TeleportChangeLocation);
      ControllerHolder_1.ControllerHolder.RoleTriggerController.UpdateTransform();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Teleport", 79, "传送失败, 找不到当前编队实体的CharacterActorComponent");
    }
  }
  static sIm() {
    if (this.WIo) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.WIo);
    }
    ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = true;
    this.WIo = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = false;
      this.WIo = undefined;
    }, SKIP_FALL_INJURE_TIME);
  }
  static gnm() {
    var e;
    var r = ModelManager_1.ModelManager.TeleportModel;
    var t = r.TeleportEntityHandle;
    if (t?.Valid) {
      (e = ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(t)).SetActorRotation(r.TargetRotation.ToUeRotator(), "ResetLocationForZRangeNotify");
      e.MoveComp?.SetGravityDirectWithoutRotate(r.TargetGravityDirect);
      r = Vector_1.Vector.Create(r.TargetPosition);
      e.SetActorLocation(r.ToUeVector(), "ResetLocationForZRangeNotify", false);
      e.MoveComp?.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      t.Entity.GetComponent(67)?.ClearReplaySamples();
      EventSystem_1.EventSystem.EmitWithTarget(t.Entity, EventDefine_1.EEventName.TeleportChangeLocation);
      ControllerHolder_1.ControllerHolder.RoleTriggerController.UpdateTransform();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Entity", 79, "传送载具: 设置载具实体位置", ["CreatureDataId", t.CreatureDataId], ["PbDataId", t.PbDataId], ["EntityId", t.Entity.Id], ["Location", r.ToString()]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "传送载具: 实体已无效", ["CreatureDataId", t?.CreatureDataId]);
    }
  }
  static _nm(e = true) {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator());
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(e);
  }
  static Cnm(e = true) {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(ModelManager_1.ModelManager.TeleportModel.TargetRotation.ToUeRotator());
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(e);
  }
  static dnm(e) {
    var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (r?.Valid && (r = r.Entity.GetComponent(3))?.Valid && r.Actor?.IsValid() && r.Actor.CharacterMovement?.IsValid()) {
      e = e ? 0 : r.Actor.CharacterMovement.DefaultLandMovementMode;
      r.Actor.KuroSetMovementMode({
        Mode: e,
        Context: "[TeleportController.HandleCharacterMovementMode]"
      });
    }
  }
  static async CheckLiveLocationStreamingCompleted() {
    if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() || !!ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 11;
      await TeleportStreamingHelper_1.TeleportStreamingHelper.CheckLiveLocationStreamingCompleted(true);
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 12;
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 13;
      await TeleportStreamingHelper_1.TeleportStreamingHelper.CheckLiveLocationStreamingCompleted(false);
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 14;
    }
  }
  static async WaitServerResponse() {
    var e = new Protocol_1.Aki.Protocol.pCs();
    Net_1.Net.Call(21130, e, e => {
      ModelManager_1.ModelManager.TeleportModel.TeleportFinishRequest.SetResult(true);
    });
    await ModelManager_1.ModelManager.TeleportModel.TeleportFinishRequest.Promise;
  }
  static unm() {
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 15;
    ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(Protocol_1.Aki.Protocol.Nks.Proto_Normal);
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 16;
  }
  static async PreAwakeEntitiesFromPending() {
    await ControllerHolder_1.ControllerHolder.CreatureController.PreAwakeEntitiesFromPending(Protocol_1.Aki.Protocol.Nks.Proto_SceneInit);
  }
  static async WaitRenderAssetsStreamingCompleted(e) {
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CheckRenderAssets");
    await ControllerHolder_1.ControllerHolder.GameModeController.CheckRenderAssetsStreamingCompleted(e, "传送");
    cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CheckRenderAssets");
  }
  static async WaitTeamLoaded() {
    cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.LoadTeam");
    await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
    cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.LoadTeam");
  }
  static async HandleTakeVehicleDuringTeleport() {
    if (ModelManager_1.ModelManager.TeleportModel.TeleportReason !== Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle) {
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
  static async WaitRollbackCompleted() {
    if (ModelManager_1.ModelManager.TeleportModel.TeleportReason === Protocol_1.Aki.Protocol.v4s.Proto_BtRollbackFailed) {
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        ModelManager_1.ModelManager.TeleportModel.TeleportWaitRequest?.SetResult(true);
      }, DELAYCLOSETIME);
      await ModelManager_1.ModelManager.TeleportModel.TeleportWaitRequest?.Promise;
    }
  }
  static HandleTimeDilationBeforeTeleport() {
    ControllerHolder_1.ControllerHolder.GameModeController.ForceDisableGamePaused(true);
  }
  static HandleTimeDilationAfterTeleport() {
    ControllerHolder_1.ControllerHolder.GameModeController.ForceDisableGamePaused(false);
    ControllerHolder_1.ControllerHolder.CommonQteController.RecoverTimeDilationAfterTeleport();
  }
  static nnm(e, r, t, o, l = true) {
    var a = ModelManager_1.ModelManager.TeleportModel;
    a.CreatePromise();
    a.IsTeleport = true;
    a.NeedRestoreCamera = l;
    ModelManager_1.ModelManager.GameModeModel.SetBornInfo(r, t);
    ModelManager_1.ModelManager.GameModeModel.IsTeleport = true;
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 2;
    ModelManager_1.ModelManager.GameModeModel.RenderAssetDone = o;
    ControllerHolder_1.ControllerHolder.WorldController.SetEnableWorldOriginTickCheck(e, false);
    ModelManager_1.ModelManager.CharacterModel.ExitAllSelfCenteredMode();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "传送: 慢放解除", ["Reason", e]);
    }
  }
  static cnm(e) {
    ModelManager_1.ModelManager.TeleportModel.ResetTeleportData();
    ControllerHolder_1.ControllerHolder.RoleAudioController.SetUpdateAudioDynamicTrace(true);
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 1;
    this.OIo(ModelManager_1.ModelManager.TeleportModel.TeleportId);
    ControllerHolder_1.ControllerHolder.WorldController.SetEnableWorldOriginTickCheck(e, true);
  }
  static OIo(e) {
    if ((e &&= ConfigManager_1.ConfigManager.WorldMapConfig.GetTeleportEntityConfigId(e)) && (e = ModelManager_1.ModelManager.CreatureModel?.GetEntityData(e)?.AreaId)) {
      if (ModelManager_1.ModelManager.AreaModel.GetArea(e)) {
        if (e === ModelManager_1.ModelManager.AreaModel.AreaInfo?.AreaId) {
          ModelManager_1.ModelManager.AreaModel.SetAreaName(e, true);
        }
      } else {
        ModelManager_1.ModelManager.AreaModel.AddWatchArea(e);
      }
    }
  }
  static BackToGameIfTargetPositionInvalid(e, r) {
    var t = ModelManager_1.ModelManager.GameModeModel.MapId;
    var [o, l] = ControllerHolder_1.ControllerHolder.ResourceManagerController.IsBlockResourceDownloaded(t, e);
    return (!o || !!l) && !((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(405)).FunctionMap.set(1, () => {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
      ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.InvalidTeleportPosition);
    }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(o), Log_1.Log.CheckError() && Log_1.Log.Error("Teleport", 60, "传送: 目标位置所在区块资源未下载, 回到登录界面", ["mapId", t], ["position", e], ["reason", r]), 0);
  }
}
(_a = TeleportControllerNew).WIo = undefined;
TeleportControllerNew.dLe = () => {
  _a.dnm(true);
  _a.sIm();
};
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "==========传送:")], TeleportControllerNew, "TeleportPlayerWithoutLoading", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "==========传送:")], TeleportControllerNew, "TeleportElevatorAndPlayerSeparately", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "==========传送:")], TeleportControllerNew, "TeleportPlayerWithVehicle", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "==========传送:")], TeleportControllerNew, "TeleportPlayerWithLoading", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "==========传送:")], TeleportControllerNew, "FakeTeleportPlayerWithLoading", null);
__decorate([(0, Log_1.logDecorator)("Teleport", 79, "传送: 发送传送开始事件")], TeleportControllerNew, "EmitTeleportStartEvent", null);
__decorate([(0, Log_1.logDecorator)("Teleport", 79, "传送: 发送传送结束事件")], TeleportControllerNew, "EmitTeleportCompleteEvent", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 流送检测")], TeleportControllerNew, "CheckLiveLocationStreamingCompleted", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 通知服务器传送完成")], TeleportControllerNew, "WaitServerResponse", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 预唤醒实体")], TeleportControllerNew, "PreAwakeEntitiesFromPending", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 等待场景渲染资源完成")], TeleportControllerNew, "WaitRenderAssetsStreamingCompleted", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 等待编队加载")], TeleportControllerNew, "WaitTeamLoaded", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 处理传送过程中乘坐载具")], TeleportControllerNew, "HandleTakeVehicleDuringTeleport", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 回退强制延迟1.5秒")], TeleportControllerNew, "WaitRollbackCompleted", null);
__decorate([(0, Log_1.logDecorator)("Teleport", 79, "传送: 传送前解除时停")], TeleportControllerNew, "HandleTimeDilationBeforeTeleport", null);
__decorate([(0, Log_1.logDecorator)("Teleport", 79, "传送: 传送后恢复时停")], TeleportControllerNew, "HandleTimeDilationAfterTeleport", null);
exports.TeleportControllerNew = TeleportControllerNew; //# sourceMappingURL=TeleportControllerNew.js.map