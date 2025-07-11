"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNearbyTrackingComponent = undefined;
const UnionNearbyTrackingHelper_1 = require("./UnionNearbyTrackingHelper");
class FbNearbyTrackingComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Dch = false;
    this.bSo = false;
    this.pjh = false;
    this.vjh = false;
    this.yjh = false;
    this.Sjh = false;
    this.Mjh = false;
    this.Ejh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNearbyTrackingComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get IsEnable() {
    if (!this.Dch) {
      this.Dch = true;
      this.bSo = this.FbDataInternal.isEnable();
    }
    return this.bSo;
  }
  get IsEnableWhileUnlock() {
    if (!this.pjh) {
      this.pjh = true;
      this.vjh = this.FbDataInternal.isEnableWhileUnlock();
    }
    return this.vjh;
  }
  get IsEnbaleWhileHoming() {
    if (!this.yjh) {
      this.yjh = true;
      this.Sjh = this.FbDataInternal.isEnbaleWhileHoming();
    }
    return this.Sjh;
  }
  get TrackingType() {
    var t;
    var i;
    if (!this.Mjh && (this.Mjh = true, t = this.FbDataInternal.trackingTypeType(), i = UnionNearbyTrackingHelper_1.UnionNearbyTrackingHelper.GetUnionNearbyTrackingObject(t))) {
      this.Ejh = UnionNearbyTrackingHelper_1.UnionNearbyTrackingHelper.ReadUnionNearbyTracking(t, this.FbDataInternal.trackingType(i));
    }
    return this.Ejh;
  }
}
exports.FbNearbyTrackingComponent = FbNearbyTrackingComponent;
//# sourceMappingURL=FbNearbyTrackingComponent.js.map