"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompassTracking = undefined;
const FbIconNearByTrackingConfig_1 = require("./FbIconNearByTrackingConfig");
class FbCompassTracking {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Rjh = false;
    this.wjh = 0;
    this.Pjh = false;
    this.Ujh = 0;
    this.nJl = false;
    this.sJl = undefined;
    this.t5_ = false;
    this.i5_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCompassTracking(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ShowRange() {
    if (!this.Rjh) {
      this.Rjh = true;
      this.wjh = this.FbDataInternal.showRange();
    }
    return this.wjh;
  }
  get HideRange() {
    if (!this.Pjh) {
      this.Pjh = true;
      this.Ujh = this.FbDataInternal.hideRange();
    }
    return this.Ujh;
  }
  get IconTrackingConfig() {
    if (!this.nJl) {
      this.nJl = true;
      this.sJl = FbIconNearByTrackingConfig_1.FbIconNearByTrackingConfig.Create(this.FbDataInternal.iconTrackingConfig());
    }
    return this.sJl;
  }
  get VehicleTypes() {
    if (!this.t5_) {
      this.t5_ = true;
      this.i5_ = new Array();
      var i = this.FbDataInternal.vehicleTypesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.i5_.push(this.FbDataInternal.vehicleTypes(t));
        }
      }
    }
    return this.i5_;
  }
}
exports.FbCompassTracking = FbCompassTracking;
//# sourceMappingURL=FbCompassTracking.js.map