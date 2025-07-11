"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHackManagementComponent = undefined;
class FbHackManagementComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Hd_ = false;
    this.Wd_ = 0;
    this.O7_ = false;
    this.G7_ = 0;
  }
  static Create(t) {
    if (t) {
      return new FbHackManagementComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get MaxHackingCount() {
    if (!this.Hd_) {
      this.Hd_ = true;
      this.Wd_ = this.FbDataInternal.maxHackingCount();
    }
    return this.Wd_;
  }
  get ValidDistance() {
    if (!this.O7_) {
      this.O7_ = true;
      this.G7_ = this.FbDataInternal.validDistance();
    }
    return this.G7_;
  }
}
exports.FbHackManagementComponent = FbHackManagementComponent;
//# sourceMappingURL=FbHackManagementComponent.js.map