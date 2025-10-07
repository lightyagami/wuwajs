"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EyeProtectSliderData = exports.EyeProtectItemData = undefined;
const GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../../GameSettings/GameSettingsManager");
const GameSettingsUtils_1 = require("../../../../GameSettings/GameSettingsUtils");
class EyeProtectItemData {
  constructor(t, e, i) {
    this.IsActiveInternal = false;
    this.ModeValue = 0;
    this.ModeName = "";
    this.ViewModel = undefined;
    this.ModeValue = t;
    this.ModeName = e;
    this.ViewModel = i;
  }
  GetModeValue() {
    return this.ModeValue;
  }
  GetModeName() {
    return this.ModeName;
  }
  IsCustom() {
    return this.ModeValue === 3;
  }
  GetViewModel() {
    return this.ViewModel;
  }
}
exports.EyeProtectItemData = EyeProtectItemData;
class EyeProtectSliderData {
  constructor(e, t, i) {
    this.MinValueInternal = 0;
    this.MaxValueInternal = 0;
    this.CurValueInternal = 0;
    this.DefaultValueInternal = 0;
    this.TitleInternal = "";
    this.ViewModel = undefined;
    this.FunctionIdInternal = undefined;
    this.MetaData = undefined;
    this.ModeValue = undefined;
    this.OnChangeValue = t => {
      if (this.GetModeValue() === 3 && this.ViewModel) {
        this.ViewModel.IsDirty = true;
        this.ViewModel.OnSliderValueChange?.();
        this.CurValueInternal = t;
        switch (this.FunctionId) {
          case GameSettingsDefine_1.EFunction.EyeProtectionTemp:
            GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionTemp(t, this.ModeValue);
            break;
          case GameSettingsDefine_1.EFunction.EyeProtectionStrength:
            GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionStrength(t, this.ModeValue);
            break;
          case GameSettingsDefine_1.EFunction.EyeProtectionBrightness:
            GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionBrightness(t, this.ModeValue);
            break;
          case GameSettingsDefine_1.EFunction.EyeProtectionTexture:
            GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionTexture(t, this.ModeValue);
        }
      }
    };
    this.OnApplyValue = () => {
      if (this.GetModeValue() === 3) {
        GameSettingsManager_1.GameSettingsManager.HandleValueChange(this.FunctionId, this.CurValueInternal, 1);
      }
    };
    this.FunctionIdInternal = e.FunctionId;
    this.MinValueInternal = e.SliderRange[0];
    this.MaxValueInternal = e.SliderRange[1];
    this.ViewModel = t;
    if (i === 3) {
      this.CurValueInternal = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(e.FunctionId) ?? e.SliderDefault;
    } else {
      this.CurValueInternal = e.SliderDefault;
      let t = undefined;
      if (i === 1) {
        t = this.ViewModel?.ParamStrong;
      } else if (i === 2) {
        t = this.ViewModel?.ParamWeak;
      }
      if (t) {
        switch (this.FunctionIdInternal) {
          case GameSettingsDefine_1.EFunction.EyeProtectionTemp:
            this.CurValueInternal = t.ScreenBlueLightFilterTemperature;
            break;
          case GameSettingsDefine_1.EFunction.EyeProtectionStrength:
            this.CurValueInternal = t.ScreenBlueLightFilterStrength;
            break;
          case GameSettingsDefine_1.EFunction.EyeProtectionBrightness:
            this.CurValueInternal = t.ScreenBrightnessClampMax;
            break;
          case GameSettingsDefine_1.EFunction.EyeProtectionTexture:
            this.CurValueInternal = t.ScreenBlueLightFilterTextureIntensity;
        }
      }
    }
    this.DefaultValueInternal = e.SliderDefault;
    this.TitleInternal = e.FunctionName;
    this.MetaData = e;
    this.ViewModel = t;
    this.ModeValue = i;
  }
  get MenuData() {
    return this.MetaData;
  }
  get MinValue() {
    return this.MinValueInternal;
  }
  get MaxValue() {
    return this.MaxValueInternal;
  }
  get CurValue() {
    return this.CurValueInternal;
  }
  get DefaultCurValue() {
    return this.DefaultValueInternal;
  }
  get Title() {
    return this.TitleInternal;
  }
  get FunctionId() {
    return this.FunctionIdInternal;
  }
  GetModeValue() {
    return this.ModeValue;
  }
  OnSetValue() {
    switch (this.FunctionId) {
      case GameSettingsDefine_1.EFunction.EyeProtectionTemp:
        GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionTemp(this.CurValueInternal, this.ModeValue);
        break;
      case GameSettingsDefine_1.EFunction.EyeProtectionStrength:
        GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionStrength(this.CurValueInternal, this.ModeValue);
        break;
      case GameSettingsDefine_1.EFunction.EyeProtectionBrightness:
        GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionBrightness(this.CurValueInternal, this.ModeValue);
        break;
      case GameSettingsDefine_1.EFunction.EyeProtectionTexture:
        GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionTexture(this.CurValueInternal, this.ModeValue);
    }
  }
}
exports.EyeProtectSliderData = EyeProtectSliderData;
//# sourceMappingURL=EyeProtectData.js.map