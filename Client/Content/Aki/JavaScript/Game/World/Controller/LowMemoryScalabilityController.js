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
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const XUEYUAN_MAPID = 906;
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
const CLEAR_BODY_SETUP_BLACK_LIST = ["/Game/Aki/Scene/Assets/Levels/LaHaiLuo/XueYuan/Array/Mesh/SM_Col_Wal_12AL.SM_Col_Wal_12AL", "/Game/Aki/Scene/Assets/Levels/LaHaiLuo/XueYuan/Mesh/SM_Col_Wal_11EM.SM_Col_Wal_11EM", "/Game/Aki/Scene/Assets/Levels/LaHaiLuo/Common/Rock/Mesh/SM_Com3_Roc_02AH.SM_Com3_Roc_02AH", "/Game/Aki/Scene/Assets/Levels/LaHaiLuo/XueYuan/Mesh/SM_Col_Wal_05AM.SM_Col_Wal_05AM", "/Game/Aki/Scene/Assets/Levels/LaHaiLuo/XueYuan/Mesh/SM_Col_Wal_05EM.SM_Col_Wal_05EM", "/Game/Aki/Scene/Assets/Levels/LaHaiLuo/XueYuan/Array/Mesh/SM_Col_Wal_06CM.SM_Col_Wal_06CM", "/Game/Aki/Scene/Assets/Levels/LaHaiLuo/XueYuan/Array/Mesh/SM_Col_Wal_11CM.SM_Col_Wal_11CM"];
class LowMemoryScalabilityController extends ControllerBase_1.ControllerBase {
  static get xMg() {
    return Info_1.Info.IsLowMemoryDevice;
  }
  static OnInit() {
    if (this.xMg) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EndTravelMap, this.kMg);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnManuallyClearStreamingPool, this.qMg);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnManuallyResetStreamingPool, this.OMg);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LoadingRangeScaleChanged, this.X7g);
      if (this.xMg) {
        this.GMg();
      }
      this.A$g();
    }
    return true;
  }
  static OnClear() {
    if (this.xMg) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EndTravelMap, this.kMg);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManuallyClearStreamingPool, this.qMg);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManuallyResetStreamingPool, this.OMg);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LoadingRangeScaleChanged, this.X7g);
      UE.KuroBodySetupLibrary.EmptyClearWpBodySetupBlackList();
    }
    return true;
  }
  static GMg() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 60, "Init Mobile Low Memory Settings");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "wp.Runtime.UnloadHLODCellWhenAllHLODActorHidden 1");
  }
  static A$g() {
    var e = UE.NewSet(UE.BuiltinName);
    for (const _ of CLEAR_BODY_SETUP_BLACK_LIST) {
      e.Add(new UE.FName(_));
    }
    UE.KuroBodySetupLibrary.InitClearWpBodySetupBlackList(e);
  }
  static IsSpecialLowMemoryMap() {
    return ModelManager_1.ModelManager.GameModeModel?.MapConfig.MapId === XUEYUAN_MAPID;
  }
  static VMg() {
    let e = LARGE_BUILDING_TEXTURE_FACTOR;
    let _ = HUGE_BUILDING_TEXTURE_FACTOR;
    let a = HUGE_ROC_TEXTURE_FACTOR;
    let o = UNCLASSIFIED_TEXTURE_FACTOR;
    if (ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId === XUEYUAN_MAPID) {
      e = LARGE_BUILDING_TEXTURE_FACTOR_LOW_MEMORY;
      _ = HUGE_BUILDING_TEXTURE_FACTOR_LOW_MEMORY;
      a = HUGE_ROC_TEXTURE_FACTOR_LOW_MEMORY;
      o = UNCLASSIFIED_TEXTURE_FACTOR_LOW_MEMORY;
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.GroupBoost.LargeBuildingTextureFactor " + e);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.GroupBoost.HugeBuildingTextureFactor " + _);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.GroupBoost.HugeRocTextureFactor " + a);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.GroupBoost.UnclassifiedTextureFactor " + o);
  }
  static Owg() {
    if (ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId === XUEYUAN_MAPID) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "s.ContinuouslyIncrementalGCWhileLevelsPendingPurge 1");
    }
    if (!GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.LOADINGRANGESCALELEVEL, 0, false)) {
      this.X7g(1);
    }
  }
  static D$g() {
    if (UE.KuroStaticLibrary.IsLowMemoryDevice()) {
      if (ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId === XUEYUAN_MAPID) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("World", 36, "Enable Clear Redundancy BodySetup");
        }
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Kuro.Collision.EnableClearRedundancyBodySetup 1");
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("World", 36, "Disable Clear Redundancy BodySetup");
        }
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Kuro.Collision.EnableClearRedundancyBodySetup 0");
      }
    }
  }
}
exports.LowMemoryScalabilityController = LowMemoryScalabilityController;
(_a = LowMemoryScalabilityController).kMg = () => {
  _a.VMg();
  _a.Owg();
  _a.D$g();
};
LowMemoryScalabilityController.qMg = () => {
  if (ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId === XUEYUAN_MAPID && _a.xMg && Info_1.Info.PlatformType === 1) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 60, "ManuallyClearStreamingPool In IOS Low Memory for Special Map");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.PoolSize " + IOS_STREAMING_POOL_SIZE_IN_LOADING_LOW_MEMORY);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.PoolSizeForMeshes " + IOS_STREAMING_POOL_SIZE_FOR_MESHES_IN_LOADING_LOW_MEMORY);
  }
};
LowMemoryScalabilityController.OMg = () => {
  if (ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId === XUEYUAN_MAPID && _a.xMg && Info_1.Info.PlatformType === 1) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 60, "ManuallyResetStreamingPool In IOS Low Memory for Special Map");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.PoolSize " + IOS_STREAMING_POOL_SIZE_LOW_MEMORY);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.PoolSizeForMeshes " + IOS_STREAMING_POOL_SIZE_FOR_MESHES_LOW_MEMORY);
  }
};
LowMemoryScalabilityController.X7g = e => {
  UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "wp.Runtime.PlannedLoadingRangeScaleExtra 0");
}; //# sourceMappingURL=LowMemoryScalabilityController.js.map