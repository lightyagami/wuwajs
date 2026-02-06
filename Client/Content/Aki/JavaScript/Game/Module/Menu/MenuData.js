"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuData = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const MenuDefine_1 = require("./MenuDefine");
class MenuData {
  constructor(e) {
    this.rSl = e;
    this.aHa = false;
    this.gac = new Map();
  }
  get ConfigId() {
    return this.rSl.Id;
  }
  get SubType() {
    return this.rSl.SubType;
  }
  get SubName() {
    return this.rSl.SubName;
  }
  get FunctionName() {
    return this.rSl.Name;
  }
  get FunctionSort() {
    return this.rSl.FunctionSort;
  }
  get SubSort() {
    return this.rSl.SubSort;
  }
  get FunctionId() {
    return this.rSl.FunctionId;
  }
  get NeedScale() {
    return this.rSl.NeedScale;
  }
  get SetType() {
    return this.rSl.SetType;
  }
  get SliderRange() {
    return this.rSl.SliderRange;
  }
  get SliderRangeDisplay() {
    if (this.rSl.SliderRangeDisplay?.length > 0) {
      return this.rSl.SliderRangeDisplay;
    } else {
      return this.rSl.SliderRange;
    }
  }
  get SliderDefault() {
    return this.rSl.SliderDefault;
  }
  get SliderDigits() {
    return this.rSl.Digits;
  }
  get OptionsDefault() {
    return this.rSl.OptionsDefault;
  }
  get BtnDisableTipsEnable() {
    return this.rSl.BtnDisableTipsEnable;
  }
  get OptionsNameListInternal() {
    return this.rSl.OptionsName;
  }
  get OptionsValueListInternal() {
    return this.rSl.OptionsValue;
  }
  get SubImage() {
    return this.rSl.SubImage;
  }
  get FunctionImage() {
    return this.rSl.FunctionImage;
  }
  get ButtonTextId() {
    return this.rSl.ButtonText;
  }
  get ButtonViewName() {
    return this.rSl.OpenView;
  }
  get RelationFuncIds() {
    return this.rSl.RelationFunction;
  }
  get AffectedValue() {
    return this.rSl.AffectedValue;
  }
  get AffectedFunction() {
    return this.rSl.AffectedFunction;
  }
  get DisableValue() {
    return this.rSl.DisableValue;
  }
  get DisableFunction() {
    return this.rSl.DisableFunction;
  }
  get BtnDisableTips() {
    return this.rSl.BtnDisableTips;
  }
  get ValueTipsMap() {
    return this.rSl.ValueTipsMap;
  }
  get ClickedTipsMap() {
    return this.rSl.ClickedTipsMap;
  }
  get IsDataCache() {
    return this.rSl.IsDataCache;
  }
  get ClickedTips() {
    return this.rSl.ClickedTips;
  }
  get hHa() {
    return this.rSl.DetailText;
  }
  get CanClickWhenDisable() {
    return this.rSl.CanDisableDetailShow;
  }
  get CustomTitleArgs() {}
  GetEnable() {
    if (this.FunctionId === GameSettingsDefine_1.EFunction.MobileGamepadMode) {
      return ModelManager_1.ModelManager.MenuModel?.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.MobileGamepadMode) === 1;
    }
    if (this.FunctionId === GameSettingsDefine_1.EFunction.Filter) {
      return ModelManager_1.ModelManager.MenuModel?.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.ImageDisplayMode) === 1;
    }
    if (this.FunctionId === GameSettingsDefine_1.EFunction.EyeProtection) {
      return ModelManager_1.ModelManager.MenuModel?.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.ImageDisplayMode) === 2;
    }
    if (this.FunctionId === GameSettingsDefine_1.EFunction.HDR) {
      return UE.KuroGISystem.CheckWindowsSupportHDR();
    }
    if (this.N6g()) {
      return false;
    }
    for (var [e, t] of this.gac) {
      e = ModelManager_1.ModelManager.MenuModel?.GetDataCacheOrCurValue(e);
      if (e !== undefined && t.includes(e)) {
        return false;
      }
    }
    return true;
  }
  N6g() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(e);
    if (!e) {
      return false;
    }
    let t = undefined;
    return !!(t = e.InstSubType !== 12 ? MenuDefine_1.disableSettingsInstMap.get(e.InstSubType) : MenuDefine_1.disableSettingsWorldInstMap.get(e.WorldDungeonSubType)) && t.includes(this.FunctionId);
  }
  get EnableRedDot() {
    return false;
  }
  OnRefresh() {}
  GetButtonEnable() {
    return true;
  }
  CacheDisableState(e, t) {
    this.gac.set(e, t);
  }
  ResetDisableStateCache() {
    this.gac.clear();
  }
  CanAffectedFunction(e) {
    return !!this.AffectedValue.includes(e) && this.AffectedFunction.size > 0;
  }
  HasDisableFunction() {
    return this.DisableFunction.length > 0;
  }
  get OptionsNameList() {
    return this.OptionsNameListInternal;
  }
  get OptionsValueList() {
    return this.OptionsValueListInternal;
  }
  HasDetailText() {
    var e = this.hHa;
    return !!e && !StringUtils_1.StringUtils.IsBlank(e);
  }
  GetDetailTextId() {
    return this.hHa;
  }
  SetDetailTextVisible(e) {
    this.aHa = e;
  }
  GetIsDetailTextVisible() {
    return this.aHa;
  }
  IsRecommendIndex(e) {
    var t;
    return this.FunctionId === GameSettingsDefine_1.EFunction.IMAGEQUALITY && !ModelManager_1.ModelManager.MenuModel.IsImageQualityCustom && (t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetRecommendQualityLv()) !== undefined && this.OptionsValueList.indexOf(t) === e;
  }
}
exports.MenuData = MenuData;
//# sourceMappingURL=MenuData.js.map