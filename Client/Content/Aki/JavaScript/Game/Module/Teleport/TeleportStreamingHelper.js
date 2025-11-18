"use strict";

var __decorate = this && this.__decorate || function (e, r, t, o) {
  var i;
  var a = arguments.length;
  var l = a < 3 ? r : o === null ? o = Object.getOwnPropertyDescriptor(r, t) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    l = Reflect.decorate(e, r, t, o);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (i = e[s]) {
        l = (a < 3 ? i(l) : a > 3 ? i(r, t, l) : i(r, t)) || l;
      }
    }
  }
  if (a > 3 && l) {
    Object.defineProperty(r, t, l);
  }
  return l;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportStreamingHelper = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const GameModeController_1 = require("../../World/Controller/GameModeController");
const WorldDefine_1 = require("../../World/Define/WorldDefine");
class TeleportStreamingHelper {
  static FlushWorldPartitionUnloadingStreamingCells() {
    var e;
    if (UE.KuroStaticLibrary.IsLowMemoryDevice() && (e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass())) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 60, "清理卸载流送单元(开始)", ["PhysicalMemory", GameSettingsDeviceRender_1.GameSettingsDeviceRender.PhysicalGBRam]), e.FlushUnloadingStreamingCells(), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 60, "清理卸载流送单元(结束)");
    }
  }
  static async CheckLiveLocationStreamingCompleted(e = false) {
    var r;
    var t;
    var o = ModelManager_1.ModelManager.TeleportModel;
    if (ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
      if (ModelManager_1.ModelManager.GameModeModel.StreamingSource?.IsValid() && !e) {
        ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(ModelManager_1.ModelManager.GameModeModel.StreamingSource.D_K2_GetActorLocation(), true, true);
      }
      t = e ? ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource : ModelManager_1.ModelManager.GameModeModel.StreamingSource;
      r = e ? o.VoxelStreamingCompleted : o.StreamingCompleted;
      t = t.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      o.CheckStreamingCompletedTimerId = this.zQs(t, r);
      await r.Promise;
      o.CheckStreamingCompletedTimerId = undefined;
    } else {
      (e ? o.VoxelStreamingCompleted : o.StreamingCompleted).SetResult(true);
    }
  }
  static zQs(e, r) {
    const t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass());
    this.jIo = 3000;
    this.$ml = 0;
    const o = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      if (ModelManager_1.ModelManager.GameModeModel.StreamingSource?.IsValid()) {
        if (t && e.IsStreamingCompletedForLayers(undefined, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, undefined, false)) {
          this.jIo = 0;
          TimerSystem_1.GameplayTimerSystem.Remove(o);
          r.SetResult(true);
        } else {
          this.jIo += ResourceSystem_1.CHECK_STREAMING_INTERVAL;
          if (this.jIo > 3000 && (this.jIo = 0, Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("Teleport", 29, "无加载传送:流送中", ["WorldPartitionSubsystem", t ? "true" : "false"], ["StreamingSource", e.GetOwner().D_K2_GetActorLocation()]);
          }
          this.Xml(e, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
        }
      }
    }, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
    return o;
  }
  static async CheckStreamingCompleted(e = false) {
    var t = ModelManager_1.ModelManager.TeleportModel;
    if (ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
      var o = t.TargetPosition.ToUeVector();
      let r = undefined;
      if (!e) {
        r = UE.NewArray(UE.BuiltinName);
        let e = ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(o, true, true);
        if (e) {
          o = (0, puerts_1.$ref)(undefined);
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(GlobalData_1.GlobalData.World, e, o);
          r.Add((0, puerts_1.$unref)(o));
        } else {
          for (const l of WorldDefine_1.dataLayerRuntimeHLOD) {
            var i = (0, puerts_1.$ref)(undefined);
            e = FNameUtil_1.FNameUtil.GetDynamicFName(l);
            UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(GlobalData_1.GlobalData.World, e, i);
            r.Add((0, puerts_1.$unref)(i));
          }
        }
        ControllerHolder_1.ControllerHolder.GameModeController.AppendAllBaseDatalayers(r);
      }
      var o = e ? ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource : ModelManager_1.ModelManager.GameModeModel.StreamingSource;
      var a = e ? t.VoxelStreamingCompleted : t.StreamingCompleted;
      var o = o.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      t.CheckStreamingCompletedTimerId = this.ZQs(o, a, r, !e);
      await a.Promise;
      t.CheckStreamingCompletedTimerId = undefined;
    } else {
      (e ? t.VoxelStreamingCompleted : t.StreamingCompleted).SetResult(true);
    }
  }
  static ZQs(r, t, o, i = false) {
    var e = r.TargetGrids;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 60, "传送:检测参数", ["dataLayers", o !== undefined && o.Num() > 0 ? o.Get(0).toString() : undefined], ["targetGrids", e !== undefined && e.Num() > 0 ? e.Get(0).toString() : undefined]);
    }
    const a = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass());
    let l = false;
    this.jIo = 3000;
    this.$ml = 0;
    const s = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      var e = () => {
        this.jIo += ResourceSystem_1.CHECK_STREAMING_INTERVAL;
        if (this.jIo > 3000 && (a && !a.IsStreamingEnable() && a.SetStreamingEnable(true), this.jIo = 0, Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Teleport", 29, "传送:流送中", ["WorldPartitionSubsystem", a ? "true" : "false"], ["StreamingSource", r.GetOwner().D_K2_GetActorLocation()]);
        }
        this.Xml(r, ResourceSystem_1.CHECK_STREAMING_INTERVAL, l);
      };
      if (a) {
        if (!l) {
          const t = r.IsStreamingCompletedForLayers(o, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, undefined, false);
          if (!t) {
            e();
            return;
          }
          if ((l = i) && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 60, "传送:检测场景物理体(开始)");
          }
        }
        if (l) {
          const t = r.IsStreamingCompletedForLayers(o, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, undefined, true);
          if (!t) {
            e();
            return;
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 60, "传送:检测场景物理体(完成)");
          }
        }
        this.jIo = 0;
        TimerSystem_1.GameplayTimerSystem.Remove(s);
        t.SetResult(true);
      } else {
        e();
      }
    }, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
    return s;
  }
  static Xml(e, r, t = false) {
    this.$ml += r;
    if (this.$ml > GameModeController_1.LOG_STREAMING_STUCK_INTERVAL) {
      ControllerHolder_1.ControllerHolder.GameModeController.PrintWorldPartitionDebugInfo(e, undefined, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, t);
      this.$ml = 0;
    }
  }
}
TeleportStreamingHelper.jIo = 0;
TeleportStreamingHelper.$ml = 0;
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 检测场景/体素流送")], TeleportStreamingHelper, "CheckLiveLocationStreamingCompleted", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 检测场景/体素流送")], TeleportStreamingHelper, "CheckStreamingCompleted", null);
exports.TeleportStreamingHelper = TeleportStreamingHelper; //# sourceMappingURL=TeleportStreamingHelper.js.map