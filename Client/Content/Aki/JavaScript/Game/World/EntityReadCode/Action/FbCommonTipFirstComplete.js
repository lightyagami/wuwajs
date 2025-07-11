"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCommonTipFirstComplete = undefined;
class FbCommonTipFirstComplete {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.myh = false;
    this.Cyh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCommonTipFirstComplete(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TidText() {
    if (!this.myh) {
      this.myh = true;
      this.Cyh = this.FbDataInternal.tidText();
    }
    return this.Cyh;
  }
}
exports.FbCommonTipFirstComplete = FbCommonTipFirstComplete;
//# sourceMappingURL=FbCommonTipFirstComplete.js.map