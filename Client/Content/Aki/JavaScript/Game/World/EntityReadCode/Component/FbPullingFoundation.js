"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPullingFoundation = undefined;
const UnionPullingFoundationHelper_1 = require("./UnionPullingFoundationHelper");
class FbPullingFoundation {
  constructor(i) {
    this.FbDataInternal = i;
    this.q_h = false;
    this.k_h = false;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbPullingFoundation(i);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Config() {
    var i;
    var t;
    if (!this.bSh && (this.bSh = true, i = this.FbDataInternal.configType(), t = UnionPullingFoundationHelper_1.UnionPullingFoundationHelper.GetUnionPullingFoundationObject(i))) {
      this.TAe = UnionPullingFoundationHelper_1.UnionPullingFoundationHelper.ReadUnionPullingFoundation(i, this.FbDataInternal.config(t));
    }
    return this.TAe;
  }
}
exports.FbPullingFoundation = FbPullingFoundation;
//# sourceMappingURL=FbPullingFoundation.js.map