"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbShowMapMark = undefined;
class FbShowMapMark {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.yLh = false;
    this.SLh = 0;
    this.MLh = false;
    this.ELh = false;
  }
  static Create(t) {
    if (t) {
      return new FbShowMapMark(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MarkId() {
    if (!this.yLh) {
      this.yLh = true;
      this.SLh = this.FbDataInternal.markId();
    }
    return this.SLh;
  }
  get IsFocusOnFirstShow() {
    if (!this.MLh) {
      this.MLh = true;
      this.ELh = this.FbDataInternal.isFocusOnFirstShow();
    }
    return this.ELh;
  }
}
exports.FbShowMapMark = FbShowMapMark;
//# sourceMappingURL=FbShowMapMark.js.map