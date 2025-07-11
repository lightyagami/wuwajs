"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDynamicPortalByBullet = undefined;
const FbDynamicBulletConfig_1 = require("./FbDynamicBulletConfig");
const FbDynamicPortalConfig_1 = require("./FbDynamicPortalConfig");
const FbPortalRenderConfig_1 = require("./FbPortalRenderConfig");
class FbDynamicPortalByBullet {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.b$h = false;
    this.L$h = undefined;
    this.A$h = false;
    this.x$h = undefined;
    this.R$h = false;
    this.w$h = undefined;
    this.qKh = false;
    this.kKh = undefined;
    this.P$h = false;
    this.U$h = undefined;
    this.D$h = false;
    this.B$h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDynamicPortalByBullet(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get PortalA() {
    if (!this.b$h) {
      this.b$h = true;
      this.L$h = FbDynamicPortalConfig_1.FbDynamicPortalConfig.Create(this.FbDataInternal.portalA());
    }
    return this.L$h;
  }
  get PortalB() {
    if (!this.A$h) {
      this.A$h = true;
      this.x$h = FbDynamicPortalConfig_1.FbDynamicPortalConfig.Create(this.FbDataInternal.portalB());
    }
    return this.x$h;
  }
  get InitOpenPortal() {
    if (!this.R$h) {
      this.R$h = true;
      this.w$h = this.FbDataInternal.initOpenPortal();
    }
    return this.w$h;
  }
  get RenderConfig() {
    if (!this.qKh) {
      this.qKh = true;
      this.kKh = FbPortalRenderConfig_1.FbPortalRenderConfig.Create(this.FbDataInternal.renderConfig());
    }
    return this.kKh;
  }
  get TypeA() {
    if (!this.P$h) {
      this.P$h = true;
      this.U$h = FbDynamicBulletConfig_1.FbDynamicBulletConfig.Create(this.FbDataInternal.typeA());
    }
    return this.U$h;
  }
  get TypeB() {
    if (!this.D$h) {
      this.D$h = true;
      this.B$h = FbDynamicBulletConfig_1.FbDynamicBulletConfig.Create(this.FbDataInternal.typeB());
    }
    return this.B$h;
  }
}
exports.FbDynamicPortalByBullet = FbDynamicPortalByBullet;
//# sourceMappingURL=FbDynamicPortalByBullet.js.map