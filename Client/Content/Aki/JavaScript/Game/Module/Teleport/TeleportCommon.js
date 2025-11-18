"use strict";

var _a;
var __decorate = this && this.__decorate || function (e, o, r, t) {
  var a;
  var i = arguments.length;
  var l = i < 3 ? o : t === null ? t = Object.getOwnPropertyDescriptor(o, r) : t;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    l = Reflect.decorate(e, o, r, t);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (a = e[s]) {
        l = (i < 3 ? a(l) : i > 3 ? a(o, r, l) : a(o, r)) || l;
      }
    }
  }
  if (i > 3 && l) {
    Object.defineProperty(o, r, l);
  }
  return l;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportCommon = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const GameModeController_1 = require("../../World/Controller/GameModeController");
const WorldDefine_1 = require("../../World/Define/WorldDefine");
const DISTANCE_THRESHOLD_1 = 3000;
const DISTANCE_THRESHOLD_2 = MathUtils_1.MathUtils.MaxFloat;
class TeleportCommon {
  static QueryCanTeleportNoLoading(e, o = false) {
    var r = Global_1.Global.BaseCharacter;
    if (r?.IsValid()) {
      return (o ? UE.VectorDouble.Dist2D(r.CharacterActorComponent.ActorLocation, e) : UE.VectorDouble.Dist(r.CharacterActorComponent.ActorLocation, e)) < (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !ModelManager_1.ModelManager.GameModeModel.UseWorldPartition ? DISTANCE_THRESHOLD_2 : DISTANCE_THRESHOLD_1);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 29, "查询是否可以无加载传送:失败,找不到当前玩家");
      }
      return false;
    }
  }
  static FlushWorldPartitionUnloadingStreamingCells() {
    var e;
    if (UE.KuroStaticLibrary.IsLowMemoryDevice() && (e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass())) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 60, "清理卸载流送单元(开始)", ["PhysicalMemory", GameSettingsDeviceRender_1.GameSettingsDeviceRender.PhysicalGBRam]), e.FlushUnloadingStreamingCells(), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 60, "清理卸载流送单元(结束)");
    }
  }
  static async CheckLiveLocationStreamingCompleted(e = false) {
    var o;
    var r;
    var t = ModelManager_1.ModelManager.TeleportModel;
    if (ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
      if (ModelManager_1.ModelManager.GameModeModel.StreamingSource?.IsValid() && !e) {
        ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(ModelManager_1.ModelManager.GameModeModel.StreamingSource.D_K2_GetActorLocation(), true, true);
      }
      r = e ? ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource : ModelManager_1.ModelManager.GameModeModel.StreamingSource;
      o = e ? t.VoxelStreamingCompleted : t.StreamingCompleted;
      r = r.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      t.CheckStreamingCompletedTimerId = this.zQs(r, o);
      await o.Promise;
      t.CheckStreamingCompletedTimerId = undefined;
    } else {
      (e ? t.VoxelStreamingCompleted : t.StreamingCompleted).SetResult(true);
    }
  }
  static zQs(e, o) {
    const r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass());
    this.jIo = 3000;
    this.$ml = 0;
    const t = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      if (ModelManager_1.ModelManager.GameModeModel.StreamingSource?.IsValid()) {
        if (r && e.IsStreamingCompletedForLayers(undefined, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, undefined, false)) {
          this.jIo = 0;
          TimerSystem_1.GameplayTimerSystem.Remove(t);
          o.SetResult(true);
        } else {
          this.jIo += ResourceSystem_1.CHECK_STREAMING_INTERVAL;
          if (this.jIo > 3000 && (this.jIo = 0, Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("Teleport", 29, "无加载传送:流送中", ["WorldPartitionSubsystem", r ? "true" : "false"], ["StreamingSource", e.GetOwner().D_K2_GetActorLocation()]);
          }
          this.Xml(e, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
        }
      }
    }, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
    return t;
  }
  static async CheckStreamingCompleted(e = false) {
    var r = ModelManager_1.ModelManager.TeleportModel;
    if (ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
      var t = r.TargetPosition.ToUeVector();
      let o = undefined;
      if (!e) {
        o = UE.NewArray(UE.BuiltinName);
        let e = ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(t, true, true);
        if (e) {
          t = (0, puerts_1.$ref)(undefined);
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(GlobalData_1.GlobalData.World, e, t);
          o.Add((0, puerts_1.$unref)(t));
        } else {
          for (const l of WorldDefine_1.dataLayerRuntimeHLOD) {
            var a = (0, puerts_1.$ref)(undefined);
            e = FNameUtil_1.FNameUtil.GetDynamicFName(l);
            UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(GlobalData_1.GlobalData.World, e, a);
            o.Add((0, puerts_1.$unref)(a));
          }
        }
      }
      var t = e ? ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource : ModelManager_1.ModelManager.GameModeModel.StreamingSource;
      var i = e ? r.VoxelStreamingCompleted : r.StreamingCompleted;
      var t = t.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      r.CheckStreamingCompletedTimerId = this.ZQs(t, i, o, !e);
      await i.Promise;
      r.CheckStreamingCompletedTimerId = undefined;
    } else {
      (e ? r.VoxelStreamingCompleted : r.StreamingCompleted).SetResult(true);
    }
  }
  static ZQs(o, r, t, a = false) {
    var e = o.TargetGrids;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 60, "传送:检测参数", ["dataLayers", t !== undefined && t.Num() > 0 ? t.Get(0).toString() : undefined], ["targetGrids", e !== undefined && e.Num() > 0 ? e.Get(0).toString() : undefined]);
    }
    const i = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass());
    let l = false;
    this.jIo = 3000;
    this.$ml = 0;
    const s = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      var e = () => {
        this.jIo += ResourceSystem_1.CHECK_STREAMING_INTERVAL;
        if (this.jIo > 3000 && (i && !i.IsStreamingEnable() && i.SetStreamingEnable(true), this.jIo = 0, Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Teleport", 29, "传送:流送中", ["WorldPartitionSubsystem", i ? "true" : "false"], ["StreamingSource", o.GetOwner().D_K2_GetActorLocation()]);
        }
        this.Xml(o, ResourceSystem_1.CHECK_STREAMING_INTERVAL, l);
      };
      if (i) {
        if (!l) {
          const r = o.IsStreamingCompletedForLayers(t, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, undefined, false);
          if (!r) {
            e();
            return;
          }
          if ((l = a) && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 60, "传送:检测场景物理体(开始)");
          }
        }
        if (l) {
          const r = o.IsStreamingCompletedForLayers(t, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, undefined, true);
          if (!r) {
            e();
            return;
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 60, "传送:检测场景物理体(完成)");
          }
        }
        this.jIo = 0;
        TimerSystem_1.GameplayTimerSystem.Remove(s);
        r.SetResult(true);
      } else {
        e();
      }
    }, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
    return s;
  }
  static Xml(e, o, r = false) {
    this.$ml += o;
    if (this.$ml > GameModeController_1.LOG_STREAMING_STUCK_INTERVAL) {
      ControllerHolder_1.ControllerHolder.GameModeController.PrintWorldPartitionDebugInfo(e, undefined, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, r);
      this.$ml = 0;
    }
  }
}
(_a = TeleportCommon).WIo = undefined;
TeleportCommon.jIo = 0;
TeleportCommon.$ml = 0;
TeleportCommon.PreventEntityPreTeleportFromFalling = () => {
  if (_a.WIo) {
    TimerSystem_1.GameplayTimerSystem.Remove(_a.WIo);
    _a.WIo = undefined;
  }
  ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = true;
  var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  if (e?.Valid && (e = e.Entity.GetComponent(3))?.Valid && e.Actor?.IsValid() && e.Actor.CharacterMovement?.IsValid()) {
    e.Actor.KuroSetMovementMode({
      Mode: 0,
      Context: "[TeleportController.PreventEntityPreTeleportFromFalling]"
    });
  }
};
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 检测场景/体素流送")], TeleportCommon, "CheckStreamingCompleted", null);
exports.TeleportCommon = TeleportCommon; //# sourceMappingURL=TeleportCommon.js.map