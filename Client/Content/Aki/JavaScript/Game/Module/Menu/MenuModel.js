"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuModel = undefined;
const UE = require("ue");
const Application_1 = require("../../../Core/Application/Application");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const FilterSettingAll_1 = require("../../../Core/Define/ConfigQuery/FilterSettingAll");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const Platform_1 = require("../../../Launcher/Platform/Platform");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
const MenuData_1 = require("./MenuData");
const MenuDefine_1 = require("./MenuDefine");
const MenuVersionCheckData_1 = require("./Views/MenuVersionCheckData");
class MenuModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.YNa = new Map();
    this.zNa = new Map();
    this.Yhm = new Map();
    this.ywi = undefined;
    this.zhm = new Map();
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
    this.ktu = undefined;
    this.Otu = undefined;
  }
  get IsImageQualityCustom() {
    if (this.Cac === undefined) {
      this.Cac = false;
      var e;
      var t;
      var i = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.IMAGEQUALITY);
      var i = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDeviceRenderFeature(i);
      for ([e, t] of GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetOtherChangedValue(i)) {
        if ((e !== GameSettingsDefine_1.EFunction.MOBILERESOLUTION || Info_1.Info.IsMobilePlatform()) && (e !== GameSettingsDefine_1.EFunction.PCVSYNC || Info_1.Info.IsPcOrGamepadPlatform()) && (e !== GameSettingsDefine_1.EFunction.VOLUMEFOG || !Info_1.Info.IsMacPlatform()) && (e !== GameSettingsDefine_1.EFunction.NPCDENSITY || !UE.KuroStaticLibrary.IsLowMemoryDevice()) && e !== GameSettingsDefine_1.EFunction.RayTracing) {
          if (e === GameSettingsDefine_1.EFunction.SUPERRESOLUTION) {
            if (Info_1.Info.IsWindowsPlatform()) {
              var n = GameSettingsDefine_1.EFunction.SUPERRESOLUTION;
              var a = GameSettingsDefine_1.EFunction.SUPERRESOLUTION;
              var r = t;
              [n, a, r] = GameSettingsDeviceRender_1.GameSettingsDeviceRender.MapSuperResolutionRecommendValue(n, a, r);
              var s = this.GetDataCacheOrCurValue(n) ?? 0;
              if (s === 0) {
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Menu", 92, "画质相关项被手动修改过：未开启超级分辨率", ["superResolutionId", n]);
                }
                this.Cac = true;
                break;
              }
              s = this.GetDataCacheOrCurValue(a) ?? 0;
              if (r !== s) {
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Menu", 92, "画质相关项被手动修改过：超级分辨率质量档位", ["superResolutionId", n], ["qualityId", a], ["target value", r], ["current value", s]);
                }
                this.Cac = true;
                break;
              }
            }
          } else {
            n = this.GetDataCacheOrCurValue(e);
            if (n !== undefined && t !== n) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Menu", 64, "画质相关项被手动修改过", ["functionId", e], ["target value", t]);
              }
              this.Cac = true;
              break;
            }
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
    if (this.ktu === undefined) {
      var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingValues);
      this.ktu = new Map();
      for (const i of FilterSettingAll_1.configFilterSettingAll.GetConfigList() ?? []) {
        var t = [];
        for (const n of MenuDefine_1.filterSettingParams) {
          t[n] = e?.get(i.Id)?.[n] ?? ControllerHolder_1.ControllerHolder.FilterSettingController.GetFilterDefaultValue(i.Id, n);
        }
        this.ktu.set(i.Id, t);
      }
    }
    return this.ktu;
  }
  get FilterSettingIdCache() {
    if (this.Otu === undefined) {
      this.Otu = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingId) ?? MenuDefine_1.FILTER_SETTING_DEFAULT_FILTER_ID;
    }
    return this.Otu;
  }
  set FilterSettingIdCache(e) {
    this.Otu = e;
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
    var s;
    for ([e, t] of GameSettingsManager_1.GameSettingsManager.ValidApplyConfigMap) {
      if (this.pac(t)) {
        i = t.MainType;
        n = this.YKd(t);
        this.zNa.set(e, n);
        if ((a = this.YNa.get(i)) && a.length > 0) {
          a.push(n);
        } else {
          this.YNa.set(i, [n]);
        }
      }
    }
    for ([r, s] of this.zNa) {
      for (const _ of s.DisableFunction) {
        var o = this.zNa.get(_);
        if (o === undefined) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Menu", 64, "目标设置项并未在UI中开启", ["target functionId", _]);
          }
        } else {
          o.CacheDisableState(r, s.DisableValue);
        }
      }
    }
    for (const f of this.YNa.keys()) {
      this.Rwi(f);
    }
  }
  YKd(e) {
    return new (e.FunctionId === GameSettingsDefine_1.EFunction.VersionCheck ? MenuVersionCheckData_1.MenuVersionCheckData : MenuData_1.MenuData)(e);
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
  GId(e, t, i) {
    e = MathUtils_1.MathUtils.Clamp(e, 0, i.length - 1);
    t = MathUtils_1.MathUtils.Clamp(t, 0, i.length - 1);
    return i[e] - i[t];
  }
  DJd(e) {
    var t = [{
      FunctionId: GameSettingsDefine_1.EFunction.SHADOWQUALITY,
      Key: "ShadowQuality",
      ScoreTable: MenuDefine_1.shadowQualityScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.NIAGARAQUALITY,
      Key: "NiagaraQuality",
      ScoreTable: MenuDefine_1.niagaraQualityScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.IMAGEDETAIL,
      Key: "ImageDetail",
      ScoreTable: MenuDefine_1.imageDetailScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.SCENEAO,
      Key: "SceneAo",
      ScoreTable: MenuDefine_1.sceneAoScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.ANTIALISING,
      Key: "AntiAliasing",
      ScoreTable: MenuDefine_1.antiAliasingScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.VOLUMEFOG,
      Key: "VolumeFog",
      ScoreTable: MenuDefine_1.volumeFogScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.VOLUMELIGHT,
      Key: "VolumeLight",
      ScoreTable: MenuDefine_1.volumeLightScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.MOTIONBLUR,
      Key: "MotionBlur",
      ScoreTable: MenuDefine_1.motionBlurScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.METALFX,
      Key: "MetalFxEnable",
      ScoreTable: MenuDefine_1.metalFxScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.BLOOM,
      Key: "BloomEnable",
      ScoreTable: MenuDefine_1.bloomScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.NPCDENSITY,
      Key: "NpcDensity",
      ScoreTable: MenuDefine_1.npcDensityScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.VegetationDensity,
      Key: "VegetationDensity",
      ScoreTable: MenuDefine_1.vegetationDensityScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.SUPERRESOLUTION,
      Key: "SuperResolution",
      ScoreTable: MenuDefine_1.superResolutionScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.RayTracedGI,
      Key: "RayTracingGI",
      ScoreTable: MenuDefine_1.rayTracingGIScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.RayTracedReflection,
      Key: "RayTracingReflection",
      ScoreTable: MenuDefine_1.rayTracingReflectionScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.RayTracedShadow,
      Key: "RayTracedShadow",
      ScoreTable: MenuDefine_1.rayTracedShadowScores
    }, {
      FunctionId: GameSettingsDefine_1.EFunction.LOADINGRANGESCALELEVEL,
      Key: "LoadingRangeScaleLevel",
      ScoreTable: MenuDefine_1.pcLoadingRangeScores
    }];
    var i = {
      ShadowQuality: 0,
      NiagaraQuality: 0,
      ImageDetail: 0,
      SceneAo: 0,
      AntiAliasing: 0,
      VolumeFog: 0,
      VolumeLight: 0,
      MotionBlur: 0,
      MetalFxEnable: 0,
      BloomEnable: 0,
      NpcDensity: 0,
      SuperResolution: 0,
      RayTracingGI: 0,
      RayTracingReflection: 0,
      RayTracedShadow: 0,
      LoadingRangeScaleLevel: 0
    };
    for (const [a, r] of e) {
      var n = t.find(e => e.FunctionId === a);
      if (n) {
        i[n.Key] = r;
      }
    }
    return {
      recommended: i,
      fieldMappings: t
    };
  }
  FId() {
    var e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetRecommendQualityLv();
    if (e === undefined) {
      return 0;
    }
    e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDeviceRenderFeature(e);
    if (e === undefined) {
      return 0;
    }
    var e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetOtherChangedValue(e);
    var {
      recommended: i,
      fieldMappings: e
    } = this.DJd(e);
    let n = 0;
    for (const g of e) {
      var a;
      var r;
      var s;
      var o;
      var _ = g.FunctionId;
      let e = i[g.Key];
      let t = this.GetDataCacheOrCurValue(g.FunctionId) ?? 0;
      if (_ === GameSettingsDefine_1.EFunction.SUPERRESOLUTION && (r = a = _, [a, r, e] = GameSettingsDeviceRender_1.GameSettingsDeviceRender.MapSuperResolutionRecommendValue(a, r, e), s = this.GetDataCacheOrCurValue(a) ?? 0, r = this.GetDataCacheOrCurValue(r) ?? 0, a === GameSettingsDefine_1.EFunction.FSR ? (e = MenuDefine_1.superResolutionScores.length - 2, s === 1 && (t = MenuDefine_1.superResolutionScores.length - 2)) : (e === 99 ? e = 2 : e += 2, t = r === 99 ? 2 : r + 2), s === 0)) {
        t = MenuDefine_1.superResolutionScores.length - 1;
      }
      if ((_ === GameSettingsDefine_1.EFunction.RayTracedGI || _ === GameSettingsDefine_1.EFunction.RayTracedReflection || _ === GameSettingsDefine_1.EFunction.RayTracedShadow) && t > 0) {
        t = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.RayTracing) ?? 0;
        a = 4000 / GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceScore;
        r = MathUtils_1.MathUtils.Clamp(a, 0.6, 3);
        s = this.GId(t, e, g.ScoreTable) * r;
        n += s;
        this.zhm?.set(_, s);
      } else {
        o = this.GId(t, e, g.ScoreTable);
        n += o;
        this.zhm?.set(_, o);
      }
    }
    var e = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.IMAGEQUALITY) ?? 0;
    var t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetRecommendQualityLv() ?? 0;
    var e = this.GId(e, t, MenuDefine_1.pcQualityLevelScores);
    var t = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.RESOLUTION) ?? GameSettingsDefine_1.WINDOWS_RESOLUTION_INDEX;
    var t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(t);
    var t = (t.X * t.Y / 3686400 - 1) * 40;
    var f = ModelManager_1.ModelManager.MenuModel?.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.HIGHESTFPS) ?? 0;
    var f = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetFrameByList(f);
    return n += e + t + (f - 60) / 60 * 40;
  }
  GetQualitySettingScoreMobilePlatform() {
    var e = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.MOBILERESOLUTION) ?? 0;
    var e = MenuDefine_1.mobileResolutionScores[e];
    var t = ModelManager_1.ModelManager.MenuModel?.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.HIGHESTFPS) ?? 0;
    var t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetFrameByList(t) / 30;
    var i = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.SHADOWQUALITY) ?? 0;
    var n = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.NIAGARAQUALITY) ?? 0;
    var a = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.IMAGEDETAIL) ?? 0;
    var r = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.SCENEAO) ?? 0;
    var s = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.ANTIALISING) ?? 0;
    var o = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.VOLUMEFOG) ?? 0;
    var _ = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.VOLUMELIGHT) ?? 0;
    var f = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.MOTIONBLUR) ?? 0;
    var g = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.FSR) ?? 0;
    var u = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.METALFX) ?? 0;
    var m = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.BLOOM) ?? 0;
    var D = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.NPCDENSITY) ?? 0;
    var h = MenuDefine_1.qualityLevelScores[GameSettingsDeviceRender_1.GameSettingsDeviceRender.GameQualitySettingLevel];
    var i = MenuDefine_1.shadowQualityScores[MathUtils_1.MathUtils.Clamp(i, 0, MenuDefine_1.shadowQualityScores.length - 1)];
    this.zhm.set(GameSettingsDefine_1.EFunction.SHADOWQUALITY, i);
    var n = MenuDefine_1.niagaraQualityScores[MathUtils_1.MathUtils.Clamp(n, 0, MenuDefine_1.niagaraQualityScores.length - 1)];
    this.zhm.set(GameSettingsDefine_1.EFunction.NIAGARAQUALITY, n);
    var a = MenuDefine_1.imageDetailScores[MathUtils_1.MathUtils.Clamp(a, 0, MenuDefine_1.imageDetailScores.length - 1)];
    this.zhm.set(GameSettingsDefine_1.EFunction.IMAGEDETAIL, a);
    var r = MenuDefine_1.sceneAoScores[MathUtils_1.MathUtils.Clamp(r, 0, MenuDefine_1.sceneAoScores.length - 1)];
    this.zhm.set(GameSettingsDefine_1.EFunction.SCENEAO, r);
    var s = MenuDefine_1.antiAliasingScores[MathUtils_1.MathUtils.Clamp(s, 0, MenuDefine_1.antiAliasingScores.length - 1)];
    this.zhm.set(GameSettingsDefine_1.EFunction.ANTIALISING, s);
    var o = MenuDefine_1.volumeFogScores[MathUtils_1.MathUtils.Clamp(o, 0, MenuDefine_1.volumeFogScores.length - 1)];
    this.zhm.set(GameSettingsDefine_1.EFunction.VOLUMEFOG, o);
    var _ = MenuDefine_1.volumeLightScores[MathUtils_1.MathUtils.Clamp(_, 0, MenuDefine_1.volumeLightScores.length - 1)];
    this.zhm.set(GameSettingsDefine_1.EFunction.VOLUMELIGHT, _);
    var f = MenuDefine_1.motionBlurScores[MathUtils_1.MathUtils.Clamp(f, 0, MenuDefine_1.motionBlurScores.length - 1)];
    this.zhm.set(GameSettingsDefine_1.EFunction.MOTIONBLUR, f);
    var g = MenuDefine_1.amdFsrScores[MathUtils_1.MathUtils.Clamp(g, 0, MenuDefine_1.amdFsrScores.length - 1)];
    this.zhm.set(GameSettingsDefine_1.EFunction.FSR, g);
    var u = MenuDefine_1.metalFxScores[MathUtils_1.MathUtils.Clamp(u, 0, MenuDefine_1.metalFxScores.length - 1)];
    this.zhm.set(GameSettingsDefine_1.EFunction.METALFX, u);
    var m = MenuDefine_1.bloomScores[MathUtils_1.MathUtils.Clamp(m, 0, MenuDefine_1.bloomScores.length - 1)];
    this.zhm.set(GameSettingsDefine_1.EFunction.BLOOM, m);
    var l = MenuDefine_1.npcDensityScores[MathUtils_1.MathUtils.Clamp(D, 0, MenuDefine_1.npcDensityScores.length - 1)];
    this.zhm.set(GameSettingsDefine_1.EFunction.NPCDENSITY, l);
    var D = MenuDefine_1.vegetationDensityScores[MathUtils_1.MathUtils.Clamp(D, 0, MenuDefine_1.vegetationDensityScores.length - 1)];
    this.zhm.set(GameSettingsDefine_1.EFunction.VegetationDensity, D);
    var D = this.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.LOADINGRANGESCALELEVEL) ?? 0;
    var D = MenuDefine_1.mobileLoadingRangeScores[MathUtils_1.MathUtils.Clamp(D, 0, MenuDefine_1.mobileLoadingRangeScores.length - 1)];
    this.zhm.set(GameSettingsDefine_1.EFunction.LOADINGRANGESCALELEVEL, D);
    var h = h + i + n + a + r + s + o + _ + f + g + u + m + l + D;
    return h * e * t;
  }
  GetLoadPercentage() {
    if (Info_1.Info.IsMobilePlatform()) {
      return this.GetQualitySettingScoreMobilePlatform() * 100 / GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceScore;
    }
    if (Info_1.Info.IsPcPlatform()) {
      var t = this.FId();
      let e = 0;
      var i = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetRecommendQualityLv();
      if (i !== undefined) {
        e = i;
      }
      var i = MenuDefine_1.pcQualityLevelWeights[MathUtils_1.MathUtils.Clamp(e, 0, MenuDefine_1.pcQualityLevelWeights.length - 1)];
      var n = i * 0.25;
      var a = 60 + t * n;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Render", 92, "负载条评估", ["deviceWeight", i], ["deltaScore", t], ["scaleFactor", n], ["finalLoad", a]);
      }
      return a;
    }
    return 0;
  }
  GetGameQualityLoadInfo() {
    var e = this.GetLoadPercentage();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 40, "图像配置负载信息", ["DeviceScore", GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceScore], ["LoadPercentage", e]);
    }
    if ((e = MathUtils_1.MathUtils.Clamp(e, 0, 100)) > 80) {
      return {
        Desc: MenuDefine_1.SEETING_LOAD_OVER,
        Percentage: e,
        BarColor: MenuDefine_1.SEETING_LOAD_OVER_COLOR
      };
    } else if (e > 60) {
      return {
        Desc: MenuDefine_1.SEETING_LOAD_LAGGY,
        Percentage: e,
        BarColor: MenuDefine_1.SEETING_LOAD_LAGGY_COLOR
      };
    } else {
      return {
        Desc: MenuDefine_1.SEETING_LOAD_FLUID,
        Percentage: e,
        BarColor: MenuDefine_1.SEETING_LOAD_FLUID_COLOR
      };
    }
  }
  GetGamepadOperationPreferences() {
    return LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadOperationPreferences, false) ?? false;
  }
  CleanFilterCache() {
    this.ktu = undefined;
    this.Otu = undefined;
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
  GetDataCacheOrCurValue(e) {
    return this.Yhm.get(e) ?? GameSettingsManager_1.GameSettingsManager.GetCurrentValue(e);
  }
  IsDataCacheContains(e) {
    return this.Yhm.has(e);
  }
  HasDataCache() {
    return this.Yhm.size > 0;
  }
  AddDataToTempCache(e, t) {
    this.Yhm.set(e, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMenuSetting, e);
  }
  AddDataToTempOrSetValue(e, t) {
    if (this.GetMenuDataByFunctionId(e)?.IsDataCache) {
      this.AddDataToTempCache(e, t);
    } else {
      GameSettingsManager_1.GameSettingsManager.HandleValueChange(e, t, 1);
    }
  }
  InitDataCache() {
    this.Yhm.clear();
  }
  async ApplyDataCache() {
    let n = 0;
    let a = 0;
    const r = new CustomPromise_1.CustomPromise();
    const s = Array.from(this.Yhm.entries());
    this.Yhm.clear();
    const o = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      a++;
      let e = 0;
      while (n < s.length && e < 3) {
        var [t, i] = s[n];
        GameSettingsManager_1.GameSettingsManager.HandleValueChange(t, i, 1);
        n++;
        e++;
      }
      if (n >= s.length && TimerSystem_1.GameplayTimerSystem.Has(o)) {
        r.SetResult(true);
        TimerSystem_1.GameplayTimerSystem.Remove(o);
      }
    }, 30);
    await r.Promise;
    return a * 30;
  }
  GetFilterConfigIdByIndex(e) {
    var t = FilterSettingAll_1.configFilterSettingAll.GetConfigList();
    if (t === undefined) {
      return 1;
    } else {
      return t[e]?.Id ?? 1;
    }
  }
  GetTopLoadImpactSettings(e = 4) {
    if (this.zhm && this.zhm.size !== 0) {
      return Array.from(this.zhm.entries()).sort((e, t) => t[1] - e[1]).slice(0, e).map(([e]) => this.zNa.get(e)?.FunctionName ?? "");
    } else {
      return [];
    }
  }
}
exports.MenuModel = MenuModel;
//# sourceMappingURL=MenuModel.js.map