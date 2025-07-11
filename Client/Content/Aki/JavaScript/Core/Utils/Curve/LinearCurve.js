"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinearCurve = undefined;
const CurveBase_1 = require("./CurveBase");
class LinearCurve extends CurveBase_1.CurveBase {
  GetCurrentValueInternal(e) {
    return e;
  }
}
exports.LinearCurve = LinearCurve;
//# sourceMappingURL=LinearCurve.js.map