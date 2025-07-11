"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHeadStateViewConfig = undefined;
class FbHeadStateViewConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.uUh = false;
    this.dUh = undefined;
    this.mUh = false;
    this.CUh = 0;
    this.gUh = false;
    this.fUh = 0;
    this.pUh = false;
    this.vUh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHeadStateViewConfig(t);
    }
  }
  get HeadStateViewType() {
    if (!this.uUh) {
      this.uUh = true;
      this.dUh = this.FbDataInternal.headStateViewType();
    }
    return this.dUh;
  }
  get ZOffset() {
    if (!this.mUh) {
      this.mUh = true;
      this.CUh = this.FbDataInternal.zOffset();
    }
    return this.CUh;
  }
  get ForwardOffset() {
    if (!this.gUh) {
      this.gUh = true;
      this.fUh = this.FbDataInternal.forwardOffset();
    }
    return this.fUh;
  }
  get HeadStateSocketName() {
    if (!this.pUh) {
      this.pUh = true;
      this.vUh = this.FbDataInternal.headStateSocketName();
    }
    return this.vUh;
  }
}
exports.FbHeadStateViewConfig = FbHeadStateViewConfig;
//# sourceMappingURL=FbHeadStateViewConfig.js.map