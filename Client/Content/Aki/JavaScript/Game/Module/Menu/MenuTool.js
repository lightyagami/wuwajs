"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionItemViewTool = exports.MenuTool = undefined;
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
class MenuTool {
  static GetLanguageDefineData() {
    return LanguageSystem_1.LanguageSystem.GetAllLanguageDefines();
  }
}
exports.MenuTool = MenuTool;
class FunctionItemViewTool {
  static GetSliderPosition(t, e, a = 0) {
    var s = t[0];
    var t = t[1];
    var s = MathUtils_1.MathUtils.GetRangePct(s, t, e);
    return MathUtils_1.MathUtils.GetFloatPointFloor(s * t, a);
  }
  static GetSliderDisplayValue(t, e) {
    var a = t.SliderRange;
    var s = a[0];
    var a = a[1];
    var i = t.SliderRangeDisplay;
    var r = i[0];
    var i = i[1];
    var e = MathUtils_1.MathUtils.RangeClamp(e, s, a, r, i);
    return MathUtils_1.MathUtils.GetRoundToNDecimalPlaces(e, t.SliderDigits);
  }
  static GetActualSliderStep(t, e) {
    var a = t.SliderRange;
    var s = a[0];
    var a = a[1];
    var t = t.SliderRangeDisplay;
    var i = t[0];
    return e / (t[1] - i) * (a - s);
  }
}
exports.FunctionItemViewTool = FunctionItemViewTool;
//# sourceMappingURL=MenuTool.js.map