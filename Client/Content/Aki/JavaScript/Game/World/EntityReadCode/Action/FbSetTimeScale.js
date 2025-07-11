"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetTimeScale = undefined;
const UnionSetTimeScaleHelper_1 = require("./UnionSetTimeScaleHelper");
class FbSetTimeScale {
  constructor(e) {
    this.FbDataInternal = e;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbSetTimeScale(e);
    }
  }
  get Config() {
    var e;
    var t;
    if (!this.bSh && (this.bSh = true, e = this.FbDataInternal.configType(), t = UnionSetTimeScaleHelper_1.UnionSetTimeScaleHelper.GetUnionSetTimeScaleObject(e))) {
      this.TAe = UnionSetTimeScaleHelper_1.UnionSetTimeScaleHelper.ReadUnionSetTimeScale(e, this.FbDataInternal.config(t));
    }
    return this.TAe;
  }
}
exports.FbSetTimeScale = FbSetTimeScale;
//# sourceMappingURL=FbSetTimeScale.js.map