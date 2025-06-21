"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GameSettingsManager = void 0;
const UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  LanguageSystem_1 = require("../../Core/Common/LanguageSystem"),
  Log_1 = require("../../Core/Common/Log"),
  CommonDefine_1 = require("../../Core/Define/CommonDefine"),
  VideoResUpdate_1 = require("../../Launcher/DiffPatch/Update/VideoResUpdate"),
  CloudGameManagerLauncher_1 = require("../../Launcher/Platform/CloudGameManagerLauncher"),
  Platform_1 = require("../../Launcher/Platform/Platform"),
  LauncherGameSettingLib_1 = require("../../Launcher/Util/LauncherGameSettingLib"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  GlobalData_1 = require("../GlobalData"),
  CloudGameManager_1 = require("../Manager/CloudGameManager"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ModelManager_1 = require("../Manager/ModelManager"),
  GameSettingsDefine_1 = require("./GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("./GameSettingsDeviceRender"),
  GameSettingsInitValueSource_1 = require("./Misc/GameSettingsInitValueSource");
class GameSettingsManager {
  static get ValidApplyConfigMap() {
    if (void 0 === this.Fsc) {
      this.Fsc = new Map;
      for (const i of ConfigManager_1.ConfigManager.MenuBaseConfig.GetMenuBaseConfig()) {
        var [e, t] = this.CheckConfigValidByCheckList(i);
        e ? this.ZMc(i) || i.FunctionId in GameSettingsDefine_1.EFunction ? this.Fsc.has(i.FunctionId) ? Log_1.Log.CheckError() && Log_1.Log.Error("GameSettings", 64, "可应用的选项出现冲突，请认真检查配置【CheckList】", ["出现冲突的functionId", i.FunctionId], ["已保存的设置id", this.Fsc.get(i.FunctionId)?.Id], ["发生冲突的设置id", i.Id]) : this.Fsc.set(i.FunctionId, i) : Log_1.Log.CheckError() && Log_1.Log.Error("GameSettings", 64, "存在未注册在EFunction中的功能（非按键），视作该功能不存在", ["cfg id", i.Id], ["cfg FunctionId", i.FunctionId]) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("GameSettings", 64, "非法设置项", ["cfg id", i.Id], ["cfg FunctionId", i.FunctionId], ["reason", t])
      }
    }
    return this.Fsc
  }
  static CheckConfigValidByCheckList(e) {
    var t, [i, n] = this.Vsc(e);
    return i ? ([i, t] = this.jsc(e.FunctionId), i ? ([i, e] = this.udc(e), i ? [!0, "NONE"] : [!1, "CheckDeviceExtra:" + e]) : [!1, "CheckDeviceVendor:" + t]) : [!1, "CheckPlatform:" + n]
  }
  static udc(e) {
    e = e.Device;
    return "isNotVeryHigh" === e ? [!(15 === GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceType && GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120DeviceForAllDevice()), "isNotVeryHigh"] : "isVeryHigh" === e ? [15 === GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceType && GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120DeviceForAllDevice(), "isVeryHigh"] : "isNotAndroidVeryHigh" === e ? [!(Info_1.Info.IsAndroidPlatform() && GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidHighestResolutionDevice()), "isNotAndroidVeryHigh"] : "isAndroidVeryHigh" === e ? [Info_1.Info.IsAndroidPlatform() && GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidHighestResolutionDevice(), "isAndroidVeryHigh"] : "isLowMemory" === e ? [UE.KuroStaticLibrary.IsLowMemoryDevice(), "isLowMemory"] : "isNotLowMemory" === e ? [!UE.KuroStaticLibrary.IsLowMemoryDevice(), "isNotLowMemory"] : "isNot120Frame" === e ? [!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120DeviceForAllDevice(), "isNot120Frame"] : "is120Frame" === e ? [GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120DeviceForAllDevice(), "is120Frame"] : "isCloudGame" === e ? [Platform_1.Platform.IsCloudGame(), "isCloudGame"] : "isMac" === e ? [Info_1.Info.IsMacPlatform(), "isMac"] : "isNotMac" === e ? [!Info_1.Info.IsMacPlatform(), "isNotMac"] : "isMetalSupport" === e ? [GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsMetalFxDevice(), "isMetalSupport"] : "isRedMagic" === e ? [GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsRedMagic(), "isRedMagic"] : "isNotRedMagic" === e ? [!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsRedMagic(), "isNotRedMagic"] : "isNotGrayscale" === e ? [VideoResUpdate_1.VideoResUpdate.GetIsEnableVideoUpdateEntry(), "isNotGrayscale"] : [!0, "DEFAULT"]
  }
  static jsc(e) {
    var t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice(),
      i = UE.XeSSBlueprintLibrary.IsXeSSSupported(),
      n = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFsrDevice(),
      a = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsPWSDKDevice(),
      s = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlss3GpuDevice(),
      r = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsVulkanDevice(),
      o = 0 < GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetD3D12Type(),
      g = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsShowRayTracingSetting(),
      _ = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLumenGISupported() && g,
      m = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLumenReflectionsSupported() && g,
      S = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRayTracingShadowsSupported() && g,
      f = UE.KismetRenderingLibrary.IsSupportedAFME();
    switch (e) {
      case GameSettingsDefine_1.EFunction.NVIDIADLSS:
        return [t, "EFunction.NVIDIADLSS"];
      case GameSettingsDefine_1.EFunction.NVIDIADLSSFG:
        return [s && o, "EFunction.NVIDIADLSSFG"];
      case GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY:
        return [t, "EFunction.NVIDIADLSSQUALITY"];
      case GameSettingsDefine_1.EFunction.NVIDIADLSSSHARPNESS:
        return [t, "EFunction.NVIDIADLSSSHARPNESS"];
      case GameSettingsDefine_1.EFunction.NVIDIAREFLEX:
        return [t, "EFunction.NVIDIAREFLEX"];
      case GameSettingsDefine_1.EFunction.FSR:
        return [n, "EFunction.FSR"];
      case GameSettingsDefine_1.EFunction.IRX:
        return [a, "EFunction.IRX"];
      case GameSettingsDefine_1.EFunction.METALFX:
        return [GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsMetalFxDevice(), "EFunction.METALFX"];
      case GameSettingsDefine_1.EFunction.XESS:
        return [i, "EFunction.XESS"];
      case GameSettingsDefine_1.EFunction.XESS_QUALITY:
        return [i, "EFunction.XESS_QUALITY"];
      case GameSettingsDefine_1.EFunction.SCENEAO:
        return [!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformScreenBad() && 1 !== Info_1.Info.PlatformType, "EFunction.SCENEAO"];
      case GameSettingsDefine_1.EFunction.VOLUMEFOG:
        return [!Info_1.Info.IsMacPlatform(), "EFunction.VOLUMEFOG"];
      case GameSettingsDefine_1.EFunction.DOLBYATOMS:
        return [UE.KuroAudioStatics.IsDolbyAtmosGameSupported(), "EFunction.DOLBYATOMS"];
      case GameSettingsDefine_1.EFunction.RayTracing:
        return [g, "EFunction.RayTracing"];
      case GameSettingsDefine_1.EFunction.RayTracedGI:
        return [_, "EFunction.RayTracedGI"];
      case GameSettingsDefine_1.EFunction.RayTracedReflection:
        return [m, "EFunction.RayTracedReflection"];
      case GameSettingsDefine_1.EFunction.RayTracedShadow:
        return [S, "EFunction.RayTracedShadow"];
      case GameSettingsDefine_1.EFunction.AdrenoFME:
        return [f, "EFunction.AdrenoFME"];
      case GameSettingsDefine_1.EFunction.Vulkan:
        return [r, "EFunction.Vulkan"];
      default:
        return [!0, "DEFAULT"]
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
        return [!0, "EMenuConfigPlatform.NORMAL"];
      default:
        return [!1, "DEFAULT"]
    }
  }
  static ZMc(e) {
    return e.MainType === GameSettingsDefine_1.MAIN_TYPE_OF_KEY_SETTING && 2 !== e.Platform && e.FunctionId !== GameSettingsDefine_1.EFunction.KeyboardLockEnemyMode && e.FunctionId !== GameSettingsDefine_1.EFunction.GamepadLockEnemyMode
  }
  static Hsc(e, t) {
    this.$sc.get(GameSettingsDefine_1.EFunction.IMAGEQUALITY)?.CacheValue(e.QualityType, t);
    for (var [i, n] of GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetOtherChangedValue(e)) this.$sc.get(i)?.CacheValue(n, t)
  }
  static Wsc(e) {
    var t, i = GameSettingsDefine_1.function2GameSettings[e].GetCallbackOrGlobalKey,
      i = LocalStorage_1.LocalStorage.GetGlobal(i);
    void 0 !== i && i < 50 && (t = Math.floor(22.22 + .555 * i), Log_1.Log.CheckInfo() && Log_1.Log.Info("Menu", 64, "[ViewSensitivity]转化视角灵敏度", ["functionId", e], ["value", i], ["newValue", t]), this.$sc.get(e)?.CacheValue(t, 0))
  }
  static Qsc(e, t, i) {
    e = e.get(t);
    void 0 !== e && this.$sc.get(t)?.CacheValue(e, i)
  }
  static Ksc() {
    this.Xsc(), this.Ysc(), this.zsc(), this.Jsc(), this.MGc(), this.cr1(), this.hCu()
  }
  static Xsc() {
    LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertAllViewSensitivity, !1) || (Info_1.Info.IsPcPlatform() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Menu", 64, " [ViewSensitivity]转化Pc视角灵敏度"), this.Wsc(GameSettingsDefine_1.EFunction.HorizontalViewSensitivity), this.Wsc(GameSettingsDefine_1.EFunction.VerticalViewSensitivity), this.Wsc(GameSettingsDefine_1.EFunction.AimHorizontalViewSensitivity), this.Wsc(GameSettingsDefine_1.EFunction.AimVerticalViewSensitivity)), Info_1.Info.IsMobilePlatform() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Menu", 64, "[ViewSensitivity]转化Mobile视角灵敏度"), this.Wsc(GameSettingsDefine_1.EFunction.MobileHorizontalViewSensitivity), this.Wsc(GameSettingsDefine_1.EFunction.MobileVerticalViewSensitivity), this.Wsc(GameSettingsDefine_1.EFunction.MobileAimHorizontalViewSensitivity), this.Wsc(GameSettingsDefine_1.EFunction.MobileAimVerticalViewSensitivity)), LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertAllViewSensitivity, !0))
  }
  static Ysc() {
    var e = UE.KismetSystemLibrary.GetCommandLine();
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Menu", 64, "根据命令行判断是否为全屏模式", ["commandLine", e]), e.includes("-windowed") && this.$sc.get(GameSettingsDefine_1.EFunction.DISPLAYMODE)?.CacheValue(1, 0)
  }
  static zsc() {
    var e;
    Platform_1.Platform.IsCloudGame() && (void 0 === (e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultDeviceRenderFeature()) ? Log_1.Log.CheckError() && Log_1.Log.Error("GameSettings", 64, "云游戏时不能获得渲染Feature预设值") : this.Hsc(e, 0), this.$sc.get(GameSettingsDefine_1.EFunction.NVIDIADLSS)?.CacheValue(1, 0), this.$sc.get(GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY)?.CacheValue(0, 0), CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch) && (0 !== CloudGameManager_1.CloudGameManager.ScreenWidth && ((e = UE.GameUserSettings.GetGameUserSettings()).SetScreenResolution(new UE.IntPoint(CloudGameManager_1.CloudGameManager.ScreenWidth, CloudGameManager_1.CloudGameManager.ScreenHeight)), e.ApplySettings(!0)), Log_1.Log.CheckInfo()) && Log_1.Log.Info("CloudGame", 16, "初始化游戏设置 - 云游戏预启动分辨率设置", ["CloudGameManager.ScreenWidth", CloudGameManager_1.CloudGameManager.ScreenWidth], ["CloudGameManager.ScreenHeight", CloudGameManager_1.CloudGameManager.ScreenHeight])
  }
  static ApplyCloudGameResolution() {
    var e;
    CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch && (0 !== CloudGameManager_1.CloudGameManager.ScreenWidth && ((e = UE.GameUserSettings.GetGameUserSettings()).SetScreenResolution(new UE.IntPoint(CloudGameManager_1.CloudGameManager.ScreenWidth, CloudGameManager_1.CloudGameManager.ScreenHeight)), e.ApplySettings(!0)), Log_1.Log.CheckInfo()) && Log_1.Log.Info("CloudGame", 16, "初始化游戏设置 - 云游戏预启动分辨率设置", ["CloudGameManager.ScreenWidth", CloudGameManager_1.CloudGameManager.ScreenWidth], ["CloudGameManager.ScreenHeight", CloudGameManager_1.CloudGameManager.ScreenHeight])
  }
  static Jsc() {
    var e = this.ValidApplyConfigMap.get(GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY),
      t = this.$sc.get(GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY);
    void 0 === e || void 0 === t || (e = e.OptionsDefault, LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.HasRefreshNvidiaDlssQuality)) || (t.CacheValue(e, 0), LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.HasRefreshNvidiaDlssQuality, !0))
  }
  static MGc() {
    var e = this.ValidApplyConfigMap.get(GameSettingsDefine_1.EFunction.NVIDIADLSSFG),
      t = this.$sc.get(GameSettingsDefine_1.EFunction.NVIDIADLSSFG);
    void 0 !== e && void 0 !== t && (e = e.OptionsDefault, GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlss3HardwareSchedulingDisabled() ? t.CacheValue(e, 0) : 0 === this.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.NVIDIADLSS) && t.CacheValue(0, 0))
  }
  static Zsc() {
    var e, t;
    ModelManager_1.ModelManager.RecommendQualityModel.IsNeedApply && (t = this.$sc.get(GameSettingsDefine_1.EFunction.IMAGEQUALITY), e = ModelManager_1.ModelManager.RecommendQualityModel.NeedApplyQuality, t?.CacheValue(e, 0), void 0 !== (t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDeviceRenderFeature(e)) && this.Hsc(t, 0), ModelManager_1.ModelManager.RecommendQualityModel.IsNeedApply = !1)
  }
  static cr1() {
    var e = this.ValidApplyConfigMap.get(GameSettingsDefine_1.EFunction.BRIGHTNESS),
      t = this.$sc.get(GameSettingsDefine_1.EFunction.BRIGHTNESS);
    void 0 === e || void 0 === t || (e = e.OptionsDefault, LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.HasResetBrightness)) || (t.CacheValue(e, 0), LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.HasResetBrightness, !0))
  }
  static hCu() {
    var e;
    UE.KuroStaticLibrary.IsLowMemoryDevice() && void 0 !== (e = this.$sc.get(GameSettingsDefine_1.EFunction.NPCDENSITY)) && e.CacheValue(0, 0)
  }
  static eac() {
    for (var [t, i] of this.$sc) {
      var n = GameSettingsDefine_1.function2GameSettings[t].GetCallbackOrGlobalKey;
      if ("number" == typeof n) {
        n = LocalStorage_1.LocalStorage.GetGlobal(n), t = this.ValidApplyConfigMap.get(t);
        if (void 0 !== n) {
          let e = !0;
          (e = 2 === t?.SetType ? t.OptionsValue.includes(n) : e) && i.CacheValue(n, 1)
        }
      }
    }
  }
  static tac() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.TextLanguage);
    void 0 !== e && this.$sc.get(GameSettingsDefine_1.EFunction.TEXTLANGUAGE)?.CacheValue(e, 2), void 0 !== (e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.VoiceLanguage)) && this.$sc.get(GameSettingsDefine_1.EFunction.VOICELANGUAGE)?.CacheValue(e, 2)
  }
  static iac() {
    var e = LauncherGameSettingLib_1.LauncherGameSettingLib.LoadPlayMenuInfo();
    void 0 !== e && (this.Qsc(e, GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION, 3), this.Qsc(e, GameSettingsDefine_1.EFunction.VOICEVOLUMEFUNCTION, 3), this.Qsc(e, GameSettingsDefine_1.EFunction.MUSICVOLUMEFUNCTION, 3), this.Qsc(e, GameSettingsDefine_1.EFunction.SFXVOLUMEFUNCTION, 3), this.Qsc(e, GameSettingsDefine_1.EFunction.AMBVOLUMEFUNCTION, 3), this.Qsc(e, GameSettingsDefine_1.EFunction.UIVOLUMEFUNCTION, 3), void 0 !== (e = this.GetCurrentValue(GameSettingsDefine_1.EFunction.HIGHESTFPS))) && 10 < e && this.$sc.get(GameSettingsDefine_1.EFunction.HIGHESTFPS)?.CacheValue(GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetFrameIndexByList(e), 3)
  }
  static rac() {
    var e, t, i = new Map,
      n = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.GameQualitySetting),
      n = (void 0 !== n && (i.set(GameSettingsDefine_1.EFunction.IMAGEQUALITY, n.KeyQualityLevel), i.set(GameSettingsDefine_1.EFunction.DISPLAYMODE, n.KeyPcWindowMode), i.set(GameSettingsDefine_1.EFunction.BRIGHTNESS, n.KeyBrightness), i.set(GameSettingsDefine_1.EFunction.FSR, n.KeyFsrEnable), i.set(GameSettingsDefine_1.EFunction.XESS, n.KeyXessEnable ?? 1), i.set(GameSettingsDefine_1.EFunction.XESS_QUALITY, n.KeyXessQuality ?? 2), i.set(GameSettingsDefine_1.EFunction.METALFX, n.KeyMetalFxEnable), i.set(GameSettingsDefine_1.EFunction.IRX, n.KeyIrxEnable ?? 1), i.set(GameSettingsDefine_1.EFunction.HorizontalViewSensitivity, n.HorizontalViewSensitivity), i.set(GameSettingsDefine_1.EFunction.VerticalViewSensitivity, n.VerticalViewSensitivity), i.set(GameSettingsDefine_1.EFunction.AimHorizontalViewSensitivity, n.AimHorizontalViewSensitivity), i.set(GameSettingsDefine_1.EFunction.AimVerticalViewSensitivity, n.AimVerticalViewSensitivity), i.set(GameSettingsDefine_1.EFunction.MobileHorizontalViewSensitivity, n.MobileHorizontalViewSensitivity), i.set(GameSettingsDefine_1.EFunction.MobileVerticalViewSensitivity, n.MobileVerticalViewSensitivity), i.set(GameSettingsDefine_1.EFunction.MobileAimHorizontalViewSensitivity, n.MobileAimHorizontalViewSensitivity), i.set(GameSettingsDefine_1.EFunction.MobileAimVerticalViewSensitivity, n.MobileAimVerticalViewSensitivity), i.set(GameSettingsDefine_1.EFunction.CommonSpringArmLength, n.CommonSpringArmLength), i.set(GameSettingsDefine_1.EFunction.FightSpringArmLength, n.FightSpringArmLength), i.set(GameSettingsDefine_1.EFunction.ResetFocusEnable, n.IsResetFocusEnable), i.set(GameSettingsDefine_1.EFunction.IsSidestepCameraEnable, n.IsSidestepCameraEnable), i.set(GameSettingsDefine_1.EFunction.IsSoftLockCameraEnable, n.IsSoftLockCameraEnable), i.set(GameSettingsDefine_1.EFunction.JoystickShakeStrength, n.JoystickShakeStrength), i.set(GameSettingsDefine_1.EFunction.JoystickShakeType, n.JoystickShakeType), i.set(GameSettingsDefine_1.EFunction.JoystickMode, n.JoystickMode), i.set(GameSettingsDefine_1.EFunction.SkillButtonMode, n.IsAutoSwitchSkillButtonMode), i.set(GameSettingsDefine_1.EFunction.AimAssist, n.AimAssistEnable), i.set(GameSettingsDefine_1.EFunction.HorizontalViewRevert, n.HorizontalViewRevert), i.set(GameSettingsDefine_1.EFunction.VerticalViewRevert, n.VerticalViewRevert), i.set(GameSettingsDefine_1.EFunction.WalkOrRunRate, n.WalkOrRunRate), i.set(GameSettingsDefine_1.EFunction.CameraShakeStrength, LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.CameraShakeStrength))), LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.MenuData));
    void 0 !== n && (i.set(GameSettingsDefine_1.EFunction.CameraShakeStrength, n.get(GameSettingsDefine_1.EFunction.CameraShakeStrength)), i.set(GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION, n.get(GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION)), i.set(GameSettingsDefine_1.EFunction.VOICEVOLUMEFUNCTION, n.get(GameSettingsDefine_1.EFunction.VOICEVOLUMEFUNCTION)), i.set(GameSettingsDefine_1.EFunction.MUSICVOLUMEFUNCTION, n.get(GameSettingsDefine_1.EFunction.MUSICVOLUMEFUNCTION)), i.set(GameSettingsDefine_1.EFunction.SFXVOLUMEFUNCTION, n.get(GameSettingsDefine_1.EFunction.SFXVOLUMEFUNCTION)), i.set(GameSettingsDefine_1.EFunction.AMBVOLUMEFUNCTION, n.get(GameSettingsDefine_1.EFunction.AMBVOLUMEFUNCTION)), i.set(GameSettingsDefine_1.EFunction.UIVOLUMEFUNCTION, n.get(GameSettingsDefine_1.EFunction.UIVOLUMEFUNCTION)), i.set(GameSettingsDefine_1.EFunction.RESOLUTION, n.get(GameSettingsDefine_1.EFunction.RESOLUTION)), i.set(GameSettingsDefine_1.EFunction.TEXTLANGUAGE, n.get(GameSettingsDefine_1.EFunction.TEXTLANGUAGE)), i.set(GameSettingsDefine_1.EFunction.VOICELANGUAGE, n.get(GameSettingsDefine_1.EFunction.VOICELANGUAGE)), i.set(GameSettingsDefine_1.EFunction.ADVICESETTING, n.get(GameSettingsDefine_1.EFunction.ADVICESETTING)), i.set(GameSettingsDefine_1.EFunction.GENDERSETTING, n.get(GameSettingsDefine_1.EFunction.GENDERSETTING)));
    for ([e, t] of i) void 0 !== t && this.$sc.get(e)?.CacheValue(t, 4)
  }
  static oac() {
    var e = LauncherGameSettingLib_1.LauncherGameSettingLib.LoadPlayMenuInfo();
    void 0 !== e && (this.Qsc(e, GameSettingsDefine_1.EFunction.CameraShakeStrength, 5), this.Qsc(e, GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION, 5), this.Qsc(e, GameSettingsDefine_1.EFunction.VOICEVOLUMEFUNCTION, 5), this.Qsc(e, GameSettingsDefine_1.EFunction.MUSICVOLUMEFUNCTION, 5), this.Qsc(e, GameSettingsDefine_1.EFunction.SFXVOLUMEFUNCTION, 5), this.Qsc(e, GameSettingsDefine_1.EFunction.AMBVOLUMEFUNCTION, 5), this.Qsc(e, GameSettingsDefine_1.EFunction.UIVOLUMEFUNCTION, 5), this.Qsc(e, GameSettingsDefine_1.EFunction.RESOLUTION, 5), this.Qsc(e, GameSettingsDefine_1.EFunction.TEXTLANGUAGE, 5), this.Qsc(e, GameSettingsDefine_1.EFunction.VOICELANGUAGE, 5), this.Qsc(e, GameSettingsDefine_1.EFunction.ADVICESETTING, 5), this.Qsc(e, GameSettingsDefine_1.EFunction.GENDERSETTING, 5))
  }
  static nac() {
    var e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultDeviceRenderFeature();
    void 0 === e ? Log_1.Log.CheckError() && Log_1.Log.Error("GameSettings", 64, "当前机型没有设置默认画质", ["当前机型", GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceType]) : this.Hsc(e, 6)
  }
  static sac() {
    this.$sc.get(GameSettingsDefine_1.EFunction.KeyboardLockEnemyMode)?.CacheValue(1, 7), this.$sc.get(GameSettingsDefine_1.EFunction.GamepadLockEnemyMode)?.CacheValue(1, 7)
  }
  static aac() {
    var e = UE.GameUserSettings.GetGameUserSettings(),
      t = void 0 === e ? GameSettingsDefine_1.WINDOWS_RESOLUTION_INDEX : GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionIndexByList(e.GetScreenResolution()),
      t = (this.$sc.get(GameSettingsDefine_1.EFunction.RESOLUTION)?.CacheValue(t, 9), e?.GetFullscreenMode());
    if (void 0 !== t) switch (t) {
      case 0:
      case 1:
        this.$sc.get(GameSettingsDefine_1.EFunction.DISPLAYMODE)?.CacheValue(0, 9);
        break;
      case 2:
        this.$sc.get(GameSettingsDefine_1.EFunction.DISPLAYMODE)?.CacheValue(1, 9)
    }
    LanguageSystem_1.LanguageSystem.FirstTimeSetLanguage(GlobalData_1.GlobalData.World);
    e = this.hac(LanguageSystem_1.LanguageSystem.PackageLanguage), t = this.lac(e);
    this.$sc.get(GameSettingsDefine_1.EFunction.TEXTLANGUAGE)?.CacheValue(e, 9), this.$sc.get(GameSettingsDefine_1.EFunction.VOICELANGUAGE)?.CacheValue(t, 9), this.$sc.get(GameSettingsDefine_1.EFunction.Vulkan)?.CacheValue(0 < UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.Android.DisableVulkanSupport") ? 0 : 1, 9)
  }
  static _ac() {
    for (var [t, i] of this.ValidApplyConfigMap) {
      let e = void 0;
      switch (i.SetType) {
        case 1:
          e = i.SliderDefault;
          break;
        case 2:
        case 4:
        case 5:
          e = i.OptionsDefault
      }
      void 0 !== e && this.$sc.get(t)?.CacheValue(e, 8)
    }
  }
  static hac(e) {
    var t = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(e);
    return t ? t.LanguageType : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Menu", 10, "LanguageSystem 未定义此语种", ["非法值", e]), this.hac(CommonDefine_1.ENGLISH_ISO639_1))
  }
  static lac(e) {
    return LanguageSystem_1.LanguageSystem.GetSpeechTypeByLanguageType(e)
  }
  static IsValid(e) {
    return this.ValidApplyConfigMap.has(e)
  }
  static Initialize() {
    this.$sc.clear();
    for (var [e, t] of this.ValidApplyConfigMap) this.ZMc(t) || this.$sc.set(e, new GameSettingsInitValueSource_1.GameSettingsInitValueSource(e));
    this.Ksc(), this.eac(), this.tac(), this.iac(), this.rac(), this.oac(), this.nac(), this.sac(), this.aac(), this._ac(), this.IsValid(GameSettingsDefine_1.EFunction.DISPLAYMODE) && this.IsValid(GameSettingsDefine_1.EFunction.RESOLUTION) && (void 0 !== (i = this.GetInitValue(GameSettingsDefine_1.EFunction.DISPLAYMODE, !1)) && this.uac(GameSettingsDefine_1.EFunction.DISPLAYMODE, i, 2), void 0 !== (n = this.GetInitValue(GameSettingsDefine_1.EFunction.RESOLUTION))) && 1 === i && this.uac(GameSettingsDefine_1.EFunction.RESOLUTION, n, 2);
    var i = this.GetInitValue(GameSettingsDefine_1.EFunction.TEXTLANGUAGE),
      n = (this.IsValid(GameSettingsDefine_1.EFunction.TEXTLANGUAGE) && void 0 !== i && this.uac(GameSettingsDefine_1.EFunction.TEXTLANGUAGE, i, 2), this.GetInitValue(GameSettingsDefine_1.EFunction.VOICELANGUAGE));
    this.IsValid(GameSettingsDefine_1.EFunction.VOICELANGUAGE) && void 0 !== n && this.uac(GameSettingsDefine_1.EFunction.VOICELANGUAGE, n, 2), Info_1.Info.IsPcPlatform() && !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsShowRayTracingSetting() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameSettings", 64, "不满足光追条件，强制关闭光追"), this.ForceSaveValue(GameSettingsDefine_1.EFunction.RayTracing, 0), this.ForceSaveValue(GameSettingsDefine_1.EFunction.RayTracedReflection, 0), this.ForceSaveValue(GameSettingsDefine_1.EFunction.RayTracedGI, 0), this.ForceSaveValue(GameSettingsDefine_1.EFunction.RayTracedShadow, 0), this.dK1(GameSettingsDefine_1.EFunction.RayTracing, 0, 2), this.dK1(GameSettingsDefine_1.EFunction.RayTracedReflection, 0, 2), this.dK1(GameSettingsDefine_1.EFunction.RayTracedGI, 0, 2), this.dK1(GameSettingsDefine_1.EFunction.RayTracedShadow, 0, 2))
  }
  static HandleInitDataOnOpenLoading() {
    this.Zsc();
    for (var [e] of this.$sc) {
      var t = this.GetInitValue(e);
      void 0 !== t && this.dac(e, t)
    }
    for (var [i] of this.$sc) {
      var n = this.GetInitValue(i);
      void 0 !== n && this.HandleValueChange(i, n, 3)
    }
  }
  static Clear() {}
  static GetCurrentValue(e, t = !0) {
    if (this.IsValid(e)) {
      var i = GameSettingsDefine_1.function2GameSettings[e];
      if (void 0 !== i) return "function" == typeof(i = i.GetCallbackOrGlobalKey) ? i() : void 0 !== (i = LocalStorage_1.LocalStorage.GetGlobal(i)) ? i : void(t && Log_1.Log.CheckError() && Log_1.Log.Error("GameSettings", 64, "【GetCurrent】当前选项未被保存在LocalStorage中", ["functionId", e]));
      Log_1.Log.CheckError() && Log_1.Log.Error("GameSettings", 64, "【GetCurrent】当前选项未能获取IGameSettings句柄", ["functionId", e])
    } else Log_1.Log.CheckWarn() && Log_1.Log.Warn("GameSettings", 64, "在【GetCurrent】一个不符合条件的值", ["functionId", e])
  }
  static GetCurrentValueSafely(e, t = 0) {
    var i = this.GetCurrentValue(e, !1);
    return void 0 !== i ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameSettings", 64, "【GetCurrentValueSafely】使用【Current】", ["functionId", e], ["value", i]), i) : void 0 !== (i = this.GetInitValue(e, !1)) ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameSettings", 64, "【GetCurrentValueSafely】使用【Init】", ["functionId", e], ["value", i]), i) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("GameSettings", 64, "【GetCurrentValueSafely】当前选项不能正确获取数据来源, 使用【缺省值】", ["functionId", e], ["defaultValue", t]), t)
  }
  static GetInitValue(e, t = !0) {
    var i = this.$sc.get(e);
    if (void 0 !== i) return i.ValidInitValue;
    t && Log_1.Log.CheckError() && Log_1.Log.Error("GameSettings", 64, "【GetInitValue】当前选项不能正确获取数据来源", ["functionId", e])
  }
  static uac(e, t, i) {
    var n;
    return this.IsValid(e) ? void 0 === (n = GameSettingsDefine_1.function2GameSettings[e].ApplyCallback) ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameSettings", 64, "[ApplyValue]该设置项不必应用", ["functionId", e]), !0) : n(t, i) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("GameSettings", 64, "在【应用】一个不符合条件的值", ["functionId", e]), !1)
  }
  static dK1(e, t, i) {
    var n = GameSettingsDefine_1.function2GameSettings[e].ApplyCallback;
    return void 0 === n ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameSettings", 64, "[ForceApplyValue]该设置项不必应用", ["functionId", e]), !0) : n(t, i)
  }
  static dac(e, t) {
    var i;
    return this.IsValid(e) ? "function" == typeof(i = GameSettingsDefine_1.function2GameSettings[e].GetCallbackOrGlobalKey) ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("GameSettings", 64, "getter不必【Save】LocalStorage", ["functionId", e]), !1) : (LocalStorage_1.LocalStorage.SetGlobal(i, t), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameSettings", 64, "设置项【Save】成功", ["functionId", e], ["value", t]), !0) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("GameSettings", 64, "在【Save】一个不符合条件的值", ["functionId", e]), !1)
  }
  static ForceSaveValue(e, t) {
    var i = GameSettingsDefine_1.function2GameSettings[e].GetCallbackOrGlobalKey;
    return "function" == typeof i ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("GameSettings", 64, "getter不必【Force Save】LocalStorage", ["functionId", e]), !1) : (LocalStorage_1.LocalStorage.SetGlobal(i, t), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameSettings", 64, "设置项【Force Save】成功", ["functionId", e], ["value", t]), !0)
  }
  static HandleValueChange(e, t, i) {
    this.uac(e, t, i) ? (this.dac(e, t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMenuSetting, e), GameSettingsDefine_1.function2GameSettings[e].HandleDoneCallback?.(t, i), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameSettings", 64, "设置项【Handle】成功", ["functionId", e], ["value", t], ["reason", i])) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("GameSettings", 64, "【HandleValueChange】设置项应用失败", ["functionId", e])
  }
  static ReApply(e, t = 0) {
    var i = this.GetCurrentValue(e);
    return void 0 === i ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("GameSettings", 64, "不能获取用于ReApply的设置项值，放弃ReApply", ["functionId", e]), !1) : this.uac(e, i, t)
  }
  static DumpValue(e) {
    return GameSettingsDefine_1.function2GameSettings[e].DumpCallback()
  }
  static GetAudioCodeById(e) {
    var t = LanguageSystem_1.LanguageSystem.GetLanguageDefineByType(e);
    return t ? t.AudioCode : (Log_1.Log.CheckError() && Log_1.Log.Error("Menu", 30, "LanguageSystem 未定义此语种", ["非法值", e]), CommonDefine_1.ENGLISH_ISO639_1)
  }
  static GetLanguageCodeById(e) {
    var t = LanguageSystem_1.LanguageSystem.GetLanguageDefineByType(e);
    return t ? t.LanguageCode : (Log_1.Log.CheckError() && Log_1.Log.Error("Menu", 10, "LanguageSystem 未定义此语种", ["非法值", e]), CommonDefine_1.ENGLISH_ISO639_1)
  }
}(exports.GameSettingsManager = GameSettingsManager).$sc = new Map, GameSettingsManager.Fsc = void 0;
//# sourceMappingURL=GameSettingsManager.js.map