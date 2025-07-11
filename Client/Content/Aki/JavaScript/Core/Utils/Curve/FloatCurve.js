"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatCurve = undefined;
const CurveBase_1 = require("./CurveBase");
class FloatCurve extends CurveBase_1.CurveBase {
  constructor(e) {
    super();
    this.AJ = undefined;
    this.AJ = e;
  }
  GetCurrentValueInternal(e) {
    return this.AJ.GetFloatValue(e);
  }
  GetCurrentValueByTime(e) {
    return this.AJ.GetFloatValue(e);
  }
}
exports.FloatCurve = FloatCurve;
//# sourceMappingURL=FloatCurve.js.map