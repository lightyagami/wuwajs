"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBlendFunction = undefined;
class FbBlendFunction {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ATh = false;
    this.xTh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbBlendFunction(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BlendExp() {
    if (!this.ATh) {
      this.ATh = true;
      this.xTh = this.FbDataInternal.blendExp();
    }
    return this.xTh;
  }
}
exports.FbBlendFunction = FbBlendFunction;
//# sourceMappingURL=FbBlendFunction.js.map