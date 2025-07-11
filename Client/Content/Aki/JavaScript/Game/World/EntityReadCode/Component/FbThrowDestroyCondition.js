"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbThrowDestroyCondition = undefined;
class FbThrowDestroyCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Gfh = false;
    this.Ofh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbThrowDestroyCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get DelayTime() {
    if (!this.Gfh) {
      this.Gfh = true;
      this.Ofh = this.FbDataInternal.delayTime();
    }
    return this.Ofh;
  }
}
exports.FbThrowDestroyCondition = FbThrowDestroyCondition;
//# sourceMappingURL=FbThrowDestroyCondition.js.map