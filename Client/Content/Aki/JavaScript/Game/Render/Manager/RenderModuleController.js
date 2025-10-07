"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderModuleController = undefined;
const UE = require("ue");
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
  static SetWorldPartitionDataLayerState(e, t) {
    UE.KuroRenderingRuntimeBPPluginBPLibrary.SetWorldPartitionDataLayerState(GlobalData_1.GlobalData.World, FNameUtil_1.FNameUtil.GetDynamicFName(e), t);
  }
  static IsWorldPartitionDataLayerEnable(e) {
    return UE.KuroRenderingRuntimeBPPluginBPLibrary.IsWorldPartitionDataLayerEnable(GlobalData_1.GlobalData.World, FNameUtil_1.FNameUtil.GetDynamicFName(e));
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
  static SetBattleState(e, t, r = false) {
    if (ModelManager_1.ModelManager.RenderModuleModel) {
      ModelManager_1.ModelManager.RenderModuleModel.SetBattleState(e, t, r);
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