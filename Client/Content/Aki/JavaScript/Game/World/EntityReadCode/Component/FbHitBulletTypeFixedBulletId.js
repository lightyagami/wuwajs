"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHitBulletTypeFixedBulletId = undefined;
class FbHitBulletTypeFixedBulletId {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.p0h = false;
    this.nXs = undefined;
    this.nOh = false;
    this.sOh = false;
  }
  static Create(t) {
    if (t) {
      return new FbHitBulletTypeFixedBulletId(t);
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
      this.nXs = new Array();
      var i = this.FbDataInternal.bulletIdLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.nXs.push(Number(this.FbDataInternal.bulletId(t) ?? 0));
        }
      }
    }
    return this.nXs;
  }
  get PlayerAttack() {
    if (!this.nOh) {
      this.nOh = true;
      this.sOh = this.FbDataInternal.playerAttack();
    }
    return this.sOh;
  }
}
exports.FbHitBulletTypeFixedBulletId = FbHitBulletTypeFixedBulletId;
//# sourceMappingURL=FbHitBulletTypeFixedBulletId.js.map