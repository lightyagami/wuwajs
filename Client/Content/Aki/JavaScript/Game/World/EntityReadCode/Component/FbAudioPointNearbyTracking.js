"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAudioPointNearbyTracking = undefined;
class FbAudioPointNearbyTracking {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Ijh = false;
    this.Tjh = 0;
    this.bjh = false;
    this.Ljh = 0;
    this.Ajh = false;
    this.xjh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbAudioPointNearbyTracking(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get NearRadius() {
    if (!this.Ijh) {
      this.Ijh = true;
      this.Tjh = this.FbDataInternal.nearRadius();
    }
    return this.Tjh;
  }
  get MiddleRadius() {
    if (!this.bjh) {
      this.bjh = true;
      this.Ljh = this.FbDataInternal.middleRadius();
    }
    return this.Ljh;
  }
  get FarRadius() {
    if (!this.Ajh) {
      this.Ajh = true;
      this.xjh = this.FbDataInternal.farRadius();
    }
    return this.xjh;
  }
}
exports.FbAudioPointNearbyTracking = FbAudioPointNearbyTracking;
//# sourceMappingURL=FbAudioPointNearbyTracking.js.map