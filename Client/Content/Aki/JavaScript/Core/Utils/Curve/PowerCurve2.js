"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PowerCurve2 = undefined;
const Log_1 = require("../../Common/Log");
const CurveBase_1 = require("./CurveBase");
class PowerCurve2 extends CurveBase_1.CurveBase {
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
    e = e * 2 - 1;
    return 1 - Math.sign(e) * Math.pow(Math.abs(e), this.PJ);
  }
}
exports.PowerCurve2 = PowerCurve2;
//# sourceMappingURL=PowerCurve2.js.map