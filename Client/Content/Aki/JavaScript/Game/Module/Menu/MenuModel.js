"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MenuModel = void 0;
const Application_1 = require("../../../Core/Application/Application"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  FilterSettingAll_1 = require("../../../Core/Define/ConfigQuery/FilterSettingAll"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  Platform_1 = require("../../../Launcher/Platform/Platform"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
  MenuData_1 = require("./MenuData"),
  MenuDefine_1 = require("./MenuDefine");
class MenuModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.YNa = new Map, this.zNa = new Map, this.ywi = void 0, this.IsEdited = !1, this.Cac = void 0, this.KeySettingInputControllerType = 0, this.IsWaitForKeyInput = !1, this.LowShake = 0, this.MiddleShake = 0, this.HighShake = 0, this.SimulatedPlatform = -1, this.AllowResolutionList = void 0, this.QualityInfoPercentage = 0, this.IsOpenedImageOverloadConfirmBox = !1, this.IsRayTracingOpenChecked = void 0, this.NeedRayTracingSubChange = void 0, this.IsVulkanOpenChecked = !1, this.pNn = new Map([
      [GameSettingsDefine_1.EFunction.CdKey, FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient]
    ]), this.FilterSettingViewModel = void 0, this.geu = void 0, this.Ceu = void 0
  }
  get IsImageQualityCustom() {
    if (void 0 === this.Cac) {
      this.Cac = !1;
      var e, t, i = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEQUALITY),
        i = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDeviceRenderFeature(i);
      for ([e, t] of GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetOtherChangedValue(i))
        if ((e !== GameSettingsDefine_1.EFunction.MOBILERESOLUTION || Info_1.Info.IsMobilePlatform()) && (e !== GameSettingsDefine_1.EFunction.PCVSYNC || Info_1.Info.IsPcOrGamepadPlatform()) && (e !== GameSettingsDefine_1.EFunction.VOLUMEFOG || !Info_1.Info.IsMacPlatform())) {
          var n = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(e);
          if (void 0 !== n && t !== n) {
            Log_1.Log.CheckDebug() && Log_1.Log.Debug("Menu", 64, "画质相关项被手动修改过", ["functionId", e], ["target value", t]), this.Cac = !0;
            break
          }
        }
    }
    return this.Cac
  }
  set IsImageQualityCustom(e) {
    this.Cac = e
  }
  get FilterSettingValuesCache() {
    if (void 0 === this.geu) {
      var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingValues);
      this.geu = new Map;
      for (const t of FilterSettingAll_1.configFilterSettingAll.GetConfigList() ?? []) this.geu.set(t.Id, [e?.get(t.Id)?.[0] ?? ControllerHolder_1.ControllerHolder.FilterSettingController.GetFilterDefaultValue(t.Id, 0), e?.get(t.Id)?.[1] ?? ControllerHolder_1.ControllerHolder.FilterSettingController.GetFilterDefaultValue(t.Id, 1), e?.get(t.Id)?.[2] ?? ControllerHolder_1.ControllerHolder.FilterSettingController.GetFilterDefaultValue(t.Id, 2)])
    }
    return this.geu
  }
  get FilterSettingIdCache() {
    return void 0 === this.Ceu && (this.Ceu = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingId) ?? MenuDefine_1.FILTER_SETTING_DEFAULT_FILTER_ID), this.Ceu
  }
  set FilterSettingIdCache(e) {
    this.Ceu = e
  }
  OnInit() {
    return this.Initialize(), !0
  }
  OnClear() {
    return this.YNa.clear(), this.ywi?.clear(), !0
  }
  Initialize() {
    var e;
    this.Dwi(), GameSettingsManager_1.GameSettingsManager.IsValid(GameSettingsDefine_1.EFunction.RayTracing) && (e = GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.RayTracing), this.IsRayTracingOpenChecked = void 0 !== e && 0 < e)
  }
  ReInit() {
    this.YNa.clear(), this.ywi?.clear(), this.Initialize()
  }
  Dwi() {
    this.LowShake = CommonParamById_1.configCommonParamById.GetIntConfig("LowShake") / 100, this.MiddleShake = CommonParamById_1.configCommonParamById.GetIntConfig("MiddleShake") / 100, this.HighShake = CommonParamById_1.configCommonParamById.GetIntConfig("HighShake") / 100, this.AllowResolutionList = CommonParamById_1.configCommonParamById.GetIntArrayConfig("AllowResolutionList")
  }
  CreateConfigByBaseConfig() {
    var e, t, i, n, a, r, o;
    for ([e, t] of GameSettingsManager_1.GameSettingsManager.ValidApplyConfigMap) this.pac(t) && (i = t.MainType, n = new MenuData_1.MenuData(t), this.zNa.set(e, n), (a = this.YNa.get(i)) && 0 < a.length ? a.push(n) : this.YNa.set(i, [n]));
    for ([r, o] of this.zNa)
      for (const _ of o.DisableFunction) {
        var s = this.zNa.get(_);
        void 0 === s ? Log_1.Log.CheckWarn() && Log_1.Log.Warn("Menu", 64, "目标设置项并未在UI中开启", ["target functionId", _]) : s.CacheDisableState(r, o.DisableValue)
      }
    for (const g of this.YNa.keys()) this.Rwi(g)
  }
  pac(e) {
    var t;
    return !(Info_1.Info.IsPs5Platform() && 1 === e.Ps5Hide || Info_1.Info.IsIosPlatform() && this.vac(e.Id) || (t = this.pNn.get(e.FunctionId)) && t.Check() || Application_1.Application.IsPublicationApp() && 4 === e.MainType || e.FunctionId === GameSettingsDefine_1.EFunction.KeyboardLockEnemyMode || e.FunctionId === GameSettingsDefine_1.EFunction.GamepadLockEnemyMode) && (Platform_1.Platform.IsCloudGame() ? this.yac(e) : this.j81(e))
  }
  j81(e) {
    return 0 === e.ConditionGroup || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(e.ConditionGroup.toString(), void 0)
  }
  vac(e) {
    return !(!ConfigManager_1.ConfigManager.CommonConfig.GetIosReviewShieldMenuArray()?.includes(e) || !BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip())
  }
  yac(e) {
    return 2 !== e.MainType ? this.j81(e) : MenuDefine_1.cloudGameImageShowSettingsSet.has(e.FunctionId)
  }
  ClearMenuDataMap() {
    this.YNa.clear()
  }
  Rwi(e) {
    var t = this.YNa.get(e);
    t && 0 !== t.length && (t.sort((e, t) => e.SubSort === t.SubSort ? e.FunctionSort - t.FunctionSort : e.SubSort - t.SubSort), this.YNa.set(e, t))
  }
  GetMainTypeList() {
    this.ywi = ConfigManager_1.ConfigManager.MenuBaseConfig.GetMainConfig();
    var e, t, i = new Array;
    for ([e, t] of this.YNa) t.length <= 0 || (void 0 === this.ywi?.get(e) ? Log_1.Log.CheckError() && Log_1.Log.Error("Menu", 64, "未能获得主类型配置（MainType）", ["main type id", e], ["MainConfigs", this.ywi]) : i.push(e));
    return i.sort((e, t) => {
      e = this.ywi.get(e), t = this.ywi.get(t);
      return e.MainSort - t.MainSort
    }), i
  }
  GetTargetConfigData(e) {
    return this.YNa.get(e)
  }
  GetTargetMainInfo(e) {
    return this.ywi.get(e)
  }
  GetMenuDataByFunctionId(e) {
    return this.zNa.get(e)
  }
  IsInMenuDataByFunctionId(e) {
    return this.zNa.has(e)
  }
  GetQualitySettingScore() {
    let e = 0;
    e = Info_1.Info.IsPcOrGamepadPlatform() ? (t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.RESOLUTION) ?? GameSettingsDefine_1.WINDOWS_RESOLUTION_INDEX, (t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(t)).X * t.Y / 2073600) : (t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.MOBILERESOLUTION) ?? 0, MenuDefine_1.mobileResolutionScores[t]);
    var t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.FrameRate / 30,
      i = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.SHADOWQUALITY) ?? 0,
      n = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.NIAGARAQUALITY) ?? 0,
      a = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEDETAIL) ?? 0,
      r = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.SCENEAO) ?? 0,
      o = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.ANTIALISING) ?? 0,
      s = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.VOLUMEFOG) ?? 0,
      _ = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.VOLUMELIGHT) ?? 0,
      g = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.MOTIONBLUR) ?? 0,
      f = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.FSR) ?? 0,
      u = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.METALFX) ?? 0,
      l = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.BLOOM) ?? 0,
      m = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.NPCDENSITY) ?? 0;
    return (MenuDefine_1.qualityLevelScores[GameSettingsDeviceRender_1.GameSettingsDeviceRender.GameQualitySettingLevel] + MenuDefine_1.shadowQualityScores[MathUtils_1.MathUtils.Clamp(i, 0, MenuDefine_1.shadowQualityScores.length - 1)] + MenuDefine_1.niagaraQualityScores[MathUtils_1.MathUtils.Clamp(n, 0, MenuDefine_1.niagaraQualityScores.length - 1)] + MenuDefine_1.imageDetailScores[MathUtils_1.MathUtils.Clamp(a, 0, MenuDefine_1.imageDetailScores.length - 1)] + MenuDefine_1.sceneAoScores[MathUtils_1.MathUtils.Clamp(r, 0, MenuDefine_1.sceneAoScores.length - 1)] + MenuDefine_1.antiAliasingScores[MathUtils_1.MathUtils.Clamp(o, 0, MenuDefine_1.antiAliasingScores.length - 1)] + MenuDefine_1.volumeFogScores[MathUtils_1.MathUtils.Clamp(s, 0, MenuDefine_1.volumeFogScores.length - 1)] + MenuDefine_1.volumeLightScores[MathUtils_1.MathUtils.Clamp(_, 0, MenuDefine_1.volumeLightScores.length - 1)] + MenuDefine_1.motionBlurScores[MathUtils_1.MathUtils.Clamp(g, 0, MenuDefine_1.motionBlurScores.length - 1)] + MenuDefine_1.amdFsrScores[MathUtils_1.MathUtils.Clamp(f, 0, MenuDefine_1.amdFsrScores.length - 1)] + MenuDefine_1.metalFxScores[MathUtils_1.MathUtils.Clamp(u, 0, MenuDefine_1.metalFxScores.length - 1)] + MenuDefine_1.bloomScores[MathUtils_1.MathUtils.Clamp(l, 0, MenuDefine_1.bloomScores.length - 1)] + MenuDefine_1.npcDensityScores[MathUtils_1.MathUtils.Clamp(m, 0, MenuDefine_1.npcDensityScores.length - 1)]) * e * t
  }
  GetGameQualityLoadInfo() {
    var e = this.GetQualitySettingScore(),
      t = 100 * e / GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceScore;
    return Log_1.Log.CheckInfo() && Log_1.Log.Info("Render", 40, "图像配置负载信息", ["SettingScore", e], ["DeviceScore", GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceScore], ["LoadPercentage", t]), 80 < (t = MathUtils_1.MathUtils.Clamp(t, 0, 100)) ? {
      Desc: MenuDefine_1.SEETING_LOAD_OVER,
      Percentage: t,
      BarColor: MenuDefine_1.SEETING_LOAD_OVER_COLOR
    } : 60 < t ? {
      Desc: MenuDefine_1.SEETING_LOAD_LAGGY,
      Percentage: t,
      BarColor: MenuDefine_1.SEETING_LOAD_LAGGY_COLOR
    } : {
      Desc: MenuDefine_1.SEETING_LOAD_FLUID,
      Percentage: t,
      BarColor: MenuDefine_1.SEETING_LOAD_FLUID_COLOR
    }
  }
  GetGamepadOperationPreferences() {
    return LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadOperationPreferences, !1) ?? !1
  }
  CleanFilterCache() {
    this.geu = void 0, this.Ceu = void 0
  }
  GetFilterIndexByConfigId(t) {
    var i = FilterSettingAll_1.configFilterSettingAll.GetConfigList();
    if (void 0 !== i)
      for (let e = 0; e < i.length; e++)
        if (t === i[e].Id) return e;
    return 0
  }
  GetFilterConfigIdByIndex(e) {
    var t = FilterSettingAll_1.configFilterSettingAll.GetConfigList();
    return void 0 === t ? 1 : t[e]?.Id ?? 1
  }
}
exports.MenuModel = MenuModel;
//# sourceMappingURL=MenuModel.js.map