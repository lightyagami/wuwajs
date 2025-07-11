"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOnHitCondition = undefined;
class FbOnHitCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.p0h = false;
    this.nXs = 0;
  }
  static Create(t) {
    if (t) {
      return new FbOnHitCondition(t);
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
exports.FbOnHitCondition = FbOnHitCondition;
//# sourceMappingURL=FbOnHitCondition.js.map