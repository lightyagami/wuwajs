"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleControlConfig = undefined;
class FbTeleControlConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.mLh = false;
    this.CLh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTeleControlConfig(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TeleControlType() {
    if (!this.mLh) {
      this.mLh = true;
      this.CLh = this.FbDataInternal.teleControlType();
    }
    return this.CLh;
  }
}
exports.FbTeleControlConfig = FbTeleControlConfig;
//# sourceMappingURL=FbTeleControlConfig.js.map