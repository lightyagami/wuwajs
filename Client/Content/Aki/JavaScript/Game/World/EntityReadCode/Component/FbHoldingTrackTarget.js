"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHoldingTrackTarget = undefined;
class FbHoldingTrackTarget {
  constructor(t) {
    this.FbDataInternal = t;
    this.xEh = false;
    this.REh = undefined;
    this.T2h = false;
    this.b2h = 0;
    this.a_h = false;
    this.I9o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbHoldingTrackTarget(t);
    }
  }
  get EffectPath() {
    if (!this.xEh) {
      this.xEh = true;
      this.REh = this.FbDataInternal.effectPath();
    }
    return this.REh;
  }
  get EffectLength() {
    if (!this.T2h) {
      this.T2h = true;
      this.b2h = this.FbDataInternal.effectLength();
    }
    return this.b2h;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
}
exports.FbHoldingTrackTarget = FbHoldingTrackTarget;
//# sourceMappingURL=FbHoldingTrackTarget.js.map