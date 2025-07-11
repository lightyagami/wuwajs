"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubicCurve = undefined;
const CurveBase_1 = require("./CurveBase");
class CubicCurve extends CurveBase_1.CurveBase {
  constructor(...e) {
    super();
    this.RJ = 0;
    this.Sl = 0;
    this.UJ = 1;
    this.RJ = (1 - e[0]) * -2;
    this.Sl = (1 - e[0]) * 3;
    this.UJ = e[0];
  }
  GetCurrentValueInternal(e) {
    return ((this.RJ * e + this.Sl) * e + this.UJ) * e;
  }
}
exports.CubicCurve = CubicCurve;
//# sourceMappingURL=CubicCurve.js.map