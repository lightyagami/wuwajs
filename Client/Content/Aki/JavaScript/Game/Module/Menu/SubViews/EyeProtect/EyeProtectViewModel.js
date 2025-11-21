"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EyeProtectViewModel = undefined;
const UE = require("ue");
const GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../../GameSettings/GameSettingsManager");
const GameSettingsUtils_1 = require("../../../../GameSettings/GameSettingsUtils");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const MenuData_1 = require("../../MenuData");
const FilterCameraComponent_1 = require("../FilterSetting/FilterCameraComponent");
const EyeProtectController_1 = require("./EyeProtectController");
const EyeProtectData_1 = require("./EyeProtectData");
class EyeProtectViewModel {
  constructor() {
    this.MenuMetaData = undefined;
    this.ModeMetaData = undefined;
    this.ModeCurValue = undefined;
    this.FilterCameraComponent = undefined;
    this.IsModeDirty = false;
    this.IsSliderDirty = false;
    this.SliderDataListMap = new Map();
    this.ParamStrong = undefined;
    this.ParamWeak = undefined;
    this.Z6d = [GameSettingsDefine_1.EFunction.EyeProtectionTemp, GameSettingsDefine_1.EFunction.EyeProtectionStrength, GameSettingsDefine_1.EFunction.EyeProtectionBrightness, GameSettingsDefine_1.EFunction.EyeProtectionTexture];
    this.OnSliderValueChange = undefined;
    this.OnDragMoved = e => {
      this.FilterCameraComponent?.OnDragMoved(e);
    };
    this.OnDragBegin = () => {
      this.FilterCameraComponent?.OnDragBegin();
    };
    this.OnDragEnded = () => {
      this.FilterCameraComponent?.OnDragEnded();
    };
    this.OnInputUiLookUp = (e, t) => {
      this.FilterCameraComponent?.OnInputUiLookUp(e, t);
    };
    this.OnInputUiTurn = (e, t) => {
      this.FilterCameraComponent?.OnInputUiTurn(e, t);
    };
    this.MenuMetaData = ModelManager_1.ModelManager.MenuModel.GetMenuDataByFunctionId(GameSettingsDefine_1.EFunction.EyeProtection);
    var e = GameSettingsManager_1.GameSettingsManager.ValidApplyConfigMap.get(GameSettingsDefine_1.EFunction.EyeProtectionMode);
    if (e) {
      this.ModeMetaData = new MenuData_1.MenuData(e);
      this.ModeCurValue = GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.EyeProtectionMode);
    }
  }
  get IsDirty() {
    if (this.ModeCurValue !== 2) {
      return this.IsModeDirty;
    } else {
      return this.IsModeDirty || this.IsSliderDirty;
    }
  }
  async BuildComponentAndOpen() {
    if (this.FilterCameraComponent === undefined) {
      this.FilterCameraComponent = new FilterCameraComponent_1.FilterCameraComponent(async () => ControllerHolder_1.ControllerHolder.EyeProtectController.BuildViewModelAndOpen(this), "EyeProtectView");
    }
    return await this.FilterCameraComponent.TryOpenPhotograph();
  }
  OnModeValueChange(e) {
    this.ModeCurValue = e;
    GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionMode(e);
    if (e === 2) {
      for (const t of this.GetSliderDataList(e)) {
        t.OnSetValue();
      }
    }
    this.IsModeDirty = GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.EyeProtectionMode) !== e;
  }
  OnModeValueApply() {
    if (this.IsModeDirty) {
      GameSettingsManager_1.GameSettingsManager.HandleValueChange(GameSettingsDefine_1.EFunction.EyeProtectionMode, this.ModeCurValue, 1);
      this.IsModeDirty = false;
    }
  }
  GetTitle() {
    return this.MenuMetaData.FunctionName;
  }
  GetModeMetaData() {
    return this.ModeMetaData;
  }
  GetModeDataList() {
    var t = [];
    for (let e = 0; e < this.ModeMetaData.OptionsValueList.length; e++) {
      t.push(new EyeProtectData_1.EyeProtectItemData(this.ModeMetaData.OptionsValueList[e], this.ModeMetaData.OptionsNameList[e], this));
    }
    return t;
  }
  async InitParam() {
    this.SliderDataListMap.clear();
    var e = new LoadAsyncPromise_1.LoadAsyncPromise(EyeProtectController_1.EYEPROTECT_STRONG_DA_PATH, UE.KuroScreenBlueLightFilterParameter);
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(EyeProtectController_1.EYEPROTECT_WEAK_DA_PATH, UE.KuroScreenBlueLightFilterParameter);
    await Promise.all([e.Promise.then(e => {
      if (e) {
        this.ParamStrong = e;
      }
    }), t.Promise.then(e => {
      if (e) {
        this.ParamWeak = e;
      }
    })]);
  }
  InitSliderDataList(e) {
    var t = [];
    for (const s of this.Z6d) {
      var i = GameSettingsManager_1.GameSettingsManager.ValidApplyConfigMap.get(s);
      if (i) {
        i = new MenuData_1.MenuData(i);
        i = new EyeProtectData_1.EyeProtectSliderData(i, this, e);
        t.push(i);
      }
    }
    this.SliderDataListMap.set(e, t);
  }
  GetSliderDataList(e) {
    return this.SliderDataListMap.get(e);
  }
}
exports.EyeProtectViewModel = EyeProtectViewModel;
//# sourceMappingURL=EyeProtectViewModel.js.map