"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLinearOverRangeCameraShake = undefined;
class FbLinearOverRangeCameraShake {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.eAh = false;
    this.tAh = 0;
    this.iAh = false;
    this.rAh = 0;
    this.oAh = false;
    this.nAh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbLinearOverRangeCameraShake(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CenterEntityId() {
    if (!this.eAh) {
      this.eAh = true;
      this.tAh = this.FbDataInternal.centerEntityId();
    }
    return this.tAh;
  }
  get MinRange() {
    if (!this.iAh) {
      this.iAh = true;
      this.rAh = this.FbDataInternal.minRange();
    }
    return this.rAh;
  }
  get MaxRange() {
    if (!this.oAh) {
      this.oAh = true;
      this.nAh = this.FbDataInternal.maxRange();
    }
    return this.nAh;
  }
}
exports.FbLinearOverRangeCameraShake = FbLinearOverRangeCameraShake;
//# sourceMappingURL=FbLinearOverRangeCameraShake.js.map