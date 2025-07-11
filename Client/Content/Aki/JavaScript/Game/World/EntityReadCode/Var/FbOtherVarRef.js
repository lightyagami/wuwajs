"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOtherVarRef = undefined;
class FbOtherVarRef {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.bZh = false;
    this.LZh = undefined;
    this.RZh = false;
    this.wZh = undefined;
    this.PZh = false;
    this.UZh = 0;
    this.x_h = false;
    this.FGi = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbOtherVarRef(t);
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
  get RefType() {
    if (!this.RZh) {
      this.RZh = true;
      this.wZh = this.FbDataInternal.refType();
    }
    return this.wZh;
  }
  get RefId() {
    if (!this.PZh) {
      this.PZh = true;
      this.UZh = this.FbDataInternal.refId();
    }
    return this.UZh;
  }
  get Name() {
    if (!this.x_h) {
      this.x_h = true;
      this.FGi = this.FbDataInternal.name();
    }
    return this.FGi;
  }
}
exports.FbOtherVarRef = FbOtherVarRef;
//# sourceMappingURL=FbOtherVarRef.js.map