"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLetGoDestroyCondition = undefined;
class FbLetGoDestroyCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLetGoDestroyCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
}
exports.FbLetGoDestroyCondition = FbLetGoDestroyCondition;
//# sourceMappingURL=FbLetGoDestroyCondition.js.map