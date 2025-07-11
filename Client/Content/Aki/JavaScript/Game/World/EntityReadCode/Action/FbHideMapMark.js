"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHideMapMark = undefined;
class FbHideMapMark {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.yLh = false;
    this.SLh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbHideMapMark(t);
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
}
exports.FbHideMapMark = FbHideMapMark;
//# sourceMappingURL=FbHideMapMark.js.map