"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LowMemoryScalabilityController = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const ExploreProgressDefine_1 = require("../../Module/ExploreProgress/ExploreProgressDefine");
const PC_VIDIEO_MEMORY_LOW_THRESHOLD_GB = 7;
const PC_VIDIEO_MEMORY_LOW_THRESHOLD_RAYTRACING_GB = 10;
const XUEYUAN_MAPID = 906;
const QIQIU_AREA = 33;
const SHOUWANG_AREA = 36;
const lowMemoryAreaIds = new Set([QIQIU_AREA, SHOUWANG_AREA]);
const LARGE_BUILDING_TEXTURE_FACTOR = 0.5;
const LARGE_BUILDING_TEXTURE_FACTOR_LOW_MEMORY = 0.2;
const HUGE_BUILDING_TEXTURE_FACTOR = 0.3;
const HUGE_BUILDING_TEXTURE_FACTOR_LOW_MEMORY = 0.15;
const HUGE_ROC_TEXTURE_FACTOR = 0.3;
const HUGE_ROC_TEXTURE_FACTOR_LOW_MEMORY = 0.15;
const UNCLASSIFIED_TEXTURE_FACTOR = 1;
const UNCLASSIFIED_TEXTURE_FACTOR_LOW_MEMORY = 0.8;
const IOS_STREAMING_POOL_SIZE_LOW_MEMORY = 100;
const IOS_STREAMING_POOL_SIZE_FOR_MESHES_LOW_MEMORY = 50;
const IOS_STREAMING_POOL_SIZE_IN_LOADING_LOW_MEMORY = 50;
const IOS_STREAMING_POOL_SIZE_FOR_MESHES_IN_LOADING_LOW_MEMORY = 20;
const PC_DEFAULT_STREAMING_POOL_SIZE = 3000;
const PC_DEFAULT_STREAMING_POOL_SIZE_FOR_MESHES = 1000;
const PC_SCALEDOWN_FACTOR = 0.7;
const platform2PoolSizeMap = new Map([[3, [400, 600, 800, 1000, 2500]], [4, [400, 600, 800, 1000, 2500]], [5, [400, 600, 800, 1000, 2500]], [8, [400, 600, 2000, 2000, 2500]], [6, [400, 600, 800, 1000, 2500]], [7, [400, 600, 800, 1000, 2500]]]);
const platform2PoolSizeForMeshesMap = new Map([[3, [400, 600, 800, 1000, 1000]], [4, [400, 600, 800, 1000, 1000]], [5, [400, 600, 800, 1000, 1000]], [8, [400, 600, 1000, 1000, 1000]], [6, [400, 600, 800, 1000, 1000]], [7, [400, 600, 800, 1000, 1000]]]);
class LowMemoryScalabilityController extends ControllerBase_1.ControllerBase {
  static get NZf() {
    return this.Meg || this.Eeg;
  }
  static get VZf() {
    return Info_1.Info.IsLowMemoryDevice;
  }
  static get Zeg() {
    return this.NZf || this.VZf;
  }
  static get etg() {
    return this.ceg || this.VZf;
  }
  static meg() {
    var e;
    this.ceg = false;
    this.Meg = false;
    this.Eeg = false;
    if (Info_1.Info.IsPcOrGamepadPlatform()) {
      if ((e = UE.KuroStaticLibrary.GetVideoMemoryGB()) < PC_VIDIEO_MEMORY_LOW_THRESHOLD_GB) {
        this.ceg = true;
        this.Meg = true;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("World", 60, "Detected PC Low Memory Device", ["VideoMemory", e]);
        }
      } else if (e < PC_VIDIEO_MEMORY_LOW_THRESHOLD_RAYTRACING_GB && (this.ceg = true, UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRayTracingSupportedType() === 0) && UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.RayTracing.Enable") === 1 && (this.Eeg = true, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("World", 60, "Detected PC Low Memory Device in RayTracing Mode", ["VideoMemory", e]);
      }
    }
  }
  static OnInit() {
    this.meg();
    if (this.etg && (EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EndTravelMap, this.jZf), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeArea, this.Hje), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnManuallyClearStreamingPool, this.$Zf), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnManuallyResetStreamingPool, this.WZf), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshMenuSetting, this.Ieg), this.VZf)) {
      this.QZf();
    }
    return true;
  }
  static OnClear() {
    if (this.etg) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EndTravelMap, this.jZf);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeArea, this.Hje);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManuallyClearStreamingPool, this.$Zf);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManuallyResetStreamingPool, this.WZf);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshMenuSetting, this.Ieg);
    }
    return true;
  }
  static QZf() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 60, "Init Mobile Low Memory Settings");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "wp.Runtime.UnloadHLODCellWhenAllHLODActorHidden 1");
  }
  static KZf() {
    this.beg = false;
    this.XZf = 1;
    if (ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId === XUEYUAN_MAPID) {
      if (this.Eeg) {
        this.beg = true;
        this.XZf = 0.75;
      } else if (this.Meg) {
        this.beg = true;
        this.XZf = 0.5;
      }
    }
    if (this.beg) {
      ModelManager_1.ModelManager.GameModeModel.ScaleStreamingSource(2, this.XZf);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 60, "End Travel Map In Low Memory Device", ["Scale", this.XZf]);
      }
    } else {
      ModelManager_1.ModelManager.GameModeModel.CleanScaleStreamingSource(2);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 60, "End Travel Map In Normal Memory Device, Clean Scale");
      }
    }
  }
  static YZf() {
    let e = LARGE_BUILDING_TEXTURE_FACTOR;
    let _ = HUGE_BUILDING_TEXTURE_FACTOR;
    let t = HUGE_ROC_TEXTURE_FACTOR;
    let o = UNCLASSIFIED_TEXTURE_FACTOR;
    if (ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId === XUEYUAN_MAPID && this.Zeg) {
      e = LARGE_BUILDING_TEXTURE_FACTOR_LOW_MEMORY;
      _ = HUGE_BUILDING_TEXTURE_FACTOR_LOW_MEMORY;
      t = HUGE_ROC_TEXTURE_FACTOR_LOW_MEMORY;
      o = UNCLASSIFIED_TEXTURE_FACTOR_LOW_MEMORY;
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.GroupBoost.LargeBuildingTextureFactor " + e);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.GroupBoost.HugeBuildingTextureFactor " + _);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.GroupBoost.HugeRocTextureFactor " + t);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.GroupBoost.UnclassifiedTextureFactor " + o);
  }
  static zZf() {
    if (!this.VZf) {
      let e = PC_DEFAULT_STREAMING_POOL_SIZE;
      let _ = PC_DEFAULT_STREAMING_POOL_SIZE_FOR_MESHES;
      var t = UE.GameUserSettings.GetGameUserSettings()?.GetGameQualitySettingLevel();
      if (t && ((o = platform2PoolSizeMap.get(Info_1.Info.PlatformType)) && t >= 0 && t < o.length && (e = o[t]), o = platform2PoolSizeForMeshesMap.get(Info_1.Info.PlatformType)) && t >= 0 && t < o.length) {
        _ = o[t];
      }
      var o = ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId === XUEYUAN_MAPID;
      var t = o && this.Zeg ? PC_SCALEDOWN_FACTOR : 1;
      e = Math.floor(e * t);
      _ = Math.floor(_ * t);
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.PoolSize " + e);
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.PoolSizeForMeshes " + _);
    }
  }
  static Peg() {
    if (this.VZf) {
      if (ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId === XUEYUAN_MAPID) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "wp.Runtime.PlannedLoadingRangeScale 0");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "s.ContinuouslyIncrementalGCWhileLevelsPendingPurge 1");
      } else {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "wp.Runtime.PlannedLoadingRangeScale 0.1");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "s.ContinuouslyIncrementalGCWhileLevelsPendingPurge 0");
      }
    }
  }
}
exports.LowMemoryScalabilityController = LowMemoryScalabilityController;
(_a = LowMemoryScalabilityController).ceg = false;
LowMemoryScalabilityController.Meg = false;
LowMemoryScalabilityController.Eeg = false;
LowMemoryScalabilityController.beg = false;
LowMemoryScalabilityController.XZf = 1;
LowMemoryScalabilityController.jZf = () => {
  _a.KZf();
  _a.YZf();
  _a.zZf();
  _a.Peg();
};
LowMemoryScalabilityController.Ieg = e => {
  if (e === GameSettingsDefine_1.EFunction.RayTracing || e === GameSettingsDefine_1.EFunction.IMAGEQUALITY) {
    _a.meg();
    _a.KZf();
  }
};
LowMemoryScalabilityController.nye = () => {
  _a.Hje();
};
LowMemoryScalabilityController.Hje = () => {
  let e = false;
  let _ = _a.XZf;
  var t;
  if (_a.VZf && (t = (t = ModelManager_1.ModelManager.AreaModel.AreaInfo) ? ModelManager_1.ModelManager.AreaModel.GetAreaId(t, ExploreProgressDefine_1.AREA_LEVEL) : 0, lowMemoryAreaIds.has(t))) {
    e = true;
    _ = Math.min(_, 0.5);
  }
  if (e || _a.beg) {
    ModelManager_1.ModelManager.GameModeModel.ScaleStreamingSource(2, _);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 60, "Change Area In Low Memory Device", ["Scale", _]);
    }
  } else {
    ModelManager_1.ModelManager.GameModeModel.CleanScaleStreamingSource(2);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 60, "Change Area In Normal Memory Device, Clean Scale");
    }
  }
};
LowMemoryScalabilityController.$Zf = () => {
  if (ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId === XUEYUAN_MAPID && _a.VZf && Info_1.Info.PlatformType === 1) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 60, "ManuallyClearStreamingPool In IOS Low Memory for Special Map");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.PoolSize " + IOS_STREAMING_POOL_SIZE_IN_LOADING_LOW_MEMORY);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.PoolSizeForMeshes " + IOS_STREAMING_POOL_SIZE_FOR_MESHES_IN_LOADING_LOW_MEMORY);
  }
};
LowMemoryScalabilityController.WZf = () => {
  if (ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId === XUEYUAN_MAPID && _a.VZf && Info_1.Info.PlatformType === 1) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 60, "ManuallyResetStreamingPool In IOS Low Memory for Special Map");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.PoolSize " + IOS_STREAMING_POOL_SIZE_LOW_MEMORY);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.PoolSizeForMeshes " + IOS_STREAMING_POOL_SIZE_FOR_MESHES_LOW_MEMORY);
  }
}; //# sourceMappingURL=LowMemoryScalabilityController.js.map