"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInteractPlayerDiractionToLeisure = undefined;
class FbInteractPlayerDiractionToLeisure {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.kDh = false;
    this.GDh = 0;
    this.ODh = false;
    this.FDh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbInteractPlayerDiractionToLeisure(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Begin() {
    if (!this.kDh) {
      this.kDh = true;
      this.GDh = this.FbDataInternal.begin();
    }
    return this.GDh;
  }
  get End() {
    if (!this.ODh) {
      this.ODh = true;
      this.FDh = this.FbDataInternal.end();
    }
    return this.FDh;
  }
}
exports.FbInteractPlayerDiractionToLeisure = FbInteractPlayerDiractionToLeisure;
//# sourceMappingURL=FbInteractPlayerDiractionToLeisure.js.map