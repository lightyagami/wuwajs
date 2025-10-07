"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSettingsManager = undefined;
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const LanguageSystem_1 = require("../../Core/Common/LanguageSystem");
const Log_1 = require("../../Core/Common/Log");
const CommonDefine_1 = require("../../Core/Define/CommonDefine");
const VideoResUpdate_1 = require("../../Launcher/DiffPatch/Update/VideoResUpdate");
const CloudGameManagerLauncher_1 = require("../../Launcher/Platform/CloudGameManagerLauncher");
const Platform_1 = require("../../Launcher/Platform/Platform");
const LauncherGameSettingLib_1 = require("../../Launcher/Util/LauncherGameSettingLib");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const LocalStorage_1 = require("../Common/LocalStorage");
const LocalStorageDefine_1 = require("../Common/LocalStorageDefine");
const GlobalData_1 = require("../GlobalData");
const CloudGameManager_1 = require("../Manager/CloudGameManager");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ModelManager_1 = require("../Manager/ModelManager");
const GameSettingsDefine_1 = require("./GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("./GameSettingsDeviceRender");
const GameSettingsInitValueSource_1 = require("./Misc/GameSettingsInitValueSource");
class GameSettingsManager {
  static get ValidApplyConfigMap() {
    if (this.Fsc === undefined) {
      this.Fsc = new Map();
      for (const i of ConfigManager_1.ConfigManager.MenuBaseConfig.GetMenuBaseConfig()) {
        var [e, t] = this.CheckConfigValidByCheckList(i);
        if (e) {
          if (this.ZMc(i) || i.FunctionId in GameSettingsDefine_1.EFunction) {
            if (this.Fsc.has(i.FunctionId)) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("GameSettings", 64, "可应用的选项出现冲突，请认真检查配置【CheckList】", ["出现冲突的functionId", i.FunctionId], ["已保存的设置id", this.Fsc.get(i.FunctionId)?.Id], ["发生冲突的设置id", i.Id]);
              }
            } else {
              this.Fsc.set(i.FunctionId, i);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("GameSettings", 64, "存在未注册在EFunction中的功能（非按键），视作该功能不存在", ["cfg id", i.Id], ["cfg FunctionId", i.FunctionId]);
          }
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("GameSettings", 64, "非法设置项", ["cfg id", i.Id], ["cfg FunctionId", i.FunctionId], ["reason", t]);
        }
      }
    }
    return this.Fsc;
  }
  static CheckConfigValidByCheckList(e) {
    var t;
    var [i, n] = this.Vsc(e);
    if (i) {
      [i, t] = this.jsc(e.FunctionId);
      if (i) {
        [i, e] = this.udc(e);
        if (i) {
          return [true, "NONE"];
        } else {
          return [false, "CheckDeviceExtra:" + e];
        }
      } else {
        return [false, "CheckDeviceVendor:" + t];
      }
    } else {
      return [false, "CheckPlatform:" + n];
    }
  }
  static udc(e) {
    e = e.Device;
    if (e === "isNotVeryHigh") {
      return [GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceType !== 15 || !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120DeviceForAllDevice(), "isNotVeryHigh"];
    } else if (e === "isVeryHigh") {
      return [GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceType === 15 && GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120DeviceForAllDevice(), "isVeryHigh"];
    } else if (e === "isNotAndroidVeryHigh") {
      return [!Info_1.Info.IsAndroidPlatform() || !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidHighestResolutionDevice(), "isNotAndroidVeryHigh"];
    } else if (e === "isAndroidVeryHigh") {
      return [Info_1.Info.IsAndroidPlatform() && GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidHighestResolutionDevice(), "isAndroidVeryHigh"];
    } else if (e === "isLowMemory") {
      return [UE.KuroStaticLibrary.IsLowMemoryDevice(), "isLowMemory"];
    } else if (e === "isNotLowMemory") {
      return [!UE.KuroStaticLibrary.IsLowMemoryDevice(), "isNotLowMemory"];
    } else if (e === "isNot120Frame") {
      return [!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120DeviceForAllDevice(), "isNot120Frame"];
    } else if (e === "is120Frame") {
      return [GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120DeviceForAllDevice(), "is120Frame"];
    } else if (e === "isCloudGame") {
      return [Platform_1.Platform.IsCloudGame(), "isCloudGame"];
    } else if (e === "isNotCloudGame") {
      return [!Platform_1.Platform.IsCloudGame(), "isNotCloudGame"];
    } else if (e === "isAutoAdjustImageQuality") {
      return [Platform_1.Platform.IsPcPlatform() || Platform_1.Platform.IsAndroidPlatform(), "isAutoAdjustImageQuality"];
    } else if (e === "isMac") {
      return [Info_1.Info.IsMacPlatform(), "isMac"];
    } else if (e === "isNotMac") {
      return [!Info_1.Info.IsMacPlatform(), "isNotMac"];
    } else if (e === "isNotMobile") {
      return [!Info_1.Info.IsIosPlatform() && !Info_1.Info.IsAndroidPlatform(), "isNotMobile"];
    } else if (e === "isMetalSupport") {
      return [GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsMetalFxDevice(), "isMetalSupport"];
    } else if (e === "isRedMagic") {
      return [GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsRedMagic(), "isRedMagic"];
    } else if (e === "isNotRedMagic") {
      return [!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsRedMagic(), "isNotRedMagic"];
    } else if (e === "isNotGrayscale") {
      return [VideoResUpdate_1.VideoResUpdate.GetIsEnableVideoUpdateEntry(), "isNotGrayscale"];
    } else if (e === "is50Series") {
      return [GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsRTX50(), "is50Series"];
    } else if (e === "isNot50Series") {
      return [!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsRTX50(), "isNot50Series"];
    } else {
      return [true, "DEFAULT"];
    }
  }
  static jsc(e) {
    var t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice();
    var i = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFsrDevice();
    var n = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsPWSDKDevice();
    var a = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlss3GpuDevice();
    var s = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsVulkanDevice();
    var r = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetD3D12Type() > 0;
    var o = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsXess2Supported();
    var g = UE.KuroFFXFSR3BlueprintLibrary.IsGlobalSwitchOn();
    var _ = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFsr3Supported();
    var m = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFFXFISupported();
    var S = _ && !r;
    var f = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsShowRayTracingSetting();
    var c = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLumenGISupported() && f;
    var G = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLumenReflectionsSupported() && f;
    var D = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRayTracingShadowsSupported() && f;
    var u = UE.KismetRenderingLibrary.IsSupportedAFME();
    switch (e) {
      case GameSettingsDefine_1.EFunction.NVIDIADLSS:
        return [t, "EFunction.NVIDIADLSS"];
      case GameSettingsDefine_1.EFunction.NVIDIADLSSFG:
        return [a && r, "EFunction.NVIDIADLSSFG"];
      case GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY:
        return [t, "EFunction.NVIDIADLSSQUALITY"];
      case GameSettingsDefine_1.EFunction.NVIDIADLSSSHARPNESS:
        return [t, "EFunction.NVIDIADLSSSHARPNESS"];
      case GameSettingsDefine_1.EFunction.NVIDIAREFLEX:
        return [t, "EFunction.NVIDIAREFLEX"];
      case GameSettingsDefine_1.EFunction.FSR:
        return [i || S, "EFunction.FSR"];
      case GameSettingsDefine_1.EFunction.IRX:
        return [n, "EFunction.IRX"];
      case GameSettingsDefine_1.EFunction.METALFX:
        return [GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsMetalFxDevice(), "EFunction.METALFX"];
      case GameSettingsDefine_1.EFunction.XESS:
        return [false, "EFunction.XESS"];
      case GameSettingsDefine_1.EFunction.XESS_QUALITY:
        return [false, "EFunction.XESS_QUALITY"];
      case GameSettingsDefine_1.EFunction.XESS2:
      case GameSettingsDefine_1.EFunction.XESS2_FG:
      case GameSettingsDefine_1.EFunction.XESS2_QUALITY:
        return [o, "EFunction.XESS2"];
      case GameSettingsDefine_1.EFunction.FSR3:
      case GameSettingsDefine_1.EFunction.FSR3_QUALITY:
        return [_ && r && g, "EFunction.FSR3"];
      case GameSettingsDefine_1.EFunction.FSR3_FG:
        return [m && r && g, "EFunction.FSR3_FG"];
      case GameSettingsDefine_1.EFunction.SCENEAO:
        return [!Info_1.Info.IsMobilePlatform() || GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformAOValid() || GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsIOSPlatformAOValid(), "EFunction.SCENEAO"];
      case GameSettingsDefine_1.EFunction.VOLUMEFOG:
        return [!Info_1.Info.IsMacPlatform(), "EFunction.VOLUMEFOG"];
      case GameSettingsDefine_1.EFunction.DOLBYATOMS:
        return [UE.KuroAudioStatics.IsDolbyAtmosGameSupported(), "EFunction.DOLBYATOMS"];
      case GameSettingsDefine_1.EFunction.RayTracing:
        return [f, "EFunction.RayTracing"];
      case GameSettingsDefine_1.EFunction.RayTracedGI:
        return [c, "EFunction.RayTracedGI"];
      case GameSettingsDefine_1.EFunction.RayTracedReflection:
        return [G, "EFunction.RayTracedReflection"];
      case GameSettingsDefine_1.EFunction.RayTracedShadow:
        return [D, "EFunction.RayTracedShadow"];
      case GameSettingsDefine_1.EFunction.AdrenoFME:
        return [u, "EFunction.AdrenoFME"];
      case GameSettingsDefine_1.EFunction.Vulkan:
        return [s, "EFunction.Vulkan"];
      default:
        return [true, "DEFAULT"];
    }
  }
  static Vsc(e) {
    switch (e.Platform) {
      case 1:
        return [Info_1.Info.IsPcOrGamepadPlatform() && !Platform_1.Platform.IsCloudGame(), "EMenuConfigPlatform.PC_OR_PS"];
      case 2:
        return [Info_1.Info.IsMobilePlatform() || Platform_1.Platform.IsCloudGame(), "EMenuConfigPlatform.MOBILE"];
      case 3:
        return [Info_1.Info.IsAndroidPlatform(), "EMenuConfigPlatform.ANDROID"];
      case 4:
        return [Info_1.Info.IsIosPlatform(), "EMenuConfigPlatform.IOS"];
      case 5:
        return [Info_1.Info.IsPs5Platform(), "EMenuConfigPlatform.PlayStation"];
      case 6:
        return [Info_1.Info.IsPcPlatform(), "EMenuConfigPlatform.PC_ONLY"];
      case 0:
        return [true, "EMenuConfigPlatform.NORMAL"];
      default:
        return [false, "DEFAULT"];
    }
  }
  static ZMc(e) {
    return e.MainType === GameSettingsDefine_1.MAIN_TYPE_OF_KEY_SETTING && e.Platform !== 2 && e.FunctionId !== GameSettingsDefine_1.EFunction.KeyboardLockEnemyMode && e.FunctionId !== GameSettingsDefine_1.EFunction.GamepadLockEnemyMode;
  }
  static Hsc(e, t) {
    this.$sc.get(GameSettingsDefine_1.EFunction.IMAGEQUALITY)?.CacheValue(e.QualityType, t);
    for (var [i, n] of GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetOtherChangedValue(e)) {
      this.$sc.get(i)?.CacheValue(n, t);
    }
  }
  static Wsc(e) {
    var t;
    var i = GameSettingsDefine_1.function2GameSettings[e].GetCallbackOrGlobalKey;
    var i = LocalStorage_1.LocalStorage.GetGlobal(i);
    if (i !== undefined && i < 50) {
      t = Math.floor(22.22 + i * 0.555);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Menu", 64, "[ViewSensitivity]转化视角灵敏度", ["functionId", e], ["value", i], ["newValue", t]);
      }
      this.$sc.get(e)?.CacheValue(t, 1);
    }
  }
  static Qsc(e, t, i) {
    e = e.get(t);
    if (e !== undefined) {
      this.$sc.get(t)?.CacheValue(e, i);
    }
  }
  static Ksc() {
    this.Xsc();
    this.Ysc();
    this.zsc();
    this.Jsc();
    this.MGc();
    this.Pr1();
    this.q5u();
  }
  static Xsc() {
    if (!LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertAllViewSensitivity, false)) {
      if (Info_1.Info.IsPcPlatform()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Menu", 64, " [ViewSensitivity]转化Pc视角灵敏度");
        }
        this.Wsc(GameSettingsDefine_1.EFunction.HorizontalViewSensitivity);
        this.Wsc(GameSettingsDefine_1.EFunction.VerticalViewSensitivity);
        this.Wsc(GameSettingsDefine_1.EFunction.AimHorizontalViewSensitivity);
        this.Wsc(GameSettingsDefine_1.EFunction.AimVerticalViewSensitivity);
      }
      if (Info_1.Info.IsMobilePlatform()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Menu", 64, "[ViewSensitivity]转化Mobile视角灵敏度");
        }
        this.Wsc(GameSettingsDefine_1.EFunction.MobileHorizontalViewSensitivity);
        this.Wsc(GameSettingsDefine_1.EFunction.MobileVerticalViewSensitivity);
        this.Wsc(GameSettingsDefine_1.EFunction.MobileAimHorizontalViewSensitivity);
        this.Wsc(GameSettingsDefine_1.EFunction.MobileAimVerticalViewSensitivity);
      }
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertAllViewSensitivity, true);
    }
  }
  static Ysc() {
    var e = UE.KismetSystemLibrary.GetCommandLine();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Menu", 64, "根据命令行判断是否为全屏模式", ["commandLine", e]);
    }
    if (e.includes("-windowed")) {
      this.$sc.get(GameSettingsDefine_1.EFunction.DISPLAYMODE)?.CacheValue(1, 1);
    }
  }
  static zsc() {
    var e;
    if (Platform_1.Platform.IsCloudGame() && ((e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultDeviceRenderFeature()) === undefined ? Log_1.Log.CheckError() && Log_1.Log.Error("GameSettings", 64, "云游戏时不能获得渲染Feature预设值") : this.Hsc(e, 0), this.$sc.get(GameSettingsDefine_1.EFunction.NVIDIADLSS)?.CacheValue(1, 0), this.$sc.get(GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY)?.CacheValue(0, 0), CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch) && (CloudGameManager_1.CloudGameManager.ScreenWidth !== 0 && ((e = UE.GameUserSettings.GetGameUserSettings()).SetScreenResolution(new UE.IntPoint(CloudGameManager_1.CloudGameManager.ScreenWidth, CloudGameManager_1.CloudGameManager.ScreenHeight)), e.ApplySettings(true)), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("CloudGame", 16, "初始化游戏设置 - 云游戏预启动分辨率设置", ["CloudGameManager.ScreenWidth", CloudGameManager_1.CloudGameManager.ScreenWidth], ["CloudGameManager.ScreenHeight", CloudGameManager_1.CloudGameManager.ScreenHeight]);
    }
  }
  static ApplyCloudGameResolution() {
    var e;
    if (CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch && (CloudGameManager_1.CloudGameManager.ScreenWidth !== 0 && ((e = UE.GameUserSettings.GetGameUserSettings()).SetScreenResolution(new UE.IntPoint(CloudGameManager_1.CloudGameManager.ScreenWidth, CloudGameManager_1.CloudGameManager.ScreenHeight)), e.ApplySettings(true)), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("CloudGame", 16, "初始化游戏设置 - 云游戏预启动分辨率设置", ["CloudGameManager.ScreenWidth", CloudGameManager_1.CloudGameManager.ScreenWidth], ["CloudGameManager.ScreenHeight", CloudGameManager_1.CloudGameManager.ScreenHeight]);
    }
  }
  static Jsc() {
    var e = this.ValidApplyConfigMap.get(GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY);
    var t = this.$sc.get(GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY);
    if (e !== undefined && t !== undefined && !(e = e.OptionsDefault, LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.HasRefreshNvidiaDlssQuality))) {
      t.CacheValue(e, 1);
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.HasRefreshNvidiaDlssQuality, true);
    }
  }
  static MGc() {
    var e = this.ValidApplyConfigMap.get(GameSettingsDefine_1.EFunction.NVIDIADLSSFG);
    var t = this.$sc.get(GameSettingsDefine_1.EFunction.NVIDIADLSSFG);
    if (e !== undefined && t !== undefined) {
      e = e.OptionsDefault;
      if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlss3HardwareSchedulingDisabled()) {
        t.CacheValue(e, 1);
      } else if (this.GetCurrentValue(GameSettingsDefine_1.EFunction.NVIDIADLSS, false) === 0) {
        t.CacheValue(0, 1);
      }
    }
  }
  static Zsc() {
    var e;
    var t;
    if (ModelManager_1.ModelManager.RecommendQualityModel.IsNeedApply) {
      t = this.$sc.get(GameSettingsDefine_1.EFunction.IMAGEQUALITY);
      e = ModelManager_1.ModelManager.RecommendQualityModel.NeedApplyQuality;
      t?.CacheValue(e, 1);
      if ((t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDeviceRenderFeature(e)) !== undefined) {
        this.Hsc(t, 1);
      }
      ModelManager_1.ModelManager.RecommendQualityModel.IsNeedApply = false;
    }
  }
  static gud() {
    var e;
    var t = this.$sc.get(GameSettingsDefine_1.EFunction.Vulkan);
    if (t !== undefined && (e = this.GetCurrentValue(GameSettingsDefine_1.EFunction.Vulkan, false)) !== undefined) {
      t.CacheValue(e, 1);
    }
  }
  static Pr1() {
    var e = this.ValidApplyConfigMap.get(GameSettingsDefine_1.EFunction.BRIGHTNESS);
    var t = this.$sc.get(GameSettingsDefine_1.EFunction.BRIGHTNESS);
    if (e !== undefined && t !== undefined && !(e = e.OptionsDefault, LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.HasResetBrightness))) {
      t.CacheValue(e, 1);
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.HasResetBrightness, true);
    }
  }
  static q5u() {
    var e;
    if (UE.KuroStaticLibrary.IsLowMemoryDevice() && (e = this.$sc.get(GameSettingsDefine_1.EFunction.NPCDENSITY)) !== undefined) {
      e.CacheValue(0, 1);
    }
  }
  static eac() {
    for (var [t, i] of this.$sc) {
      var n = GameSettingsDefine_1.function2GameSettings[t].GetCallbackOrGlobalKey;
      if (typeof n == "number") {
        n = LocalStorage_1.LocalStorage.GetGlobal(n);
        t = this.ValidApplyConfigMap.get(t);
        if (n !== undefined) {
          let e = true;
          if (e = t?.SetType === 2 ? t.OptionsValue.includes(n) : e) {
            i.CacheValue(n, 2);
          }
        }
      }
    }
  }
  static tac() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.TextLanguage);
    if (e !== undefined) {
      this.$sc.get(GameSettingsDefine_1.EFunction.TEXTLANGUAGE)?.CacheValue(e, 3);
    }
    if ((e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.VoiceLanguage)) !== undefined) {
      this.$sc.get(GameSettingsDefine_1.EFunction.VOICELANGUAGE)?.CacheValue(e, 3);
    }
  }
  static iac() {
    var e = LauncherGameSettingLib_1.LauncherGameSettingLib.LoadPlayMenuInfo();
    if (e !== undefined && (this.Qsc(e, GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION, 4), this.Qsc(e, GameSettingsDefine_1.EFunction.VOICEVOLUMEFUNCTION, 4), this.Qsc(e, GameSettingsDefine_1.EFunction.MUSICVOLUMEFUNCTION, 4), this.Qsc(e, GameSettingsDefine_1.EFunction.SFXVOLUMEFUNCTION, 4), this.Qsc(e, GameSettingsDefine_1.EFunction.AMBVOLUMEFUNCTION, 4), this.Qsc(e, GameSettingsDefine_1.EFunction.UIVOLUMEFUNCTION, 4), (e = this.GetCurrentValue(GameSettingsDefine_1.EFunction.HIGHESTFPS)) !== undefined) && e > 10) {
      this.$sc.get(GameSettingsDefine_1.EFunction.HIGHESTFPS)?.CacheValue(GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetFrameIndexByList(e), 4);
    }
  }
  static rac() {
    var e;
    var t;
    var i = new Map();
    var n = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.GameQualitySetting);
    if (n !== undefined) {
      i.set(GameSettingsDefine_1.EFunction.IMAGEQUALITY, n.KeyQualityLevel);
      i.set(GameSettingsDefine_1.EFunction.DISPLAYMODE, n.KeyPcWindowMode);
      i.set(GameSettingsDefine_1.EFunction.BRIGHTNESS, n.KeyBrightness);
      i.set(GameSettingsDefine_1.EFunction.FSR, n.KeyFsrEnable);
      i.set(GameSettingsDefine_1.EFunction.XESS, n.KeyXessEnable ?? 1);
      i.set(GameSettingsDefine_1.EFunction.XESS_QUALITY, n.KeyXessQuality ?? 2);
      i.set(GameSettingsDefine_1.EFunction.METALFX, n.KeyMetalFxEnable);
      i.set(GameSettingsDefine_1.EFunction.IRX, n.KeyIrxEnable ?? 1);
      i.set(GameSettingsDefine_1.EFunction.HorizontalViewSensitivity, n.HorizontalViewSensitivity);
      i.set(GameSettingsDefine_1.EFunction.VerticalViewSensitivity, n.VerticalViewSensitivity);
      i.set(GameSettingsDefine_1.EFunction.AimHorizontalViewSensitivity, n.AimHorizontalViewSensitivity);
      i.set(GameSettingsDefine_1.EFunction.AimVerticalViewSensitivity, n.AimVerticalViewSensitivity);
      i.set(GameSettingsDefine_1.EFunction.MobileHorizontalViewSensitivity, n.MobileHorizontalViewSensitivity);
      i.set(GameSettingsDefine_1.EFunction.MobileVerticalViewSensitivity, n.MobileVerticalViewSensitivity);
      i.set(GameSettingsDefine_1.EFunction.MobileAimHorizontalViewSensitivity, n.MobileAimHorizontalViewSensitivity);
      i.set(GameSettingsDefine_1.EFunction.MobileAimVerticalViewSensitivity, n.MobileAimVerticalViewSensitivity);
      i.set(GameSettingsDefine_1.EFunction.CommonSpringArmLength, n.CommonSpringArmLength);
      i.set(GameSettingsDefine_1.EFunction.FightSpringArmLength, n.FightSpringArmLength);
      i.set(GameSettingsDefine_1.EFunction.ResetFocusEnable, n.IsResetFocusEnable);
      i.set(GameSettingsDefine_1.EFunction.IsSidestepCameraEnable, n.IsSidestepCameraEnable);
      i.set(GameSettingsDefine_1.EFunction.IsSoftLockCameraEnable, n.IsSoftLockCameraEnable);
      i.set(GameSettingsDefine_1.EFunction.JoystickShakeStrength, n.JoystickShakeStrength);
      i.set(GameSettingsDefine_1.EFunction.JoystickShakeType, n.JoystickShakeType);
      i.set(GameSettingsDefine_1.EFunction.JoystickMode, n.JoystickMode);
      i.set(GameSettingsDefine_1.EFunction.SkillButtonMode, n.IsAutoSwitchSkillButtonMode);
      i.set(GameSettingsDefine_1.EFunction.AimAssist, n.AimAssistEnable);
      i.set(GameSettingsDefine_1.EFunction.HorizontalViewRevert, n.HorizontalViewRevert);
      i.set(GameSettingsDefine_1.EFunction.VerticalViewRevert, n.VerticalViewRevert);
      i.set(GameSettingsDefine_1.EFunction.WalkOrRunRate, n.WalkOrRunRate);
      i.set(GameSettingsDefine_1.EFunction.CameraShakeStrength, LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.CameraShakeStrength));
    }
    var n = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.MenuData);
    if (n !== undefined) {
      i.set(GameSettingsDefine_1.EFunction.CameraShakeStrength, n.get(GameSettingsDefine_1.EFunction.CameraShakeStrength));
      i.set(GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION, n.get(GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION));
      i.set(GameSettingsDefine_1.EFunction.VOICEVOLUMEFUNCTION, n.get(GameSettingsDefine_1.EFunction.VOICEVOLUMEFUNCTION));
      i.set(GameSettingsDefine_1.EFunction.MUSICVOLUMEFUNCTION, n.get(GameSettingsDefine_1.EFunction.MUSICVOLUMEFUNCTION));
      i.set(GameSettingsDefine_1.EFunction.SFXVOLUMEFUNCTION, n.get(GameSettingsDefine_1.EFunction.SFXVOLUMEFUNCTION));
      i.set(GameSettingsDefine_1.EFunction.AMBVOLUMEFUNCTION, n.get(GameSettingsDefine_1.EFunction.AMBVOLUMEFUNCTION));
      i.set(GameSettingsDefine_1.EFunction.UIVOLUMEFUNCTION, n.get(GameSettingsDefine_1.EFunction.UIVOLUMEFUNCTION));
      i.set(GameSettingsDefine_1.EFunction.RESOLUTION, n.get(GameSettingsDefine_1.EFunction.RESOLUTION));
      i.set(GameSettingsDefine_1.EFunction.TEXTLANGUAGE, n.get(GameSettingsDefine_1.EFunction.TEXTLANGUAGE));
      i.set(GameSettingsDefine_1.EFunction.VOICELANGUAGE, n.get(GameSettingsDefine_1.EFunction.VOICELANGUAGE));
      i.set(GameSettingsDefine_1.EFunction.ADVICESETTING, n.get(GameSettingsDefine_1.EFunction.ADVICESETTING));
      i.set(GameSettingsDefine_1.EFunction.GENDERSETTING, n.get(GameSettingsDefine_1.EFunction.GENDERSETTING));
    }
    for ([e, t] of i) {
      if (t !== undefined) {
        this.$sc.get(e)?.CacheValue(t, 5);
      }
    }
  }
  static oac() {
    var e = LauncherGameSettingLib_1.LauncherGameSettingLib.LoadPlayMenuInfo();
    if (e !== undefined) {
      this.Qsc(e, GameSettingsDefine_1.EFunction.CameraShakeStrength, 6);
      this.Qsc(e, GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION, 6);
      this.Qsc(e, GameSettingsDefine_1.EFunction.VOICEVOLUMEFUNCTION, 6);
      this.Qsc(e, GameSettingsDefine_1.EFunction.MUSICVOLUMEFUNCTION, 6);
      this.Qsc(e, GameSettingsDefine_1.EFunction.SFXVOLUMEFUNCTION, 6);
      this.Qsc(e, GameSettingsDefine_1.EFunction.AMBVOLUMEFUNCTION, 6);
      this.Qsc(e, GameSettingsDefine_1.EFunction.UIVOLUMEFUNCTION, 6);
      this.Qsc(e, GameSettingsDefine_1.EFunction.RESOLUTION, 6);
      this.Qsc(e, GameSettingsDefine_1.EFunction.TEXTLANGUAGE, 6);
      this.Qsc(e, GameSettingsDefine_1.EFunction.VOICELANGUAGE, 6);
      this.Qsc(e, GameSettingsDefine_1.EFunction.ADVICESETTING, 6);
      this.Qsc(e, GameSettingsDefine_1.EFunction.GENDERSETTING, 6);
    }
  }
  static nac() {
    var e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultDeviceRenderFeature();
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameSettings", 64, "当前机型没有设置默认画质", ["当前机型", GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceType]);
      }
    } else {
      this.Hsc(e, 8);
    }
  }
  static D7d() {
    if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultDeviceRenderFeature() !== undefined) {
      this.$sc.get(GameSettingsDefine_1.EFunction.RayTracing)?.CacheValue(0, 7);
    }
  }
  static sac() {
    this.$sc.get(GameSettingsDefine_1.EFunction.KeyboardLockEnemyMode)?.CacheValue(1, 9);
    this.$sc.get(GameSettingsDefine_1.EFunction.GamepadLockEnemyMode)?.CacheValue(1, 9);
    this.$sc.get(GameSettingsDefine_1.EFunction.VegetationDither)?.CacheValue(GameSettingsDeviceRender_1.GameSettingsDeviceRender.ShouldOverrideVegetationDitherDefaultValue() ? 0 : this.ValidApplyConfigMap.get(GameSettingsDefine_1.EFunction.VegetationDither)?.OptionsDefault ?? 0, 9);
  }
  static aac() {
    var e = UE.GameUserSettings.GetGameUserSettings();
    var t = e === undefined ? GameSettingsDefine_1.WINDOWS_RESOLUTION_INDEX : GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionIndexByList(e.GetScreenResolution());
    this.$sc.get(GameSettingsDefine_1.EFunction.RESOLUTION)?.CacheValue(t, 11);
    var t = e?.GetFullscreenMode();
    if (t !== undefined) {
      switch (t) {
        case 0:
        case 1:
          this.$sc.get(GameSettingsDefine_1.EFunction.DISPLAYMODE)?.CacheValue(0, 11);
          break;
        case 2:
          this.$sc.get(GameSettingsDefine_1.EFunction.DISPLAYMODE)?.CacheValue(1, 11);
      }
    }
    LanguageSystem_1.LanguageSystem.FirstTimeSetLanguage(GlobalData_1.GlobalData.World);
    e = this.hac(LanguageSystem_1.LanguageSystem.PackageLanguage);
    t = this.lac(e);
    this.$sc.get(GameSettingsDefine_1.EFunction.TEXTLANGUAGE)?.CacheValue(e, 11);
    this.$sc.get(GameSettingsDefine_1.EFunction.VOICELANGUAGE)?.CacheValue(t, 11);
    this.$sc.get(GameSettingsDefine_1.EFunction.Vulkan)?.CacheValue(UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.Android.DisableVulkanSupport") > 0 ? 0 : 1, 11);
  }
  static _ac() {
    for (var [t, i] of this.ValidApplyConfigMap) {
      let e = undefined;
      switch (i.SetType) {
        case 1:
          e = i.SliderDefault;
          break;
        case 2:
        case 4:
        case 5:
          e = i.OptionsDefault;
      }
      if (e !== undefined) {
        this.$sc.get(t)?.CacheValue(e, 10);
      }
    }
  }
  static hac(e) {
    var t = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(e);
    if (t) {
      return t.LanguageType;
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Menu", 10, "LanguageSystem 未定义此语种", ["非法值", e]);
      }
      return this.hac(CommonDefine_1.ENGLISH_ISO639_1);
    }
  }
  static lac(e) {
    return LanguageSystem_1.LanguageSystem.GetSpeechTypeByLanguageType(e);
  }
  static IsValid(e) {
    return this.ValidApplyConfigMap.has(e);
  }
  static Initialize() {
    this.$sc.clear();
    for (var [e, t] of this.ValidApplyConfigMap) {
      if (!this.ZMc(t)) {
        this.$sc.set(e, new GameSettingsInitValueSource_1.GameSettingsInitValueSource(e));
      }
    }
    this.Ksc();
    this.eac();
    this.tac();
    this.iac();
    this.rac();
    this.oac();
    this.D7d();
    this.nac();
    this.sac();
    this.aac();
    this._ac();
    if (this.IsValid(GameSettingsDefine_1.EFunction.DISPLAYMODE) && this.IsValid(GameSettingsDefine_1.EFunction.RESOLUTION) && ((i = this.GetInitValue(GameSettingsDefine_1.EFunction.DISPLAYMODE, false)) !== undefined && this.uac(GameSettingsDefine_1.EFunction.DISPLAYMODE, i, 2), (n = this.GetInitValue(GameSettingsDefine_1.EFunction.RESOLUTION)) !== undefined) && i === 1) {
      this.uac(GameSettingsDefine_1.EFunction.RESOLUTION, n, 2);
    }
    var i = this.GetInitValue(GameSettingsDefine_1.EFunction.TEXTLANGUAGE);
    if (this.IsValid(GameSettingsDefine_1.EFunction.TEXTLANGUAGE) && i !== undefined) {
      this.uac(GameSettingsDefine_1.EFunction.TEXTLANGUAGE, i, 2);
    }
    var n = this.GetInitValue(GameSettingsDefine_1.EFunction.VOICELANGUAGE);
    if (this.IsValid(GameSettingsDefine_1.EFunction.VOICELANGUAGE) && n !== undefined) {
      this.uac(GameSettingsDefine_1.EFunction.VOICELANGUAGE, n, 2);
    }
    if (Info_1.Info.IsPcPlatform() && !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsShowRayTracingSetting()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameSettings", 64, "不满足光追条件，强制关闭光追");
      }
      this.ForceSaveValue(GameSettingsDefine_1.EFunction.RayTracing, 0);
      this.ForceSaveValue(GameSettingsDefine_1.EFunction.RayTracedReflection, 0);
      this.ForceSaveValue(GameSettingsDefine_1.EFunction.RayTracedGI, 0);
      this.ForceSaveValue(GameSettingsDefine_1.EFunction.RayTracedShadow, 0);
      this._X1(GameSettingsDefine_1.EFunction.RayTracing, 0, 2);
      this._X1(GameSettingsDefine_1.EFunction.RayTracedReflection, 0, 2);
      this._X1(GameSettingsDefine_1.EFunction.RayTracedGI, 0, 2);
      this._X1(GameSettingsDefine_1.EFunction.RayTracedShadow, 0, 2);
    }
  }
  static HandleInitDataOnOpenLoading() {
    this.Zsc();
    this.gud();
    for (var [e] of this.$sc) {
      var t = this.GetInitValue(e);
      if (t !== undefined) {
        this.dac(e, t);
      }
    }
    for (var [i] of this.$sc) {
      var n = this.GetInitValue(i);
      if (n !== undefined) {
        this.HandleValueChange(i, n, 3);
      }
    }
  }
  static Clear() {}
  static GetCurrentValue(e, t = true) {
    if (this.IsValid(e)) {
      var i = GameSettingsDefine_1.function2GameSettings[e];
      if (i !== undefined) {
        if (typeof (i = i.GetCallbackOrGlobalKey) == "function") {
          return i();
        } else if ((i = LocalStorage_1.LocalStorage.GetGlobal(i)) !== undefined) {
          return i;
        } else {
          if (t && Log_1.Log.CheckError()) {
            Log_1.Log.Error("GameSettings", 64, "【GetCurrent】当前选项未被保存在LocalStorage中", ["functionId", e]);
          }
          return;
        }
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameSettings", 64, "【GetCurrent】当前选项未能获取IGameSettings句柄", ["functionId", e]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("GameSettings", 64, "在【GetCurrent】一个不符合条件的值", ["functionId", e]);
    }
  }
  static GetCurrentValueSafely(e, t = 0) {
    var i = this.GetCurrentValue(e, false);
    if (i !== undefined) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameSettings", 64, "【GetCurrentValueSafely】使用【Current】", ["functionId", e], ["value", i]);
      }
      return i;
    } else if ((i = this.GetInitValue(e, false)) !== undefined) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameSettings", 64, "【GetCurrentValueSafely】使用【Init】", ["functionId", e], ["value", i]);
      }
      return i;
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("GameSettings", 64, "【GetCurrentValueSafely】当前选项不能正确获取数据来源, 使用【缺省值】", ["functionId", e], ["defaultValue", t]);
      }
      return t;
    }
  }
  static GetInitValue(e, t = true) {
    var i = this.$sc.get(e);
    if (i !== undefined) {
      return i.ValidInitValue;
    }
    if (t && Log_1.Log.CheckError()) {
      Log_1.Log.Error("GameSettings", 64, "【GetInitValue】当前选项不能正确获取数据来源", ["functionId", e]);
    }
  }
  static uac(e, t, i) {
    var n;
    if (this.IsValid(e)) {
      if ((n = GameSettingsDefine_1.function2GameSettings[e].ApplyCallback) === undefined) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameSettings", 64, "[ApplyValue]该设置项不必应用", ["functionId", e]);
        }
        return true;
      } else {
        return n(t, i);
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("GameSettings", 64, "在【应用】一个不符合条件的值", ["functionId", e]);
      }
      return false;
    }
  }
  static _X1(e, t, i) {
    var n = GameSettingsDefine_1.function2GameSettings[e].ApplyCallback;
    if (n === undefined) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameSettings", 64, "[ForceApplyValue]该设置项不必应用", ["functionId", e]);
      }
      return true;
    } else {
      return n(t, i);
    }
  }
  static dac(e, t) {
    var i;
    if (this.IsValid(e)) {
      if (typeof (i = GameSettingsDefine_1.function2GameSettings[e].GetCallbackOrGlobalKey) == "function") {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("GameSettings", 64, "getter不必【Save】LocalStorage", ["functionId", e]);
        }
        return false;
      } else {
        LocalStorage_1.LocalStorage.SetGlobal(i, t);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameSettings", 64, "设置项【Save】成功", ["functionId", e], ["value", t]);
        }
        return true;
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("GameSettings", 64, "在【Save】一个不符合条件的值", ["functionId", e]);
      }
      return false;
    }
  }
  static ForceSaveValue(e, t) {
    var i = GameSettingsDefine_1.function2GameSettings[e].GetCallbackOrGlobalKey;
    if (typeof i == "function") {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("GameSettings", 64, "getter不必【Force Save】LocalStorage", ["functionId", e]);
      }
      return false;
    } else {
      LocalStorage_1.LocalStorage.SetGlobal(i, t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameSettings", 64, "设置项【Force Save】成功", ["functionId", e], ["value", t]);
      }
      return true;
    }
  }
  static HandleValueChange(e, t, i) {
    if (this.uac(e, t, i)) {
      this.dac(e, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMenuSetting, e);
      GameSettingsDefine_1.function2GameSettings[e].HandleDoneCallback?.(t, i);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameSettings", 64, "设置项【Handle】成功", ["functionId", e], ["value", t], ["reason", i]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("GameSettings", 64, "【HandleValueChange】设置项应用失败", ["functionId", e]);
    }
  }
  static ReApply(e, t = 0, i = true) {
    var n = this.GetCurrentValue(e, i);
    if (n === undefined) {
      if (i && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("GameSettings", 64, "不能获取用于ReApply的设置项值，放弃ReApply", ["functionId", e]);
      }
      return false;
    } else {
      return this.uac(e, n, t);
    }
  }
  static DumpValue(e) {
    return GameSettingsDefine_1.function2GameSettings[e].DumpCallback();
  }
  static GetAudioCodeById(e) {
    var t = LanguageSystem_1.LanguageSystem.GetLanguageDefineByType(e);
    if (t) {
      return t.AudioCode;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Menu", 30, "LanguageSystem 未定义此语种", ["非法值", e]);
      }
      return CommonDefine_1.ENGLISH_ISO639_1;
    }
  }
  static GetLanguageCodeById(e) {
    var t = LanguageSystem_1.LanguageSystem.GetLanguageDefineByType(e);
    if (t) {
      return t.LanguageCode;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Menu", 10, "LanguageSystem 未定义此语种", ["非法值", e]);
      }
      return CommonDefine_1.ENGLISH_ISO639_1;
    }
  }
}
(exports.GameSettingsManager = GameSettingsManager).$sc = new Map();
GameSettingsManager.Fsc = undefined; //# sourceMappingURL=GameSettingsManager.js.map