"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSettingsController = undefined;
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const GameSettingsDefine_1 = require("./GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("./GameSettingsDeviceRender");
const GameSettingsDeviceRenderDefine_1 = require("./GameSettingsDeviceRenderDefine");
const GameSettingsLevelRender_1 = require("./GameSettingsLevelRender");
const GameSettingsManager_1 = require("./GameSettingsManager");
const GameSettingsUtils_1 = require("./GameSettingsUtils");
class GameSettingsController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 40, "GameSettingsController-OnInit");
    }
    this.Ore();
    this.lmd = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetEngineSubsystem(UE.KuroRenderQualityVolumeManager.StaticClass());
    this._md();
    return true;
  }
  static OnClear() {
    this.kre();
    this.umd();
    return true;
  }
  static cmd() {
    GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.NPCDENSITY, 0, false);
    GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY, 0, false);
  }
  static _md() {
    this.lmd.OnApplyKuroRenderLocalSettingsBlueprintEvent.Add(e => {
      this.KuroRenderQualityLocalIndex = e;
      this.cmd();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Render", 92, "进入局部性能盒子，应用索引", ["LocalIndex:", e]);
      }
    });
    this.lmd.OnLeaveVolumeBlueprintEvent.Add(() => {
      this.KuroRenderQualityLocalIndex = -1;
      this.cmd();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Render", 92, "离开局部性能盒子");
      }
    });
  }
  static umd() {
    this.lmd.OnApplyKuroRenderLocalSettingsBlueprintEvent.Clear();
    this.lmd.OnLeaveVolumeBlueprintEvent.Clear();
  }
  static Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStartLoadingState, this.hMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this._Me);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.uMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSubLevelAdded, this.XGa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl);
  }
  static kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStartLoadingState, this.hMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this._Me);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, this.uMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSubLevelAdded, this.XGa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl);
  }
  static kot() {
    this.IRe = TimerSystem_1.GameplayTimerSystem.Delay(this.q7e, GameSettingsDeviceRenderDefine_1.WHOLE_SHADOW_CACHE_DELAY_TIME);
  }
  static xHe() {
    if (this.IRe) {
      if (TimerSystem_1.GameplayTimerSystem.Has(this.IRe)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
      }
      this.IRe = undefined;
    }
  }
}
exports.GameSettingsController = GameSettingsController;
(_a = GameSettingsController).IRe = undefined;
GameSettingsController.IsGameSettingsAppliedOnOpenLoading = false;
GameSettingsController.lmd = undefined;
GameSettingsController.KuroRenderQualityLocalIndex = -1;
GameSettingsController.hMe = () => {
  var e;
  if (_a.IsGameSettingsAppliedOnOpenLoading) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 64, "游戏设置已经初始化应用过");
    }
  } else {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 40, "初始化-应用设置参数1111");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.FullyLoadUsedTextures 0");
    if (UE.KuroStaticLibrary.IsLowMemoryDevice()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.RenderAssetMinKuroBoostFactor 0.1");
    }
    if (Info_1.Info.IsPcPlatform()) {
      e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceType;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Render", 40, "重新设置PC性能分级", ["deviceType", e]);
      }
      if (e === 11) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.ViewDistanceQuality 0");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.AntiAliasingQuality 1");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.PostProcessQuality 0");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.TextureQuality 2");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.EffectsQuality 1");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.FoliageQuality 0");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.LandscapeReverseLODScaleFactor 2");
      } else if (e === 12) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.ViewDistanceQuality 1");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.AntiAliasingQuality 2");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.PostProcessQuality 1");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.TextureQuality 2");
        if (Info_1.Info.IsMacPlatform()) {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.EffectsQuality 1");
        } else {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.EffectsQuality 2");
        }
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.FoliageQuality 1");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.LandscapeReverseLODScaleFactor 1");
      } else if (e === 13) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.ViewDistanceQuality 2");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.AntiAliasingQuality 2");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.PostProcessQuality 2");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.TextureQuality 3");
        if (Info_1.Info.IsMacPlatform()) {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.EffectsQuality 1");
        } else {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.EffectsQuality 3");
        }
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.FoliageQuality 2");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.CapsuleKuroAO 1");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.LandscapeReverseLODScaleFactor 0");
      } else if (e === 14 || e === 51) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.ViewDistanceQuality 3");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.AntiAliasingQuality 3");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.PostProcessQuality 3");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.TextureQuality 3");
        if (Info_1.Info.IsMacPlatform()) {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.EffectsQuality 1");
        } else {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.EffectsQuality 3");
        }
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.FoliageQuality 3");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.CapsuleKuroAO 1");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.LandscapeReverseLODScaleFactor 0");
      } else if (e === 15) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.ViewDistanceQuality 3");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.AntiAliasingQuality 3");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.PostProcessQuality 3");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.TextureQuality 4");
        if (Info_1.Info.IsMacPlatform()) {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.EffectsQuality 1");
        } else {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.EffectsQuality 3");
        }
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.FoliageQuality 3");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.CapsuleKuroAO 1");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.LandscapeReverseLODScaleFactor 0");
      }
    }
    if (Info_1.Info.IsPs5Platform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.ViewDistanceQuality 2");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.AntiAliasingQuality 2");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.PostProcessQuality 2");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.TextureQuality 2");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.EffectsQuality 3");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.FoliageQuality 2");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.CapsuleKuroAO 1");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.LandscapeReverseLODScaleFactor 0");
    }
    GameSettingsManager_1.GameSettingsManager.HandleInitDataOnOpenLoading();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AfterGameSettingsAppliedOnOpenLoading);
    if (Info_1.Info.IsPlayInEditor && UE.KuroEditorUtilityLibrary.GetGConfigEditorSettings("/Script/KuroEditorUtility.KuroEditorUtilitySetting", "TopSpeedForLoading") && (e = "wp.Runtime.OverrideMultipleRuntimeGridNames Grid_Near&Grid_Middle&Grid_Middle_Far&Grid_Far&Grid_SuperFar&Grid_SSuperFar&Grid_HLOD_Small&Grid_HLOD_Middle&Grid_HLOD&Grid_HLOD_Volume_Small&Grid_HLOD_Volume_Middle&Grid_HLOD_Volume&Grid_Water&Grid_Impostor&Grid_ISM_Near&Grid_ISM_Middle&Grid_ISM_Far&Grid_ISM_SuperFar&Grid_Foliage_Near&Grid_Foliage_Grass&Grid_Foliage_Middle&Grid_Foliage_Far&Grid_ReverseFar&Grid_SSuperFarReverse&Grid_EnclosedSpaceNear&Grid_EnclosedSpaceMiddle&Grid_EnclosedSpaceFar&Grid_EnclosedSpaceSuperFar&Grid_EnclosedSpaceSSuperFar", UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "wp.Runtime.OverrideMultipleRuntimeGridNames Grid_Near&Grid_Middle&Grid_Middle_Far&Grid_Far&Grid_SuperFar&Grid_SSuperFar&Grid_HLOD_Small&Grid_HLOD_Middle&Grid_HLOD&Grid_HLOD_Volume_Small&Grid_HLOD_Volume_Middle&Grid_HLOD_Volume&Grid_Water&Grid_Impostor&Grid_ISM_Near&Grid_ISM_Middle&Grid_ISM_Far&Grid_ISM_SuperFar&Grid_Foliage_Near&Grid_Foliage_Grass&Grid_Foliage_Middle&Grid_Foliage_Far&Grid_ReverseFar&Grid_SSuperFarReverse&Grid_EnclosedSpaceNear&Grid_EnclosedSpaceMiddle&Grid_EnclosedSpaceFar&Grid_EnclosedSpaceSuperFar&Grid_EnclosedSpaceSSuperFar"), e = "wp.Runtime.OverrideMultipleRuntimeGridLoadingRangeValues 50&80&180&100&450&1800&150&200&300&150&200&300&480&250&50&80&100&150&40&80&100&100&300&1800&50&80&100&450&600", UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, e), e = "r.Kuro.SkeletalMesh.LODDistanceScale 1.0", UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, e), e = "r.Kuro.Foliage.GrassCullDistanceMax 3000", UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, e), e = "r.Kuro.MaterialDesktopQualityShoulderRender 0", UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, e), e = "r.Kuro.GlobalPointCloudStreamEnabled 0", UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, e), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("World", 41, "Editor: TopSpeedMode is on.");
    }
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelAllPerformanceLimit();
    _a.IsGameSettingsAppliedOnOpenLoading = true;
  }
};
GameSettingsController._Me = () => {
  if (ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 59, "进入大世界-调整渲染参数");
    }
    if (!Info_1.Info.IsPcOrGamepadPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.EnableKuroSpotlightsShadow 0");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.FogVisibilityCulling.Enable 1");
    }
    UE.LandscapeProxy.SetKuroLandscapeFOVFactor(-1);
    UE.StreamableRenderAsset.SetKuroStreamingLevelState(0);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.CacheWholeSceneShadows 1");
    _a.xHe();
  } else {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 59, "进入副本-调整渲染参数");
    }
    if (!Info_1.Info.IsPcOrGamepadPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.EnableKuroSpotlightsShadow 1");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.FogVisibilityCulling.Enable 0");
    }
    GameSettingsLevelRender_1.GameSettingsLevelRender.Get().SetLevelRenderSettings();
    UE.LandscapeProxy.SetKuroLandscapeFOVFactor(0);
    UE.StreamableRenderAsset.SetKuroStreamingLevelState(1);
    _a.xHe();
    _a.kot();
  }
  GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.SCENEAO, 3);
};
GameSettingsController.uMe = () => {
  if (!ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 59, "退出副本-调整渲染参数");
    }
    GameSettingsLevelRender_1.GameSettingsLevelRender.Get().RevertLevelRenderSetting();
    UE.LandscapeProxy.SetKuroLandscapeFOVFactor(-1);
    UE.StreamableRenderAsset.SetKuroStreamingLevelState(0);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.CacheWholeSceneShadows 1");
    _a.xHe();
  }
};
GameSettingsController.XGa = () => {
  UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.CacheWholeSceneShadows 0");
  _a.xHe();
  _a.kot();
};
GameSettingsController.q7e = () => {
  _a.IRe = undefined;
  UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.CacheWholeSceneShadows 1");
};
GameSettingsController.Etl = (e, a) => {
  if (e === 2 || a === 2) {
    GameSettingsUtils_1.GameSettingsUtils.RefreshViewRevertState(a);
  }
};
GameSettingsController.OnGameUserSettingsUINeedsUpdate = () => {
  TimerSystem_1.GameplayTimerSystem.Next(_a.OnUEGameUserSettingsUpdate);
};
GameSettingsController.OnUEGameUserSettingsUpdate = () => {
  var e;
  var a;
  var t = UE.GameUserSettings.GetGameUserSettings();
  var i = t.GetFullscreenMode() === 2 ? 1 : 0;
  var r = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.DISPLAYMODE);
  if (r !== i) {
    GameSettingsManager_1.GameSettingsManager.HandleValueChange(GameSettingsDefine_1.EFunction.DISPLAYMODE, i, 0);
  }
  var l = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.RESOLUTION);
  var o = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionIndexByList(t.GetScreenResolution());
  if (l !== o) {
    GameSettingsManager_1.GameSettingsManager.HandleValueChange(GameSettingsDefine_1.EFunction.RESOLUTION, o, 0);
  }
  if (Macro_1.NOT_SHIPPING_ENVIRONMENT && l !== undefined && r !== undefined && (e = ["全屏", "窗口全屏", "窗口"], a = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(l), r !== i || l !== o) && Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("GameSettings", 69, "窗口模式和分辨率更新", ["窗口模式(实际)", e[t.GetFullscreenMode()]], ["(转换后)", e[1 + i]], ["(显示)", e[r + 1]], ["分辨率索引(实际)", o], ["(显示)", l], ["实际分辨率", t?.GetScreenResolution().ToString()], ["显示分辨率", a.ToString()]);
  }
}; //# sourceMappingURL=GameSettingsController.js.map