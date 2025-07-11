"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAdsorbComponent = undefined;
const FbEntityState_1 = require("./FbEntityState");
class FbAdsorbComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.M_h = false;
    this.E_h = 0;
    this.DVh = false;
    this.BVh = 0;
    this.KEh = false;
    this.$Eh = 0;
    this.qVh = false;
    this.kVh = undefined;
    this.GVh = false;
    this.OVh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbAdsorbComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Range() {
    if (!this.M_h) {
      this.M_h = true;
      this.E_h = this.FbDataInternal.range();
    }
    return this.E_h;
  }
  get StartVelocity() {
    if (!this.DVh) {
      this.DVh = true;
      this.BVh = this.FbDataInternal.startVelocity();
    }
    return this.BVh;
  }
  get Acceleration() {
    if (!this.KEh) {
      this.KEh = true;
      this.$Eh = this.FbDataInternal.acceleration();
    }
    return this.$Eh;
  }
  get ActiveStateCondition() {
    if (!this.qVh) {
      this.qVh = true;
      this.kVh = FbEntityState_1.FbEntityState.Create(this.FbDataInternal.activeStateCondition());
    }
    return this.kVh;
  }
  get AdsorbLimitedTime() {
    if (!this.GVh) {
      this.GVh = true;
      this.OVh = this.FbDataInternal.adsorbLimitedTime();
    }
    return this.OVh;
  }
}
exports.FbAdsorbComponent = FbAdsorbComponent;
//# sourceMappingURL=FbAdsorbComponent.js.map