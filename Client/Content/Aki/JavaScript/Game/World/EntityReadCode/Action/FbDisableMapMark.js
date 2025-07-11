"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDisableMapMark = undefined;
class FbDisableMapMark {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.yLh = false;
    this.SLh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbDisableMapMark(t);
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
exports.FbDisableMapMark = FbDisableMapMark;
//# sourceMappingURL=FbDisableMapMark.js.map