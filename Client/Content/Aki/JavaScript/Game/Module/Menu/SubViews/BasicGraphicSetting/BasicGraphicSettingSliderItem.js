"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicGraphicSettingSliderItem = undefined;
const UE = require("ue");
const LongPressButtonItem_1 = require("../../../Common/Button/LongPressButtonItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MenuTool_1 = require("../../MenuTool");
class BasicGraphicSettingSliderItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.scc = undefined;
    this.acc = undefined;
    this.Hwt = undefined;
    this.hcc = () => {
      var t;
      if (this.Pe) {
        t = MenuTool_1.FunctionItemViewTool.GetActualSliderStep(this.Pe.MenuData, 1);
        t = Math.max(this.Pe.CurValue - t, this.Pe.MinValue);
        this.Hwt.SetValue(t);
      }
    };
    this._o = () => {
      var t;
      if (this.Pe) {
        t = MenuTool_1.FunctionItemViewTool.GetActualSliderStep(this.Pe.MenuData, 1);
        t = Math.min(this.Pe.CurValue + t, this.Pe.MaxValue);
        this.Hwt.SetValue(t);
      }
    };
    this.A2t = t => {
      if (this.Pe) {
        this.Pe.OnChangeValue(t);
        t = MenuTool_1.FunctionItemViewTool.GetSliderDisplayValue(this.Pe.MenuData, t);
        this.GetText(3).SetText(t.toString());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UISliderComponent], [3, UE.UIText], [4, UE.UIText]];
  }
  OnStart() {
    this.scc = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(1), 1, this._o);
    this.acc = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(0), 1, this.hcc);
    this.scc.ShouldPlayLongPressSound = true;
    this.acc.ShouldPlayLongPressSound = true;
    this.Hwt = this.GetSlider(2);
    this.Hwt.OnValueChangeCb.Bind(this.A2t);
  }
  OnBeforeDestroy() {
    this.scc.ShouldPlayLongPressSound = false;
    this.acc.ShouldPlayLongPressSound = false;
    this.scc.Clear();
    this.acc.Clear();
    this.scc = undefined;
    this.acc = undefined;
  }
  Refresh(t, i, s) {
    this.Pe = t;
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(4), t.Title);
    var e = this.GetSlider(2);
    e.SetMaxValue(t.MaxValue, true, false);
    e.SetMinValue(t.MinValue, true, false);
    e.SetValue(t.CurValue);
    var e = MenuTool_1.FunctionItemViewTool.GetSliderDisplayValue(t.MenuData, t.CurValue);
    this.GetText(3).SetText(e.toString());
  }
}
exports.BasicGraphicSettingSliderItem = BasicGraphicSettingSliderItem;
//# sourceMappingURL=BasicGraphicSettingSliderItem.js.map