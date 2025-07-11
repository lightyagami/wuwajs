"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSkiConfig = undefined;
const UnionSkiConfigHelper_1 = require("./UnionSkiConfigHelper");
class FbSkiConfig {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbSkiConfig(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Config() {
    var i;
    var t;
    if (!this.bSh && (this.bSh = true, i = this.FbDataInternal.configType(), t = UnionSkiConfigHelper_1.UnionSkiConfigHelper.GetUnionSkiConfigObject(i))) {
      this.TAe = UnionSkiConfigHelper_1.UnionSkiConfigHelper.ReadUnionSkiConfig(i, this.FbDataInternal.config(t));
    }
    return this.TAe;
  }
}
exports.FbSkiConfig = FbSkiConfig;
//# sourceMappingURL=FbSkiConfig.js.map