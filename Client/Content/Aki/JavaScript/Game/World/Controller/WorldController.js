"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldController = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const EntityVoxelInfoByMapIdAndEntityId_1 = require("../../../Core/Define/ConfigQuery/EntityVoxelInfoByMapIdAndEntityId");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityHelper_1 = require("../../../Core/Entity/EntityHelper");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const Net_1 = require("../../../Core/Net/Net");
const LoadModeManager_1 = require("../../../Core/Performance/LoadMode/LoadModeManager");
const PerformanceController_1 = require("../../../Core/Performance/PerformanceController");
const PerfSight_1 = require("../../../Core/PerfSight/PerfSight");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Platform_1 = require("../../../Launcher/Platform/Platform");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const FormationDataController_1 = require("../../Module/Abilities/FormationDataController");
const PhantomUtil_1 = require("../../Module/Phantom/PhantomUtil");
const UiManager_1 = require("../../Ui/UiManager");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const VoxelUtils_1 = require("../../Utils/VoxelUtils");
const CreatureModel_1 = require("../Model/CreatureModel");
const WorldModel_1 = require("../Model/WorldModel");
const AttachToActorController_1 = require("./AttachToActorController");
const DELTA_TIME_LIMIT_LOW = 20;
const DELTA_TIME_LIMIT_HIGH = 25;
const MIN_DELTA = 0;
const MAX_DELTA = 0;
const SCHEDULER_MINUS_FRAME_COUNT = 5;
const DEFAULT_ENVIRONMENTTYPE = 255;
const IOS_STREAMING_POOL_SIZE = 250;
const IOS_STREAMING_POOL_SIZE_FOR_MESHES = 250;
const IOS_STREAMING_POOL_SIZE_IN_LOADING = 90;
const IOS_STREAMING_POOL_SIZE_FOR_MESHES_IN_LOADING = 90;
const HIGH_SPEED_REMOVE_INTERVAL = 10;
const MAX_PENDING_REMOVE_COUNT = 100;
const LOW_MEMORY_PENDING_REMOVE_COUNT = 50;
class WorldController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    var e;
    ModelManager_1.ModelManager.WorldModel.CurrentSchedulerDelta = MAX_DELTA;
    if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen) {
      e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.FrameRate;
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetMaximumFrameRate(e);
    }
    PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity = !Info_1.Info.IsBuildShipping;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SettingFrameRateChanged, this.zfi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.Bpr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveOnlineWorld, this.Mze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangePerformanceLimitMode, this.Zfi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    Net_1.Net.Register(28651, WorldController.RBn);
    TickSystem_1.TickSystem.Add(this.k1r.bind(this), "WorldController", 2);
    TickSystem_1.TickSystem.Add(this.Bbl.bind(this), "WorldController", 5, true);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "wo.ParallelOffset 1");
    this.qpr = TimerSystem_1.GameplayTimerSystem.Forever(this.Gpr, 1800000, 1, undefined, "WorldController.OnInit.MemoryGcCheck", false);
    this.LTl = TimerSystem_1.GameplayTimerSystem.Forever(this.RTl, 5000);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SettingFrameRateChanged, this.zfi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.Bpr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveOnlineWorld, this.Mze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangePerformanceLimitMode, this.Zfi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    Net_1.Net.UnRegister(28651);
    ModelManager_1.ModelManager.WorldModel.ControlPlayerLastLocation = undefined;
    if (this.LTl) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.LTl);
      this.LTl = undefined;
    }
    return true;
  }
  static moh() {
    if (LoadModeManager_1.LoadModeManager.IsLoadModeInGameOrForceInGame()) {
      if (this.Kpr) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "wp.Runtime.MaxLoadingStreamingCells 1");
      } else {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "wp.Runtime.MaxLoadingStreamingCells 4");
      }
    }
  }
  static ForceGarbageCollection(e) {
    var t = cpp_1.KuroTime.GetMilliseconds64();
    UE.KuroStaticLibrary.ForceGarbageCollection(e);
    var e = cpp_1.KuroTime.GetMilliseconds64() - t;
    if (PerfSight_1.PerfSight.IsEnable) {
      cpp_1.FKuroPerfSightHelper.PostValueFloat1("CustomPerformance", "ForceGarbageCollection", e);
    }
  }
  static ManuallyGarbageCollection(e) {
    var t;
    if (this.mea === 0 && (this.mea = 1, Platform_1.Platform.IsAndroidPlatform()) && (t = UE.KuroStaticLibrary.GetDeviceCPU()).includes("SDM660")) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 30, "Disable ManuallyGarbageCollection", ["cpu", t]);
      }
      this.mea = 2;
    }
    if (this.mea === 1 && (Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 24, "ManuallyGarbageCollection", ["Reason: ", e]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TestManuallyGarbageCollection), t = cpp_1.KuroTime.GetMilliseconds64(), global.memoryPressureNotification(e === 0 ? 1 : 2), e = cpp_1.KuroTime.GetMilliseconds64() - t, PerfSight_1.PerfSight.IsEnable)) {
      cpp_1.FKuroPerfSightHelper.PostValueFloat1("CustomPerformance", "ManuallyGarbageCollection", e);
    }
  }
  static ManuallyClearStreamingPool() {
    if (Info_1.Info.PlatformType === 1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 36, "ManuallyClearStreamingPool In IOS");
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.PoolSize " + IOS_STREAMING_POOL_SIZE_IN_LOADING);
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.PoolSizeForMeshes " + IOS_STREAMING_POOL_SIZE_FOR_MESHES_IN_LOADING);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnManuallyClearStreamingPool);
  }
  static ManuallyResetStreamingPool() {
    if (Info_1.Info.PlatformType === 1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 36, "ManuallyResetStreamingPool In IOS");
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.PoolSize " + IOS_STREAMING_POOL_SIZE);
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.PoolSizeForMeshes " + IOS_STREAMING_POOL_SIZE_FOR_MESHES);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnManuallyResetStreamingPool);
  }
  static k1r() {
    if (!GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen) {
      var e = ModelManager_1.ModelManager.WorldModel;
      if (Time_1.Time.DeltaTime <= DELTA_TIME_LIMIT_HIGH && Time_1.Time.DeltaTime >= DELTA_TIME_LIMIT_LOW) {
        e.ChangeSchedulerLastType = 0;
      } else if (Time_1.Time.DeltaTime > DELTA_TIME_LIMIT_HIGH && e.CurrentSchedulerDelta > MIN_DELTA) {
        if (e.ChangeSchedulerLastType !== 1) {
          e.ChangeSchedulerLastType = 1;
          e.ChangeSchedulerDeltaFrameCount = 0;
        } else if (++e.ChangeSchedulerDeltaFrameCount >= SCHEDULER_MINUS_FRAME_COUNT) {
          --e.CurrentSchedulerDelta;
          e.ChangeSchedulerDeltaFrameCount = 0;
          for (const t of ModelManager_1.ModelManager.WorldModel.TickIntervalSchedulers) {
            t.SetCountDelta(e.CurrentSchedulerDelta);
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("World", 6, "Decrease max tick count", ["Delta", e.CurrentSchedulerDelta]);
          }
        }
      } else if (Time_1.Time.DeltaTime < DELTA_TIME_LIMIT_LOW && e.CurrentSchedulerDelta < MAX_DELTA) {
        if (e.ChangeSchedulerLastType !== 2) {
          e.ChangeSchedulerLastType = 2;
          e.ChangeSchedulerDeltaFrameCount = 0;
        } else if (++e.ChangeSchedulerDeltaFrameCount >= 10) {
          ++e.CurrentSchedulerDelta;
          e.ChangeSchedulerDeltaFrameCount = 0;
          for (const r of ModelManager_1.ModelManager.WorldModel.TickIntervalSchedulers) {
            r.SetCountDelta(e.CurrentSchedulerDelta);
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("World", 6, "Increase max tick count", ["Delta", e.CurrentSchedulerDelta]);
          }
        }
      }
      for (const o of ModelManager_1.ModelManager.WorldModel.TickIntervalSchedulers) {
        o.Schedule();
      }
    }
    if (this.Kr_()) {
      this.$r_ = 0;
      this.tKd();
      let e = this.iKd;
      while (e-- > 0) {
        this.Npr();
        this.Opr();
      }
    }
  }
  static tKd() {
    if ((Info_1.Info.IsLowMemoryDevice ? LOW_MEMORY_PENDING_REMOVE_COUNT : MAX_PENDING_REMOVE_COUNT) < ModelManager_1.ModelManager.CreatureModel.PendingRemoveEntitySize()) {
      this.iKd++;
    } else {
      this.iKd--;
    }
    if (this.iKd < 1) {
      this.iKd = 1;
    }
  }
  static Kr_() {
    this.$r_++;
    if (!Info_1.Info.IsLowMemoryDevice && ModelManager_1.ModelManager.CreatureModel.PendingRemoveEntitySize() < MAX_PENDING_REMOVE_COUNT && (ControllerHolder_1.ControllerHolder.PlayerVelocityController.IsHighSpeedMode() || ControllerHolder_1.ControllerHolder.PlayerSoarMonitorController.IsPlayerSoar)) {
      this.Xr_ = HIGH_SPEED_REMOVE_INTERVAL;
    } else {
      this.Xr_ = 0;
    }
    return this.$r_ >= this.Xr_;
  }
  static Bbl() {
    if (this.EnableWorldOriginTickCheck && Global_1.Global.BaseCharacter !== undefined) {
      this.FixWorldOriginTickCheck(Global_1.Global.BaseCharacter.D_K2_GetActorLocation());
    }
  }
  static Npr() {
    var e = ModelManager_1.ModelManager.CreatureModel;
    if (e.PendingRemoveEntitySize() && e.PeekPendingRemoveEntity().AllowDestroy) {
      this.kpr(e.PopPendingRemoveEntity());
    }
  }
  static kpr(e) {
    var t;
    var r;
    var o;
    var i;
    var l;
    if (e) {
      if (Global_1.Global.WorldEntityHelper) {
        if (e.Valid) {
          t = AttachToActorController_1.AttachToActorController.DetachActorsBeforeDestroyEntity(e);
          r = e.Entity.GetComponent(1)?.Owner;
          o = e.Entity.GetComponent(0).GetCreatureDataId();
          i = Global_1.Global.WorldEntityHelper.Destroy(e);
          l = AttachToActorController_1.AttachToActorController.DetachActorsAfterDestroyEntity(e.Id);
          if (i) {
            ModelManager_1.ModelManager.WorldModel.AddDestroyActor(o, e.Id, r);
          } else {
            this.DestroyEntityActor(o, e.Id, r, false);
          }
          if (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(e) && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Entity", 3, "[实体生命周期:删除实体] DestroyEntity结束", ["CreatureDataId", o], ["EntityId", e.Id], ["EntitySystem.DestroyEntity结果", i], ["BeforDetachActors", t], ["AfterDetachActors", l]);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Entity", 3, "[WorldController.DestroyEntity] 重复删除Entity", ["CreatureDataId", e.CreatureDataId]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "[WorldController.DestroyEntity] WorldEntityHelper无效");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "[WorldController.DestroyEntity] handle参数无效");
    }
  }
  static Opr() {
    var e = ModelManager_1.ModelManager.WorldModel;
    if (e.DestroyActorQueue.Size !== 0 && (e = e.PopDestroyActor(), GlobalData_1.GlobalData.World?.IsValid())) {
      ModelManager_1.ModelManager.WorldModel.RemoveIgnore(e[2]);
      this.DestroyEntityActor(e[0], e[1], e[2]);
    }
  }
  static DoLeaveLevel() {
    if (GlobalData_1.GlobalData.World?.IsValid()) {
      for (var e = ModelManager_1.ModelManager.CreatureModel; e.PendingRemoveEntitySize();) {
        this.kpr(e.PopPendingRemoveEntity());
      }
      for (var t = ModelManager_1.ModelManager.WorldModel; t.DestroyActorQueue.Size;) {
        var r = t.PopDestroyActor();
        this.DestroyEntityActor(r[0], r[1], r[2]);
      }
      t.ClearIgnore();
    }
  }
  static SetActorDataByCreature(e, t) {
    this.Fpr(e);
    this.SetActorGravityDirection(e, t);
    this.SetActorLocationAndRotation(e, t);
    this.Vpr(e, t);
  }
  static Fpr(e) {
    var t = e.Entity;
    var r = e.GetEntityType();
    if (r !== Protocol_1.Aki.Protocol.kks.Proto_Monster && r !== Protocol_1.Aki.Protocol.kks.HI_ || t.GetComponent(235)) {
      e = e.GetPlayerId() === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() || r === Protocol_1.Aki.Protocol.kks.Proto_Npc;
      r = (r = t.GetComponent(169)) ? r.HasMoveAuthority() : e;
      t.GetComponent(1).SetAutonomous(e, r);
    }
  }
  static SetActorGravityDirection(e, t) {
    if (t && (e = e.GetInitGravityDirection()) && (t = (t = ActorUtils_1.ActorUtils.GetEntityByActor(t)?.Entity)?.GetComponent(48) ?? t?.GetComponent(249))) {
      t.SetGravityDirect(e);
    }
  }
  static SetActorLocationAndRotation(e, t) {
    var r;
    if (t && (r = e.GetLocation(), e = e.GetRotation(), t.D_K2_SetActorLocationAndRotation(r, e, false, undefined, true), r = UE.KismetMathLibrary.Conv_VectorDoubleToVector(r), ActorUtils_1.ActorUtils.GetEntityByActor(t)?.Entity?.GetComponent(189)?.CharacterMovement)) {
      ActorUtils_1.ActorUtils.GetEntityByActor(t).Entity.GetComponent(189).CharacterMovement.AddReplayData((0, puerts_1.$ref)(r), (0, puerts_1.$ref)(e), (0, puerts_1.$ref)(Vector_1.Vector.ZeroVector), (0, puerts_1.$ref)(Vector_1.Vector.ZeroVector), 0, 0);
    }
  }
  static Vpr(e, t) {
    if (t) {
      e = e.GetPublicTags();
      if (e !== undefined) {
        for (const o of e) {
          var r = FNameUtil_1.FNameUtil.GetDynamicFName(o);
          t.Tags.Add(r);
        }
      }
    }
  }
  static DestroyEntityActor(e, t, r, o = true) {
    r = this.DestroyActor(r, e, t, o);
    if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && (o = AttachToActorController_1.AttachToActorController.CheckAttachError(t), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Entity", 3, "[实体生命周期:删除实体] 删除实体Actor", ["CreatureDataId", e], ["EntityId", t], ["Result", r], ["AttachSuccess", o]);
    }
    return r;
  }
  static DestroyActor(e, t, r, o = true) {
    if (!e?.IsValid()) {
      return false;
    }
    if (!e.GetWorld()?.IsValid()) {
      return false;
    }
    let i = undefined;
    if (e.IsA(UE.Pawn.StaticClass())) {
      i = e.Controller;
    }
    this.Hpr.length = 0;
    this.jpr(e, this.Hpr, true);
    while (this.Hpr.length) {
      var l = this.Hpr.pop();
      if (l?.IsValid() && l.GetWorld()?.IsValid() && l !== i && !ModelManager_1.ModelManager.AttachToActorModel.GetEntityIdByActor(l)) {
        l.K2_DetachFromActor(1, 1, 1);
        if (l.IsA(UE.TsEffectActor_C.StaticClass())) {
          l.StopEffect("[WorldController.DestroyActor] 销毁entity的actor前先停止所有附加的特效", true);
        } else if (l.IsA(UE.EffectSystemActor.StaticClass())) {
          if (l) {
            l.StopEffect(FNameUtil_1.FNameUtil.GetDynamicFName("[WorldController.DestroyActor] 销毁entity的actor前先停止所有附加的特效"), true, false);
          }
        } else if (!l.IsA(UE.KuroEntityActor.StaticClass())) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("World", 3, "存在未Detach的Actor", ["CreatureDataId", t], ["EntityId", r], ["父Actor", e.GetName()], ["子Actor", l.GetName()]);
          }
        }
      }
    }
    if (o) {
      ActorSystem_1.ActorSystem.Put("WorldController.DestroyActor " + t, e);
    } else {
      e.K2_DestroyActor();
    }
    return true;
  }
  static jpr(e, t, r) {
    if (e?.IsValid()) {
      if (!r) {
        t.push(e);
      }
      var r = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
      e.GetAttachedActors(r, true);
      var o = (0, puerts_1.$unref)(r);
      for (let e = 0; e < o.Num(); ++e) {
        this.jpr(o.Get(e), t, false);
      }
    }
  }
  static EnvironmentInfoUpdate(e, t, r = false) {
    if (ModelManager_1.ModelManager.WorldModel.IsEnableEnvironmentDetecting && t && ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
      var o;
      var t = GlobalData_1.GlobalData.World;
      if (t?.IsValid()) {
        o = (0, puerts_1.$ref)(undefined);
        VoxelUtils_1.VoxelUtils.TryGetVoxelInfo(t, e, o);
        o = (0, puerts_1.$unref)(o);
        o = ModelManager_1.ModelManager.WorldModel.HandleEnvironmentUpdate(o);
        if (r || o) {
          return this.Nd_(t, e, r);
        } else {
          return undefined;
        }
      }
    }
  }
  static ChangeCaveOrRoomDatalayer(e, t, r, o) {
    if (o) {
      UE.KuroRenderingRuntimeBPPluginBPLibrary.SetWorldPartitionDataLayerState(e, t, true);
      UE.KuroRenderingRuntimeBPPluginBPLibrary.SetWorldPartitionDataLayerState(e, r, false);
    } else {
      UE.KuroRenderingRuntimeBPPluginBPLibrary.SetWorldPartitionDataLayerState(e, t, false);
      UE.KuroRenderingRuntimeBPPluginBPLibrary.SetWorldPartitionDataLayerState(e, r, true);
    }
  }
  static Nd_(e, t, r) {
    var o = ModelManager_1.ModelManager.WorldModel.ApplyEnvironmentUpdate();
    if (o !== 0) {
      var i = FNameUtil_1.FNameUtil.GetDynamicFName(ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo.DataLayerType);
      var l = FNameUtil_1.FNameUtil.GetDynamicFName(ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo.SubDataLayerType);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEncloseSpaceTypeChange, o);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 60, "[WorldController]Streaming:体素参数", ["DataLayer", i], ["SubDatalayer", l]);
      }
      switch (o) {
        case 5:
          this.ChangeCaveOrRoomDatalayer(e, i, l, true);
          UE.KuroRenderingRuntimeBPPluginBPLibrary.SetIsUsingInCaveOrIndoorShadow(e, true, WorldModel_1.MOBILE_CSM_DISTANCE_INCAVE, WorldModel_1.MOBILE_CSM_DISTANCE_OUTCAVE);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOverlapEncloseSpace, true);
          cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(2);
          if (r) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelEvent", 7, "[WorldController]Streaming:进入封闭空间[传送]");
            }
          } else {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("LevelEvent", 7, "[WorldController]Streaming:非传送下,无过渡区域进入封闭空间", ["Location", t]);
            }
            this.RequestToNearestTeleport();
          }
          return i;
        case 1:
          this.ChangeCaveOrRoomDatalayer(e, i, l, true);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 7, "[WorldController]Streaming:进入封闭空间");
          }
          cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(3);
          return i;
        case 6:
          this.ChangeCaveOrRoomDatalayer(e, i, l, false);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOverlapEncloseSpace, false);
          cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(1);
          if (r) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelEvent", 7, "[WorldController]Streaming:退出封闭空间[传送]");
            }
          } else {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("LevelEvent", 7, "[WorldController]Streaming:非传送下,无过渡区域退出封闭空间", ["Location", t]);
            }
            this.RequestToNearestTeleport();
          }
          UE.KuroRenderingRuntimeBPPluginBPLibrary.SetIsUsingInCaveOrIndoorShadow(e, false, WorldModel_1.MOBILE_CSM_DISTANCE_INCAVE, WorldModel_1.MOBILE_CSM_DISTANCE_OUTCAVE);
          break;
        case 2:
          UE.KuroRenderingRuntimeBPPluginBPLibrary.SetIsUsingInCaveOrIndoorShadow(e, false, WorldModel_1.MOBILE_CSM_DISTANCE_INCAVE, WorldModel_1.MOBILE_CSM_DISTANCE_OUTCAVE);
          cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(3);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOverlapEncloseSpace, false);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 7, "[WorldController]Streaming:退出封闭空间");
          }
          break;
        case 4:
          cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(1);
          this.ChangeCaveOrRoomDatalayer(e, i, l, false);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 7, "[WorldController]Streaming:完成退出封闭空间");
          }
          break;
        case 3:
          UE.KuroRenderingRuntimeBPPluginBPLibrary.SetIsUsingInCaveOrIndoorShadow(e, true, WorldModel_1.MOBILE_CSM_DISTANCE_INCAVE, WorldModel_1.MOBILE_CSM_DISTANCE_OUTCAVE);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 7, "[WorldController]Streaming:完成进入封闭空间");
          }
          cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(2);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOverlapEncloseSpace, true);
      }
    }
  }
  static IsEncloseSpace(e, t, r, o, i = false) {
    if (!ModelManager_1.ModelManager.GameModeModel.UseWorldPartition || !e) {
      return false;
    }
    var l = GlobalData_1.GlobalData.World;
    if (!l?.IsValid()) {
      return false;
    }
    if (r === Protocol_1.Aki.Protocol.kks.Proto_Player || r === Protocol_1.Aki.Protocol.kks.Proto_Vision || i) {
      return false;
    }
    let n = undefined;
    if (!(n = o === Protocol_1.Aki.Protocol.rLs.F6n ? EntityVoxelInfoByMapIdAndEntityId_1.configEntityVoxelInfoByMapIdAndEntityId.GetConfig(ModelManager_1.ModelManager.GameModeModel.MapId, e) : n)) {
      switch (VoxelUtils_1.VoxelUtils.GetVoxelInfo(l, t).EnvType) {
        case 0:
        case 1:
          return true;
        default:
          DEFAULT_ENVIRONMENTTYPE;
          return false;
      }
    }
    switch (n.EnvType) {
      case 0:
      case 1:
        return true;
      default:
        DEFAULT_ENVIRONMENTTYPE;
        return false;
    }
  }
  static RequestToNearestTeleport() {
    Net_1.Net.Call(28285, Protocol_1.Aki.Protocol.ECs.create(), e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerIsTeleportCanNotDoTeleport && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21146);
      }
    });
  }
  static GetEntitiesInRangeWithLocation(t, r, o, i, e) {
    var l = i instanceof Set;
    if (e) {
      if (l) {
        i.clear();
      } else {
        i.length = 0;
      }
    }
    var n = [];
    for (let e = 0; e < 8; e++) {
      if (o & 1 << e) {
        cpp_1.FKuroGameBudgetAllocatorInterface.GetEntitiesInRangeWithLocation(t, r, FNameUtil_1.FNameUtil.GetDynamicFName(EntityHelper_1.globalEntityTypeQueryName[e]), n);
        for (const _ of n) {
          var a = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(_);
          if (a) {
            if (l) {
              i.add(a);
            } else {
              i.push(a);
            }
          }
        }
        n.length = 0;
      }
    }
  }
  static GetEntitiesInRange(e, t, r, o, i) {
    var l;
    var n = r instanceof Set;
    if (o) {
      if (n) {
        r.clear();
      } else {
        r.length = 0;
      }
    }
    var o = [];
    let a = 0;
    for (let e = 0; e < 8; e++) {
      if (t & 1 << e && (l = CreatureModel_1.globalEntityTypePerceptionType[e]) !== 4) {
        a |= l;
      }
    }
    if (t & 128 && i) {
      i = [];
      cpp_1.FKuroGameBudgetAllocatorInterface.GetAllPlayerEntities(i);
      for (const d of i) {
        var _ = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(d);
        if (_) {
          if (n) {
            r.add(_);
          } else {
            r.push(_);
          }
        }
      }
    }
    cpp_1.FKuroPerceptionInterface.GetEntitiesInRange(e, a, o);
    for (const E of o) {
      var s = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(E);
      if (s) {
        if (n) {
          r.add(s);
        } else {
          r.push(s);
        }
      }
    }
  }
  static GetCustomEntityId(e, t) {
    var r = EntitySystem_1.EntitySystem.Get(e);
    if (r) {
      r = PhantomUtil_1.PhantomUtil.GetSummonedEntity(r, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, t);
      if (r) {
        return r.Id;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 4, "无法找到伴生物拥有者实体", ["ownerEntityId", e]);
    }
    return 0;
  }
  static async StartWorldOriginInUiMode() {
    const e = new CustomPromise_1.CustomPromise();
    if (this.C8l) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 38, "IsWorldOriginInUiMode 开关不成对");
      }
      e.SetResult();
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("World", 38, "StartWorldOriginInUiMode");
      }
      this.qbl.DeepCopy(this.Gbl);
      this.kbl("UI Disable", Vector_1.Vector.ZeroVector);
      this.C8l = true;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnWorldOriginInUiMode, true);
      this.X5_ = 0;
      this.Y5_ = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        if (this.z5_()) {
          if (this.Y5_) {
            TimerSystem_1.GameplayTimerSystem.Remove(this.Y5_);
            this.Y5_ = undefined;
            e.SetResult();
          }
        } else {
          this.X5_++;
          if (this.X5_ > this.J5_ && (Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 38, "StartWorldOriginInUiMode 超过循环次数"), this.Y5_)) {
            TimerSystem_1.GameplayTimerSystem.Remove(this.Y5_);
            this.Y5_ = undefined;
            e.SetResult();
          }
        }
      }, 50);
    }
    await e.Promise;
  }
  static async EndWorldOriginInUiMode() {
    const e = new CustomPromise_1.CustomPromise();
    if (this.C8l) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("World", 38, "EnableWorldOriginByUi");
      }
      this.kbl("UI Enable", this.qbl);
      this.X5_ = 0;
      this.Y5_ = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        if (this.z5_()) {
          this.C8l = false;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnWorldOriginInUiMode, false);
          if (this.Y5_) {
            TimerSystem_1.GameplayTimerSystem.Remove(this.Y5_);
            this.Y5_ = undefined;
            e.SetResult();
          }
        } else {
          this.X5_++;
          if (this.X5_ > this.J5_ && (this.C8l = false, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnWorldOriginInUiMode, false), Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 38, "StartWorldOriginInUiMode 超过循环次数"), this.Y5_)) {
            TimerSystem_1.GameplayTimerSystem.Remove(this.Y5_);
            this.Y5_ = undefined;
            e.SetResult();
          }
        }
      }, 50);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 38, "EnableWorldOriginByUi 开关不成对");
      }
      e.SetResult();
    }
    await e.Promise;
  }
  static GetIsWorldOriginInUiMode() {
    return this.C8l;
  }
  static StartWorldOriginInLoadingMode(e) {
    if (this.g8l) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 38, "IsWorldOriginInLoadingMode 开关不成对");
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("World", 38, "StartWorldOriginInLoadingMode", ["reason", e]);
      }
      this.g8l = true;
    }
  }
  static EndWorldOriginInLoadingMode(e, t) {
    if (this.g8l) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("World", 38, "EndWorldOriginInLoadingMode", ["reason", e]);
      }
      if (this.C8l) {
        this.qbl.DeepCopy(t);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("World", 38, "EndWorldOriginInLoadingMode,UI模式优先级更高，忽略本次偏移行为,延迟到UI模式结束后执行", ["reason", e]);
        }
      } else {
        this.kbl(e, t);
      }
      this.g8l = false;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 38, "IsWorldOriginInLoadingMode 开关不成对");
    }
  }
  static SetEnableWorldOriginTickCheck(e, t) {
    if (this.EnableWorldOriginTickCheck === t) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("World", 38, "SetEnableWorldOriginTickCheck 调用不成对");
      }
    } else {
      this.EnableWorldOriginTickCheck = t;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 38, "SetEnableWorldOriginTickCheck", ["reason", e]);
      }
    }
  }
  static SetEnableWorldOrigin(e) {
    this.EnableWorldOrigin = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 38, "EnableWorldOrigin", ["EnableWorldOrigin", e]);
    }
  }
  static FixWorldOriginTickCheck(e) {
    if (this.f8l() && this.Fbl(e)) {
      this.kbl("Tick", e);
    }
  }
  static FixWorldOriginGm(e) {
    return !!this.f8l() && (this.kbl("GM", e), true);
  }
  static z5_() {
    if (GlobalData_1.GlobalData.World) {
      if (UE.KuroRenderingRuntimeBPPluginBPLibrary.IsWorldOriginFinish(GlobalData_1.GlobalData.World)) {
        return true;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 38, "IsWorldOriginFinish false");
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 38, "IsWorldOriginFinish false No World");
    }
    return false;
  }
  static f8l() {
    return !this.C8l && !this.g8l;
  }
  static Fbl(e) {
    this.p8l++;
    return !(this.p8l < this.CheckRateMax) && !(this.p8l = 0, Math.abs(e.X - this.Gbl.X) < this.OriginNeedChangeMax && Math.abs(e.Y - this.Gbl.Y) < this.OriginNeedChangeMax && Math.abs(e.Z - this.Gbl.Z) < this.OriginNeedChangeMax) && this.mTl !== Time_1.Time.Frame && !ModelManager_1.ModelManager.PlotModel?.IsInPlot && !!UiManager_1.UiManager.IsViewOpen("BattleView") && !FormationDataController_1.FormationDataController.GlobalIsInFight && !(e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), !(e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(217))) && !e.HasTag(-1371021686) && !e.HasTag(1491611589) && !e.HasTag(504239013);
  }
  static SetEnableZAxisOffset(e, t) {
    var r;
    if (this.H6g !== e && (r = Global_1.Global.BaseCharacter?.D_K2_GetActorLocation()) && (this.H6g = e, this.kbl(t, r), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("World", 61, "SetEnableZAxisOffset", ["enable", e], ["reason", t]);
    }
  }
  static kbl(e, t) {
    if (this.mTl !== Time_1.Time.Frame) {
      this.Obl.DeepCopy(this.Gbl);
      this.mTl = Time_1.Time.Frame;
    }
    var r = new UE.VectorDouble();
    r.X = Math.trunc(t.X);
    r.Y = Math.trunc(t.Y);
    r.Z = this.H6g ? Math.trunc(t.Z) : 0;
    this.Gbl.X = r.X;
    this.Gbl.Y = r.Y;
    this.Gbl.Z = r.Z;
    if (this.EnableWorldOrigin) {
      UE.KuroRenderingRuntimeBPPluginBPLibrary.SetWorldOrigin(GlobalData_1.GlobalData.World, r);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 38, "SetWorldOrigin", ["Origin", r], ["reason", e]);
      }
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.ForceUpdateCSMOnce 1");
      });
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 38, "SetWorldOriginIgnore");
    }
  }
  static ToWorldRelativeLocation(e, t) {
    if (this.EnableWorldOrigin) {
      t.X = e.X - this.Gbl.X;
      t.Y = e.Y - this.Gbl.Y;
      t.Z = e.Z - this.Gbl.Z;
    } else {
      t.X = e.X;
      t.Y = e.Y;
      t.Z = e.Z;
    }
  }
}
exports.WorldController = WorldController;
(_a = WorldController).Kpr = false;
WorldController.qpr = undefined;
WorldController.LTl = undefined;
WorldController.Qpr = false;
WorldController.mea = 0;
WorldController.AK = false;
WorldController.Xr_ = 0;
WorldController.$r_ = 0;
WorldController.iKd = 1;
WorldController.RBn = e => {
  cpp_1.FuncOpenLibrary.TryOpen(e.KEs);
};
WorldController.Gpr = () => {
  if (_a.Kpr) {
    TimerSystem_1.GameplayTimerSystem.Pause(_a.qpr);
    _a.Qpr = true;
  } else {
    _a.ManuallyGarbageCollection(1);
    _a.Qpr = false;
  }
};
WorldController.bpr = () => {
  if (_a.AK) {
    _a.Zfi(true, true);
  }
};
WorldController.Ilt = () => {
  if (_a.AK) {
    _a.Zfi(true, false);
  }
};
WorldController.nye = () => {
  ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo.ServerCaveMode = 0;
};
WorldController.Zfi = (e, t) => {
  _a.AK = e;
  GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetPerformanceLimitMode(e && !t);
  var r = UE.KuroGISystem.GetKuroGISystem(GlobalData_1.GlobalData.World.GetWorld()).GetKuroGlobalGIActor();
  r.EnableImposterUpdate = !e || !!t;
};
WorldController.Zpe = e => {
  if (_a.Kpr = e) {
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.TryReduceCsmUpdateFrequency("Battle");
  } else {
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.TryRestoreCsmUpdateFrequency("Battle");
  }
  _a.moh();
  if (!e && _a.Qpr) {
    _a.ManuallyGarbageCollection(2);
    _a.Qpr = false;
    TimerSystem_1.GameplayTimerSystem.Resume(_a.qpr);
  }
  UE.KuroStaticLibrary.SetGameThreadAffinity(e);
};
WorldController.RTl = () => {
  var e = ModelManager_1.ModelManager.WorldModel;
  if (e) {
    e.CurEnvironmentInfo.RequestUpdateVoxelEnv();
  }
};
WorldController.zfi = e => {
  if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen) {
    GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetMaximumFrameRate(e);
  } else if (ModelManager_1.ModelManager.WorldModel?.TickIntervalSchedulers) {
    for (const t of ModelManager_1.ModelManager.WorldModel.TickIntervalSchedulers) {
      t.ChangeTickFramePeriodByFrameRate(e);
    }
  }
};
WorldController.Hpr = new Array();
WorldController.Mze = () => {
  cpp_1.FKuroGameBudgetAllocatorInterface.ClearAssistantActors();
};
WorldController.Bpr = () => {
  if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
    cpp_1.FKuroGameBudgetAllocatorInterface.ClearAssistantActors();
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
      var e;
      if (!t.IsMyRole()) {
        if (e = t.EntityHandle?.Entity?.GetComponent(3)?.Actor) {
          cpp_1.FKuroGameBudgetAllocatorInterface.AddAssistantActor(e);
        }
      }
    }
  }
};
WorldController.Gbl = Vector_1.Vector.Create(0, 0, 0);
WorldController.Obl = Vector_1.Vector.Create(0, 0, 0);
WorldController.mTl = 0;
WorldController.EnableWorldOrigin = true;
WorldController.EnableWorldOriginLoadingCheck = true;
WorldController.EnableWorldOriginTickCheck = true;
WorldController.OriginNeedChangeMax = 250000;
WorldController.CheckRateMax = 30;
WorldController.p8l = 0;
WorldController.C8l = false;
WorldController.g8l = false;
WorldController.qbl = Vector_1.Vector.Create(0, 0, 0);
WorldController.Y5_ = undefined;
WorldController.X5_ = 0;
WorldController.J5_ = 10;
WorldController.H6g = true; //# sourceMappingURL=WorldController.js.map