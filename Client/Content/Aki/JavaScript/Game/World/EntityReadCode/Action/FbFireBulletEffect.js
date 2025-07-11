"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFireBulletEffect = undefined;
class FbFireBulletEffect {
  constructor(t) {
    this.FbDataInternal = t;
    this.tgh = false;
    this.FFe = 0;
    this.Luh = false;
    this.Auh = 0;
    this.xuh = false;
    this.Ruh = 0;
    this.wuh = false;
    this.Puh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbFireBulletEffect(t);
    }
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
  get X() {
    if (!this.Luh) {
      this.Luh = true;
      this.Auh = this.FbDataInternal.x();
    }
    return this.Auh;
  }
  get Y() {
    if (!this.xuh) {
      this.xuh = true;
      this.Ruh = this.FbDataInternal.y();
    }
    return this.Ruh;
  }
  get Z() {
    if (!this.wuh) {
      this.wuh = true;
      this.Puh = this.FbDataInternal.z();
    }
    return this.Puh;
  }
}
exports.FbFireBulletEffect = FbFireBulletEffect;
//# sourceMappingURL=FbFireBulletEffect.js.map