"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrightnessView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const RenderConfig_1 = require("../../../Render/Config/RenderConfig");
const RenderDataManager_1 = require("../../../Render/Data/RenderDataManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LongPressButtonItem_1 = require("../../Common/Button/LongPressButtonItem");
const MenuController_1 = require("../MenuController");
const MenuTool_1 = require("../MenuTool");
const STEP = 5;
const SLIDER_MIN_VALUE = 0;
const SLIDER_MAX_VALUE = 100;
class BrightnessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.MenuDataIns = undefined;
    this.IsConfirm = false;
    this.eBi = 0;
    this.tBi = 0;
    this.iBi = undefined;
    this.Vwt = undefined;
    this.oBi = undefined;
    this.rBi = () => {
      var t = this.GetSlider(2).GetValue() - STEP;
      this.nBi(t);
    };
    this._o = () => {
      var t = this.GetSlider(2).GetValue() + STEP;
      this.nBi(t);
    };
    this.m2e = () => {
      this.CloseMe();
    };
    this.sBi = () => {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("AdjustBrighness");
      this.IsConfirm = true;
      this.m2e();
    };
    this.aBi = t => {
      let i = 2.2;
      var s = this.eBi / 2;
      i = t < s ? MathUtils_1.MathUtils.Lerp(1.5, 2.2, t / s) : MathUtils_1.MathUtils.Lerp(2.2, 3.5, (t - s) / s);
      UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.World, RenderDataManager_1.RenderDataManager.Get().GetUiShowBrightnessMaterialParameterCollection(), RenderConfig_1.RenderConfig.UIShowBrightness, i);
      this.nBi(t, false);
    };
    this.hBi = () => {
      var t = this.MenuDataIns.SliderDefault;
      var t = MenuTool_1.FunctionItemViewTool.GetSliderPosition(this.MenuDataIns.SliderRange, t * this.eBi, this.MenuDataIns.SliderDigits);
      this.GetSlider(2).SetValue(t, true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UISliderComponent], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.sBi], [1, this.hBi], [2, this.aBi]];
  }
  nBi(t, i = true) {
    if (t >= 100) {
      this.GetButton(7).SetSelfInteractive(false);
    } else if (t <= 0) {
      this.GetButton(6).SetSelfInteractive(false);
    } else {
      this.GetButton(6).SetSelfInteractive(true);
      this.GetButton(7).SetSelfInteractive(true);
    }
    this.GetSlider(2).SetValue(MathUtils_1.MathUtils.Clamp(t, 0, 100), i);
  }
  OnStart() {
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {
      this.m2e();
    });
    this.iBi = this.OpenParam;
    this.MenuDataIns = this.iBi[0];
    var t = this.MenuDataIns.SliderRange[0];
    var i = this.MenuDataIns.SliderRange[1];
    this.eBi = Math.abs(i - t) * 0.5;
    this.tBi = MenuController_1.MenuController.GetTargetConfig(this.MenuDataIns.FunctionId) * this.eBi;
    this.iBi[1](this.MenuDataIns.FunctionId, this.tBi / this.eBi);
    var t = MathUtils_1.MathUtils.RangeClamp(this.tBi, t, i, SLIDER_MIN_VALUE, SLIDER_MAX_VALUE);
    var i = this.GetSlider(2);
    i.SetMaxValue(SLIDER_MAX_VALUE, true, false);
    i.SetMinValue(SLIDER_MIN_VALUE, true, false);
    i.SetValue(t, true);
    this.Vwt = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(7), 1, this._o);
    this.oBi = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(6), 1, this.rBi);
  }
  OnBeforeDestroy() {
    var t = this.MenuDataIns.SliderRange[0];
    var i = this.MenuDataIns.SliderRange[1];
    var s = this.GetSlider(2).GetValue();
    var s = MathUtils_1.MathUtils.RangeClamp(s, SLIDER_MIN_VALUE, SLIDER_MAX_VALUE, t, i);
    if (this.IsConfirm && this.tBi !== s) {
      this.iBi[1](this.MenuDataIns.FunctionId, s / this.eBi);
      this.IsConfirm = false;
    } else {
      this.iBi[1](this.MenuDataIns.FunctionId, this.tBi / this.eBi);
    }
    this.Vwt?.Clear();
    this.oBi?.Clear();
    this.Vwt = undefined;
    this.oBi = undefined;
  }
}
exports.BrightnessView = BrightnessView;
//# sourceMappingURL=BrightnessView.js.map