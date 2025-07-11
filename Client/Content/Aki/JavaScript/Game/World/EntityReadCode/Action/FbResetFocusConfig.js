"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbResetFocusConfig = undefined;
const FbBaseCurve_1 = require("./FbBaseCurve");
class FbResetFocusConfig {
  constructor(s) {
    this.FbDataInternal = s;
    this.mch = false;
    this.Cch = 0;
    this.VIh = false;
    this.jIh = undefined;
  }
  static Create(s) {
    if (s) {
      return new FbResetFocusConfig(s);
    }
  }
  get FadeInTime() {
    if (!this.mch) {
      this.mch = true;
      this.Cch = this.FbDataInternal.fadeInTime();
    }
    return this.Cch;
  }
  get FadeInCurve() {
    if (!this.VIh) {
      this.VIh = true;
      this.jIh = FbBaseCurve_1.FbBaseCurve.Create(this.FbDataInternal.fadeInCurve());
    }
    return this.jIh;
  }
}
exports.FbResetFocusConfig = FbResetFocusConfig;
//# sourceMappingURL=FbResetFocusConfig.js.map