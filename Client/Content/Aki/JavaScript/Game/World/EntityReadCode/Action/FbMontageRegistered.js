"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMontageRegistered = undefined;
const FbMontageId_1 = require("./FbMontageId");
class FbMontageRegistered {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Rfh = false;
    this.wfh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMontageRegistered(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MontageId() {
    if (!this.Rfh) {
      this.Rfh = true;
      this.wfh = FbMontageId_1.FbMontageId.Create(this.FbDataInternal.montageId());
    }
    return this.wfh;
  }
}
exports.FbMontageRegistered = FbMontageRegistered;
//# sourceMappingURL=FbMontageRegistered.js.map