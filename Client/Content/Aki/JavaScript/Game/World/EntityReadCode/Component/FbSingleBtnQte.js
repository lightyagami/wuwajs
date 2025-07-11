"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSingleBtnQte = undefined;
const FbQteCallback_1 = require("./FbQteCallback");
class FbSingleBtnQte {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.jYh = false;
    this.HYh = 0;
    this.WYh = false;
    this.QYh = undefined;
    this.KYh = false;
    this.$Yh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSingleBtnQte(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get QteId() {
    if (!this.jYh) {
      this.jYh = true;
      this.HYh = this.FbDataInternal.qteId();
    }
    return this.HYh;
  }
  get SuccessCallback() {
    if (!this.WYh) {
      this.WYh = true;
      this.QYh = FbQteCallback_1.FbQteCallback.Create(this.FbDataInternal.successCallback());
    }
    return this.QYh;
  }
  get FailureCallback() {
    if (!this.KYh) {
      this.KYh = true;
      this.$Yh = FbQteCallback_1.FbQteCallback.Create(this.FbDataInternal.failureCallback());
    }
    return this.$Yh;
  }
}
exports.FbSingleBtnQte = FbSingleBtnQte;
//# sourceMappingURL=FbSingleBtnQte.js.map