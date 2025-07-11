"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMaskTransition = undefined;
const FbEaseData_1 = require("./FbEaseData");
class FbMaskTransition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.I_h = false;
    this.y6o = 0;
    this.hLh = false;
    this.lLh = undefined;
    this._Lh = false;
    this.cLh = undefined;
    this.uLh = false;
    this.dLh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMaskTransition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
  get Mask() {
    if (!this.hLh) {
      this.hLh = true;
      this.lLh = this.FbDataInternal.mask();
    }
    return this.lLh;
  }
  get FadeIn() {
    if (!this._Lh) {
      this._Lh = true;
      this.cLh = FbEaseData_1.FbEaseData.Create(this.FbDataInternal.fadeIn());
    }
    return this.cLh;
  }
  get FadeOut() {
    if (!this.uLh) {
      this.uLh = true;
      this.dLh = FbEaseData_1.FbEaseData.Create(this.FbDataInternal.fadeOut());
    }
    return this.dLh;
  }
}
exports.FbMaskTransition = FbMaskTransition;
//# sourceMappingURL=FbMaskTransition.js.map