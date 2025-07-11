"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCommonTipGeneralFloatingTip = undefined;
class FbCommonTipGeneralFloatingTip {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._yh = false;
    this.cyh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCommonTipGeneralFloatingTip(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TidMainText() {
    if (!this._yh) {
      this._yh = true;
      this.cyh = this.FbDataInternal.tidMainText();
    }
    return this.cyh;
  }
}
exports.FbCommonTipGeneralFloatingTip = FbCommonTipGeneralFloatingTip;
//# sourceMappingURL=FbCommonTipGeneralFloatingTip.js.map