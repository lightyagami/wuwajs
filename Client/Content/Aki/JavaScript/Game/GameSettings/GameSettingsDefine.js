"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameSettingsInitSourceTypePriority = exports.MAIN_TYPE_OF_KEY_SETTING = exports.HEAVY_SCENEVULUME_INDEX_END = exports.HEAVY_SCENEVULUME_INDEX_START = exports.NPC_DENSITY_PC_THRESHOLD = exports.NPC_DENSITY_THRESHOLD = exports.WINDOWS_RESOLUTION_INDEX = exports.function2GameSettings = exports.EFunction = undefined;
const AudioDefine_1 = require("../../Core/Audio/AudioDefine");
const Info_1 = require("../../Core/Common/Info");
const EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment");
const Platform_1 = require("../../Launcher/Platform/Platform");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const LocalStorage_1 = require("../Common/LocalStorage");
const LocalStorageDefine_1 = require("../Common/LocalStorageDefine");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const GameSettingsDumpUtils_1 = require("./GameSettingsDumpUtils");
const GameSettingsManager_1 = require("./GameSettingsManager");
const GameSettingsUtils_1 = require("./GameSettingsUtils");
var EFunction;
(function (e) {
  e[e.MASTERVOLUMEFUNCTION = 1] = "MASTERVOLUMEFUNCTION";
  e[e.VOICEVOLUMEFUNCTION = 2] = "VOICEVOLUMEFUNCTION";
  e[e.MUSICVOLUMEFUNCTION = 3] = "MUSICVOLUMEFUNCTION";
  e[e.SFXVOLUMEFUNCTION = 4] = "SFXVOLUMEFUNCTION";
  e[e.AMBVOLUMEFUNCTION = 69] = "AMBVOLUMEFUNCTION";
  e[e.UIVOLUMEFUNCTION = 70] = "UIVOLUMEFUNCTION";
  e[e.DOLBYATOMS = 76] = "DOLBYATOMS";
  e[e.IMAGEQUALITY = 10] = "IMAGEQUALITY";
  e[e.DISPLAYMODE = 5] = "DISPLAYMODE";
  e[e.RESOLUTION = 6] = "RESOLUTION";
  e[e.BRIGHTNESS = 7] = "BRIGHTNESS";
  e[e.HIGHESTFPS = 11] = "HIGHESTFPS";
  e[e.SHADOWQUALITY = 54] = "SHADOWQUALITY";
  e[e.NIAGARAQUALITY = 55] = "NIAGARAQUALITY";
  e[e.IMAGEDETAIL = 56] = "IMAGEDETAIL";
  e[e.ANTIALISING = 57] = "ANTIALISING";
  e[e.SCENEAO = 58] = "SCENEAO";
  e[e.NPCDENSITY = 79] = "NPCDENSITY";
  e[e.NVIDIADLSS = 81] = "NVIDIADLSS";
  e[e.NVIDIADLSSFG = 82] = "NVIDIADLSSFG";
  e[e.NVIDIADLSSQUALITY = 831] = "NVIDIADLSSQUALITY";
  e[e.NVIDIADLSSSHARPNESS = 84] = "NVIDIADLSSSHARPNESS";
  e[e.NVIDIAREFLEX = 85] = "NVIDIAREFLEX";
  e[e.HDR = 20305] = "HDR";
  e[e.FSR = 87] = "FSR";
  e[e.XESS = 125] = "XESS";
  e[e.XESS_QUALITY = 126] = "XESS_QUALITY";
  e[e.XESS2 = 20310] = "XESS2";
  e[e.XESS2_FG = 20341] = "XESS2_FG";
  e[e.XESS2_QUALITY = 20340] = "XESS2_QUALITY";
  e[e.FSR3 = 20350] = "FSR3";
  e[e.FSR3_FG = 20352] = "FSR3_FG";
  e[e.FSR3_QUALITY = 20351] = "FSR3_QUALITY";
  e[e.METALFX = 127] = "METALFX";
  e[e.IRX = 128] = "IRX";
  e[e.BLOOM = 132] = "BLOOM";
  e[e.VOLUMEFOG = 63] = "VOLUMEFOG";
  e[e.VOLUMELIGHT = 64] = "VOLUMELIGHT";
  e[e.MOTIONBLUR = 65] = "MOTIONBLUR";
  e[e.PCVSYNC = 66] = "PCVSYNC";
  e[e.MOBILERESOLUTION = 67] = "MOBILERESOLUTION";
  e[e.SUPERRESOLUTION = 68] = "SUPERRESOLUTION";
  e[e.LOADINGRANGESCALELEVEL = 20611] = "LOADINGRANGESCALELEVEL";
  e[e.TEXTLANGUAGE = 51] = "TEXTLANGUAGE";
  e[e.VOICELANGUAGE = 52] = "VOICELANGUAGE";
  e[e.VOICEPACKMANAGER = 53] = "VOICEPACKMANAGER";
  e[e.ADVICESETTING = 59] = "ADVICESETTING";
  e[e.GENDERSETTING = 88] = "GENDERSETTING";
  e[e.HorizontalViewSensitivity = 89] = "HorizontalViewSensitivity";
  e[e.VerticalViewSensitivity = 90] = "VerticalViewSensitivity";
  e[e.AimHorizontalViewSensitivity = 91] = "AimHorizontalViewSensitivity";
  e[e.AimVerticalViewSensitivity = 92] = "AimVerticalViewSensitivity";
  e[e.CameraShakeStrength = 93] = "CameraShakeStrength";
  e[e.MobileHorizontalViewSensitivity = 94] = "MobileHorizontalViewSensitivity";
  e[e.MobileVerticalViewSensitivity = 95] = "MobileVerticalViewSensitivity";
  e[e.MobileAimHorizontalViewSensitivity = 96] = "MobileAimHorizontalViewSensitivity";
  e[e.MobileAimVerticalViewSensitivity = 97] = "MobileAimVerticalViewSensitivity";
  e[e.CommonSpringArmLength = 99] = "CommonSpringArmLength";
  e[e.FightSpringArmLength = 100] = "FightSpringArmLength";
  e[e.ResetFocusEnable = 101] = "ResetFocusEnable";
  e[e.IsSidestepCameraEnable = 102] = "IsSidestepCameraEnable";
  e[e.IsSoftLockCameraEnable = 103] = "IsSoftLockCameraEnable";
  e[e.JoystickShakeStrength = 104] = "JoystickShakeStrength";
  e[e.JoystickShakeType = 105] = "JoystickShakeType";
  e[e.WalkOrRunRate = 106] = "WalkOrRunRate";
  e[e.LogUpload = 107] = "LogUpload";
  e[e.JoystickMode = 108] = "JoystickMode";
  e[e.MobileButtonCustom = 86] = "MobileButtonCustom";
  e[e.SkillButtonMode = 109] = "SkillButtonMode";
  e[e.CdKey = 112] = "CdKey";
  e[e.UserCenterDomestic = 113] = "UserCenterDomestic";
  e[e.TermsOfUseDomestic = 114] = "TermsOfUseDomestic";
  e[e.PrivacyPolicyDomestic = 115] = "PrivacyPolicyDomestic";
  e[e.ChildrenPrivacy = 116] = "ChildrenPrivacy";
  e[e.ThirdPartyInfo = 117] = "ThirdPartyInfo";
  e[e.TermsOfUseOverSeas = 118] = "TermsOfUseOverSeas";
  e[e.PrivacyPolicyOverSeas = 119] = "PrivacyPolicyOverSeas";
  e[e.PrivacyPolicySetting = 120] = "PrivacyPolicySetting";
  e[e.License = 146] = "License";
  e[e.UserCenterOverseas = 123] = "UserCenterOverseas";
  e[e.PushMode = 121] = "PushMode";
  e[e.AimAssist = 122] = "AimAssist";
  e[e.KeyboardLockEnemyMode = 129] = "KeyboardLockEnemyMode";
  e[e.HorizontalViewRevert = 130] = "HorizontalViewRevert";
  e[e.VerticalViewRevert = 131] = "VerticalViewRevert";
  e[e.SkillLockEnemyMode = 133] = "SkillLockEnemyMode";
  e[e.GamepadLockEnemyMode = 134] = "GamepadLockEnemyMode";
  e[e.EnemyHitDisplayMode = 135] = "EnemyHitDisplayMode";
  e[e.PlayStationOnly = 136] = "PlayStationOnly";
  e[e.MobileGamepadMode = 137] = "MobileGamepadMode";
  e[e.BackendVolume = 10107] = "BackendVolume";
  e[e.SkinDamageMode = 20031] = "SkinDamageMode";
  e[e.AutoAdjustImageQuality = 145] = "AutoAdjustImageQuality";
  e[e.ShowDamage = 20023] = "ShowDamage";
  e[e.DynamicBones = 20024] = "DynamicBones";
  e[e.FlowAdaptation = 20025] = "FlowAdaptation";
  e[e.UIPureMode = 51101] = "UIPureMode";
  e[e.FlyControlMode = 60207] = "FlyControlMode";
  e[e.RayTracing = 20026] = "RayTracing";
  e[e.RayTracedReflection = 20027] = "RayTracedReflection";
  e[e.RayTracedGI = 20028] = "RayTracedGI";
  e[e.RayTracedShadow = 20029] = "RayTracedShadow";
  e[e.TeammateFx = 20030] = "TeammateFx";
  e[e.Saturation = 20204] = "Saturation";
  e[e.Contrast = 20205] = "Contrast";
  e[e.Filter = 20206] = "Filter";
  e[e.AdrenoFME = 20032] = "AdrenoFME";
  e[e.BasicGraphicSetting = 20203] = "BasicGraphicSetting";
  e[e.Vulkan = 20360] = "Vulkan";
  e[e.ResDownLoad = 55113] = "ResDownLoad";
  e[e.ResClear = 55114] = "ResClear";
  e[e.VersionCheck = 51506] = "VersionCheck";
  e[e.AutoRun = 60208] = "AutoRun";
  e[e.AutoSprint = 60209] = "AutoSprint";
  e[e.ShowOtherName = 51102] = "ShowOtherName";
  e[e.WaterInteract = 20033] = "WaterInteract";
  e[e.VegetationDither = 20034] = "VegetationDither";
  e[e.VegetationDensity = 20035] = "VegetationDensity";
  e[e.ImageDisplayMode = 20216] = "ImageDisplayMode";
  e[e.EyeProtection = 20210] = "EyeProtection";
  e[e.EyeProtectionMode = 20211] = "EyeProtectionMode";
  e[e.EyeProtectionTemp = 20212] = "EyeProtectionTemp";
  e[e.EyeProtectionStrength = 20213] = "EyeProtectionStrength";
  e[e.EyeProtectionBrightness = 20214] = "EyeProtectionBrightness";
  e[e.EyeProtectionTexture = 20215] = "EyeProtectionTexture";
  e[e.AutoExposure = 20610] = "AutoExposure";
  e[e.AdjustiveGamePadTrigger = 60210] = "AdjustiveGamePadTrigger";
  e[e.MotorMobileButtonCustom = 30201] = "MotorMobileButtonCustom";
  e[e.MotorIsDynamicJoystick = 30202] = "MotorIsDynamicJoystick";
  e[e.MotorMobileButtonLayout = 30200] = "MotorMobileButtonLayout";
  e[e.MotorAutoAcceleratorSettingEnable = 60301] = "MotorAutoAcceleratorSettingEnable";
  e[e.MotorAutoLongPressSpeedUp = 60302] = "MotorAutoLongPressSpeedUp";
  e[e.MotorDriftAcceleratorSettingEnable = 60303] = "MotorDriftAcceleratorSettingEnable";
  e[e.MotorHudVisible = 51103] = "MotorHudVisible";
  e[e.DeviceInfo = 201006] = "DeviceInfo";
  e[e.UiBrightness = 20306] = "UiBrightness";
  e[e.PeakBrightness = 20307] = "PeakBrightness";
})(EFunction = exports.EFunction ||= {});
const masterVolume = {
  GameSettingId: EFunction.MASTERVOLUMEFUNCTION,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MasterVolume,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(e, "volume_master"),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolume("volume_master")
};
const voiceVolume = {
  GameSettingId: EFunction.VOICEVOLUMEFUNCTION,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.VoiceVolume,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(e, "volume_voice"),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolume("volume_voice")
};
const musicVolume = {
  GameSettingId: EFunction.MUSICVOLUMEFUNCTION,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MusicVolume,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(e, "volume_music"),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolume("volume_music")
};
const sfxVolume = {
  GameSettingId: EFunction.SFXVOLUMEFUNCTION,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.SFXVolume,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(e, "volume_sfx"),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolume("volume_sfx")
};
const uiVolume = {
  GameSettingId: EFunction.UIVOLUMEFUNCTION,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.UIVolume,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(e, "volume_sfx_ui"),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolume("volume_sfx_ui")
};
const ambVolume = {
  GameSettingId: EFunction.AMBVOLUMEFUNCTION,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.AMBVolume,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(e, "volume_sfx_amb"),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolume("volume_sfx_amb")
};
const backendVolume = {
  GameSettingId: EFunction.BackendVolume,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.BackendVolume,
  DumpCallback: () => ""
};
const imageQuality = {
  GameSettingId: EFunction.IMAGEQUALITY,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.ImageQuality,
  ApplyCallback: (e, t) => {
    var a = GameSettingsUtils_1.GameSettingsUtils.ApplyImageQualityOnly(e);
    GameSettingsUtils_1.GameSettingsUtils.ApplySceneLightQuality(e);
    return a;
  },
  HandleDoneCallback: (e, t) => {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetImageQualityWithValue, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetImageQuality);
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpImageQuality()
};
const loadingRangeScaleLevel = {
  GameSettingId: EFunction.LOADINGRANGESCALELEVEL,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.LoadingRangeScaleLevel,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyLoadingRangeScaleLevel(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpLoadingRangeScaleLevel()
};
const displayMode = {
  GameSettingId: EFunction.DISPLAYMODE,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.PcWindowMode,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyDisplayMode(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpDisplayMode()
};
const resolution = {
  GameSettingId: EFunction.RESOLUTION,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionIndex,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyResolution(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpResolution()
};
const brightness = {
  GameSettingId: EFunction.BRIGHTNESS,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.Brightness,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyBrightness(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpBrightness()
};
const highestFps = {
  GameSettingId: EFunction.HIGHESTFPS,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.CustomFrameRate,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyHighestFps(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpHighestFps()
};
const shadowQuality = {
  GameSettingId: EFunction.SHADOWQUALITY,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.ShadowQuality,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyShadowQuality(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpShadowQuality()
};
const niagaraQuality = {
  GameSettingId: EFunction.NIAGARAQUALITY,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.NiagaraQuality,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyNiagaraQuality(e),
  HandleDoneCallback: (e, t) => {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetNiagaraQuality);
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpNiagaraQuality()
};
const imageDetail = {
  GameSettingId: EFunction.IMAGEDETAIL,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.ImageDetail,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyImageDetail(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpImageDetail()
};
const antiAliasing = {
  GameSettingId: EFunction.ANTIALISING,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.AntiAliasing,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyAntiAliasing(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAntiAliasing()
};
const sceneAo = {
  GameSettingId: EFunction.SCENEAO,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.SceneAo,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplySceneAo(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpSceneAo()
};
const npcDensity = {
  GameSettingId: EFunction.NPCDENSITY,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.NpcDensity,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyNpcDensity(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpNpcDensity()
};
const nvidiaDlss = {
  GameSettingId: EFunction.NVIDIADLSS,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingEnable,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaSuperSamplingEnable(e, t),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpNvidiaDlss()
};
const nvidiaDlssFg = {
  GameSettingId: EFunction.NVIDIADLSSFG,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingFrameGenerate,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaSuperSamplingFrameGenerate(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpNvidiaDlssFg(),
  HandleDoneCallback: (e, t) => {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetDLSSFGWithValue, e);
  }
};
const nvidiaDlssQuality = {
  GameSettingId: EFunction.NVIDIADLSSQUALITY,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingQuality,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaSuperSamplingQuality(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpNvidiaDlssQuality()
};
const nvidiaDlssSharpness = {
  GameSettingId: EFunction.NVIDIADLSSSHARPNESS,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingSharpness,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaSuperSamplingSharpness(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpNvidiaDlssSharpness()
};
const nvidiaReflex = {
  GameSettingId: EFunction.NVIDIAREFLEX,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaReflex,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaReflex(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpNvidiaReflex()
};
const hdr = {
  GameSettingId: EFunction.HDR,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.Hdr,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyHdrEnable(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpHdr()
};
const fsr = {
  GameSettingId: EFunction.FSR,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.FsrEnable,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyFsrEnable(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpFsr()
};
const xess = {
  GameSettingId: EFunction.XESS,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.XessEnable,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyXessEnable(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpXess()
};
const xessQuality = {
  GameSettingId: EFunction.XESS_QUALITY,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.XessQuality,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyXessQuality(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpXessQuality()
};
const xess2 = {
  GameSettingId: EFunction.XESS2,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.Xess2Enable,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyXess2Enable(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpXess2()
};
const xess2Fg = {
  GameSettingId: EFunction.XESS2_FG,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.Xess2Fg,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyXess2Fg(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpXess2Fg()
};
const xess2Quality = {
  GameSettingId: EFunction.XESS2_QUALITY,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.Xess2Quality,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyXess2Quality(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpXess2Quality()
};
const fsr3 = {
  GameSettingId: EFunction.FSR3,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.Fsr3Enable,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyFsr3Enable(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpFsr3()
};
const fsr3Fg = {
  GameSettingId: EFunction.FSR3_FG,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.Fsr3Fg,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyFsr3Fg(e, GameSettingsUtils_1.EFFXFIApplyMode.Default),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpFsr3Fg()
};
const fsr3Quality = {
  GameSettingId: EFunction.FSR3_QUALITY,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.Fsr3Quality,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyFsr3Quality(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpFsr3Quality()
};
const metalFxEnable = {
  GameSettingId: EFunction.METALFX,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MetalFxEnable,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyMetalFxEnable(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpMetalFxEnable()
};
const irx = {
  GameSettingId: EFunction.IRX,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.IrxEnable,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyIrxEnable(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpIrx()
};
const bloom = {
  GameSettingId: EFunction.BLOOM,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.BloomEnable,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyBloomEnable(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpBloom()
};
const volumeFog = {
  GameSettingId: EFunction.VOLUMEFOG,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeFog,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyVolumeFog(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolumeFog()
};
const volumeLight = {
  GameSettingId: EFunction.VOLUMELIGHT,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeLight,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyVolumeLight(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolumeLight()
};
const motionBlur = {
  GameSettingId: EFunction.MOTIONBLUR,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MotionBlur,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyMotionBlur(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpMotionBlur()
};
const pcvSync = {
  GameSettingId: EFunction.PCVSYNC,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.PcVsync,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyPcVsync(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpPcVsync()
};
const mobileResolution = {
  GameSettingId: EFunction.MOBILERESOLUTION,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MobileResolution,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyMobileResolution(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpMobileResolution()
};
const superResolution = {
  GameSettingId: EFunction.SUPERRESOLUTION,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.SuperResolution,
  ApplyCallback: (e, t) => true,
  DumpCallback: () => "[DumpVoicePackManager]this is just a null entry"
};
const textLanguage = {
  GameSettingId: EFunction.TEXTLANGUAGE,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.TextLanguage,
  ApplyCallback: (e, t) => t === 2 ? GameSettingsUtils_1.GameSettingsUtils.ApplyTextLanguageOnGameStart(e) : GameSettingsUtils_1.GameSettingsUtils.ApplyTextLanguage(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpTextLanguage()
};
const voiceLanguage = {
  GameSettingId: EFunction.VOICELANGUAGE,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.VoiceLanguage,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyLanguageAudio(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVoiceLanguage()
};
const voicePackManager = {
  GameSettingId: EFunction.VOICEPACKMANAGER,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[DumpVoicePackManager]this is just a switch entry"
};
const adviceSetting = {
  GameSettingId: EFunction.ADVICESETTING,
  GetCallbackOrGlobalKey: () => ModelManager_1.ModelManager.AdviceModel.GetAdviceShowSetting() ? 1 : 0,
  ApplyCallback: (e, t) => {
    if (t === 1) {
      ControllerHolder_1.ControllerHolder.AdviceController.RequestSetAdviceShowState(e === 1);
    }
    return false;
  },
  DumpCallback: () => "[DumpAdviceSetting]same to getter"
};
const genderSetting = {
  GameSettingId: EFunction.GENDERSETTING,
  GetCallbackOrGlobalKey: () => {
    var e = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
    return ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleById(e).Gender;
  },
  DumpCallback: () => "[DumpGenderSetting]same to getter"
};
const horizontalViewSensitivity = {
  GameSettingId: EFunction.HorizontalViewSensitivity,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewSensitivity,
  ApplyCallback: (e, t) => {
    if (Platform_1.Platform.IsCloudGame()) {
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileHorizontalViewSensitivity(e);
    } else {
      GameSettingsUtils_1.GameSettingsUtils.ApplyHorizontalViewSensitivity(e);
    }
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpHorizontalViewSensitivity()
};
const verticalViewSensitivity = {
  GameSettingId: EFunction.VerticalViewSensitivity,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewSensitivity,
  ApplyCallback: (e, t) => {
    if (Platform_1.Platform.IsCloudGame()) {
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileVerticalViewSensitivity(e);
    } else {
      GameSettingsUtils_1.GameSettingsUtils.ApplyVerticalViewSensitivity(e);
    }
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVerticalViewSensitivity()
};
const aimHorizontalViewSensitivity = {
  GameSettingId: EFunction.AimHorizontalViewSensitivity,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.AimHorizontalViewSensitivity,
  ApplyCallback: (e, t) => {
    if (Platform_1.Platform.IsCloudGame()) {
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileAimHorizontalViewSensitivity(e);
    } else {
      GameSettingsUtils_1.GameSettingsUtils.ApplyAimHorizontalViewSensitivity(e);
    }
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAimHorizontalViewSensitivity()
};
const aimVerticalViewSensitivity = {
  GameSettingId: EFunction.AimVerticalViewSensitivity,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.AimVerticalViewSensitivity,
  ApplyCallback: (e, t) => {
    if (Platform_1.Platform.IsCloudGame()) {
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileAimVerticalViewSensitivity(e);
    } else {
      GameSettingsUtils_1.GameSettingsUtils.ApplyAimVerticalViewSensitivity(e);
    }
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAimVerticalViewSensitivity()
};
const cameraShakeStrength = {
  GameSettingId: EFunction.CameraShakeStrength,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.CameraShakeStrength,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyCameraShakeStrength(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpCameraShakeStrength()
};
const mobileHorizontalViewSensitivity = {
  GameSettingId: EFunction.MobileHorizontalViewSensitivity,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MobileHorizontalViewSensitivity,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyMobileHorizontalViewSensitivity(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpHorizontalViewSensitivity()
};
const mobileVerticalViewSensitivity = {
  GameSettingId: EFunction.MobileVerticalViewSensitivity,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MobileVerticalViewSensitivity,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyMobileVerticalViewSensitivity(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVerticalViewSensitivity()
};
const mobileAimHorizontalViewSensitivity = {
  GameSettingId: EFunction.MobileAimHorizontalViewSensitivity,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MobileAimHorizontalViewSensitivity,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyMobileAimHorizontalViewSensitivity(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAimHorizontalViewSensitivity()
};
const mobileAimVerticalViewSensitivity = {
  GameSettingId: EFunction.MobileAimVerticalViewSensitivity,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MobileAimVerticalViewSensitivity,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyMobileAimVerticalViewSensitivity(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAimVerticalViewSensitivity()
};
const commonSpringArmLength = {
  GameSettingId: EFunction.CommonSpringArmLength,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.CommonSpringArmLength,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyCommonSpringArmLength(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpCommonSpringArmLength()
};
const fightSpringArmLength = {
  GameSettingId: EFunction.FightSpringArmLength,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.FightSpringArmLength,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyFightSpringArmLength(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpFightSpringArmLength()
};
const resetFocusEnable = {
  GameSettingId: EFunction.ResetFocusEnable,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.IsResetFocusEnable,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyResetFocusEnable(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpResetFocusEnable()
};
const isSidestepCameraEnable = {
  GameSettingId: EFunction.IsSidestepCameraEnable,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.IsSidestepCameraEnable,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyIsSidestepCameraEnable(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpIsSidestepCameraEnable()
};
const isSoftLockCameraEnable = {
  GameSettingId: EFunction.IsSoftLockCameraEnable,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.IsSoftLockCameraEnable,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyIsSoftLockCameraEnable(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpIsSoftLockCameraEnable()
};
const joystickShakeStrength = {
  GameSettingId: EFunction.JoystickShakeStrength,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeStrength,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyJoystickShakeStrength(e),
  DumpCallback: () => "[DumpJoystickShakeStrength]no way to dump"
};
const joystickShakeType = {
  GameSettingId: EFunction.JoystickShakeType,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeType,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyJoystickShakeType(e),
  DumpCallback: () => "[DumpJoystickShakeType]no way to dump"
};
const walkOrRunRate = {
  GameSettingId: EFunction.WalkOrRunRate,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.WalkOrRunRate,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyWalkOrRunRate(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpWalkOrRunRate()
};
const joystickMode = {
  GameSettingId: EFunction.JoystickMode,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickMode,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyJoystickMode(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpJoystickMode()
};
const mobileButtonCustom = {
  GameSettingId: EFunction.MobileButtonCustom,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[mobileButtonCustom]this is just a switch entry"
};
const skillButtonMode = {
  GameSettingId: EFunction.SkillButtonMode,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.IsAutoSwitchSkillButtonMode,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyAutoSwitchSkillButtonMode(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpSkillButtonMode()
};
const cdKey = {
  GameSettingId: EFunction.CdKey,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[DumpCdKey]this is just a switch entry"
};
const resDownLoad = {
  GameSettingId: EFunction.ResDownLoad,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[resDownLoad]SubPackageDownLoad"
};
const resClear = {
  GameSettingId: EFunction.ResClear,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[resClear]SubPackageDownLoadClear"
};
const pushMode = {
  GameSettingId: EFunction.PushMode,
  GetCallbackOrGlobalKey: () => ControllerHolder_1.ControllerHolder.KuroPushController.GetPushState() ? 1 : 0,
  ApplyCallback: (e, t) => t === 1 && (GameSettingsUtils_1.GameSettingsUtils.ApplyPushEnableState(e, t), true),
  DumpCallback: () => "[DumpPushMode]same to getter"
};
const aimAssist = {
  GameSettingId: EFunction.AimAssist,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.AimAssistEnable,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyAimAssistEnable(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAimAssist()
};
const keyboardLockEnemyMode = {
  GameSettingId: EFunction.KeyboardLockEnemyMode,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.KeyboardLockEnemyMode,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyKeyboardLockEnemyMode(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpKeyboardLockEnemyMode()
};
const horizontalViewRevert = {
  GameSettingId: EFunction.HorizontalViewRevert,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewRevert,
  ApplyCallback: (e, t) => {
    if (Info_1.Info.IsInGamepad()) {
      GameSettingsUtils_1.GameSettingsUtils.ApplyHorizontalViewRevert(e);
    }
    return true;
  },
  DumpCallback: () => "[DumpHorizontalViewRevert]no way to dump"
};
const verticalViewRevert = {
  GameSettingId: EFunction.VerticalViewRevert,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewRevert,
  ApplyCallback: (e, t) => {
    if (Info_1.Info.IsInGamepad()) {
      GameSettingsUtils_1.GameSettingsUtils.ApplyVerticalViewRevert(e);
    }
    return true;
  },
  DumpCallback: () => "[DumpVerticalViewRevert]no way to dump"
};
const skillLockEnemyMode = {
  GameSettingId: EFunction.SkillLockEnemyMode,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.SkillLockEnemyMode,
  DumpCallback: () => "[DumpSkillLockEnemyMode]same to getter"
};
const gamepadLockEnemyMode = {
  GameSettingId: EFunction.GamepadLockEnemyMode,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadLockEnemyMode,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyGamepadLockEnemyMode(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpGamepadLockEnemyMode()
};
const enemyHitDisplayMode = {
  GameSettingId: EFunction.EnemyHitDisplayMode,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.EnemyHitDisplayMode,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyEnemyHitDisplayMode(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpEnemyHitDisplayMode()
};
const mobileGamepadMode = {
  GameSettingId: EFunction.MobileGamepadMode,
  GetCallbackOrGlobalKey: () => ModelManager_1.ModelManager.PlatformModel.IsGamepadAttached() ? 1 : 0,
  DumpCallback: () => "[DumpMobileGamepadMode]same to getter"
};
const autoAdjustImageQuality = {
  GameSettingId: EFunction.AutoAdjustImageQuality,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.AutoAdjustImageQuality,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyAutoAdjustImageQuality(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAutoAdjustImageQuality()
};
const showDamage = {
  GameSettingId: EFunction.ShowDamage,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.ShowDamage,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyShowDamage(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpShowDamage()
};
const dynamicBones = {
  GameSettingId: EFunction.DynamicBones,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.DynamicBones,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyDynamicBones(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpDynamicBones()
};
const uiPureMode = {
  GameSettingId: EFunction.UIPureMode,
  GetCallbackOrGlobalKey: () => ModelManager_1.ModelManager.BattleUiModel?.PureModeData?.IsOpen ? 1 : 0,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyUiPureMode(e),
  DumpCallback: () => "[DumpUiPureMode]same to getter"
};
const flyControlMode = {
  GameSettingId: EFunction.FlyControlMode,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.FlyControlMode,
  ApplyCallback: (e, t) => true,
  DumpCallback: () => "[DumpFlyControlMode]same to getter"
};
const dolbyAtmos = {
  GameSettingId: EFunction.DOLBYATOMS,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.DolbyAtmos,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyDolbyAtmos(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolume(AudioDefine_1.RTPC_DOLBY_ATMOS)
};
const flowAdaptation = {
  GameSettingId: EFunction.FlowAdaptation,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.FlowAdaptation,
  DumpCallback: () => "[DumpFlowAdaptation]same to getter"
};
const rayTracing = {
  GameSettingId: EFunction.RayTracing,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.RayTracing,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyRayTracing(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpRayTracing(),
  HandleDoneCallback: (e, t) => {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetRayTracingWithValue, e);
  }
};
const rayTracedReflection = {
  GameSettingId: EFunction.RayTracedReflection,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.RayTracedReflection,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyRayTracedReflection(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpRayTracedReflection()
};
const rayTracedGI = {
  GameSettingId: EFunction.RayTracedGI,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.RayTracedGI,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyRayTracedGI(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpRayTracedGI()
};
const rayTracedShadow = {
  GameSettingId: EFunction.RayTracedShadow,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.RayTracedShadow,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyRayTracedShadow(e),
  DumpCallback: () => "[DumpRayTracedShadow]not implemented"
};
const teammateFx = {
  GameSettingId: EFunction.TeammateFx,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.TeammateFx,
  ApplyCallback: (e, t) => {
    EffectEnvironment_1.EffectEnvironment.DisableOtherEffect = e === 0;
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpTeammateFx()
};
const saturation = {
  GameSettingId: EFunction.Saturation,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.SaturationNew,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplySaturationClient(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpSaturation()
};
const contrast = {
  GameSettingId: EFunction.Contrast,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.ContrastNew,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyContrastClient(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpContrast()
};
const filter = {
  GameSettingId: EFunction.Filter,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpFilter()
};
const skinDamageMode = {
  GameSettingId: EFunction.SkinDamageMode,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.SkinDamageMode,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplySkinDamageMode(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpSkinDamageMode()
};
const playStationOnly = {
  GameSettingId: EFunction.PlayStationOnly,
  GetCallbackOrGlobalKey: () => ModelManager_1.ModelManager.KuroSdkModel.PlayStationPlayOnlyState ? 1 : 0,
  ApplyCallback: (e, t) => {
    if (t === 1) {
      ControllerHolder_1.ControllerHolder.KuroSdkController.RequestChangeServerPlayStationPlayOnlyState(e === 1);
    }
    return false;
  },
  DumpCallback: () => "[DumpPlayStationOnly]same to getter"
};
const adrenoFME = {
  GameSettingId: EFunction.AdrenoFME,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.AfmeSince2Dot3,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyAFMEOption(e);
    return true;
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAdrenoFME()
};
const userCenterDomestic = {
  GameSettingId: EFunction.UserCenterDomestic,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[DumpUserCenterDomestic]this is just a switch entry"
};
const userCenterOverseas = {
  GameSettingId: EFunction.UserCenterOverseas,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[userCenterOverseas]this is just a switch entry"
};
const privacyPolicyDomestic = {
  GameSettingId: EFunction.PrivacyPolicyDomestic,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[privacyPolicyDomestic]this is just a switch entry"
};
const privacyPolicyOverSeas = {
  GameSettingId: EFunction.PrivacyPolicyOverSeas,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[privacyPolicyOverSeas]this is just a switch entry"
};
const termsOfUseDomestic = {
  GameSettingId: EFunction.TermsOfUseDomestic,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[termsOfUseDomestic]this is just a switch entry"
};
const termsOfUseOverSeas = {
  GameSettingId: EFunction.TermsOfUseOverSeas,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[termsOfUseOverSeas]this is just a switch entry"
};
const childrenPrivacy = {
  GameSettingId: EFunction.ChildrenPrivacy,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[childrenPrivacy]this is just a switch entry"
};
const thirdPartyInfo = {
  GameSettingId: EFunction.ThirdPartyInfo,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[thirdPartyInfo]this is just a switch entry"
};
const privacyPolicySetting = {
  GameSettingId: EFunction.PrivacyPolicySetting,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[privacyPolicySetting]this is just a switch entry"
};
const license = {
  GameSettingId: EFunction.License,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[license]this is just a switch entry"
};
const logUpload = {
  GameSettingId: EFunction.LogUpload,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[logUpload]this is just a switch entry"
};
const basicGraphicSetting = {
  GameSettingId: EFunction.BasicGraphicSetting,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[basicGraphicSetting]this is just a switch entry"
};
const autoRun = {
  GameSettingId: EFunction.AutoRun,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.AutoRun,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyAutoRun(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAutoRun()
};
const autoSprint = {
  GameSettingId: EFunction.AutoSprint,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.AutoSprint,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyAutoSprint(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAutoSprint()
};
const vulkan = {
  GameSettingId: EFunction.Vulkan,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.Vulkan,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyVulkan(e),
  HandleDoneCallback: (e, t) => {
    if (t === 1 || t === 2) {
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.VulkanChangeFlag, true);
    }
  },
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVulkan()
};
const showOtherName = {
  GameSettingId: EFunction.ShowOtherName,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.ShowOtherName,
  HandleDoneCallback: (e, t) => {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshPlayerInfoVisible);
  },
  DumpCallback: () => "[DumpAdviceSetting]same to getter"
};
const waterInteract = {
  GameSettingId: EFunction.WaterInteract,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.WaterInteract,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyWaterInteract(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpWaterInteract()
};
const vegetationDither = {
  GameSettingId: EFunction.VegetationDither,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.VegetationDither,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyVegetationDither(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVegetationDither()
};
const vegetationDensity = {
  GameSettingId: EFunction.VegetationDensity,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.VegetationDensity,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyVegetationDensity(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVegetationDensity()
};
const versionCheck = {
  GameSettingId: EFunction.VersionCheck,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => ""
};
const imageDisplayMode = {
  GameSettingId: EFunction.ImageDisplayMode,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.ImageDisplayMode,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyImageDisplayMode(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpImageDisplayMode()
};
const eyeProtection = {
  GameSettingId: EFunction.EyeProtection,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.EyeProtection,
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpEyeProtection()
};
const eyeProtectionMode = {
  GameSettingId: EFunction.EyeProtectionMode,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.EyeProtectionMode,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionMode(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpEyeProtectionMode()
};
const eyeProtectionTemp = {
  GameSettingId: EFunction.EyeProtectionTemp,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.EyeProtectionTemp,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionTemp(e, GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(EFunction.EyeProtectionMode)),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpEyeProtectionTemp()
};
const eyeProtectionStrength = {
  GameSettingId: EFunction.EyeProtectionStrength,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.EyeProtectionStrength,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionStrength(e, GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(EFunction.EyeProtectionMode)),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpEyeProtectionStrength()
};
const eyeProtectionBrightness = {
  GameSettingId: EFunction.EyeProtectionBrightness,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.EyeProtectionBrightness,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionBrightness(e, GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(EFunction.EyeProtectionMode)),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpEyeProtectionBrightness()
};
const eyeProtectionTexture = {
  GameSettingId: EFunction.EyeProtectionTexture,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.EyeProtectionTexture,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionTexture(e, GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(EFunction.EyeProtectionMode)),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpEyeProtectionTexture()
};
const autoExposure = {
  GameSettingId: EFunction.AutoExposure,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.AutoExposure,
  ApplyCallback: (e, t) => GameSettingsUtils_1.GameSettingsUtils.ApplyAutoExposure(e),
  DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAutoExposure()
};
const adjustiveGamePadTrigger = {
  GameSettingId: EFunction.AdjustiveGamePadTrigger,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.AdjustiveGamePadTrigger,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyAdjustiveGamePadTrigger(e);
    return true;
  },
  DumpCallback: () => "[AdjustiveGamePadTrigger]same to getter"
};
const motorAccleratePressType = {
  GameSettingId: EFunction.MotorAutoLongPressSpeedUp,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MotorAutoLongPressSpeedUp,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyMotorAutoLongPressSpeedUp(e);
    return true;
  },
  DumpCallback: () => "[MotorAutoLongPressSpeedUp]same to getter"
};
const motorAutoAcceleratorSettingEnable = {
  GameSettingId: EFunction.MotorAutoAcceleratorSettingEnable,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MotorAutoAcceleratorSettingEnable,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyMotorAutoAcceleratorSettingEnable(e);
    return true;
  },
  DumpCallback: () => "[MotorAutoAcceleratorSettingEnable]same to getter"
};
const motorDriftAcceleratorSettingEnable = {
  GameSettingId: EFunction.MotorDriftAcceleratorSettingEnable,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MotorDriftAcceleratorSettingEnable,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyMotorDriftAcceleratorSettingEnable(e);
    return true;
  },
  DumpCallback: () => "[MotorDriftAcceleratorSettingEnable]same to getter"
};
const motorHudVisible = {
  GameSettingId: EFunction.MotorHudVisible,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MotorHudVisible,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyMotorHudVisible(e);
    return true;
  },
  DumpCallback: () => "[MotorHudVisible]same to getter"
};
const motorTouchFixedPosition = {
  GameSettingId: EFunction.MotorIsDynamicJoystick,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MotorIsDynamicJoystick,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyMotorIsDynamicJoystick(e);
    return true;
  },
  DumpCallback: () => "[MotorIsDynamicJoystick]same to getter"
};
const motorMobileButtonCustom = {
  GameSettingId: EFunction.MotorMobileButtonCustom,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => "[motorMobileButtonCustom]this is just a switch entry"
};
const motorMobileButtonLayout = {
  GameSettingId: EFunction.MotorMobileButtonLayout,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.MotorMobileButtonLayout,
  ApplyCallback: (e, t) => {
    e = e === 0;
    ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.SetIsRoundJoystick(e);
    return true;
  },
  DumpCallback: () => "[MotorMobileButtonLayout]same to getter"
};
const deviceInfo = {
  GameSettingId: EFunction.DeviceInfo,
  GetCallbackOrGlobalKey: () => 0,
  DumpCallback: () => ""
};
const uiBrightness = {
  GameSettingId: EFunction.UiBrightness,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.UiBrightness,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyUiBrightness(e);
    return true;
  },
  DumpCallback: () => "[UiBrightness]same to getter"
};
const peakBrightness = {
  GameSettingId: EFunction.PeakBrightness,
  GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.PeakBrightness,
  ApplyCallback: (e, t) => {
    GameSettingsUtils_1.GameSettingsUtils.ApplyPeakBrightness(e);
    return true;
  },
  DumpCallback: () => "[PeakBrightness]same to getter"
};
exports.function2GameSettings = {
  [EFunction.MASTERVOLUMEFUNCTION]: masterVolume,
  [EFunction.VOICEVOLUMEFUNCTION]: voiceVolume,
  [EFunction.MUSICVOLUMEFUNCTION]: musicVolume,
  [EFunction.SFXVOLUMEFUNCTION]: sfxVolume,
  [EFunction.UIVOLUMEFUNCTION]: uiVolume,
  [EFunction.AMBVOLUMEFUNCTION]: ambVolume,
  [EFunction.BackendVolume]: backendVolume,
  [EFunction.IMAGEQUALITY]: imageQuality,
  [EFunction.DISPLAYMODE]: displayMode,
  [EFunction.RESOLUTION]: resolution,
  [EFunction.BRIGHTNESS]: brightness,
  [EFunction.HIGHESTFPS]: highestFps,
  [EFunction.SHADOWQUALITY]: shadowQuality,
  [EFunction.NIAGARAQUALITY]: niagaraQuality,
  [EFunction.IMAGEDETAIL]: imageDetail,
  [EFunction.ANTIALISING]: antiAliasing,
  [EFunction.SCENEAO]: sceneAo,
  [EFunction.NPCDENSITY]: npcDensity,
  [EFunction.NVIDIADLSS]: nvidiaDlss,
  [EFunction.NVIDIADLSSFG]: nvidiaDlssFg,
  [EFunction.NVIDIADLSSQUALITY]: nvidiaDlssQuality,
  [EFunction.NVIDIADLSSSHARPNESS]: nvidiaDlssSharpness,
  [EFunction.NVIDIAREFLEX]: nvidiaReflex,
  [EFunction.HDR]: hdr,
  [EFunction.FSR]: fsr,
  [EFunction.XESS]: xess,
  [EFunction.XESS_QUALITY]: xessQuality,
  [EFunction.XESS2]: xess2,
  [EFunction.XESS2_FG]: xess2Fg,
  [EFunction.XESS2_QUALITY]: xess2Quality,
  [EFunction.FSR3]: fsr3,
  [EFunction.FSR3_FG]: fsr3Fg,
  [EFunction.FSR3_QUALITY]: fsr3Quality,
  [EFunction.METALFX]: metalFxEnable,
  [EFunction.IRX]: irx,
  [EFunction.BLOOM]: bloom,
  [EFunction.VOLUMEFOG]: volumeFog,
  [EFunction.VOLUMELIGHT]: volumeLight,
  [EFunction.MOTIONBLUR]: motionBlur,
  [EFunction.PCVSYNC]: pcvSync,
  [EFunction.MOBILERESOLUTION]: mobileResolution,
  [EFunction.SUPERRESOLUTION]: superResolution,
  [EFunction.TEXTLANGUAGE]: textLanguage,
  [EFunction.VOICELANGUAGE]: voiceLanguage,
  [EFunction.VOICEPACKMANAGER]: voicePackManager,
  [EFunction.ADVICESETTING]: adviceSetting,
  [EFunction.GENDERSETTING]: genderSetting,
  [EFunction.HorizontalViewSensitivity]: horizontalViewSensitivity,
  [EFunction.VerticalViewSensitivity]: verticalViewSensitivity,
  [EFunction.AimHorizontalViewSensitivity]: aimHorizontalViewSensitivity,
  [EFunction.AimVerticalViewSensitivity]: aimVerticalViewSensitivity,
  [EFunction.CameraShakeStrength]: cameraShakeStrength,
  [EFunction.MobileHorizontalViewSensitivity]: mobileHorizontalViewSensitivity,
  [EFunction.MobileVerticalViewSensitivity]: mobileVerticalViewSensitivity,
  [EFunction.MobileAimHorizontalViewSensitivity]: mobileAimHorizontalViewSensitivity,
  [EFunction.MobileAimVerticalViewSensitivity]: mobileAimVerticalViewSensitivity,
  [EFunction.CommonSpringArmLength]: commonSpringArmLength,
  [EFunction.FightSpringArmLength]: fightSpringArmLength,
  [EFunction.ResetFocusEnable]: resetFocusEnable,
  [EFunction.IsSidestepCameraEnable]: isSidestepCameraEnable,
  [EFunction.IsSoftLockCameraEnable]: isSoftLockCameraEnable,
  [EFunction.JoystickShakeStrength]: joystickShakeStrength,
  [EFunction.JoystickShakeType]: joystickShakeType,
  [EFunction.WalkOrRunRate]: walkOrRunRate,
  [EFunction.JoystickMode]: joystickMode,
  [EFunction.MobileButtonCustom]: mobileButtonCustom,
  [EFunction.SkillButtonMode]: skillButtonMode,
  [EFunction.CdKey]: cdKey,
  [EFunction.PushMode]: pushMode,
  [EFunction.AimAssist]: aimAssist,
  [EFunction.KeyboardLockEnemyMode]: keyboardLockEnemyMode,
  [EFunction.HorizontalViewRevert]: horizontalViewRevert,
  [EFunction.VerticalViewRevert]: verticalViewRevert,
  [EFunction.SkillLockEnemyMode]: skillLockEnemyMode,
  [EFunction.GamepadLockEnemyMode]: gamepadLockEnemyMode,
  [EFunction.EnemyHitDisplayMode]: enemyHitDisplayMode,
  [EFunction.MobileGamepadMode]: mobileGamepadMode,
  [EFunction.AutoAdjustImageQuality]: autoAdjustImageQuality,
  [EFunction.ShowDamage]: showDamage,
  [EFunction.DynamicBones]: dynamicBones,
  [EFunction.UIPureMode]: uiPureMode,
  [EFunction.FlyControlMode]: flyControlMode,
  [EFunction.DOLBYATOMS]: dolbyAtmos,
  [EFunction.FlowAdaptation]: flowAdaptation,
  [EFunction.RayTracing]: rayTracing,
  [EFunction.RayTracedReflection]: rayTracedReflection,
  [EFunction.RayTracedGI]: rayTracedGI,
  [EFunction.RayTracedShadow]: rayTracedShadow,
  [EFunction.TeammateFx]: teammateFx,
  [EFunction.Saturation]: saturation,
  [EFunction.Contrast]: contrast,
  [EFunction.Filter]: filter,
  [EFunction.SkinDamageMode]: skinDamageMode,
  [EFunction.PlayStationOnly]: playStationOnly,
  [EFunction.AdrenoFME]: adrenoFME,
  [EFunction.UserCenterDomestic]: userCenterDomestic,
  [EFunction.UserCenterOverseas]: userCenterOverseas,
  [EFunction.PrivacyPolicyDomestic]: privacyPolicyDomestic,
  [EFunction.PrivacyPolicyOverSeas]: privacyPolicyOverSeas,
  [EFunction.TermsOfUseDomestic]: termsOfUseDomestic,
  [EFunction.TermsOfUseOverSeas]: termsOfUseOverSeas,
  [EFunction.ChildrenPrivacy]: childrenPrivacy,
  [EFunction.ThirdPartyInfo]: thirdPartyInfo,
  [EFunction.PrivacyPolicySetting]: privacyPolicySetting,
  [EFunction.License]: license,
  [EFunction.LogUpload]: logUpload,
  [EFunction.BasicGraphicSetting]: basicGraphicSetting,
  [EFunction.AutoRun]: autoRun,
  [EFunction.Vulkan]: vulkan,
  [EFunction.ResDownLoad]: resDownLoad,
  [EFunction.ResClear]: resClear,
  [EFunction.AutoSprint]: autoSprint,
  [EFunction.ShowOtherName]: showOtherName,
  [EFunction.WaterInteract]: waterInteract,
  [EFunction.VegetationDither]: vegetationDither,
  [EFunction.VegetationDensity]: vegetationDensity,
  [EFunction.ImageDisplayMode]: imageDisplayMode,
  [EFunction.EyeProtection]: eyeProtection,
  [EFunction.EyeProtectionMode]: eyeProtectionMode,
  [EFunction.EyeProtectionTemp]: eyeProtectionTemp,
  [EFunction.EyeProtectionStrength]: eyeProtectionStrength,
  [EFunction.EyeProtectionBrightness]: eyeProtectionBrightness,
  [EFunction.EyeProtectionTexture]: eyeProtectionTexture,
  [EFunction.VersionCheck]: versionCheck,
  [EFunction.AutoExposure]: autoExposure,
  [EFunction.AdjustiveGamePadTrigger]: adjustiveGamePadTrigger,
  [EFunction.MotorAutoLongPressSpeedUp]: motorAccleratePressType,
  [EFunction.MotorAutoAcceleratorSettingEnable]: motorAutoAcceleratorSettingEnable,
  [EFunction.MotorDriftAcceleratorSettingEnable]: motorDriftAcceleratorSettingEnable,
  [EFunction.MotorHudVisible]: motorHudVisible,
  [EFunction.MotorIsDynamicJoystick]: motorTouchFixedPosition,
  [EFunction.MotorMobileButtonCustom]: motorMobileButtonCustom,
  [EFunction.MotorMobileButtonLayout]: motorMobileButtonLayout,
  [EFunction.DeviceInfo]: deviceInfo,
  [EFunction.UiBrightness]: uiBrightness,
  [EFunction.PeakBrightness]: peakBrightness,
  [EFunction.LOADINGRANGESCALELEVEL]: loadingRangeScaleLevel
};
exports.WINDOWS_RESOLUTION_INDEX = 2;
exports.NPC_DENSITY_THRESHOLD = 1;
exports.NPC_DENSITY_PC_THRESHOLD = 1;
exports.HEAVY_SCENEVULUME_INDEX_START = 30;
exports.HEAVY_SCENEVULUME_INDEX_END = 39;
exports.MAIN_TYPE_OF_KEY_SETTING = 3;
exports.gameSettingsInitSourceTypePriority = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 10]; //# sourceMappingURL=GameSettingsDefine.js.map