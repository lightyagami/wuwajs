"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSelfVarRef = undefined;
class FbSelfVarRef {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.bZh = false;
    this.LZh = undefined;
    this.x_h = false;
    this.FGi = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSelfVarRef(t);
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
  get Name() {
    if (!this.x_h) {
      this.x_h = true;
      this.FGi = this.FbDataInternal.name();
    }
    return this.FGi;
  }
}
exports.FbSelfVarRef = FbSelfVarRef;
//# sourceMappingURL=FbSelfVarRef.js.map