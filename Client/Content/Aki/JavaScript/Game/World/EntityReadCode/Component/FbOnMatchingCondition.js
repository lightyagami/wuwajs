"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOnMatchingCondition = undefined;
class FbOnMatchingCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.p0h = false;
    this.nXs = 0;
  }
  static Create(t) {
    if (t) {
      return new FbOnMatchingCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BulletId() {
    if (!this.p0h) {
      this.p0h = true;
      this.nXs = Number(this.FbDataInternal.bulletId());
    }
    return this.nXs;
  }
}
exports.FbOnMatchingCondition = FbOnMatchingCondition;
//# sourceMappingURL=FbOnMatchingCondition.js.map