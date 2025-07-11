"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFireBulletAddBuff = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbFireBulletAddBuff {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.p0h = false;
    this.nXs = 0;
    this.b5h = false;
    this.L5h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFireBulletAddBuff(t);
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
  get BulletOffset() {
    if (!this.b5h) {
      this.b5h = true;
      this.L5h = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.bulletOffset());
    }
    return this.L5h;
  }
}
exports.FbFireBulletAddBuff = FbFireBulletAddBuff;
//# sourceMappingURL=FbFireBulletAddBuff.js.map