"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCdRefreshRule = undefined;
class FbCdRefreshRule {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.zDh = false;
    this.JDh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCdRefreshRule(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Cd() {
    if (!this.zDh) {
      this.zDh = true;
      this.JDh = this.FbDataInternal.cd();
    }
    return this.JDh;
  }
}
exports.FbCdRefreshRule = FbCdRefreshRule;
//# sourceMappingURL=FbCdRefreshRule.js.map