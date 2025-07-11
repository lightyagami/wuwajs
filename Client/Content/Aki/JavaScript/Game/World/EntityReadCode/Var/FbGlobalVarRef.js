"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGlobalVarRef = undefined;
class FbGlobalVarRef {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.bZh = false;
    this.LZh = undefined;
    this.AZh = false;
    this.xZh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbGlobalVarRef(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Source() {
    if (!this.bZh) {
      this.bZh = true;
      this.LZh = this.FbDataInternal.source();
    }
    return this.LZh;
  }
  get Keyword() {
    if (!this.AZh) {
      this.AZh = true;
      this.xZh = this.FbDataInternal.keyword();
    }
    return this.xZh;
  }
}
exports.FbGlobalVarRef = FbGlobalVarRef;
//# sourceMappingURL=FbGlobalVarRef.js.map