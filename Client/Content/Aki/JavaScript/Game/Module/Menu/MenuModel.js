"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuModel = undefined;
const UE = require("ue");
const Application_1 = require("../../../Core/Application/Application");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const FilterSettingAll_1 = require("../../../Core/Define/ConfigQuery/FilterSettingAll");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const Platform_1 = require("../../../Launcher/Platform/Platform");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
const MenuData_1 = require("./MenuData");
const MenuDefine_1 = require("./MenuDefine");
class MenuModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.YNa = new Map();
    this.zNa = new Map();
    this.ywi = undefined;
    this.IsEdited = false;
    this.Cac = undefined;
    this.KeySettingInputControllerType = 0;
    this.IsWaitForKeyInput = false;
    this.LowShake = 0;
    this.MiddleShake = 0;
    this.HighShake = 0;
    this.SimulatedPlatform = -1;
    this.AllowResolutionList = undefined;
    this.QualityInfoPercentage = 0;
    this.IsOpenedImageOverloadConfirmBox = false;
    this.IsRayTracingOpenChecked = undefined;
    this.NeedRayTracingSubChange = undefined;
    this.IsVulkanOpenChecked = false;
    this.pNn = new Map([[GameSettingsDefine_1.EFunction.CdKey, FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient]]);
    this.FilterSettingViewModel = undefined;
    this._tu = undefined;
    this.utu = undefined;
  }
  get IsImageQualityCustom() {
    if (this.Cac === undefined) {
      this.Cac = false;
      var e;
      var t;
      var i = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEQUALITY);
      var i = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDeviceRenderFeature(i);
      for ([e, t] of GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetOtherChangedValue(i)) {
        if ((e !== GameSettingsDefine_1.EFunction.MOBILERESOLUTION || Info_1.Info.IsMobilePlatform()) && (e !== GameSettingsDefine_1.EFunction.PCVSYNC || Info_1.Info.IsPcOrGamepadPlatform()) && (e !== GameSettingsDefine_1.EFunction.VOLUMEFOG || !Info_1.Info.IsMacPlatform()) && (e !== GameSettingsDefine_1.EFunction.NPCDENSITY || !UE.KuroStaticLibrary.IsLowMemoryDevice())) {
          var n = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(e);
          if (n !== undefined && t !== n) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Menu", 64, "画质相关项被手动修改过", ["functionId", e], ["target value", t]);
            }
            this.Cac = true;
            break;
          }
        }
      }
    }
    return this.Cac;
  }
  set IsImageQualityCustom(e) {
    this.Cac = e;
  }
  get FilterSettingValuesCache() {
    if (this._tu === undefined) {
      var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingValues);
      this._tu = new Map();
      for (const t of FilterSettingAll_1.configFilterSettingAll.GetConfigList() ?? []) {
        this._tu.set(t.Id, [e?.get(t.Id)?.[0] ?? ControllerHolder_1.ControllerHolder.FilterSettingController.GetFilterDefaultValue(t.Id, 0), e?.get(t.Id)?.[1] ?? ControllerHolder_1.ControllerHolder.FilterSettingController.GetFilterDefaultValue(t.Id, 1), e?.get(t.Id)?.[2] ?? ControllerHolder_1.ControllerHolder.FilterSettingController.GetFilterDefaultValue(t.Id, 2)]);
      }
    }
    return this._tu;
  }
  get FilterSettingIdCache() {
    if (this.utu === undefined) {
      this.utu = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingId) ?? MenuDefine_1.FILTER_SETTING_DEFAULT_FILTER_ID;
    }
    return this.utu;
  }
  set FilterSettingIdCache(e) {
    this.utu = e;
  }
  OnInit() {
    this.Initialize();
    return true;
  }
  OnClear() {
    this.YNa.clear();
    this.ywi?.clear();
    return true;
  }
  Initialize() {
    var e;
    this.Dwi();
    if (GameSettingsManager_1.GameSettingsManager.IsValid(GameSettingsDefine_1.EFunction.RayTracing)) {
      e = GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.RayTracing);
      this.IsRayTracingOpenChecked = e !== undefined && e > 0;
    }
  }
  ReInit() {
    this.YNa.clear();
    this.ywi?.clear();
    this.Initialize();
  }
  Dwi() {
    this.LowShake = CommonParamById_1.configCommonParamById.GetIntConfig("LowShake") / 100;
    this.MiddleShake = CommonParamById_1.configCommonParamById.GetIntConfig("MiddleShake") / 100;
    this.HighShake = CommonParamById_1.configCommonParamById.GetIntConfig("HighShake") / 100;
    this.AllowResolutionList = CommonParamById_1.configCommonParamById.GetIntArrayConfig("AllowResolutionList");
  }
  CreateConfigByBaseConfig() {
    var e;
    var t;
    var i;
    var n;
    var a;
    var r;
    var o;
    for ([e, t] of GameSettingsManager_1.GameSettingsManager.ValidApplyConfigMap) {
      if (this.pac(t)) {
        i = t.MainType;
        n = new MenuData_1.MenuData(t);
        this.zNa.set(e, n);
        if ((a = this.YNa.get(i)) && a.length > 0) {
          a.push(n);
        } else {
          this.YNa.set(i, [n]);
        }
      }
    }
    for ([r, o] of this.zNa) {
      for (const _ of o.DisableFunction) {
        var s = this.zNa.get(_);
        if (s === undefined) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Menu", 64, "目标设置项并未在UI中开启", ["target functionId", _]);
          }
        } else {
          s.CacheDisableState(r, o.DisableValue);
        }
      }
    }
    for (const g of this.YNa.keys()) {
      this.Rwi(g);
    }
  }
  pac(e) {
    var t;
    return (!Info_1.Info.IsPs5Platform() || e.Ps5Hide !== 1) && (!Info_1.Info.IsIosPlatform() || !this.vac(e.Id)) && (!(t = this.pNn.get(e.FunctionId)) || !t.Check()) && (!Application_1.Application.IsPublicationApp() || e.MainType !== 4) && e.FunctionId !== GameSettingsDefine_1.EFunction.KeyboardLockEnemyMode && e.FunctionId !== GameSettingsDefine_1.EFunction.GamepadLockEnemyMode && (Platform_1.Platform.IsCloudGame() ? this.yac(e) : this.Ij1(e));
  }
  Ij1(e) {
    return e.ConditionGroup === 0 || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(e.ConditionGroup.toString(), undefined);
  }
  vac(e) {
    return !!ConfigManager_1.ConfigManager.CommonConfig.GetIosReviewShieldMenuArray()?.includes(e) && !!BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip();
  }
  yac(e) {
    if (e.MainType !== 2) {
      return this.Ij1(e);
    } else {
      return MenuDefine_1.cloudGameImageShowSettingsSet.has(e.FunctionId);
    }
  }
  ClearMenuDataMap() {
    this.YNa.clear();
  }
  Rwi(e) {
    var t = this.YNa.get(e);
    if (t && t.length !== 0) {
      t.sort((e, t) => e.SubSort === t.SubSort ? e.FunctionSort - t.FunctionSort : e.SubSort - t.SubSort);
      this.YNa.set(e, t);
    }
  }
  GetMainTypeList() {
    this.ywi = ConfigManager_1.ConfigManager.MenuBaseConfig.GetMainConfig();
    var e;
    var t;
    var i = new Array();
    for ([e, t] of this.YNa) {
      if (!(t.length <= 0)) {
        if (this.ywi?.get(e) === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Menu", 64, "未能获得主类型配置（MainType）", ["main type id", e], ["MainConfigs", this.ywi]);
          }
        } else {
          i.push(e);
        }
      }
    }
    i.sort((e, t) => {
      e = this.ywi.get(e);
      t = this.ywi.get(t);
      return e.MainSort - t.MainSort;
    });
    return i;
  }
  GetTargetConfigData(e) {
    return this.YNa.get(e);
  }
  GetTargetMainInfo(e) {
    return this.ywi.get(e);
  }
  GetMenuDataByFunctionId(e) {
    return this.zNa.get(e);
  }
  IsInMenuDataByFunctionId(e) {
    return this.zNa.has(e);
  }
  GetQualitySettingScore() {
    let e = 0;
    e = Info_1.Info.IsPcOrGamepadPlatform() ? (t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.RESOLUTION) ?? GameSettingsDefine_1.WINDOWS_RESOLUTION_INDEX, (t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(t)).X * t.Y / 2073600) : (t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.MOBILERESOLUTION) ?? 0, MenuDefine_1.mobileResolutionScores[t]);
    var t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.FrameRate / 30;
    var i = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.SHADOWQUALITY) ?? 0;
    var n = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.NIAGARAQUALITY) ?? 0;
    var a = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEDETAIL) ?? 0;
    var r = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.SCENEAO) ?? 0;
    var o = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.ANTIALISING) ?? 0;
    var s = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.VOLUMEFOG) ?? 0;
    var _ = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.VOLUMELIGHT) ?? 0;
    var g = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.MOTIONBLUR) ?? 0;
    var f = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.FSR) ?? 0;
    var u = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.METALFX) ?? 0;
    var l = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.BLOOM) ?? 0;
    var m = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.NPCDENSITY) ?? 0;
    return (MenuDefine_1.qualityLevelScores[GameSettingsDeviceRender_1.GameSettingsDeviceRender.GameQualitySettingLevel] + MenuDefine_1.shadowQualityScores[MathUtils_1.MathUtils.Clamp(i, 0, MenuDefine_1.shadowQualityScores.length - 1)] + MenuDefine_1.niagaraQualityScores[MathUtils_1.MathUtils.Clamp(n, 0, MenuDefine_1.niagaraQualityScores.length - 1)] + MenuDefine_1.imageDetailScores[MathUtils_1.MathUtils.Clamp(a, 0, MenuDefine_1.imageDetailScores.length - 1)] + MenuDefine_1.sceneAoScores[MathUtils_1.MathUtils.Clamp(r, 0, MenuDefine_1.sceneAoScores.length - 1)] + MenuDefine_1.antiAliasingScores[MathUtils_1.MathUtils.Clamp(o, 0, MenuDefine_1.antiAliasingScores.length - 1)] + MenuDefine_1.volumeFogScores[MathUtils_1.MathUtils.Clamp(s, 0, MenuDefine_1.volumeFogScores.length - 1)] + MenuDefine_1.volumeLightScores[MathUtils_1.MathUtils.Clamp(_, 0, MenuDefine_1.volumeLightScores.length - 1)] + MenuDefine_1.motionBlurScores[MathUtils_1.MathUtils.Clamp(g, 0, MenuDefine_1.motionBlurScores.length - 1)] + MenuDefine_1.amdFsrScores[MathUtils_1.MathUtils.Clamp(f, 0, MenuDefine_1.amdFsrScores.length - 1)] + MenuDefine_1.metalFxScores[MathUtils_1.MathUtils.Clamp(u, 0, MenuDefine_1.metalFxScores.length - 1)] + MenuDefine_1.bloomScores[MathUtils_1.MathUtils.Clamp(l, 0, MenuDefine_1.bloomScores.length - 1)] + MenuDefine_1.npcDensityScores[MathUtils_1.MathUtils.Clamp(m, 0, MenuDefine_1.npcDensityScores.length - 1)]) * e * t;
  }
  GetGameQualityLoadInfo() {
    var e = this.GetQualitySettingScore();
    var t = e * 100 / GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceScore;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 40, "图像配置负载信息", ["SettingScore", e], ["DeviceScore", GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceScore], ["LoadPercentage", t]);
    }
    if ((t = MathUtils_1.MathUtils.Clamp(t, 0, 100)) > 80) {
      return {
        Desc: MenuDefine_1.SEETING_LOAD_OVER,
        Percentage: t,
        BarColor: MenuDefine_1.SEETING_LOAD_OVER_COLOR
      };
    } else if (t > 60) {
      return {
        Desc: MenuDefine_1.SEETING_LOAD_LAGGY,
        Percentage: t,
        BarColor: MenuDefine_1.SEETING_LOAD_LAGGY_COLOR
      };
    } else {
      return {
        Desc: MenuDefine_1.SEETING_LOAD_FLUID,
        Percentage: t,
        BarColor: MenuDefine_1.SEETING_LOAD_FLUID_COLOR
      };
    }
  }
  GetGamepadOperationPreferences() {
    return LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadOperationPreferences, false) ?? false;
  }
  CleanFilterCache() {
    this._tu = undefined;
    this.utu = undefined;
  }
  GetFilterIndexByConfigId(t) {
    var i = FilterSettingAll_1.configFilterSettingAll.GetConfigList();
    if (i !== undefined) {
      for (let e = 0; e < i.length; e++) {
        if (t === i[e].Id) {
          return e;
        }
      }
    }
    return 0;
  }
  GetFilterConfigIdByIndex(e) {
    var t = FilterSettingAll_1.configFilterSettingAll.GetConfigList();
    if (t === undefined) {
      return 1;
    } else {
      return t[e]?.Id ?? 1;
    }
  }
}
exports.MenuModel = MenuModel;
//# sourceMappingURL=MenuModel.js.map