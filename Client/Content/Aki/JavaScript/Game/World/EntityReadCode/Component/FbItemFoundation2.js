"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbItemFoundation2 = undefined;
const UnionItemFoundationHelper_1 = require("./UnionItemFoundationHelper");
class FbItemFoundation2 {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbItemFoundation2(t);
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
    var t;
    var i;
    if (!this.bSh && (this.bSh = true, t = this.FbDataInternal.configType(), i = UnionItemFoundationHelper_1.UnionItemFoundationHelper.GetUnionItemFoundationObject(t))) {
      this.TAe = UnionItemFoundationHelper_1.UnionItemFoundationHelper.ReadUnionItemFoundation(t, this.FbDataInternal.config(i));
    }
    return this.TAe;
  }
}
exports.FbItemFoundation2 = FbItemFoundation2;
//# sourceMappingURL=FbItemFoundation2.js.map