"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFollowShooterComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbEntityCategory_1 = require("./FbEntityCategory");
class FbFollowShooterComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.bSh = false;
    this.TAe = undefined;
    this.bK_ = false;
    this.LK_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFollowShooterComponent(t);
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
      this.TAe = this.FbDataInternal.config();
    }
    return this.TAe;
  }
  get LockableCategories() {
    if (!this.bK_) {
      this.bK_ = true;
      this.LK_ = new Array();
      var e = this.FbDataInternal.lockableCategoriesLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var o = this.FbDataInternal.lockableCategories(t, new fb_component_1.EntityCategory());
          this.LK_.push(FbEntityCategory_1.FbEntityCategory.Create(o));
        }
      }
    }
    return this.LK_;
  }
}
exports.FbFollowShooterComponent = FbFollowShooterComponent;
//# sourceMappingURL=FbFollowShooterComponent.js.map