"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDynamicPortal = undefined;
const FbPortalRenderConfig_1 = require("./FbPortalRenderConfig");
class FbDynamicPortal {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.DKh = false;
    this.BKh = undefined;
    this.qKh = false;
    this.kKh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDynamicPortal(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get PortalModel() {
    if (!this.DKh) {
      this.DKh = true;
      this.BKh = this.FbDataInternal.portalModel();
    }
    return this.BKh;
  }
  get RenderConfig() {
    if (!this.qKh) {
      this.qKh = true;
      this.kKh = FbPortalRenderConfig_1.FbPortalRenderConfig.Create(this.FbDataInternal.renderConfig());
    }
    return this.kKh;
  }
}
exports.FbDynamicPortal = FbDynamicPortal;
//# sourceMappingURL=FbDynamicPortal.js.map