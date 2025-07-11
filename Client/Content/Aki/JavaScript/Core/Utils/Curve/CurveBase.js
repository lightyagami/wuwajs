"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CurveBase = undefined;
const MathUtils_1 = require("../MathUtils");
class CurveBase {
  constructor() {}
  GetCurrentValue(t) {
    return this.GetCurrentValueInternal(MathUtils_1.MathUtils.Clamp(t, 0, 1));
  }
  GetCurrentValueInternal(t) {
    return 0;
  }
  GetOffsetValue(t, e) {
    return this.GetCurrentValue(t + e) - this.GetCurrentValue(t);
  }
  GetOffsetRate(t, e) {
    var r;
    if (t >= 1) {
      return 1;
    } else {
      r = this.GetCurrentValue(t);
      return (this.GetCurrentValue(t + e) - r) / (1 - r);
    }
  }
}
exports.CurveBase = CurveBase;
//# sourceMappingURL=CurveBase.js.map