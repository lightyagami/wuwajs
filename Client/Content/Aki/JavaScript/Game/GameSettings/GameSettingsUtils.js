"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSettingsUtils = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const AudioDefine_1 = require("../../Core/Audio/AudioDefine");
const AudioSystem_1 = require("../../Core/Audio/AudioSystem");
const Info_1 = require("../../Core/Common/Info");
const LanguageSystem_1 = require("../../Core/Common/LanguageSystem");
const Log_1 = require("../../Core/Common/Log");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const LocalStorage_1 = require("../Common/LocalStorage");
const LocalStorageDefine_1 = require("../Common/LocalStorageDefine");
const GlobalData_1 = require("../GlobalData");
const InputSettingsManager_1 = require("../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const DamageUiManager_1 = require("../Module/DamageUi/DamageUiManager");
const CharacterSkinDamageComponent_1 = require("../NewWorld/Character/Common/Component/CharacterSkinDamageComponent");
const RoleGaitStatic_1 = require("../NewWorld/Character/Role/Component/Define/RoleGaitStatic");
const PerfSightController_1 = require("../PerfSight/PerfSightController");
const RenderConfig_1 = require("../Render/Config/RenderConfig");
const RenderDataManager_1 = require("../Render/Data/RenderDataManager");
const GameSettingsDefine_1 = require("./GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("./GameSettingsDeviceRender");
const GameSettingsManager_1 = require("./GameSettingsManager");
class GameSettingsUtils {
  static ApplyVolume(e, a) {
    UE.AkGameplayStatics.SetRTPCValue(undefined, e, 0, undefined, FNameUtil_1.FNameUtil.GetDynamicFName(a));
    return true;
  }
  static ApplyImageQualityOnly(e) {
    if (UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat("r.Kuro.Movie.EnableCGMovieRendering") > 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Render", 11, "当前在movie 渲染模式下不应用配置");
      }
      return false;
    }
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(800, e.toString());
      UE.PerfSightHelper.PostEvent(814, GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetD3D12Type().toString());
      UE.PerfSightHelper.PostEvent(815, GameSettingsDeviceRender_1.GameSettingsDeviceRender.CPUFrequency.toString());
      UE.PerfSightHelper.PostEvent(816, GameSettingsDeviceRender_1.GameSettingsDeviceRender.CPUCoresIncludingHyperthreads.toString());
      UE.PerfSightHelper.PostEvent(825, GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsVulkanRHI().toString());
    }
    cpp_1.FCrashSightProxy.SetCustomData("DX12", GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetD3D12Type().toString());
    cpp_1.FCrashSightProxy.SetCustomData("Vulkan", GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsVulkanRHI().toString());
    var a;
    var t;
    var r;
    var i = UE.GameUserSettings.GetGameUserSettings();
    if (i) {
      a = Info_1.Info.IsPcOrGamepadPlatform();
      t = Info_1.Info.IsMobilePlatform();
      r = Info_1.Info.IsPs5Platform();
      if (a) {
        if (r) {
          if (e === 3) {
            UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.KuroRenderQuality 1");
          } else {
            UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.KuroRenderQuality 0");
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameSettings", 59, "优先应用的画质等级[done]@[PS5]", ["ps5 quality level", e]);
          }
        } else {
          i.SetGameQualitySettingLevel(e);
          if (Info_1.Info.IsMacPlatform()) {
            if (e > 2) {
              UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.ScreenPercentage 70");
            } else if (e === 2) {
              UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.ScreenPercentage 65");
            } else if (e === 1) {
              UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.ScreenPercentage 60");
            } else if (e === 0) {
              UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.ScreenPercentage 55");
            }
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameSettings", 64, "优先应用的画质等级[done]@[Pc或手柄平台]", ["quality level", e]);
          }
        }
        i.ApplySettings(true);
      } else if (t && (i.SetMobileGameQualitySettingLevel(e), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("GameSettings", 64, "优先应用的画质等级[done]@[移动端平台]", ["quality level", e]);
      }
      return true;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameSettings", 64, "GetGameUserSettings失败", ["qualityLevel", e]);
      }
      return false;
    }
  }
  static SetIsCustomImageQuality(e) {
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsCustomImageQuality, e);
  }
  static ApplyShadowQuality(e) {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.ShadowQuality " + e);
    GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.SCENEAO);
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(808, e.toString());
    }
    return true;
  }
  static ApplyDisplayMode(e) {
    var a = [1, 2];
    var e = a[MathUtils_1.MathUtils.Clamp(e, 0, a.length - 1)];
    var a = UE.GameUserSettings.GetGameUserSettings();
    a.SetFullscreenMode(e);
    a.ApplySettings(true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetDisplayMode);
    return true;
  }
  static ApplyResolution(a) {
    var a = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(a);
    var e = UE.GameUserSettings.GetGameUserSettings();
    e.SetScreenResolution(a);
    e.ApplySettings(true);
    if (PerfSightController_1.PerfSightController.IsEnable) {
      let e = 1;
      if (a.X > 4000) {
        e = 4;
      } else if (a.X > 3000) {
        e = 3;
      } else if (a.X > 2000) {
        e = 2;
      }
      UE.PerfSightHelper.PostEvent(803, e.toString());
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetResolution);
    return true;
  }
  static ApplyBrightness(e) {
    let a = 2.2;
    a = e < 0 ? MathUtils_1.MathUtils.Lerp(1.5, 2.2, e + 1) : MathUtils_1.MathUtils.Lerp(2.2, 3.5, e);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TonemapperGamma " + a);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.LUT.Regenerate 1");
    UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.World, RenderDataManager_1.RenderDataManager.Get().GetUiShowBrightnessMaterialParameterCollection(), RenderConfig_1.RenderConfig.UIShowBrightness, a);
    return true;
  }
  static ApplyHighestFps(e) {
    var a = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetFrameByList(e);
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.ApplyFrameRate(a);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("GameSettings", 64, "[FPSDebug]ApplyHighestFps", ["value", e], ["FPS", a]);
    }
    return true;
  }
  static ApplyNiagaraQuality(e) {
    var a;
    var t = UE.GameUserSettings.GetGameUserSettings();
    if (Info_1.Info.IsPcOrGamepadPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "fx.Niagara.QualityLevel " + (e > 0 ? 2 : 1));
    } else {
      a = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsIosAndAndroidHighDevice();
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.DisableDistortion " + (e > 0 && a ? 0 : 1));
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "fx.Niagara.QualityLevel " + (e > 0 ? 1 : 0));
    }
    t.ApplySettings(true);
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(807, e.toString());
    }
    return true;
  }
  static ApplyImageDetail(e) {
    var a;
    var t;
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(805, e.toString());
    }
    if (Info_1.Info.IsPcOrGamepadPlatform()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("GameSettings", 64, "ApplyImageDetail[pc和主机]", ["传入value", e], ["pcToonOutlineDrawDistanceFar", 4000], ["pcToonOutlineDrawDistanceNear", 2000]);
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.ToonOutlineDrawDistancePc " + (e > 1 ? 4000 : 2000));
      if (e <= 0) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.ForceKuroRuntimeLODBias 1");
      } else {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.ForceKuroRuntimeLODBias 0");
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("GameSettings", 64, "ApplyImageDetail[移动端]", ["传入value", e], ["mobileToonOutlineDrawDistanceFar", 500], ["mobileToonOutlineDrawDistanceNear", 500]);
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.ToonOutlineDrawDistanceMobile 500");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "foliage.DensityType " + e);
      a = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformScreenBetter();
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.SceneObjMobileSSR " + (e > 1 && a ? 1 : 0));
      t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformNotLow();
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.TreeRimLight " + (e > 1 && t ? 1 : 0));
      if (GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()?.bEnableWorldPartition) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameSettings", 59, "UpdateFoliageDataLayer", ["value", e + 1]);
        }
        UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateFoliageDataLayer(GlobalData_1.GlobalData.World, e + 1);
      }
      t = a && GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidAdreno();
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.AutoExposure " + (e > 1 && t ? 1 : 0));
      if (Info_1.Info.IsMobilePlatform()) {
        if (e < 1) {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.ForceKuroRuntimeLODBias 1");
        } else {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Streaming.ForceKuroRuntimeLODBias 0");
        }
      }
    }
    return true;
  }
  static ApplyAntiAliasing(e) {
    Info_1.Info.IsPcOrGamepadPlatform();
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.DefaultFeature.AntiAliasing " + (e === 0 ? 0 : 2));
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(802, e.toString());
    }
    return true;
  }
  static ApplySceneAo(e) {
    if (Info_1.Info.IsPcOrGamepadPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.AmbientOcclusionLevels " + -e);
      RenderDataManager_1.RenderDataManager.Get().SetGrassAo(e);
      if (PerfSightController_1.PerfSightController.IsEnable) {
        UE.PerfSightHelper.PostEvent(810, e.toString());
      }
    } else {
      var a = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformAOValid() || GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsIOSPlatformAOValid();
      var t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.SHADOWQUALITY);
      if (t === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GameSettings", 64, "【移动端】设定场景AO时，不能获得阴影质量保存值");
        }
        return false;
      }
      t = t > 0 && a ? e : 0;
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.SSAO " + t);
      UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.World, RenderDataManager_1.RenderDataManager.Get().GetGlobalShaderParameters(), new UE.FName("EnableMobileScreenAO"), t);
      RenderDataManager_1.RenderDataManager.Get().SetGrassAo(t);
      if (PerfSightController_1.PerfSightController.IsEnable) {
        UE.PerfSightHelper.PostEvent(810, t.toString());
      }
    }
    return true;
  }
  static ApplyNpcDensity(e) {
    let a = e;
    var t = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.Kuro.KuroLocalRenderSettingIndex");
    if (t >= GameSettingsDefine_1.HEAVY_SCENEVULUME_INDEX_START && t <= GameSettingsDefine_1.HEAVY_SCENEVULUME_INDEX_END && a > GameSettingsDefine_1.NPC_DENSITY_PC_THRESHOLD && (a = GameSettingsDefine_1.NPC_DENSITY_PC_THRESHOLD, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("GameSettings", 59, "KuroLocalRenderSettingIndex Change npcDensity 2");
    }
    if (UE.KuroStaticLibrary.IsLowMemoryDevice() && a > GameSettingsDefine_1.NPC_DENSITY_THRESHOLD) {
      a = GameSettingsDefine_1.NPC_DENSITY_THRESHOLD;
    }
    ControllerHolder_1.ControllerHolder.CreatureController.RefreshDensityLevel(e);
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(806, a.toString());
    }
    return true;
  }
  static ApplyNvidiaSuperSamplingEnable(e) {
    return !Info_1.Info.IsPs5Platform() && !!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice() && (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidiaDlessPluginLoaded() && GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidiaStreamlinePluginLoaded() && (e === 1 ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Enable 1"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAASamples 8"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAAFilterSize 1"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.FidelityFX.FSR.SecondaryUpscale 0"), GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.NVIDIADLSSFG), GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.NVIDIAREFLEX)) : (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Enable 0"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAASamples 4"), this.ApplyNvidiaSuperSamplingFrameGenerate(0)), GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.PCVSYNC), GameSettingsDeviceRender_1.GameSettingsDeviceRender.InCacheSceneColorMode === 1 && UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.CacheSceneColor.Start"), PerfSightController_1.PerfSightController.IsEnable) && UE.PerfSightHelper.PostEvent(804, e.toString()), true);
  }
  static ApplyNvidiaSuperSamplingFrameGenerate(e) {
    return !!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlss3GpuDevice() && (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidiaStreamlinePluginLoaded() && (GameSettingsDeviceRender_1.GameSettingsDeviceRender.EnableDLSSG(e), PerfSightController_1.PerfSightController.IsEnable) && UE.PerfSightHelper.PostEvent(820, e.toString()), true);
  }
  static ApplyPcVsync(e) {
    var a = UE.GameUserSettings.GetGameUserSettings();
    a.SetVSyncEnabled(e === 1);
    a.ApplySettings(true);
    return true;
  }
  static ApplyNvidiaSuperSamplingMode(e) {
    return !!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice() && (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidiaDlssPluginLoaded() && UE.DLSSLibrary.GetDLSSMode() !== e && (UE.DLSSLibrary.SetDLSSMode(e), PerfSightController_1.PerfSightController.IsEnable) && UE.PerfSightHelper.PostEvent(812, e.toString()), true);
  }
  static ApplyNvidiaSuperSamplingQuality(e) {
    var a;
    var t;
    return !!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice() && !(t = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.Kuro.KuroLocalRenderSettingIndex"), this.cQc === e && this.uQc === t) && !(this.uQc = t, this.cQc = e, GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidiaDlssPluginLoaded() && (e === 99 ? t >= GameSettingsDefine_1.HEAVY_SCENEVULUME_INDEX_START && t <= GameSettingsDefine_1.HEAVY_SCENEVULUME_INDEX_END ? (a = (t = UE.GameUserSettings.GetGameUserSettings().GetScreenResolution()).X, t = t.Y, a > 3000 || t > 3000 ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Quality -2"), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameSettings", 59, "KuroLocalRenderSettingIndex Change DLSS.Quality -2")) : (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Quality -1"), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameSettings", 59, "KuroLocalRenderSettingIndex Change DLSS.Quality -1"))) : UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Quality.Auto 1") : (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Quality.Auto 0"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Quality " + e)), PerfSightController_1.PerfSightController.IsEnable) && UE.PerfSightHelper.PostEvent(812, e.toString()), 0);
  }
  static ApplyNvidiaSuperSamplingSharpness(e) {
    return !!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice() && (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidiaDlssPluginLoaded() && UE.DLSSLibrary.SetDLSSSharpness(e), true);
  }
  static ApplyNvidiaReflex(e) {
    return true;
  }
  static ApplyFsrEnable(e) {
    return !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice() && !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsMetalFxDevice() && (Info_1.Info.IsGamepadPlatform() ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAASamples 4"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.FidelityFX.FSR.PrimaryUpscale 1"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.ScreenPercentage 77"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MipMapLODBias -0.3765"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAACurrentFrameWeight 0.09")) : (Info_1.Info.IsPcPlatform() ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Enable 0"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAASamples 4"), e === 1 ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.FidelityFX.FSR.PrimaryUpscale 1"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.ScreenPercentage 77"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MipMapLODBias -0.3765"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAACurrentFrameWeight 0.09")) : (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.FidelityFX.FSR.PrimaryUpscale 0"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.ScreenPercentage 100"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MipMapLODBias 0.0"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAACurrentFrameWeight 0.25"))) : e === 1 ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.FidelityFX.FSR.PrimaryUpscale 1"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAA.ClampTolerant 0"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAA.SharpenLimitDepth 10")) : (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.FidelityFX.FSR.PrimaryUpscale 0"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAA.ClampTolerant 2"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAA.SharpenLimitDepth -1")), PerfSightController_1.PerfSightController.IsEnable && UE.PerfSightHelper.PostEvent(813, e.toString())), true);
  }
  static ApplyXessEnable(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Game", 40, "ApplyXessEnable", ["XessEnable", e]);
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.XeSS.Enabled " + e);
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(804, e.toString());
    }
    return true;
  }
  static ApplyXessQuality(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Game", 40, "ApplyXessQuality", ["XessQuality", e]);
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.XeSS.Quality " + e);
    return true;
  }
  static ApplyXess2Enable(e) {
    return false;
  }
  static ApplyXess2Fg(e) {
    return false;
  }
  static ApplyXess2Quality(e) {
    return false;
  }
  static ApplyFsr3Enable(e) {
    return false;
  }
  static ApplyFsr3Fg(e) {
    return false;
  }
  static ApplyFsr3Quality(e) {
    return false;
  }
  static ApplyMetalFxEnable(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Game", 40, "ApplyMetalFxEnable", ["MetalFxEnable", e]);
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MetalFxUpscale " + e);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAA.SharpenLimitDepth " + (e === 1 ? 20 : -1));
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(818, e.toString());
    }
    return true;
  }
  static ApplyBloomEnable(e) {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroBloomEnable " + e);
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(811, e.toString());
    }
    return true;
  }
  static ApplyIrxEnable(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Game", 40, "ApplyIrxEnable", ["IrxEnable", e]);
    }
    if (e === 1) {
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.TurnOnIRX();
    } else {
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.TurnOffIRX();
    }
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(804, e.toString());
    }
    return true;
  }
  static ApplySceneLightQuality(e) {
    var a;
    if (Info_1.Info.IsMobilePlatform()) {
      if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsIosAndAndroidHighDevice()) {
        a = [1, 2, 3, 4, 4];
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.GlobalLightQuality " + a[e]);
      } else {
        a = [1, 2, 3, 3, 3];
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.GlobalLightQuality " + a[e]);
      }
    } else {
      a = [4, 4, 4, 4, 5];
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.GlobalLightQuality " + a[e]);
    }
    return true;
  }
  static ApplyVolumeFog(e) {
    return !!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsEnableVolumeFog() && (Info_1.Info.IsPcOrGamepadPlatform() && (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.volumetricfog " + e), PerfSightController_1.PerfSightController.IsEnable) && UE.PerfSightHelper.PostEvent(809, e.toString()), true);
  }
  static ApplyVolumeLight(e) {
    var a;
    if (Info_1.Info.IsPcOrGamepadPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.lightShaftQuality " + e);
    }
    if (Info_1.Info.IsMobilePlatform()) {
      a = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsIosAndAndroidHighDevice();
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MobileLightShaft " + (a ? e : 0));
    }
    return true;
  }
  static ApplyMotionBlur(e) {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.Amount " + e * (ModelManager_1.ModelManager?.CameraModel?.MotionBlurModifier ?? 0.2));
    return true;
  }
  static ApplyMobileResolution(e) {
    if (!Info_1.Info.IsMobilePlatform()) {
      return false;
    }
    if (Info_1.Info.PlatformType === 2 && (e === 0 ? UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAA.SharpenLimitDepth 50") : UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAA.SharpenLimitDepth -1"), GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformScreenBetter() && UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAA.Sharpness 0.5"), GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformScreenBad())) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAA.Sharpness 0.1");
    }
    if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.InCacheSceneColorMode === 1) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.CacheSceneColor.Start");
    }
    let a = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetMobileResolutionByIndex(e);
    var t = UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.MobileContentScaleFactor");
    var r = UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.SecondaryScreenPercentage.GameViewport");
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Game", 16, "分辨率参数获取", ["r.MobileContentScaleFactor", t]);
    }
    let i = 1;
    var n;
    var l = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultScreenResolution().Y;
    if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidHighResolutionDevice() && l > 0) {
      if ((n = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultScreenResolution().X) < l && l < t * 1280) {
        i = t * 1280 / l;
      } else if (l < n && l < t * 720) {
        i = t * 720 / l;
      }
      n = Math.min(r * i, 100);
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.SecondaryScreenPercentage.GameViewport " + n);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Game", 40, "分辨率校正", ["deviceScaleCorrect", i], ["secondaryScreenPercentage", r], ["newSecondaryScreenPercentage", n]);
      }
    } else if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultScreenResolution().Y < 750 && r < 70) {
      a = Math.min(a * 1.5, 100);
    }
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(803, e.toString());
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.ScreenPercentage " + a);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Game", 16, "分辨率参数设置", ["r.ScreenPercentage", a]);
    }
    return true;
  }
  static ApplySuperResolution(e) {
    return false;
  }
  static ApplyHorizontalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraBaseYawSensitivity(e);
  }
  static ApplyVerticalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraBasePitchSensitivity(e);
  }
  static ApplyAimHorizontalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraAimingYawSensitivity(e);
  }
  static ApplyAimVerticalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraAimingPitchSensitivity(e);
  }
  static ApplyCameraShakeStrength(e) {
    let a = 0;
    if (Info_1.Info.IsMobilePlatform()) {
      a = e;
    } else {
      switch (e) {
        case 0:
          a = ModelManager_1.ModelManager.MenuModel.LowShake;
          break;
        case 1:
          a = ModelManager_1.ModelManager.MenuModel.MiddleShake;
          break;
        case 2:
          a = ModelManager_1.ModelManager.MenuModel.HighShake;
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("GameSettings", 64, "相机抖动强度真实值", ["setting value", e], ["strength", a]);
    }
    ModelManager_1.ModelManager.CameraModel.SetCameraShakeModify(a);
  }
  static ApplyTextLanguage(e) {
    var a;
    var e = GameSettingsManager_1.GameSettingsManager.GetLanguageCodeById(e);
    return !!e && (a = LanguageSystem_1.LanguageSystem.PackageLanguage, LanguageSystem_1.LanguageSystem.PackageLanguage = e, ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(16), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TextLanguageChange, a, e), true);
  }
  static ApplyTextLanguageOnGameStart(e) {
    e = GameSettingsManager_1.GameSettingsManager.GetLanguageCodeById(e);
    return e !== undefined && (LanguageSystem_1.LanguageSystem.PackageLanguage = e, true);
  }
  static ApplyLanguageAudio(e) {
    e = GameSettingsManager_1.GameSettingsManager.GetAudioCodeById(e);
    return !!e && (LanguageSystem_1.LanguageSystem.SetPackageAudio(e, GlobalData_1.GlobalData.World), true);
  }
  static ApplyMobileHorizontalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraBaseYawSensitivity(e);
  }
  static ApplyMobileVerticalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraBasePitchSensitivity(e);
  }
  static ApplyMobileAimHorizontalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraAimingYawSensitivity(e);
  }
  static ApplyMobileAimVerticalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraAimingPitchSensitivity(e);
  }
  static ApplyCommonSpringArmLength(e) {
    ModelManager_1.ModelManager.CameraModel.CameraSettingNormalAdditionArmLength = e;
  }
  static ApplyFightSpringArmLength(e) {
    ModelManager_1.ModelManager.CameraModel.CameraSettingFightAdditionArmLength = e;
  }
  static ApplyResetFocusEnable(e) {
    ModelManager_1.ModelManager.CameraModel.IsEnableResetFocus = e === 1;
  }
  static ApplyIsSidestepCameraEnable(e) {
    ModelManager_1.ModelManager.CameraModel.IsEnableSidestepCamera = e === 1;
  }
  static ApplyIsSoftLockCameraEnable(e) {
    ModelManager_1.ModelManager.CameraModel.SetSettingSoftLockState(e === 1);
  }
  static ApplyJoystickShakeStrength(e) {
    var a = GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.JoystickShakeType);
    this.WNa(a, e);
    return true;
  }
  static ApplyJoystickShakeType(e) {
    var a = GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.JoystickShakeStrength);
    this.WNa(e, a);
    return true;
  }
  static WNa(e, a) {
    UE.BasePlayerController.SetKuroForceFeedbackConfig(e, a);
  }
  static ApplyWalkOrRunRate(e) {
    RoleGaitStatic_1.RoleGaitStatic.SetWalkOrRunRateForRocker(e);
  }
  static ApplyJoystickMode(e) {
    ModelManager_1.ModelManager.BattleUiModel.SetIsDynamicJoystick(e === 1);
  }
  static ApplyAutoSwitchSkillButtonMode(e) {
    ModelManager_1.ModelManager.BattleUiModel.SetIsAutoSwitchSkillButtonMode(e === 0);
  }
  static ApplyAimAssistEnable(e) {
    ModelManager_1.ModelManager.CameraModel?.SetAimAssistEnable(e === 1);
  }
  static ApplyKeyboardLockEnemyMode(e) {
    ControllerHolder_1.ControllerHolder.FormationDataController.SetKeyboardLockEnemyMode(e);
  }
  static ApplyHorizontalViewRevert(e) {
    var a = ConfigManager_1.ConfigManager.MenuBaseConfig?.GetAxisRevertConfigListByRevertType(0);
    if (a) {
      this.Zia(e === 1, a);
    }
  }
  static ApplyVerticalViewRevert(e) {
    var a = ConfigManager_1.ConfigManager.MenuBaseConfig?.GetAxisRevertConfigListByRevertType(1);
    if (a) {
      this.Zia(e === 1, a);
    }
  }
  static RefreshViewRevertState(e) {
    let a = 0;
    let t = 0;
    if (e === 2) {
      a = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.HorizontalViewRevert) ?? 0;
      t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.VerticalViewRevert) ?? 0;
    }
    this.ApplyHorizontalViewRevert(a);
    this.ApplyVerticalViewRevert(t);
  }
  static Zia(a, e) {
    for (const s of e) {
      var t = s.AxisName;
      var t = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(t);
      if (t) {
        var r = new Map();
        var i = s.RevertInfo;
        var n = t.GetInputAxisKeyMap();
        if (n) {
          for (var [l, o] of i) {
            var g = n.get(l);
            if (g) {
              let e = 0;
              g = g.Scale;
              if (o === 0) {
                e = a ? g > 0 ? -g : g : g > 0 ? g : -g;
              }
              if (o === 1) {
                e = a ? g > 0 ? g : -g : g > 0 ? -g : g;
              }
              r.set(l, e);
            }
          }
          if (r.size <= 0) {
            return;
          }
          t.SetKeys(r);
        }
      }
    }
  }
  static ApplyGamepadLockEnemyMode(e) {
    ControllerHolder_1.ControllerHolder.FormationDataController.SetGamepadLockEnemyMode(e);
  }
  static ApplyEnemyHitDisplayMode(e) {
    ModelManager_1.ModelManager.BulletModel.OpenHitMaterial = e === 1;
  }
  static ApplyPushEnableState(e, a) {
    if (e === 0) {
      ControllerHolder_1.ControllerHolder.KuroPushController.TurnOffPush();
    } else {
      ControllerHolder_1.ControllerHolder.KuroPushController.TurnOnPush(a === 1);
    }
  }
  static ApplyAutoAdjustImageQuality(e) {
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.SetIsAutoAdjustImageQuality(e === 1);
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(824, e.toString());
    }
  }
  static ApplyShowDamage(e) {
    DamageUiManager_1.DamageUiManager.SetDamageViewVisible(e === 1);
  }
  static ApplyDynamicBones(e) {
    ControllerHolder_1.ControllerHolder.CreatureController.SetKawaiiEnable(e);
  }
  static ApplyDolbyAtmos(e) {
    AudioSystem_1.AudioSystem.SetRtpcValue(AudioDefine_1.RTPC_DOLBY_ATMOS, e);
  }
  static ApplyUiPureMode(e) {
    if (e === 1) {
      ControllerHolder_1.ControllerHolder.BattleUiControl.TryOpenPureMode();
      return false;
    } else {
      return ControllerHolder_1.ControllerHolder.BattleUiControl.TryClosePureMode();
    }
  }
  static ApplyRayTracing(e) {
    if (e > 0) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "sg.RayTracingQuality " + e);
    }
    var a = UE.BlueprintPathsLibrary.ProjectSavedDir() + "SaveGames/RTX.json";
    if (UE.KuroStaticLibrary.FileExists(a)) {
      UE.KuroStaticLibrary.DeleteFile(a);
    }
    UE.KuroRenderingRuntimeBPPluginBPLibrary.SetRayTracingEnable(e > 0);
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(821, e.toString());
    }
    return true;
  }
  static ApplyRayTracedReflection(e) {
    if (e > 0) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Lumen.Reflections.Allow 1");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameSettings", 73, "光追反射开启");
      }
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Lumen.Reflections.Allow 0");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameSettings", 73, "光追反射关闭");
      }
    }
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(822, e.toString());
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateRayTraceReflection, e > 0);
    return true;
  }
  static ApplyRayTracedGI(e) {
    if (e > 0) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Lumen.DiffuseIndirect.Allow 1");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameSettings", 73, "光追全局光照开启");
      }
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Lumen.DiffuseIndirect.Allow 0");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameSettings", 73, "光追全局光照关闭");
      }
    }
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(823, e.toString());
    }
    return true;
  }
  static ApplyRayTracedShadow(e) {
    if (e > 0) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.RayTracing.Shadows 1");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameSettings", 73, "光追阴影开启");
      }
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.RayTracing.Shadows 0");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameSettings", 73, "光追阴影关闭");
      }
    }
    return true;
  }
  static ApplySaturationClient(e) {
    let a = 1;
    if (e <= 50) {
      a = MathUtils_1.MathUtils.Lerp(0, 1, e * 2 / 100);
    }
    if (e > 50) {
      a = MathUtils_1.MathUtils.Lerp(1, 2, (e - 50) * 2 / 100);
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Client.Saturation " + a);
    return true;
  }
  static ApplyContrastClient(e) {
    let a = 1;
    if (e <= 50) {
      a = MathUtils_1.MathUtils.Lerp(0.5, 1, e * 2 / 100);
    }
    if (e > 50) {
      a = MathUtils_1.MathUtils.Lerp(1, 2, (e - 50) * 2 / 100);
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Client.Contrast " + a);
    return true;
  }
  static ApplySkinDamageMode(e) {
    CharacterSkinDamageComponent_1.CharacterSkinDamageComponent.EnableSkinDamage = e === 1;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnResetSkinDamageMode);
  }
  static ApplyAFMEOption(e) {
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.EnableAFME(e);
  }
  static ApplyAutoRun(e) {
    return ModelManager_1.ModelManager.BattleUiModel !== undefined && ModelManager_1.ModelManager.BattleUiModel.FormationData !== undefined && (ModelManager_1.ModelManager.BattleUiModel.FormationData.AutoMovingSettingEnable = e > 0, true);
  }
  static ApplyAutoSprint(e) {
    return ModelManager_1.ModelManager.BattleUiModel !== undefined && ModelManager_1.ModelManager.BattleUiModel.FormationData !== undefined && (ModelManager_1.ModelManager.BattleUiModel.FormationData.AutoSprintSettingEnable = e > 0, true);
  }
  static ApplyVulkan(e) {
    UE.KuroRenderingRuntimeBPPluginBPLibrary.SetVulkanPromotion(e > 0);
    return true;
  }
  static ApplyWaterInteract(e) {
    ModelManager_1.ModelManager.SceneBattleInteractModel.Open = e > 0;
    return true;
  }
}
(exports.GameSettingsUtils = GameSettingsUtils).cQc = undefined;
GameSettingsUtils.uQc = undefined; //# sourceMappingURL=GameSettingsUtils.js.map