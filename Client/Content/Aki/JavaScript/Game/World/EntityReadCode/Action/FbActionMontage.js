"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActionMontage = undefined;
class FbActionMontage {
  constructor(t) {
    this.FbDataInternal = t;
    this.Zdh = false;
    this.emh = undefined;
    this.Hdh = false;
    this.Xdr = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbActionMontage(t);
    }
  }
  get MontageType() {
    if (!this.Zdh) {
      this.Zdh = true;
      this.emh = this.FbDataInternal.montageType();
    }
    return this.emh;
  }
  get Path() {
    if (!this.Hdh) {
      this.Hdh = true;
      this.Xdr = this.FbDataInternal.path();
    }
    return this.Xdr;
  }
}
exports.FbActionMontage = FbActionMontage;
//# sourceMappingURL=FbActionMontage.js.map