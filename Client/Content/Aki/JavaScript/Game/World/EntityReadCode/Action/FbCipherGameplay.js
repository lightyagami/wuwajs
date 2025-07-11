"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCipherGameplay = undefined;
class FbCipherGameplay {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.CIh = false;
    this.gIh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCipherGameplay(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CipherId() {
    if (!this.CIh) {
      this.CIh = true;
      this.gIh = this.FbDataInternal.cipherId();
    }
    return this.gIh;
  }
}
exports.FbCipherGameplay = FbCipherGameplay;
//# sourceMappingURL=FbCipherGameplay.js.map