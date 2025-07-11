"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLocationSafetyComponent = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbLocationSafetyComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.sXh = false;
    this.aXh = undefined;
    this.HVh = false;
    this.WVh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLocationSafetyComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get DetectionFrequency() {
    if (!this.sXh) {
      this.sXh = true;
      this.aXh = this.FbDataInternal.detectionFrequency();
    }
    return this.aXh;
  }
  get SafeLocation() {
    if (!this.HVh) {
      this.HVh = true;
      this.WVh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.safeLocation());
    }
    return this.WVh;
  }
}
exports.FbLocationSafetyComponent = FbLocationSafetyComponent;
//# sourceMappingURL=FbLocationSafetyComponent.js.map