"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCommonTipMissionComplete = undefined;
class FbCommonTipMissionComplete {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._yh = false;
    this.cyh = undefined;
    this.uyh = false;
    this.dyh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCommonTipMissionComplete(t);
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
  get TidSubText() {
    if (!this.uyh) {
      this.uyh = true;
      this.dyh = this.FbDataInternal.tidSubText();
    }
    return this.dyh;
  }
}
exports.FbCommonTipMissionComplete = FbCommonTipMissionComplete;
//# sourceMappingURL=FbCommonTipMissionComplete.js.map