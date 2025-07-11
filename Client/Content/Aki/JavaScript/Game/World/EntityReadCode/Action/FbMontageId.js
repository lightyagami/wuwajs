"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMontageId = undefined;
class FbMontageId {
  constructor(t) {
    this.FbDataInternal = t;
    this.Rfh = false;
    this.wfh = 0;
    this.$fh = false;
    this.Xfh = false;
  }
  static Create(t) {
    if (t) {
      return new FbMontageId(t);
    }
  }
  get MontageId() {
    if (!this.Rfh) {
      this.Rfh = true;
      this.wfh = this.FbDataInternal.montageId();
    }
    return this.wfh;
  }
  get IsAbp() {
    if (!this.$fh) {
      this.$fh = true;
      this.Xfh = this.FbDataInternal.isAbp();
    }
    return this.Xfh;
  }
}
exports.FbMontageId = FbMontageId;
//# sourceMappingURL=FbMontageId.js.map