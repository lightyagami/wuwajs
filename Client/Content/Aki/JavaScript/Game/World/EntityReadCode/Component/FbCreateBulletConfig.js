"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCreateBulletConfig = undefined;
class FbCreateBulletConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.p0h = false;
    this.nXs = 0;
    this.sjh = false;
    this.K6o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCreateBulletConfig(t);
    }
  }
  get BulletId() {
    if (!this.p0h) {
      this.p0h = true;
      this.nXs = Number(this.FbDataInternal.bulletId());
    }
    return this.nXs;
  }
  get Delay() {
    if (!this.sjh) {
      this.sjh = true;
      this.K6o = this.FbDataInternal.delay();
    }
    return this.K6o;
  }
}
exports.FbCreateBulletConfig = FbCreateBulletConfig;
//# sourceMappingURL=FbCreateBulletConfig.js.map