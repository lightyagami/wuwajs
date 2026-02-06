"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderModuleController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const RoleTriggerController_1 = require("../../NewWorld/Character/Role/RoleTriggerController");
const RenderModuleConfig_1 = require("./RenderModuleConfig");
const hardCodeDataLayerDependencies = new Map([["DataLayerRuntime_DLTask_30FGL03", new Set(["DataLayerRuntime_DLTask_30FGL02"])], ["DataLayerRuntime_DLTask_30FGL04", new Set(["DataLayerRuntime_DLTask_30FGL02"])], ["DataLayerRuntime_DLTask_30FGL05", new Set(["DataLayerRuntime_DLTask_30FGL02"])]]);
const hardCodeReversedDataLayerDependencies = new Map([["DataLayerRuntime_DLTask_30FGL02", new Set(["DataLayerRuntime_DLTask_30FGL03", "DataLayerRuntime_DLTask_30FGL04", "DataLayerRuntime_DLTask_30FGL05"])]]);
class RenderModuleController extends ControllerBase_1.ControllerBase {
  static GetKuroCurrentUiSceneTransform() {
    return this.UiSceneOffsetTransform;
  }
  static GetKuroUiSceneLoadOffset() {
    if (this.IsDynamicOffset) {
      var e = RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger();
      if (e?.IsValid()) {
        (e = e.D_K2_GetActorLocation()).Z += 50000;
        return e;
      }
    }
    return new UE.VectorDouble(150000, 150000, 150000);
  }
  static Dfg(e) {
    e = hardCodeDataLayerDependencies.get(e);
    let a = true;
    if (e?.size) {
      for (const t of e) {
        if (!(a &&= UE.KuroRenderingRuntimeBPPluginBPLibrary.IsWorldPartitionDataLayerEnable(GlobalData_1.GlobalData.World, FNameUtil_1.FNameUtil.GetDynamicFName(t)))) {
          break;
        }
      }
    }
    return a;
  }
  static SetWorldPartitionDataLayerState(e, a, t = false) {
    var r;
    if (a && !this.Dfg(e)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 39, "[SetWorldPartitionDataLayerState]激活DataLayer前，发现依赖不满足，停止激活DataLayer，并加进DependenciesNotMatchDataLayerSet中", ["dataLayerName", e]);
      }
      ModelManager_1.ModelManager.RenderModuleModel.AddDependenciesNotMatchDataLayer(e);
    } else {
      if (ModelManager_1.ModelManager.RenderModuleModel?.IsDependenciesNotMatchDataLayer(e)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("World", 39, "[SetWorldPartitionDataLayerState]激活/停用DataLayer时，发现其在DependenciesNotMatchDataLayerSet中，移除", ["dataLayerName", e], ["isEnable", a]);
        }
        ModelManager_1.ModelManager.RenderModuleModel.RemoveDependenciesNotMatchDataLayer(e);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("World", 39, "[SetWorldPartitionDataLayerState]正式执行激活/停用DataLayer", ["dataLayerName", e], ["isEnable", a]);
      }
      r = a ? 2 : t ? 1 : 0;
      UE.KuroRenderingRuntimeBPPluginBPLibrary.SetWorldPartitionDataLayerState2(GlobalData_1.GlobalData.World, FNameUtil_1.FNameUtil.GetDynamicFName(e), r);
      this.Ufg(e, a, t);
    }
  }
  static Ufg(e, a, t) {
    var r = a ? 2 : t ? 1 : 0;
    var t = hardCodeReversedDataLayerDependencies.get(e);
    if (a) {
      if (t?.size) {
        for (const o of t) {
          if (ModelManager_1.ModelManager.RenderModuleModel?.IsDependenciesNotMatchDataLayer(o) && this.Dfg(o)) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("World", 39, "[SetWorldPartitionDataLayerState]激活DataLayer后，发现有本该激活的RelatedDataLayer依赖都已满足，激活relatedDataLayer", ["dataLayerName", e], ["relatedDataLayer", o]);
            }
            ModelManager_1.ModelManager.RenderModuleModel.RemoveDependenciesNotMatchDataLayer(o);
            UE.KuroRenderingRuntimeBPPluginBPLibrary.SetWorldPartitionDataLayerState2(GlobalData_1.GlobalData.World, FNameUtil_1.FNameUtil.GetDynamicFName(o), r);
          }
        }
      }
    } else if (t?.size) {
      for (const n of t) {
        if (UE.KuroRenderingRuntimeBPPluginBPLibrary.IsWorldPartitionDataLayerEnable(GlobalData_1.GlobalData.World, FNameUtil_1.FNameUtil.GetDynamicFName(n))) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("World", 39, "[SetWorldPartitionDataLayerState]停用DataLayer后，发现有已激活的RelatedDataLayer依赖当前DataLayer，停用RelatedDataLayer", ["dataLayerName", e], ["relatedDataLayer", n]);
          }
          ModelManager_1.ModelManager.RenderModuleModel?.AddDependenciesNotMatchDataLayer(n);
          UE.KuroRenderingRuntimeBPPluginBPLibrary.SetWorldPartitionDataLayerState2(GlobalData_1.GlobalData.World, FNameUtil_1.FNameUtil.GetDynamicFName(n), r);
        }
      }
    }
  }
  static IsWorldPartitionDataLayerEnable(e) {
    return UE.KuroRenderingRuntimeBPPluginBPLibrary.IsWorldPartitionDataLayerEnable(GlobalData_1.GlobalData.World, FNameUtil_1.FNameUtil.GetDynamicFName(e)) || !!ModelManager_1.ModelManager.RenderModuleModel?.IsDependenciesNotMatchDataLayer(e);
  }
  static AddBattleReference(e) {
    ModelManager_1.ModelManager.RenderModuleModel.AddBattleReference(e);
  }
  static DecBattleReference() {
    ModelManager_1.ModelManager.RenderModuleModel.DecBattleReference();
  }
  static GetCurrentKeyState(e) {
    return ModelManager_1.ModelManager.RenderModuleModel.GetCurrentKeyState(e);
  }
  static GetIdleClearAtmosphere(e) {
    return ModelManager_1.ModelManager.RenderModuleModel.GetIdleClearAtmosphere(e);
  }
  static SetBattleState(e, a, t = false) {
    if (ModelManager_1.ModelManager.RenderModuleModel) {
      ModelManager_1.ModelManager.RenderModuleModel.SetBattleState(e, a, t);
    }
  }
  static GetWuYinQuBattleDebugInfo() {
    return ModelManager_1.ModelManager.RenderModuleModel.GetWuYinQuBattleDebugInfo();
  }
  static GetBattleState(e) {
    return ModelManager_1.ModelManager.RenderModuleModel.GetBattleState(e);
  }
  static GetCurrentBattleKey() {
    return ModelManager_1.ModelManager.RenderModuleModel.GetCurrentBattleKey();
  }
  static AddWuYinQuBattleActorWaiting(e) {
    if (this.WaitingForAddWuYinQuBattleActors === undefined) {
      this.WaitingForAddWuYinQuBattleActors = [];
    }
    this.WaitingForAddWuYinQuBattleActors.push(e);
  }
  static AddWuYinQuBattleActor(e) {
    return !!ModelManager_1.ModelManager.RenderModuleModel && ModelManager_1.ModelManager.RenderModuleModel.AddWuYinQuBattleActor(e);
  }
  static RemoveWuYinQuBattleActor(e) {
    return !!ModelManager_1.ModelManager.RenderModuleModel && ModelManager_1.ModelManager.RenderModuleModel.RemoveWuYinQuBattleActor(e);
  }
  static AddTickableObject(e) {
    ModelManager_1.ModelManager.RenderModuleModel.AddTickableObject(e);
  }
  static RemoveTickableObject(e) {
    ModelManager_1.ModelManager.RenderModuleModel?.RemoveTickableObject(e);
  }
  static AddCharRenderShell(e) {
    ModelManager_1.ModelManager.RenderModuleModel.AddCharRenderShell(e);
  }
  static RemoveCharRenderShell(e) {
    return ModelManager_1.ModelManager.RenderModuleModel?.RemoveCharRenderShell(e) ?? false;
  }
  static GetRainIntensity() {
    if (ModelManager_1.ModelManager.RenderModuleModel) {
      return ModelManager_1.ModelManager.RenderModuleModel.GetRainIntensity();
    } else {
      return 0;
    }
  }
  static GetSnowIntensity() {
    if (ModelManager_1.ModelManager.RenderModuleModel) {
      return ModelManager_1.ModelManager.RenderModuleModel.GetSnowIntensity();
    } else {
      return 0;
    }
  }
  static IsRuntime() {
    return this.tZ;
  }
  static OnInit() {
    RenderModuleConfig_1.RenderStats.Init();
    this.DebugUiSceneLoadOffset = new UE.VectorDouble();
    this.UiSceneOffsetTransform = new UE.TransformDouble();
    this.tZ = true;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBossFight, this.N1r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.yK);
    if (!this.O1r) {
      TickSystem_1.TickSystem.Add(this.k1r.bind(this), "RenderModuleController", 3, true);
    }
    if (UE.KuroStaticLibrary.IsLowMemoryDevice()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "wp.Runtime.UseUnloadCache false");
    }
    return true;
  }
  static OnClear() {
    this.tZ = false;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBossFight, this.N1r);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.yK);
    return true;
  }
  static OnTick(e) {
    if (this.O1r) {
      this.k1r(e);
    }
  }
  static k1r(e) {
    if (this.tZ) {
      this.IsGamePaused = MathUtils_1.MathUtils.IsNearlyEqual(this.GlobalTimeDilation, 0);
      if (this.WaitingForAddWuYinQuBattleActors !== undefined && this.WaitingForAddWuYinQuBattleActors.length !== 0) {
        this.WaitingForAddWuYinQuBattleActors.forEach(e => {
          this.AddWuYinQuBattleActor(e);
        });
        this.WaitingForAddWuYinQuBattleActors = [];
      }
      ModelManager_1.ModelManager.RenderModuleModel.Tick(e);
    }
  }
}
(exports.RenderModuleController = RenderModuleController).IsTickEvenPausedInternal = true;
RenderModuleController.tZ = false;
RenderModuleController.O1r = false;
RenderModuleController.WaitingForAddWuYinQuBattleActors = undefined;
RenderModuleController.IsGamePaused = false;
RenderModuleController.GlobalTimeDilation = 1;
RenderModuleController.DebugNewUiSceneWorkflow = true;
RenderModuleController.DebugUiSceneLoadOffset = undefined;
RenderModuleController.UiSceneOffsetTransform = undefined;
RenderModuleController.DebugStartShowingUiSceneRendering = false;
RenderModuleController.DebugInUiSceneRendering = false;
RenderModuleController.IsDynamicOffset = false;
RenderModuleController.N1r = e => {
  UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.GlobalGIRenderQuality 1");
};
RenderModuleController.yK = e => {
  if (!e) {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.GlobalGIRenderQuality 0");
  }
}; //# sourceMappingURL=RenderModuleController.js.map