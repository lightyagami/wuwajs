"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFireBullet = undefined;
const UnionFireBulletHelper_1 = require("./UnionFireBulletHelper");
class FbFireBullet {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbFireBullet(e);
    }
  }
  get Type() {
    var e;
    var t;
    if (!this.u_h && (this.u_h = true, e = this.FbDataInternal.typeType(), t = UnionFireBulletHelper_1.UnionFireBulletHelper.GetUnionFireBulletObject(e))) {
      this.f8o = UnionFireBulletHelper_1.UnionFireBulletHelper.ReadUnionFireBullet(e, this.FbDataInternal.type(t));
    }
    return this.f8o;
  }
}
exports.FbFireBullet = FbFireBullet;
//# sourceMappingURL=FbFireBullet.js.map