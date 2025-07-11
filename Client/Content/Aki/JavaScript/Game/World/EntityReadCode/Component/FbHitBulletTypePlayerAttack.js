"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHitBulletTypePlayerAttack = undefined;
class FbHitBulletTypePlayerAttack {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHitBulletTypePlayerAttack(t);
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
exports.FbHitBulletTypePlayerAttack = FbHitBulletTypePlayerAttack;
//# sourceMappingURL=FbHitBulletTypePlayerAttack.js.map