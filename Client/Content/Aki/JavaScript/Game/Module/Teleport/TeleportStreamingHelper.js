"use strict";

var __decorate = this && this.__decorate || function (e, r, t, o) {
  var i;
  var l = arguments.length;
  var a = l < 3 ? r : o === null ? o = Object.getOwnPropertyDescriptor(r, t) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, r, t, o);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (i = e[s]) {
        a = (l < 3 ? i(a) : l > 3 ? i(r, t, a) : i(r, t)) || a;
      }
    }
  }
  if (l > 3 && a) {
    Object.defineProperty(r, t, a);
  }
  return a;
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
const TeleportContextHolder_1 = require("./TeleportContextHolder");
class TeleportStreamingHelper extends TeleportContextHolder_1.TeleportContextHolder {
  constructor() {
    super(...arguments);
    this.$ml = 0;
  }
  FlushWorldPartitionUnloadingStreamingCells() {
    var e;
    if (UE.KuroStaticLibrary.IsLowMemoryDevice() && (e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass())) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 60, "清理卸载流送单元(开始)", ["PhysicalMemory", GameSettingsDeviceRender_1.GameSettingsDeviceRender.PhysicalGBRam]), e.FlushUnloadingStreamingCells(), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 60, "清理卸载流送单元(结束)");
    }
  }
  async CheckLiveLocationStreamingCompleted(e = false) {
    var r;
    var t;
    if (ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
      if (ModelManager_1.ModelManager.GameModeModel.StreamingSource?.IsValid() && !e) {
        ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(ModelManager_1.ModelManager.GameModeModel.StreamingSource.D_K2_GetActorLocation(), true, true);
      }
      t = e ? ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource : ModelManager_1.ModelManager.GameModeModel.StreamingSource;
      r = e ? this.TeleportContext.VoxelStreamingCompleted : this.TeleportContext.StreamingCompleted;
      t = t.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      this.TeleportContext.CheckStreamingCompletedTimerId = this.zQs(t, r);
      await r?.Promise;
      this.TeleportContext.CheckStreamingCompletedTimerId = undefined;
    } else {
      (e ? this.TeleportContext.VoxelStreamingCompleted : this.TeleportContext.StreamingCompleted).SetResult(true);
    }
  }
  zQs(e, r) {
    const t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass());
    t.SetStreamingEnable(true);
    this.$ml = 0;
    const o = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      if (ModelManager_1.ModelManager.GameModeModel.StreamingSource?.IsValid()) {
        if (t && e.IsStreamingCompletedForLayers(undefined, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, undefined, false)) {
          TimerSystem_1.GameplayTimerSystem.Remove(o);
          r.SetResult(true);
        } else {
          this.Xml(e, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
        }
      }
    }, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
    return o;
  }
  async CheckStreamingCompleted(e = false) {
    if (ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
      let r = undefined;
      if (!e) {
        r = UE.NewArray(UE.BuiltinName);
        let e = ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(this.TeleportContext.TargetPosition, true, true);
        if (e) {
          var t = (0, puerts_1.$ref)(undefined);
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(GlobalData_1.GlobalData.World, e, t);
          r.Add((0, puerts_1.$unref)(t));
        } else {
          for (const l of WorldDefine_1.dataLayerRuntimeHLOD) {
            var o = (0, puerts_1.$ref)(undefined);
            e = FNameUtil_1.FNameUtil.GetDynamicFName(l);
            UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(GlobalData_1.GlobalData.World, e, o);
            r.Add((0, puerts_1.$unref)(o));
          }
        }
        ControllerHolder_1.ControllerHolder.GameModeController.AppendAllBaseDatalayers(r);
      }
      var t = e ? ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource : ModelManager_1.ModelManager.GameModeModel.StreamingSource;
      var i = e ? this.TeleportContext.VoxelStreamingCompleted : this.TeleportContext.StreamingCompleted;
      var t = t.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      this.TeleportContext.CheckStreamingCompletedTimerId = this.ZQs(t, i, r, !e);
      await i.Promise;
      this.TeleportContext.CheckStreamingCompletedTimerId = undefined;
    } else {
      (e ? this.TeleportContext.VoxelStreamingCompleted : this.TeleportContext.StreamingCompleted).SetResult(true);
    }
  }
  ZQs(r, t, o, i = false) {
    var e = r.TargetGrids;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 60, "传送:检测参数", ["dataLayers", o !== undefined && o.Num() > 0 ? o.Get(0).toString() : undefined], ["targetGrids", e !== undefined && e.Num() > 0 ? e.Get(0).toString() : undefined]);
    }
    const l = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass());
    l.SetStreamingEnable(true);
    let a = false;
    this.$ml = 0;
    const s = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      var e = () => {
        this.Xml(r, ResourceSystem_1.CHECK_STREAMING_INTERVAL, a);
      };
      if (l) {
        if (!a) {
          const t = r.IsStreamingCompletedForLayers(o, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, undefined, false);
          if (!t) {
            e();
            return;
          }
          if ((a = i) && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 60, "传送:检测场景物理体(开始)");
          }
        }
        if (a) {
          const t = r.IsStreamingCompletedForLayers(o, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, undefined, true);
          if (!t) {
            e();
            return;
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 60, "传送:检测场景物理体(完成)");
          }
        }
        TimerSystem_1.GameplayTimerSystem.Remove(s);
        t.SetResult(true);
      } else {
        e();
      }
    }, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
    return s;
  }
  Xml(e, r, t = false) {
    this.$ml += r;
    if (this.$ml > GameModeController_1.LOG_STREAMING_STUCK_INTERVAL) {
      ControllerHolder_1.ControllerHolder.GameModeController.PrintWorldPartitionDebugInfo(e, undefined, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, t);
      this.$ml = 0;
    }
  }
}
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 检测场景/体素流送")], TeleportStreamingHelper.prototype, "CheckLiveLocationStreamingCompleted", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送: 检测场景/体素流送")], TeleportStreamingHelper.prototype, "CheckStreamingCompleted", null);
exports.TeleportStreamingHelper = TeleportStreamingHelper; //# sourceMappingURL=TeleportStreamingHelper.js.map