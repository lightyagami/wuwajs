"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBatchBulletCaster = undefined;
class FbBatchBulletCaster {
  constructor(t) {
    this.FbDataInternal = t;
    this.gXh = false;
    this.fXh = 0;
    this.pXh = false;
    this.vXh = 0;
    this.Gfh = false;
    this.Ofh = 0;
    this.yXh = false;
    this.SXh = 0;
    this.MXh = false;
    this.EXh = 0;
    this.IXh = false;
    this.TXh = 0;
    this.bXh = false;
    this.LXh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbBatchBulletCaster(t);
    }
  }
  get BulletIndex() {
    if (!this.gXh) {
      this.gXh = true;
      this.fXh = this.FbDataInternal.bulletIndex();
    }
    return this.fXh;
  }
  get BulletType() {
    if (!this.pXh) {
      this.pXh = true;
      this.vXh = Number(this.FbDataInternal.bulletType());
    }
    return this.vXh;
  }
  get DelayTime() {
    if (!this.Gfh) {
      this.Gfh = true;
      this.Ofh = this.FbDataInternal.delayTime();
    }
    return this.Ofh;
  }
  get FlyTime() {
    if (!this.yXh) {
      this.yXh = true;
      this.SXh = this.FbDataInternal.flyTime();
    }
    return this.SXh;
  }
  get FlyDistance() {
    if (!this.MXh) {
      this.MXh = true;
      this.EXh = this.FbDataInternal.flyDistance();
    }
    return this.EXh;
  }
  get WarningTime() {
    if (!this.IXh) {
      this.IXh = true;
      this.TXh = this.FbDataInternal.warningTime();
    }
    return this.TXh;
  }
  get WarningWidth() {
    if (!this.bXh) {
      this.bXh = true;
      this.LXh = this.FbDataInternal.warningWidth();
    }
    return this.LXh;
  }
}
exports.FbBatchBulletCaster = FbBatchBulletCaster;
//# sourceMappingURL=FbBatchBulletCaster.js.map