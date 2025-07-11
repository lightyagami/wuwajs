"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSettingsDumpUtils = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioController_1 = require("../../Core/Audio/AudioController");
const LanguageSystem_1 = require("../../Core/Common/LanguageSystem");
const EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment");
const LocalStorage_1 = require("../Common/LocalStorage");
const LocalStorageDefine_1 = require("../Common/LocalStorageDefine");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const DamageUiManager_1 = require("../Module/DamageUi/DamageUiManager");
const CharacterSkinDamageComponent_1 = require("../NewWorld/Character/Common/Component/CharacterSkinDamageComponent");
const RoleGaitStatic_1 = require("../NewWorld/Character/Role/Component/Define/RoleGaitStatic");
const RenderConfig_1 = require("../Render/Config/RenderConfig");
const RenderDataManager_1 = require("../Render/Data/RenderDataManager");
const GameSettingsDeviceRender_1 = require("./GameSettingsDeviceRender");
class GameSettingsDumpUtils {
  static JMc(e) {
    return `${e}: ${UE.KismetSystemLibrary.GetConsoleVariableFloatValue(e)}
`;
  }
}
exports.GameSettingsDumpUtils = GameSettingsDumpUtils;
(_a = GameSettingsDumpUtils).DumpVolume = e => {
  var a = (0, puerts_1.$ref)(0);
  AudioController_1.AudioController.GetRTPCValue(a, e);
  return `${e}: ${(0, puerts_1.$unref)(a)}\n`;
};
GameSettingsDumpUtils.DumpImageQuality = () => {
  var e = _a.JMc("sg.KuroRenderQuality");
  return e += _a.JMc("r.Kuro.GlobalLightQuality");
};
GameSettingsDumpUtils.DumpDisplayMode = () => {
  return "GetFullscreenMode: " + UE.GameUserSettings.GetGameUserSettings().GetFullscreenMode();
};
GameSettingsDumpUtils.DumpResolution = () => {
  var e = UE.GameUserSettings.GetGameUserSettings().GetScreenResolution();
  return `GetScreenResolution: ${e.X}, ${e.Y}`;
};
GameSettingsDumpUtils.DumpBrightness = () => {
  var e = "";
  e = (e += _a.JMc("r.TonemapperGamma")) + _a.JMc("r.LUT.Regenerate");
  var a = UE.KismetMaterialLibrary.GetScalarParameterValue(GlobalData_1.GlobalData.World, RenderDataManager_1.RenderDataManager.Get().GetUiShowBrightnessMaterialParameterCollection(), RenderConfig_1.RenderConfig.UIShowBrightness);
  return e += `GetScalarParameterValue_UIShowBrightness: ${a}
`;
};
GameSettingsDumpUtils.DumpHighestFps = () => {
  return "GetFrameRateLimit: " + UE.GameUserSettings.GetGameUserSettings().GetFrameRateLimit();
};
GameSettingsDumpUtils.DumpShadowQuality = () => _a.JMc("sg.ShadowQuality");
GameSettingsDumpUtils.DumpNiagaraQuality = () => {
  var e = _a.JMc("fx.Niagara.QualityLevel");
  return e += _a.JMc("r.DisableDistortion");
};
GameSettingsDumpUtils.DumpImageDetail = () => {
  var e = "";
  return (e += _a.JMc("r.Kuro.ToonOutlineDrawDistancePc")) + _a.JMc("r.Streaming.ForceKuroRuntimeLODBias") + _a.JMc("r.Kuro.ToonOutlineDrawDistanceMobile") + _a.JMc("foliage.DensityType") + _a.JMc("r.Mobile.SceneObjMobileSSR") + _a.JMc("r.Mobile.TreeRimLight") + _a.JMc("r.Kuro.AutoExposure") + _a.JMc("r.Streaming.ForceKuroRuntimeLODBias");
};
GameSettingsDumpUtils.DumpAntiAliasing = () => _a.JMc("r.DefaultFeature.AntiAliasing");
GameSettingsDumpUtils.DumpSceneAo = () => {
  var e = "";
  e = (e += _a.JMc("r.AmbientOcclusionLevels")) + _a.JMc("r.Mobile.SSAO");
  var a = UE.KismetMaterialLibrary.GetScalarParameterValue(GlobalData_1.GlobalData.World, RenderDataManager_1.RenderDataManager.Get().GetGlobalShaderParameters(), new UE.FName("EnableMobileScreenAO"));
  return e = `${e += `GetScalarParameterValue_EnableMobileScreenAO: ${a}
`}GetScalarParameterValue_GlobalGrassAO: ${a = UE.KismetMaterialLibrary.GetScalarParameterValue(GlobalData_1.GlobalData.World, RenderDataManager_1.RenderDataManager.Get().GetGlobalShaderParameters(), RenderConfig_1.RenderConfig.GlobalGrassAO)}
`;
};
GameSettingsDumpUtils.DumpNpcDensity = () => `CreatureController.CurrentCreatureDensityLevelExternal: ${ControllerHolder_1.ControllerHolder.CreatureController.CurrentCreatureDensityLevelExternal}
`;
GameSettingsDumpUtils.DumpNvidiaDlss = () => {
  var e = "";
  return (e += _a.JMc("r.NGX.DLSS.Enable")) + _a.JMc("r.TemporalAASamples") + _a.JMc("r.TemporalAAFilterSize") + _a.JMc("r.FidelityFX.FSR.SecondaryUpscale") + ("GameSettingsDeviceRender.IsEnableDLSSG: " + GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsEnableDLSSG());
};
GameSettingsDumpUtils.DumpNvidiaDlssFg = () => "GameSettingsDeviceRender.IsEnableDLSSG: " + GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsEnableDLSSG();
GameSettingsDumpUtils.DumpNvidiaDlssQuality = () => {
  var e = "";
  return (e += _a.JMc("r.NGX.DLSS.Quality.Auto")) + _a.JMc("r.NGX.DLSS.Quality");
};
GameSettingsDumpUtils.DumpNvidiaDlssSharpness = () => "SetDLSSSharpness: " + UE.DLSSLibrary.GetDLSSSharpness();
GameSettingsDumpUtils.DumpNvidiaReflex = () => "[DumpNvidiaReflex]can not get setting value in engine";
GameSettingsDumpUtils.DumpFsr = () => {
  var e = "";
  return (e += _a.JMc("r.TemporalAASamples")) + _a.JMc("r.FidelityFX.FSR.PrimaryUpscale") + _a.JMc("r.ScreenPercentage") + _a.JMc("r.MipMapLODBias") + _a.JMc("r.TemporalAACurrentFrameWeight") + _a.JMc("r.TemporalAA.ClampTolerant") + _a.JMc("r.TemporalAA.SharpenLimitDepth") + _a.JMc("r.NGX.DLSS.Enable");
};
GameSettingsDumpUtils.DumpXess = () => _a.JMc("r.XeSS.Enabled");
GameSettingsDumpUtils.DumpXessQuality = () => _a.JMc("r.XeSS.Enabled");
GameSettingsDumpUtils.DumpMetalFxEnable = () => {
  var e = _a.JMc("r.MetalFxUpscale");
  return e += _a.JMc("r.TemporalAA.SharpenLimitDepth");
};
GameSettingsDumpUtils.DumpIrx = () => "[DumpIrx]can not get setting value in engine";
GameSettingsDumpUtils.DumpBloom = () => _a.JMc("r.Kuro.KuroBloomEnable");
GameSettingsDumpUtils.DumpVolumeFog = () => _a.JMc("r.volumetricfog");
GameSettingsDumpUtils.DumpVolumeLight = () => {
  var e = _a.JMc("r.lightShaftQuality");
  return e += _a.JMc("r.MobileLightShaft");
};
GameSettingsDumpUtils.DumpMotionBlur = () => _a.JMc("r.MotionBlur.Amount");
GameSettingsDumpUtils.DumpPcVsync = () => {
  return "IsVSyncEnabled: " + UE.GameUserSettings.GetGameUserSettings().IsVSyncEnabled();
};
GameSettingsDumpUtils.DumpMobileResolution = () => {
  var e = "";
  return (e += _a.JMc("r.TemporalAA.SharpenLimitDepth")) + _a.JMc("r.TemporalAA.Sharpness") + _a.JMc("r.ScreenPercentage");
};
GameSettingsDumpUtils.DumpTextLanguage = () => "LanguageSystem.PackageLanguage: " + LanguageSystem_1.LanguageSystem.PackageLanguage;
GameSettingsDumpUtils.DumpVoiceLanguage = () => "LanguageSystem.PackageAudio: " + LanguageSystem_1.LanguageSystem.PackageAudio;
GameSettingsDumpUtils.DumpHorizontalViewSensitivity = () => "CameraBaseYawSensitivity: " + ModelManager_1.ModelManager.CameraModel.CameraBaseYawSensitivity;
GameSettingsDumpUtils.DumpVerticalViewSensitivity = () => "CameraBasePitchSensitivity: " + ModelManager_1.ModelManager.CameraModel.CameraBasePitchSensitivity;
GameSettingsDumpUtils.DumpAimHorizontalViewSensitivity = () => "CameraAimingYawSensitivity: " + ModelManager_1.ModelManager.CameraModel.CameraAimingYawSensitivity;
GameSettingsDumpUtils.DumpAimVerticalViewSensitivity = () => "CameraAimingPitchSensitivity: " + ModelManager_1.ModelManager.CameraModel.CameraAimingPitchSensitivity;
GameSettingsDumpUtils.DumpCameraShakeStrength = () => "ShakeModify: " + ModelManager_1.ModelManager.CameraModel.ShakeModify;
GameSettingsDumpUtils.DumpCommonSpringArmLength = () => "CameraSettingNormalAdditionArmLength: " + ModelManager_1.ModelManager.CameraModel.CameraSettingNormalAdditionArmLength;
GameSettingsDumpUtils.DumpFightSpringArmLength = () => "CameraSettingFightAdditionArmLength: " + ModelManager_1.ModelManager.CameraModel.CameraSettingFightAdditionArmLength;
GameSettingsDumpUtils.DumpResetFocusEnable = () => "IsEnableResetFocus: " + ModelManager_1.ModelManager.CameraModel.IsEnableResetFocus;
GameSettingsDumpUtils.DumpIsSidestepCameraEnable = () => "IsEnableSidestepCamera: " + ModelManager_1.ModelManager.CameraModel.IsEnableSidestepCamera;
GameSettingsDumpUtils.DumpIsSoftLockCameraEnable = () => "IsEnableSoftLockCameraExternal: " + ModelManager_1.ModelManager.CameraModel.IsEnableSoftLockCameraExternal;
GameSettingsDumpUtils.DumpWalkOrRunRate = () => "GetWalkOrRunRate: " + RoleGaitStatic_1.RoleGaitStatic.GetWalkOrRunRate();
GameSettingsDumpUtils.DumpJoystickMode = () => "GetIsDynamicJoystick: " + ModelManager_1.ModelManager.BattleUiModel.GetIsDynamicJoystick();
GameSettingsDumpUtils.DumpSkillButtonMode = () => "GetIsAutoSwitchSkillButtonMode: " + ModelManager_1.ModelManager.BattleUiModel.GetIsAutoSwitchSkillButtonMode();
GameSettingsDumpUtils.DumpAimAssist = () => "GetAimAssistEnable: " + ModelManager_1.ModelManager.CameraModel.GetAimAssistEnable();
GameSettingsDumpUtils.DumpKeyboardLockEnemyMode = () => "DumpKeyboardLockEnemyMode: " + ModelManager_1.ModelManager.FormationDataModel.KeyboardLockEnemyMode;
GameSettingsDumpUtils.DumpGamepadLockEnemyMode = () => "DumpGamepadLockEnemyMode: " + ModelManager_1.ModelManager.FormationDataModel.GamepadLockEnemyMode;
GameSettingsDumpUtils.DumpEnemyHitDisplayMode = () => "OpenHitMaterial: " + ModelManager_1.ModelManager.BulletModel.OpenHitMaterial;
GameSettingsDumpUtils.DumpAutoAdjustImageQuality = () => _a.JMc("r.Kuro.AutoCoolUIEnable");
GameSettingsDumpUtils.DumpShowDamage = () => "GetDamageViewVisible: " + DamageUiManager_1.DamageUiManager.GetDamageViewVisible();
GameSettingsDumpUtils.DumpDynamicBones = () => "KuroLodMask: " + ModelManager_1.ModelManager.CreatureModel.KuroLodMask;
GameSettingsDumpUtils.DumpRayTracing = () => _a.JMc("sg.RayTracingQuality");
GameSettingsDumpUtils.DumpRayTracedReflection = () => _a.JMc("r.Lumen.Reflections.Allow");
GameSettingsDumpUtils.DumpRayTracedGI = () => _a.JMc("r.Lumen.DiffuseIndirect.Allow");
GameSettingsDumpUtils.DumpTeammateFx = () => "EffectEnvironment.DisableOtherEffect: " + EffectEnvironment_1.EffectEnvironment.DisableOtherEffect;
GameSettingsDumpUtils.DumpSaturation = () => _a.JMc("r.Client.Saturation");
GameSettingsDumpUtils.DumpContrast = () => _a.JMc("r.Client.Contrast");
GameSettingsDumpUtils.DumpFilter = () => {
  var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingId);
  var a = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingValues);
  if (e === undefined || a === undefined || a.get(e) === undefined) {
    return "滤镜数据不完整，或者尚未初始化";
  } else {
    return `滤镜数据：Id：${e}, x: ${a.get(e)[0]}, y: ${a.get(e)[1]}, intensity: ${a.get(e)[2]}`;
  }
};
GameSettingsDumpUtils.DumpSkinDamageMode = () => "CharacterSkinDamageComponent.EnableSkinDamage: " + CharacterSkinDamageComponent_1.CharacterSkinDamageComponent.EnableSkinDamage;
GameSettingsDumpUtils.DumpAdrenoFME = () => _a.JMc("r.FEstimation.Option");
GameSettingsDumpUtils.DumpAutoRun = () => "AutoMovingSettingEnable: " + ModelManager_1.ModelManager.BattleUiModel?.FormationData?.AutoMovingSettingEnable;
GameSettingsDumpUtils.DumpAutoSprint = () => "AutoSprintSettingEnable: " + ModelManager_1.ModelManager.BattleUiModel?.FormationData?.AutoSprintSettingEnable;
GameSettingsDumpUtils.DumpVulkan = () => {
  var e = "";
  return (e += _a.JMc("r.Android.DisableVulkanSupport")) + _a.JMc("r.Mobile.FlushSceneColorRendering");
};
GameSettingsDumpUtils.DumpWaterInteract = () => "SceneBattleInteractModel.Open: " + ModelManager_1.ModelManager.SceneBattleInteractModel.Open; //# sourceMappingURL=GameSettingsDumpUtils.js.map