"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDecalParams = undefined;
class FbDecalParams {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.VZh = false;
    this.jZh = 0;
    this.HZh = false;
    this.WZh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbDecalParams(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get SpreadRadius() {
    if (!this.VZh) {
      this.VZh = true;
      this.jZh = this.FbDataInternal.spreadRadius();
    }
    return this.jZh;
  }
  get SpreadTime() {
    if (!this.HZh) {
      this.HZh = true;
      this.WZh = this.FbDataInternal.spreadTime();
    }
    return this.WZh;
  }
}
exports.FbDecalParams = FbDecalParams;
//# sourceMappingURL=FbDecalParams.js.map