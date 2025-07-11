"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStaticPortal = undefined;
const FbPortalRenderConfig_1 = require("./FbPortalRenderConfig");
class FbStaticPortal {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.DKh = false;
    this.BKh = undefined;
    this.qKh = false;
    this.kKh = undefined;
    this.HKh = false;
    this.WKh = 0;
    this.QKh = false;
    this.KKh = false;
  }
  static Create(t) {
    if (t) {
      return new FbStaticPortal(t);
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
  get LinkPortalEntityId() {
    if (!this.HKh) {
      this.HKh = true;
      this.WKh = this.FbDataInternal.linkPortalEntityId();
    }
    return this.WKh;
  }
  get IsStreamSource() {
    if (!this.QKh) {
      this.QKh = true;
      this.KKh = this.FbDataInternal.isStreamSource();
    }
    return this.KKh;
  }
}
exports.FbStaticPortal = FbStaticPortal;
//# sourceMappingURL=FbStaticPortal.js.map