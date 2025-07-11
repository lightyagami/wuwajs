"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDynamicBulletConfig = undefined;
class FbDynamicBulletConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.p0h = false;
    this.nXs = 0;
    this.DKh = false;
    this.BKh = undefined;
    this.q$h = false;
    this.k$h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDynamicBulletConfig(t);
    }
  }
  get BulletId() {
    if (!this.p0h) {
      this.p0h = true;
      this.nXs = this.FbDataInternal.bulletId();
    }
    return this.nXs;
  }
  get PortalModel() {
    if (!this.DKh) {
      this.DKh = true;
      this.BKh = this.FbDataInternal.portalModel();
    }
    return this.BKh;
  }
  get TemplateId() {
    if (!this.q$h) {
      this.q$h = true;
      this.k$h = this.FbDataInternal.templateId();
    }
    return this.k$h;
  }
}
exports.FbDynamicBulletConfig = FbDynamicBulletConfig;
//# sourceMappingURL=FbDynamicBulletConfig.js.map