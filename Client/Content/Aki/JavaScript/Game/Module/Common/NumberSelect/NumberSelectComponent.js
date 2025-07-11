"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberSelectComponent = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LongPressButtonItem_1 = require("../Button/LongPressButtonItem");
const MAX_VALUE = 9999;
class NumberSelectComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Fwt = undefined;
    this.Vwt = undefined;
    this.Hwt = undefined;
    this.jwt = undefined;
    this.Pe = undefined;
    this.Wwt = 0;
    this.BY = 0;
    this.Kwt = MAX_VALUE;
    this.bY = 1;
    this.Qwt = () => {
      this.SelectMax();
    };
    this.Xwt = t => {
      this.Wwt = t;
      this.Vwt.SetInteractive(t !== this.Hwt.MaxValue);
      this.Fwt.SetInteractive(t !== this.Hwt.MinValue);
      this.GetButton(7).SetSelfInteractive(t !== this.Hwt.MaxValue);
      var i = this.Pe.GetExchangeTableText?.(t);
      if (i) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.jwt, i.TextKey, ...i.Params);
      }
      this.Pe.ValueChangeFunction?.(t);
    };
    this.$wt = () => {
      this.Hwt.SetValue(this.Wwt - 1, true);
    };
    this.Ywt = () => {
      this.Hwt.SetValue(this.Wwt + 1, true);
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIText], [4, UE.UISliderComponent], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[7, this.Qwt]];
  }
  OnStart() {
    this.Hwt = this.GetSlider(4);
    this.Hwt.OnValueChangeCb.Bind(this.Xwt);
    this.Fwt = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(0), 1, this.$wt);
    this.Vwt = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(1), 1, this.Ywt);
    this.jwt = this.GetText(5);
    this.Wwt = 1;
    this.Fwt.ShouldPlayLongPressSound = true;
    this.Vwt.ShouldPlayLongPressSound = true;
  }
  OnBeforeDestroy() {
    this.Hwt.OnValueChangeCb.Unbind();
    this.Vwt.ShouldPlayLongPressSound = false;
    this.Fwt.ShouldPlayLongPressSound = false;
    this.Fwt.Clear();
    this.Vwt.Clear();
  }
  Jwt() {
    var t = this.GetText(2);
    var i = this.GetText(3);
    var s = this.GetIfLimit();
    var e = s ? 0 : 1;
    t.SetText(e.toString());
    i.SetText(this.BY.toString());
    this.Hwt.SetMaxValue(this.BY, false);
    this.Hwt.SetMinValue(e, false);
    this.Hwt.SetValue(1, false);
    this.Xwt(1);
    this.SetComponentLimitState(s);
  }
  SetMaxBtnShowState(t) {
    this.GetButton(7)?.RootUIComp.SetUIActive(t);
  }
  GetIfLimit() {
    return this.BY <= 1;
  }
  GetIfSelectMax() {
    return this.Wwt === this.BY;
  }
  SelectMax() {
    this.Hwt.SetValue(this.BY, false);
    this.Xwt(this.BY);
  }
  SetNumberSelectTipsText(t) {
    this.jwt.SetText(t);
  }
  SetNumberSelectTipsVisible(t) {
    this.jwt.SetUIActive(t);
  }
  SetComponentLimitState(t) {
    this.SetMinTextShowState(!t);
    this.GetItem(6).SetRaycastTarget(!t);
    this.Hwt.SetSelfInteractive(!t);
    this.SetAddReduceButtonActive(!t);
  }
  SetMinTextShowState(t) {
    this.GetText(2).SetUIActive(t);
  }
  SetAddReduceButtonActive(t) {
    this.Fwt.SetActive(t);
    this.Vwt.SetActive(t);
  }
  SetAddReduceButtonInteractive(t) {
    this.SetAddButtonInteractive(t);
    this.SetReduceButtonInteractive(t);
  }
  SetAddButtonInteractive(t) {
    this.GetButton(1).SetSelfInteractive(t);
  }
  SetReduceButtonInteractive(t) {
    this.GetButton(0).SetSelfInteractive(t);
  }
  Init(t) {
    this.Pe = t;
    this.Refresh(this.Pe.MaxNumber);
  }
  GetSelectNumber() {
    return this.Wwt;
  }
  SetLimitMaxValue(t) {
    this.Kwt = Math.min(t, MAX_VALUE);
  }
  SetLimitMaxValueForce(t) {
    this.Kwt = t;
  }
  ResetLimitMaxValue() {
    this.Kwt = MAX_VALUE;
  }
  SetMinValue(t) {
    this.bY = t;
  }
  Refresh(t) {
    this.BY = MathUtils_1.MathUtils.Clamp(t, this.bY, this.Kwt);
    this.Jwt();
  }
  ChangeValue(t) {
    this.Hwt.SetValue(t, false);
    this.Xwt(t);
  }
}
exports.NumberSelectComponent = NumberSelectComponent;
//# sourceMappingURL=NumberSelectComponent.js.map