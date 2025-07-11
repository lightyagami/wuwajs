"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRenderFlag = undefined;
class FbRenderFlag {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Jch = false;
    this.l7 = false;
  }
  static Create(t) {
    if (t) {
      return new FbRenderFlag(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Enable() {
    if (!this.Jch) {
      this.Jch = true;
      this.l7 = this.FbDataInternal.enable();
    }
    return this.l7;
  }
}
exports.FbRenderFlag = FbRenderFlag;
//# sourceMappingURL=FbRenderFlag.js.map