"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDynamicPortalConfig = undefined;
class FbDynamicPortalConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.DKh = false;
    this.BKh = undefined;
    this.q$h = false;
    this.k$h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDynamicPortalConfig(t);
    }
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
exports.FbDynamicPortalConfig = FbDynamicPortalConfig;
//# sourceMappingURL=FbDynamicPortalConfig.js.map