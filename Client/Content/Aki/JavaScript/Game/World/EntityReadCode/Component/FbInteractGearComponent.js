"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInteractGearComponent = undefined;
class FbInteractGearComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.x6h = false;
    this.R6h = 0;
    this.w6h = false;
    this.P6h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbInteractGearComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get NormalPrepareTime() {
    if (!this.x6h) {
      this.x6h = true;
      this.R6h = this.FbDataInternal.normalPrepareTime();
    }
    return this.R6h;
  }
  get ActivePrepareTime() {
    if (!this.w6h) {
      this.w6h = true;
      this.P6h = this.FbDataInternal.activePrepareTime();
    }
    return this.P6h;
  }
}
exports.FbInteractGearComponent = FbInteractGearComponent;
//# sourceMappingURL=FbInteractGearComponent.js.map