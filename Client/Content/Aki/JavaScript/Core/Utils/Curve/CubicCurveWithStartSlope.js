"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubicCurveWithStartSlope = undefined;
const Log_1 = require("../../Common/Log");
const CurveBase_1 = require("./CurveBase");
class CubicCurveWithStartSlope extends CurveBase_1.CurveBase {
  constructor(...t) {
    super();
    this.RJ = 0;
    this.Sl = 0;
    this.UJ = 1;
    if (t[0] <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 6, "三阶曲线配置的Slope不合法，必须大于0。自动修复为1", ["StartSlope", t[0]]);
      }
      this.RJ = 0;
      this.Sl = 0;
      this.UJ = 1;
    } else {
      this.RJ = t[0] + 1 / t[0] - 2;
      this.Sl = 3 - t[0] * 2 - 1 / t[0];
      this.UJ = t[0];
    }
  }
  GetCurrentValueInternal(t) {
    return ((this.RJ * t + this.Sl) * t + this.UJ) * t;
  }
}
exports.CubicCurveWithStartSlope = CubicCurveWithStartSlope;
//# sourceMappingURL=CubicCurveWithStartSlope.js.map