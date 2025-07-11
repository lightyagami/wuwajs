"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGravityFlipComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbGravityFlipConfig_1 = require("./FbGravityFlipConfig");
class FbGravityFlipComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.bSh = false;
    this.TAe = undefined;
    this._Q_ = false;
    this.cQ_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbGravityFlipComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Config() {
    if (!this.bSh) {
      this.bSh = true;
      this.TAe = new Array();
      var i = this.FbDataInternal.configLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.config(t, new fb_component_1.GravityFlipConfig());
          this.TAe.push(FbGravityFlipConfig_1.FbGravityFlipConfig.Create(s));
        }
      }
    }
    return this.TAe;
  }
  get DefaultGravity() {
    if (!this._Q_) {
      this._Q_ = true;
      this.cQ_ = this.FbDataInternal.defaultGravity();
    }
    return this.cQ_;
  }
}
exports.FbGravityFlipComponent = FbGravityFlipComponent;
//# sourceMappingURL=FbGravityFlipComponent.js.map