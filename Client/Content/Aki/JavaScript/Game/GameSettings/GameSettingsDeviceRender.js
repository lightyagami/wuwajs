"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSettingsDeviceRender = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const Platform_1 = require("../../Launcher/Platform/Platform");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GlobalData_1 = require("../GlobalData");
const ConfigManager_1 = require("../Manager/ConfigManager");
const PerfSightController_1 = require("../PerfSight/PerfSightController");
const GameSettingsDefine_1 = require("./GameSettingsDefine");
const GameSettingsDeviceRenderDefine_1 = require("./GameSettingsDeviceRenderDefine");
const GameSettingsManager_1 = require("./GameSettingsManager");
class GameSettingsDeviceRender {
  static get ksc() {
    if (this.qsc === undefined) {
      var e = ConfigManager_1.ConfigManager.GameSettingsConfig.GetDeviceRenderFeatureConfigListByDeviceId(this.DeviceType);
      if (e === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GameSettings", 64, "当前机型未定义RenderFeature", ["deviceType", this.DeviceType]);
        }
        return;
      }
      this.qsc = new Map();
      for (const t of e) {
        this.qsc.set(t.QualityType, t);
      }
    }
    return this.qsc;
  }
  static get oml() {
    if (this.Osc === undefined) {
      var e = ConfigManager_1.ConfigManager.GameSettingsConfig.GetDeviceRenderFeatureConfigListByDeviceId(this.DeviceType);
      if (e === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GameSettings", 64, "当前机型未定义RenderFeature", ["deviceType", this.DeviceType]);
        }
        return;
      }
      for (const t of e) {
        if (t.DefaultQuality === 1) {
          this.Osc = t.QualityType;
          break;
        }
      }
    }
    return this.Osc;
  }
  static get GameQualitySettingLevel() {
    return GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.IMAGEQUALITY, 2);
  }
  static get eMe() {
    if (GameSettingsDeviceRender.IsRedMagic()) {
      return GameSettingsDeviceRenderDefine_1.frameRateListAndroidForRedMagic;
    } else {
      return GameSettingsDeviceRenderDefine_1.frameRateListAndroid;
    }
  }
  static get PhysicalGBRam() {
    return this.ANa;
  }
  static InitializeBaseInfo() {
    this.ANa = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetPhysicalGBRam();
    this.DNa = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIVendorName();
    this.RNa = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDeviceName();
    this.UNa = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDeviceProfileBaseProfileName();
    this.DeviceScore = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDeviceProfileDeviceScore();
    this.xNa = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIName();
    this.PNa = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDeviceHardwareLevel();
    this.DriverDate = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDriverDate();
    this.IsAdreno = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDeviceProfileProfileName().includes("Adreno");
    this.HU1 = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetMobileDeviceModel();
    this.CPUFrequency = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCPUFrequency();
    this.CPUCores = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCPUCores();
    this.CPUCoresIncludingHyperthreads = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCPUCoresIncludingHyperthreads();
    this.CPUBrand = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCPUBrand();
    this.IsSupportedAFME = UE.KismetRenderingLibrary.IsSupportedAFME();
    if (Platform_1.Platform.IsMobilePlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.UseClusteredDeferredShading -1");
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.UseClusteredDeferredShading 2");
    }
    if (Platform_1.Platform.IsIOSPlatform()) {
      this.DeviceType = 32;
      if (this.DeviceScore < 150) {
        this.DeviceType = 31;
      } else if (this.DeviceScore > 250 && this.DeviceScore < 360) {
        this.DeviceType = 33;
      } else if (this.DeviceScore >= 360) {
        this.DeviceType = 34;
      }
      if (this.ANa < 4) {
        this.DeviceType = 31;
      }
    } else if (Platform_1.Platform.IsAndroidPlatform() || UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(GlobalData_1.GlobalData.World) === 0) {
      if (this.UNa === "Android_Low") {
        this.DeviceType = 21;
      } else if (this.UNa === "Android_Mid") {
        this.DeviceType = 22;
      } else if (this.UNa === "Android_High") {
        this.DeviceType = 23;
      } else if (this.UNa === "Android_VeryHigh") {
        this.DeviceType = 24;
      } else {
        this.DeviceType = 22;
      }
      if (!this.IsHuaweiNewPhone() && !this.IsMaliNewSocOrXclipseOrPowerVR()) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.HZBOcclusion 2");
      }
    } else if (Platform_1.Platform.IsPs5Platform()) {
      this.DeviceType = 41;
    } else if (Platform_1.Platform.IsMacPlatform()) {
      if (this.UNa === "Mac_Low") {
        this.DeviceType = 11;
      } else if (this.UNa === "Mac_Mid" || this.UNa === "Mac_High") {
        this.DeviceType = 12;
      } else if (this.UNa === "Mac_VeryHigh") {
        this.DeviceType = 13;
        this.DeviceScore = 550;
      } else {
        this.DeviceType = 13;
      }
    } else if (Platform_1.Platform.IsCloudGame()) {
      this.DeviceType = 51;
    } else if (this.UNa === "Windows_Low") {
      this.DeviceType = 11;
    } else if (this.UNa === "Windows_Mid") {
      this.DeviceType = 12;
    } else if (this.UNa === "Windows_High") {
      this.DeviceType = 13;
    } else if (this.UNa === "Windows_VeryHigh") {
      this.DeviceType = 14;
    } else if (this.UNa === "Windows_ExtraHigh") {
      this.DeviceType = 15;
    } else if (this.UNa === "Windows") {
      this.DeviceType = 14;
    } else {
      this.DeviceType = 13;
    }
    this.iml();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 64, "初始化当前设备基本信息", ["VendorName", this.DNa], ["DeviceName", this.RNa], ["BaseProfileName", this.UNa], ["PhysicalGBRam", this.ANa], ["DeviceScore", this.DeviceScore], ["RHIName", this.xNa], ["HardwareLevel", this.PNa], ["DeviceType", this.DeviceType], ["QualityRange", this.rml], ["platform", Platform_1.Platform.Type], ["MobileDeviceModel", this.HU1]);
    }
  }
  static Initialize() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AfterGameQualitySettingsManagerInitialize);
  }
  static Clear() {
    this.CancelAllPerformanceLimit();
  }
  static IsDriverNeedUpdate() {
    var e = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(this.DriverDate);
    return e?.length === 4 && Number(e[3]) < 2023 || !UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDriverValid();
  }
  static IsDriverNeedUpdateForRayTracing() {
    var e = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(this.DriverDate);
    return e?.length === 4 && Number(e[3]) < 2024 || e?.length === 4 && Number(e[3]) === 2024 && Number(e[1]) < 6 || e?.length === 4 && Number(e[3]) === 2024 && Number(e[1]) === 6 && Number(e[2]) < 4;
  }
  static IsDxr1_1NotSupported() {
    return UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRayTracingSupportedType() === 1;
  }
  static iml() {
    switch (this.DeviceType) {
      case 11:
      case 12:
        break;
      case 15:
        this.rml = 4;
        break;
      case 21:
      case 22:
      case 31:
      case 32:
        break;
      case 13:
      case 14:
      case 23:
      case 24:
      case 33:
      case 34:
        this.rml = 1;
        break;
      case 35:
        break;
      case 41:
        this.rml = 2;
        break;
      case 51:
        this.rml = 3;
        break;
      default:
        this.rml = 0;
    }
  }
  static GetDeviceRenderFeature(e) {
    return this.ksc?.get(e);
  }
  static GetCurrentDeviceRenderFeature() {
    return this.ksc?.get(this.GameQualitySettingLevel);
  }
  static GetDefaultDeviceRenderFeature() {
    var e = this.ksc;
    if (e !== undefined) {
      for (var [, t] of e) {
        if (t.DefaultQuality === 1) {
          return t;
        }
      }
    }
  }
  static GetOtherChangedValue(e) {
    this.Gsc.clear();
    this.Gsc.set(GameSettingsDefine_1.EFunction.HIGHESTFPS, this.GetFrameIndexByList(e.FPS));
    this.Gsc.set(GameSettingsDefine_1.EFunction.SHADOWQUALITY, e.ShadowQuality);
    this.Gsc.set(GameSettingsDefine_1.EFunction.NIAGARAQUALITY, e.FxQuality);
    this.Gsc.set(GameSettingsDefine_1.EFunction.IMAGEDETAIL, e.ImageDetail);
    this.Gsc.set(GameSettingsDefine_1.EFunction.ANTIALISING, e.AntiAliasing);
    this.Gsc.set(GameSettingsDefine_1.EFunction.SCENEAO, e.AO);
    this.Gsc.set(GameSettingsDefine_1.EFunction.VOLUMEFOG, e.VolumeFog);
    this.Gsc.set(GameSettingsDefine_1.EFunction.VOLUMELIGHT, e.VolumeLight);
    this.Gsc.set(GameSettingsDefine_1.EFunction.MOTIONBLUR, e.MotionBlur);
    this.Gsc.set(GameSettingsDefine_1.EFunction.PCVSYNC, e.VSync);
    this.Gsc.set(GameSettingsDefine_1.EFunction.MOBILERESOLUTION, e.ScreenPercentage);
    this.Gsc.set(GameSettingsDefine_1.EFunction.NPCDENSITY, e.NpcDensity);
    this.Gsc.set(GameSettingsDefine_1.EFunction.BLOOM, e.Bloom);
    return this.Gsc;
  }
  static IsIosAndAndroidHighDevice() {
    return this.DeviceType === 23 || this.DeviceType === 24 || this.DeviceType === 33 || this.DeviceType === 34;
  }
  static IsAndroidPlatformNotLow() {
    return this.DeviceType === 22 || this.DeviceType === 23 || this.DeviceType === 24;
  }
  static IsAndroidPlatformScreenBetter() {
    return this.DeviceType === 23 || this.DeviceType === 24;
  }
  static IsAndroidPlatformScreenBad() {
    return this.DeviceType === 21 || this.DeviceType === 22;
  }
  static IsAndroidPlatformAOValid() {
    return !!Platform_1.Platform.IsAndroidPlatform() && !this.IsAndroidPlatformScreenBad();
  }
  static IsIOSPlatformAOValid() {
    return !!Platform_1.Platform.IsIOSPlatform() && this.DeviceScore >= 230;
  }
  static IsAndroidPlatformLow() {
    return this.DeviceType === 21;
  }
  static IsPcPlatformVeryHigh() {
    return this.DeviceType === 15;
  }
  static IsAndroidAdreno() {
    return this.IsAdreno;
  }
  static IsRedMagic() {
    return this.HU1.includes("NX789J");
  }
  static GetD3D12Type() {
    if (this.xNa.includes("D3D12")) {
      return 1;
    } else {
      return 0;
    }
  }
  static IsVulkanRHI() {
    if (this.xNa.includes("Vulkan")) {
      return 1;
    } else {
      return 0;
    }
  }
  static IsFoldingScreen() {
    var e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetAndroidRawResolution().X / UE.KuroRenderingRuntimeBPPluginBPLibrary.GetAndroidRawResolution().Y;
    return (e < 1.8 || e > 2.6) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Render", 59, "折叠屏适配", ["ScreenRatio", e]), true);
  }
  static IsMaliNewSocOrXclipseOrPowerVR() {
    return !!this.RNa.includes("G710") || !!this.RNa.includes("G715") || !!this.RNa.includes("G720") || !!this.RNa.includes("G610") || !!this.RNa.includes("G615") || !!this.RNa.includes("G620") || !!this.RNa.includes("Xclipse") || !!this.RNa.includes("BXM-8-256");
  }
  static IsHuaweiNewPhone() {
    if (this.DNa) {
      return !!this.RNa.includes("Maleoon");
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Render", 40, "GameSettingsManager尚未初始化");
      }
      return false;
    }
  }
  static IsUltraGpuDevice() {
    if (this.DNa) {
      return this.DNa === "NVIDIA" && !!this.RNa.includes("RTX");
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Render", 40, "GameSettingsManager尚未初始化");
      }
      return false;
    }
  }
  static IsNvidia4060() {
    return this.DNa === "NVIDIA" && this.RNa.includes("4060");
  }
  static Is120FrameGPU() {
    if (this.DNa) {
      return (this.DNa === "AMD" || this.DNa === "NVIDIA" || this.DNa === "Intel") && this.DeviceScore > 1300 || this.DNa === "Intel" && UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRayTracingSupportedType() === 0;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Render", 40, "GameQualitySettingsManager尚未初始化");
      }
      return false;
    }
  }
  static IsLaptopCPU() {
    return !!this.CPUBrand.includes("14900") || !!this.CPUBrand.includes("14790") || !!this.CPUBrand.includes("14700") || !!this.CPUBrand.includes("14650") || !!this.CPUBrand.includes("14600") || !!this.CPUBrand.includes("14500") || !!this.CPUBrand.includes("14490") || !!this.CPUBrand.includes("14450") || !!this.CPUBrand.includes("14400") || !!this.CPUBrand.includes("13980") || !!this.CPUBrand.includes("13950") || !!this.CPUBrand.includes("13905") || !!this.CPUBrand.includes("13900") || !!this.CPUBrand.includes("13800") || !!this.CPUBrand.includes("13790") || !!this.CPUBrand.includes("13705") || !!this.CPUBrand.includes("13700") || !!this.CPUBrand.includes("13650") || !!this.CPUBrand.includes("13620") || !!this.CPUBrand.includes("13600") || !!this.CPUBrand.includes("13500") || !!this.CPUBrand.includes("13490") || !!this.CPUBrand.includes("13450") || !!this.CPUBrand.includes("13400") || !!this.CPUBrand.includes("12950") || !!this.CPUBrand.includes("12900") || !!this.CPUBrand.includes("12850") || !!this.CPUBrand.includes("12800") || !!this.CPUBrand.includes("12700") || !!this.CPUBrand.includes("12650") || !!this.CPUBrand.includes("12600") || !!this.CPUBrand.includes("12500") || !!this.CPUBrand.includes("11980") || !!this.CPUBrand.includes("11950") || !!this.CPUBrand.includes("11900") || !!this.CPUBrand.includes("11850") || !!this.CPUBrand.includes("11800") || !!this.CPUBrand.includes("11700") || !!this.CPUBrand.includes("10980") || !!this.CPUBrand.includes("10940") || !!this.CPUBrand.includes("10920") || !!this.CPUBrand.includes("10900") || !!this.CPUBrand.includes("10885") || !!this.CPUBrand.includes("10875") || !!this.CPUBrand.includes("10870") || !!this.CPUBrand.includes("10850") || !!this.CPUBrand.includes("10700") || !!this.CPUBrand.includes("9980") || !!this.CPUBrand.includes("9940") || !!this.CPUBrand.includes("9920") || !!this.CPUBrand.includes("9900") || !!this.CPUBrand.includes("9880") || !!this.CPUBrand.includes("9820") || !!this.CPUBrand.includes("9800") || !!this.CPUBrand.includes("9-7900") || !!this.CPUBrand.includes("7-7820") || !!this.CPUBrand.includes("7-6900") || !!this.CPUBrand.includes("9-185") || !!this.CPUBrand.includes("7-165") || !!this.CPUBrand.includes("7-155") || !!this.CPUBrand.includes("5-135") || !!this.CPUBrand.includes("5-125") || !!this.CPUBrand.includes("9-3495") || !!this.CPUBrand.includes("9-3475") || !!this.CPUBrand.includes("7-3465") || !!this.CPUBrand.includes("7-3455") || !!this.CPUBrand.includes("7-3445") || !!this.CPUBrand.includes("5-3435") || !!this.CPUBrand.includes("5-3425") || !!this.CPUBrand.includes("7-1270") || !!this.CPUBrand.includes("7-1260") || !!this.CPUBrand.includes("5-1250") || !!this.CPUBrand.includes("5-1240") || !!this.CPUBrand.includes("9700") || !!this.CPUBrand.includes("9600") || !!this.CPUBrand.includes("8945") || !!this.CPUBrand.includes("8845") || !!this.CPUBrand.includes("8840") || !!this.CPUBrand.includes("8700") || !!this.CPUBrand.includes("7980") || !!this.CPUBrand.includes("7970") || !!this.CPUBrand.includes("7960") || !!this.CPUBrand.includes("7950") || !!this.CPUBrand.includes("7945") || !!this.CPUBrand.includes("7940") || !!this.CPUBrand.includes("7900") || !!this.CPUBrand.includes("7845") || !!this.CPUBrand.includes("7840") || !!this.CPUBrand.includes("7800") || !!this.CPUBrand.includes("7745") || !!this.CPUBrand.includes("7735") || !!this.CPUBrand.includes("7700") || !!this.CPUBrand.includes("6980") || !!this.CPUBrand.includes("6900") || !!this.CPUBrand.includes("6800") || !!this.CPUBrand.includes("5980") || !!this.CPUBrand.includes("5975") || !!this.CPUBrand.includes("5965") || !!this.CPUBrand.includes("5955") || !!this.CPUBrand.includes("5950") || !!this.CPUBrand.includes("5945") || !!this.CPUBrand.includes("5900") || !!this.CPUBrand.includes("5800") || !!this.CPUBrand.includes("5700") || !!this.CPUBrand.includes("4900") || !!this.CPUBrand.includes("4800") || !!this.CPUBrand.includes("4700") || !!this.CPUBrand.includes("3975") || !!this.CPUBrand.includes("3970") || !!this.CPUBrand.includes("3960") || !!this.CPUBrand.includes("3955") || !!this.CPUBrand.includes("3950") || !!this.CPUBrand.includes("3945") || !!this.CPUBrand.includes("3900") || !!this.CPUBrand.includes("3800") || !!this.CPUBrand.includes("3700") || !!this.CPUBrand.includes("2950") || !!this.CPUBrand.includes("2920") || !!this.CPUBrand.includes("2700") || !!this.CPUBrand.includes("1950") || !!this.CPUBrand.includes("1920") || !!this.CPUBrand.includes("1900") || !!this.CPUBrand.includes("1800") || !!this.CPUBrand.includes("1700");
  }
  static IsFrameRate120DeviceForAllDevice() {
    return Info_1.Info.IsPcOrGamepadPlatform() && GameSettingsDeviceRender.EOu() || Info_1.Info.IsIosPlatform() && GameSettingsDeviceRender.IOu() || Info_1.Info.IsMacPlatform() && GameSettingsDeviceRender.TOu();
  }
  static IOu() {
    return Info_1.Info.PlatformType === 1 && this.DeviceScore > 500;
  }
  static TOu() {
    return Info_1.Info.PlatformType === 4 && this.DeviceScore > 500;
  }
  static EOu() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 68, "判断IsFrameRate120Device", ["this.CPUFrequency", this.CPUFrequency], ["this.CPUCoresIncludingHyperthreads", this.CPUCoresIncludingHyperthreads], ["this.IsLaptopCPU", this.IsLaptopCPU()], ["this.Is120FrameGPU", this.Is120FrameGPU()]);
    }
    return (!!(this.CPUFrequency >= 3000) && !!(this.CPUCoresIncludingHyperthreads >= 16) || !!this.IsLaptopCPU()) && !!this.Is120FrameGPU();
  }
  static IsAndroidHighestResolutionDevice() {
    return this.DeviceType === 24;
  }
  static IsAndroidHighResolutionDevice() {
    return this.DeviceType === 23 || this.DeviceType === 24;
  }
  static IsMetalFxDevice() {
    return UE.KuroRenderingRuntimeBPPluginBPLibrary.IsSupportsMetalFx();
  }
  static IsPWSDKDevice() {
    return false;
  }
  static IsIRXActive() {
    return Info_1.Info.PlatformType === 2 && UE.PWSDKInterfaceBP.GetDeviceIRXState() === 2;
  }
  static TurnOffIRX() {
    if (this.IsPWSDKDevice()) {
      UE.PWSDKInterfaceBP.TurnOffSRAndFRC();
    }
  }
  static TurnOnIRX() {
    if (this.IsPWSDKDevice()) {
      UE.PWSDKInterfaceBP.TurnOnSRAndFRC();
    }
  }
  static IsNvidiaDlessPluginLoaded() {
    return UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.NGX.Enable") === 1;
  }
  static IsNvidiaStreamlinePluginLoaded() {
    return UE.KismetSystemLibrary.GetConsoleVariableBoolValue("r.Streamline.HasLoaded");
  }
  static IsNvidiaDlssPluginLoaded() {
    return UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.NGX.Enable") === 1;
  }
  static IsDlssGpuDevice() {
    if (this.DNa) {
      return this.DNa === "NVIDIA" && !!this.RNa.includes("RTX");
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Render", 40, "GameSettingsManager尚未初始化");
      }
      return false;
    }
  }
  static Rq1(e) {
    if ((e = e && /RTX\s*(\d+)/i.exec(e)) && e[1]) {
      return parseInt(e[1]);
    } else {
      return undefined;
    }
  }
  static T$1(e) {
    if ((e = e && /RX\s*(\d+)/i.exec(e)) && e[1]) {
      return parseInt(e[1]);
    } else {
      return undefined;
    }
  }
  static IsRayTracingGpuDevice() {
    if (this.DNa.toLowerCase() === "intel") {
      return UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRayTracingSupportedType() === 0;
    }
    if (this.DNa.toLowerCase() === "amd") {
      if ((e = this.T$1(this.RNa)) === undefined) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Render", 64, "非AMD RX系列，或者型号解析不出来，不能开启光追");
        }
        return false;
      } else if (MathUtils_1.MathUtils.InRangeArray(e, [6700, 6799]) || MathUtils_1.MathUtils.InRangeArray(e, [7600, 7699]) || MathUtils_1.MathUtils.InRangeArray(e, [9000, 9999])) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Render", 64, "AMD RX 某些型号不支持光追");
        }
        return false;
      } else {
        return UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRayTracingSupportedType() === 0;
      }
    }
    if (this.DNa.toLowerCase() === "nvidia") {
      if (this.RNa.toLowerCase().includes("titan rtx")) {
        return UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRayTracingSupportedType() === 0;
      }
      var e = this.Rq1(this.RNa);
      if (e === undefined) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Render", 64, "非RTX系列，或者型号解析不出来，不能开启光追");
        }
      } else {
        if (e >= 2070 && (e < 3000 || e >= 3060)) {
          return UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRayTracingSupportedType() === 0;
        }
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Render", 64, "NVIDIA RTX 某些型号不支持光追");
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Render", 64, "不可识别的显卡类型，不能开启光追", ["vendorName", this.DNa], ["deviceName", this.RNa]);
    }
    return false;
  }
  static IsShowRayTracingSetting() {
    return this.IsRayTracingGpuDevice() || UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRayTracingSupportedType() === 1;
  }
  static IsDlss3HardwareSchedulingDisabled() {
    if (this.DNa) {
      if (GameSettingsDeviceRender.IsNvidiaDlssPluginLoaded() && GameSettingsDeviceRender.IsNvidiaStreamlinePluginLoaded()) {
        return UE.StreamlineLibraryDLSSG.QueryDLSSGSupport() === 5;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Render", 73, "DlSS or Streamline尚未加载");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Render", 40, "GameSettingsManager尚未初始化");
      }
      return false;
    }
  }
  static IsDlss3GpuDevice() {
    if (this.DNa) {
      return this.DNa === "NVIDIA" && (!!this.RNa.includes("RTX 40") || !!this.RNa.includes("RTX 50"));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Render", 40, "GameSettingsManager尚未初始化");
      }
      return false;
    }
  }
  static IsFsrDevice() {
    var e = GameSettingsDeviceRender.IsDlssGpuDevice();
    var t = UE.XeSSBlueprintLibrary.IsXeSSSupported();
    return !e && !t && !GameSettingsDeviceRender.IsMetalFxDevice();
  }
  static IsXess2Supported() {
    return false;
  }
  static IsFsr3Supported() {
    return false;
  }
  static IsVulkanDevice() {
    let e = false;
    if (UE.KismetSystemLibrary.IsVulkanAutoDetectMode()) {
      e = UE.KuroRenderingRuntimeBPPluginBPLibrary.SupportVulkan();
    } else {
      var s = UE.KismetSystemLibrary.GetVulkanAllowedModels();
      var a = UE.KismetSystemLibrary.GetVulkanBlockedModels();
      var r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetMobileDeviceModel();
      if (r.length !== 0) {
        let t = false;
        for (let e = 0; e < s.Num(); ++e) {
          if (s.Get(e).includes(r)) {
            t = true;
            break;
          }
        }
        let i = false;
        for (let e = 0; e < a.Num(); ++e) {
          if (a.Get(e).includes(r)) {
            i = true;
            break;
          }
        }
        e = t && !i;
      }
    }
    return e;
  }
  static IsEnableVolumeFog() {
    return this.dMe;
  }
  static CloseVolumeFog() {
    this.dMe = false;
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.volumetricfog 0");
  }
  static GetResolutionByList(e) {
    var t = this.GetResolutionList();
    return t[MathUtils_1.MathUtils.Clamp(e, 0, t.length - 1)];
  }
  static GetResolutionList() {
    var t = [];
    if (!t.length) {
      this.Vve = (0, puerts_1.$ref)(UE.NewArray(UE.IntPoint));
      if (UE.KismetSystemLibrary.GetSupportedFullscreenResolutions(this.Vve)) {
        var i = (0, puerts_1.$unref)(this.Vve);
        for (let e = i.Num() - 1; e >= 0; --e) {
          var s = i.Get(e);
          if (s) {
            t.push(s);
          }
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Menu", 64, "", ["resolution", s]);
          }
        }
      }
      if (t.length) {
        t.sort((e, t) => e.X === t.X ? t.Y - e.Y : t.X - e.X);
      } else {
        t.push(UE.GameUserSettings.GetGameUserSettings().GetDesktopResolution());
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Menu", 40, "获取分辨率列表失败");
        }
      }
    }
    if (t.length > 0 && t[0].X === 3620 && t[0].Y === 2036) {
      t.shift();
    }
    return t;
  }
  static GetResolutionIndexByList(e) {
    var t = this.GetResolutionList();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 64, "获取分辨率索引时的列表", ["resolutionList", t], ["current resolution", e]);
    }
    let i = 0;
    for (const s of t) {
      if (s.op_Equality(e)) {
        return i;
      }
      ++i;
    }
    return -1;
  }
  static GetDefaultScreenResolution() {
    if (!this.jve) {
      var t = this.GetResolutionList();
      if (t.length) {
        let e = t[0];
        if (!this.IsUltraGpuDevice() && (e.X > GameSettingsDeviceRenderDefine_1.HD_SCREEN_WIDTH || e.Y > GameSettingsDeviceRenderDefine_1.HD_SCREEN_HEIGHT)) {
          for (const i of t) {
            if (i.X < GameSettingsDeviceRenderDefine_1.HD_SCREEN_WIDTH && i.Y < GameSettingsDeviceRenderDefine_1.HD_SCREEN_HEIGHT) {
              e = i;
              break;
            }
          }
        }
        this.jve = e;
      } else {
        this.jve = UE.GameUserSettings.GetGameUserSettings().GetDesktopResolution();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Render", 40, `默认分辨率：${this.jve.X}x${this.jve.Y}`);
      }
    }
    return this.jve;
  }
  static GetMobileResolutionByIndex(e) {
    return (Info_1.Info.PlatformType === 1 ? [70, 80, 85, 100] : this.IsAndroidPlatformLow() ? [60, 80, 85, 90] : this.IsAndroidHighestResolutionDevice() ? [66, 75, 83, 100] : [80, 90, 100, 100])[e];
  }
  static GetFrameIndexByList(e) {
    if (Info_1.Info.PlatformType === 1) {
      if (GameSettingsDeviceRenderDefine_1.frameRateListIos.includes(e)) {
        return GameSettingsDeviceRenderDefine_1.frameRateListIos.indexOf(e);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GameSettings", 64, "[ios]当前帧数不在帧数列表中，返回0", ["frameRate", e], ["list", GameSettingsDeviceRenderDefine_1.frameRateListIos]);
        }
        return 0;
      }
    } else if (Info_1.Info.PlatformType === 2) {
      if (GameSettingsDeviceRender.eMe.includes(e)) {
        return GameSettingsDeviceRender.eMe.indexOf(e);
      } else if (e >= 40 && e <= 45 && GameSettingsDeviceRender.eMe.includes(40)) {
        return GameSettingsDeviceRender.eMe.indexOf(40);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GameSettings", 64, "[android]当前帧数不在帧数列表中，返回0", ["frameRate", e], ["list", GameSettingsDeviceRender.eMe]);
        }
        return 0;
      }
    } else if (GameSettingsDeviceRenderDefine_1.frameRateListPc.includes(e)) {
      return GameSettingsDeviceRenderDefine_1.frameRateListPc.indexOf(e);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameSettings", 64, "[pc]当前帧数不在帧数列表中，返回0", ["frameRate", e], ["list", GameSettingsDeviceRender.eMe]);
      }
      return 0;
    }
  }
  static GetFrameByList(e) {
    if (Info_1.Info.PlatformType === 1) {
      const t = MathUtils_1.MathUtils.Clamp(e, 0, GameSettingsDeviceRenderDefine_1.frameRateListIos.length - 1);
      return GameSettingsDeviceRenderDefine_1.frameRateListIos[t];
    }
    if (Info_1.Info.PlatformType === 2) {
      const t = MathUtils_1.MathUtils.Clamp(e, 0, GameSettingsDeviceRender.eMe.length - 1);
      return GameSettingsDeviceRender.eMe[t];
    }
    const t = MathUtils_1.MathUtils.Clamp(e, 0, GameSettingsDeviceRenderDefine_1.frameRateListPc.length - 1);
    return GameSettingsDeviceRenderDefine_1.frameRateListPc[t];
  }
  static ApplyDLSSG(e) {
    if (e === 0) {
      this.ApplyFrameRate(this.BNa);
      UE.StreamlineLibraryDLSSG.SetDLSSGMode(0);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Game", 47, "EnableDLSSG 0");
      }
    } else if (this.Xn_ && (this.ApplyFrameRate(0), UE.StreamlineLibraryDLSSG.SetDLSSGMode(251), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Game", 47, "EnableDLSSG 1");
    }
  }
  static EnableDLSSG(e) {
    this.Xn_ = e !== 0;
    if (e === 0) {
      UE.StreamlineLibraryReflex.SetReflexMode(0);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Game", 47, "SetReflexMode 0");
      }
    } else {
      UE.StreamlineLibraryReflex.SetReflexMode(3);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Game", 47, "SetReflexMode 3");
      }
    }
  }
  static IsEnableDLSSG() {
    return this.Xn_;
  }
  static TemporaryDisableDLSSG(e) {
    if (GameSettingsDeviceRender.IsDlss3GpuDevice() && GameSettingsDeviceRender.IsNvidiaStreamlinePluginLoaded() && (this.cZ_.set(e, 1), this.cZ_.size > 0 && GameSettingsDeviceRender.ApplyDLSSG(0), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Functional", 47, "disable DLSSG temploary", ["key", e], ["num", this.cZ_.size]);
    }
  }
  static CancelTemporaryDisableDLSSG(e) {
    if (GameSettingsDeviceRender.IsDlss3GpuDevice() && GameSettingsDeviceRender.IsNvidiaStreamlinePluginLoaded() && (this.cZ_.delete(e), this.cZ_.size === 0 && GameSettingsDeviceRender.IsEnableDLSSG() && GameSettingsDeviceRender.ApplyDLSSG(1), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Functional", 47, "recover DLSSG", ["key", e], ["num", this.cZ_.size]);
    }
  }
  static EnableAFME(e) {
    this.OQ1 = e !== 0;
    this.ApplyAFME();
  }
  static ApplyAFME() {
    if (!(this.qQ1.size > 0) && this.OQ1) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.FEstimation.Option 0");
      this.fxu = true;
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.FEstimation.Option 1");
      this.fxu = false;
    }
    this.ApplyFrameRate(this.BNa);
  }
  static TemporaryDisableAFME(e) {
    var t;
    if (this.IsSupportedAFME && (t = this.qQ1.size === 0, this.qQ1.set(e, 1), t && this.ApplyAFME(), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Functional", 40, "disable AFME temploary", ["key", e], ["num", this.qQ1.size], ["ApplyAFME", t]);
    }
  }
  static CancelTemporaryDisableAFME(e) {
    var t;
    if (this.IsSupportedAFME && this.qQ1.size > 0 && (this.qQ1.delete(e), (t = this.qQ1.size === 0) && this.ApplyAFME(), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Functional", 40, "recover AFME", ["key", e], ["num", this.qQ1.size], ["ApplyAFME", t]);
    }
  }
  static TemporaryDisableFrameGeneration(e) {
    if (this.IsSupportedAFME) {
      this.TemporaryDisableAFME(e);
    }
    if (GameSettingsDeviceRender.IsDlss3GpuDevice() && GameSettingsDeviceRender.IsNvidiaStreamlinePluginLoaded()) {
      this.TemporaryDisableDLSSG(e);
    }
  }
  static CancelTemporaryDisableFrameGeneration(e) {
    if (this.IsSupportedAFME) {
      this.CancelTemporaryDisableAFME(e);
    }
    if (GameSettingsDeviceRender.IsDlss3GpuDevice() && GameSettingsDeviceRender.IsNvidiaStreamlinePluginLoaded()) {
      this.CancelTemporaryDisableDLSSG(e);
    }
  }
  static ApplyFrameRate(e) {
    let t = 0;
    let i = 0;
    if (e > 0 && (this.BNa = MathUtils_1.MathUtils.Clamp(e, 24, 120), this.IsIRXActive() && GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.IRX) === 1 && (this.BNa = 30), this.bNa = 1 / this.BNa, t = this.BNa, this.yve > 0 && (t = this.yve), i = t, Info_1.Info.IsMobilePlatform()) && (e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSupportedRefreshRates(), this.fxu && (t *= 2), t < e.Get(0))) {
      t = e.Get(0);
    }
    e = UE.GameUserSettings.GetGameUserSettings();
    e.SetFrameRateLimit(i);
    e.SetFramePace(t);
    e.ApplySettings(true);
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(801, t.toString());
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SettingFrameRateChanged, t);
  }
  static get FrameRate() {
    return this.BNa;
  }
  static get FrameSeconds() {
    return this.bNa;
  }
  static GetMaxRoleShadowNum() {
    var e = GameSettingsDeviceRender.GameQualitySettingLevel;
    return (Info_1.Info.IsPcOrGamepadPlatform() ? GameSettingsDeviceRenderDefine_1.maxRoleShadowNumWithGameGraphQualityPc : GameSettingsDeviceRenderDefine_1.maxRoleShadowNumWithGameGraphQualityMobile)[e];
  }
  static GetMaxRoleShadowDistance() {
    var e = GameSettingsDeviceRender.GameQualitySettingLevel;
    return (Info_1.Info.IsPcOrGamepadPlatform() ? GameSettingsDeviceRenderDefine_1.maxRoleShadowDistanceWithGameGraphQualityPc : GameSettingsDeviceRenderDefine_1.maxRoleShadowDistanceWithGameGraphQualityMobile)[e];
  }
  static GetMaxDecalShadowDistance() {
    var e = GameSettingsDeviceRender.GameQualitySettingLevel;
    return (Info_1.Info.IsPcOrGamepadPlatform() ? GameSettingsDeviceRenderDefine_1.maxDecalShadowDistanceWithGameGraphQualityPc : GameSettingsDeviceRenderDefine_1.maxDecalShadowDistanceWithGameGraphQualityMobile)[e];
  }
  static IsMainPlayerUseRealRoleShadow() {
    var e = GameSettingsDeviceRender.GameQualitySettingLevel;
    return GameSettingsDeviceRenderDefine_1.mainPlayerRealShadow[e];
  }
  static SetFrameRateTemploary(e) {
    this.yve = MathUtils_1.MathUtils.Clamp(e, 24, 120);
    this.bNa = 1 / this.yve;
  }
  static SetSequenceFrameRateLimit() {
    if (Info_1.Info.PlatformType === 1) {
      if (this.BNa > 31) {
        this.SetFrameRateTemploary(30);
        this.ApplyFrameRate(this.BNa);
      }
    } else if (Info_1.Info.PlatformType === 2 && this.BNa > 31) {
      this.SetFrameRateTemploary(30);
      this.ApplyFrameRate(this.BNa);
    }
    if (Info_1.Info.IsMobilePlatform()) {
      this.TryReduceCsmUpdateFrequency("Plot");
    }
  }
  static CancleSequenceFrameRateLimit() {
    this.CancelFrameRateTemploary();
    this.ApplyFrameRate(this.BNa);
    if (Info_1.Info.PlatformType === 1 || Info_1.Info.PlatformType === 2) {
      this.TryRestoreCsmUpdateFrequency("Plot");
    }
  }
  static CancelFrameRateTemploary() {
    this.yve = 0;
    this.bNa = 1 / this.BNa;
  }
  static TryReduceCsmUpdateFrequency(e) {
    var t = this.Tve.size;
    this.Tve.add(e);
    if (t === 0 && this.Tve.size === 1) {
      this.Gve();
    }
  }
  static TryRestoreCsmUpdateFrequency(e) {
    if (this.Tve.delete(e) && this.Tve.size === 0) {
      this.Nve();
    }
  }
  static Nve() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.CSMMode3EnableUpdateIntervalOverride 0");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.PSO.IOSCompilationTimeLimit 2.0");
  }
  static Gve() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.CSMMode3EnableUpdateIntervalOverride 1");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.CacheMode3CacheUpdateIntervalsOverride \"3000,3000,3000,3000,3000,3000\"");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.PSO.IOSCompilationTimeLimit 0.1");
  }
  static RefreshPerformanceLimit(e) {
    let i = 0;
    let s = 0;
    this.PerformanceLimitRunning.forEach((e, t) => {
      if (e.FrameLimit) {
        i++;
      }
      if (e.CacheWorldFrame) {
        s++;
      }
    });
    if (!Info_1.Info.IsPcOrGamepadPlatform()) {
      if (i > 0) {
        this.SetFrameRateTemploary(30);
      } else {
        this.CancelFrameRateTemploary();
      }
      this.ApplyFrameRate(this.BNa);
    }
    if (s === 1) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.CacheSceneColor.Start");
      this.InCacheSceneColorMode = 1;
    } else if (s === 0) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.CacheSceneColor.Stop");
      this.InCacheSceneColorMode = 0;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Game", 47, "performanceControl:RefreshPerformanceLimit result", ["reason", e], ["frameLimit", i], ["cacheWorldFrame", s]);
    }
  }
  static ApplyPerformanceLimit(e) {
    var t;
    if (GameSettingsDeviceRenderDefine_1.performanceLimitConfigs.has(e) && (t = GameSettingsDeviceRenderDefine_1.performanceLimitConfigs.get(e))) {
      this.PerformanceLimitRunning.set(e, t);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Game", 47, "performanceControl:ApplyPerformanceLimit", ["source", e], ["frameLimit", t.FrameLimit], ["cacheWorldFrame", t.CacheWorldFrame]);
      }
      this.RefreshPerformanceLimit(e);
    }
  }
  static CancelPerformanceLimit(e) {
    if (this.PerformanceLimitRunning.delete(e)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Game", 47, "performanceControl:CancelPerformanceLimit", ["source", e]);
      }
      this.RefreshPerformanceLimit(e);
    }
  }
  static ApplyPerformanceSeqLimit(e) {
    this.ApplyPerformanceLimit(e + GameSettingsDeviceRenderDefine_1.PERFORMENCELIMIT_SEQ_TAIL);
  }
  static CancelPerformanceSeqLimit(e) {
    this.CancelPerformanceLimit(e + GameSettingsDeviceRenderDefine_1.PERFORMENCELIMIT_SEQ_TAIL);
  }
  static CancelAllPerformanceLimit() {
    this.PerformanceLimitRunning.clear();
    this.CancelFrameRateTemploary();
    this.ApplyFrameRate(this.BNa);
    this.RefreshPerformanceLimit("[CancelAll]");
  }
  static SetIsAutoAdjustImageQuality(e) {
    if (e) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.AutoCoolUIEnable 1");
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.AutoCoolUIEnable 0");
    }
  }
  static GetRecommendQualityLv() {
    return this.oml;
  }
  static GetQualityRange() {
    return this.rml;
  }
}
(exports.GameSettingsDeviceRender = GameSettingsDeviceRender).qsc = undefined;
GameSettingsDeviceRender.Osc = undefined;
GameSettingsDeviceRender.ANa = 0;
GameSettingsDeviceRender.CPUFrequency = 0;
GameSettingsDeviceRender.CPUCores = 0;
GameSettingsDeviceRender.CPUCoresIncludingHyperthreads = 0;
GameSettingsDeviceRender.CPUBrand = "";
GameSettingsDeviceRender.IsSupportedAFME = false;
GameSettingsDeviceRender.DriverDate = "Unknown";
GameSettingsDeviceRender.IsAdreno = false;
GameSettingsDeviceRender.HU1 = "";
GameSettingsDeviceRender.DNa = "";
GameSettingsDeviceRender.RNa = "";
GameSettingsDeviceRender.UNa = "";
GameSettingsDeviceRender.DeviceScore = 0;
GameSettingsDeviceRender.xNa = "";
GameSettingsDeviceRender.PNa = 0;
GameSettingsDeviceRender.DeviceType = 14;
GameSettingsDeviceRender.rml = 1;
GameSettingsDeviceRender.dMe = true;
GameSettingsDeviceRender.jve = undefined;
GameSettingsDeviceRender.Vve = undefined;
GameSettingsDeviceRender.yve = 0;
GameSettingsDeviceRender.BNa = 0;
GameSettingsDeviceRender.Xn_ = false;
GameSettingsDeviceRender.OQ1 = false;
GameSettingsDeviceRender.fxu = false;
GameSettingsDeviceRender.bNa = -0;
GameSettingsDeviceRender.Tve = new Set();
GameSettingsDeviceRender.PerformanceLimitRunning = new Map();
GameSettingsDeviceRender.InCacheSceneColorMode = 0;
GameSettingsDeviceRender.Gsc = new Map();
GameSettingsDeviceRender.cZ_ = new Map();
GameSettingsDeviceRender.qQ1 = new Map(); //# sourceMappingURL=GameSettingsDeviceRender.js.map