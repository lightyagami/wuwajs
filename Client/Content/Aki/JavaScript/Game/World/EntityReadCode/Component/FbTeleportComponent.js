"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleportComponent = undefined;
const FbPosA_1 = require("../Action/FbPosA");
const FbGravityFlipTeleportConfig_1 = require("./FbGravityFlipTeleportConfig");
class FbTeleportComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.FVh = false;
    this.NVh = 0;
    this.VVh = false;
    this.jVh = undefined;
    this.yPh = false;
    this.SPh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTeleportComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get TeleporterId() {
    if (!this.FVh) {
      this.FVh = true;
      this.NVh = this.FbDataInternal.teleporterId();
    }
    return this.NVh;
  }
  get TeleportPos() {
    if (!this.VVh) {
      this.VVh = true;
      this.jVh = FbPosA_1.FbPosA.Create(this.FbDataInternal.teleportPos());
    }
    return this.jVh;
  }
  get GravityConfig() {
    if (!this.yPh) {
      this.yPh = true;
      this.SPh = FbGravityFlipTeleportConfig_1.FbGravityFlipTeleportConfig.Create(this.FbDataInternal.gravityConfig());
    }
    return this.SPh;
  }
}
exports.FbTeleportComponent = FbTeleportComponent;
//# sourceMappingURL=FbTeleportComponent.js.map