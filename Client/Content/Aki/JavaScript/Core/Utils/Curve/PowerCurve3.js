"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PowerCurve3 = undefined;
const Log_1 = require("../../Common/Log");
const CurveBase_1 = require("./CurveBase");
class PowerCurve3 extends CurveBase_1.CurveBase {
  constructor(...e) {
    super();
    if (e[this.PJ = 0] < 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 6, "幂函数N值不合法，自动修复为0", ["StartSlope", e[0]]);
      }
      this.PJ = 0;
    } else {
      this.PJ = e[0];
    }
  }
  GetCurrentValueInternal(e) {
    return Math.pow(e, this.PJ);
  }
}
exports.PowerCurve3 = PowerCurve3;
//# sourceMappingURL=PowerCurve3.js.map