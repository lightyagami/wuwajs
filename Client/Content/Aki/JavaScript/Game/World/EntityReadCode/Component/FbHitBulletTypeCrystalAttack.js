"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHitBulletTypeCrystalAttack = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbHitBulletTypeCrystalAttack {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.rOh = false;
    this.oOh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHitBulletTypeCrystalAttack(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TrackOffset() {
    if (!this.rOh) {
      this.rOh = true;
      this.oOh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.trackOffset());
    }
    return this.oOh;
  }
}
exports.FbHitBulletTypeCrystalAttack = FbHitBulletTypeCrystalAttack;
//# sourceMappingURL=FbHitBulletTypeCrystalAttack.js.map