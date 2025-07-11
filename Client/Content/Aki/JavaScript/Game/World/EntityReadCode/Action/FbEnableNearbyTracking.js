"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnableNearbyTracking = undefined;
const UnionControlTrackingTypeHelper_1 = require("./UnionControlTrackingTypeHelper");
class FbEnableNearbyTracking {
  constructor(e) {
    this.FbDataInternal = e;
    this.Dch = false;
    this.bSo = false;
    this.byh = false;
    this.Lyh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbEnableNearbyTracking(e);
    }
  }
  get IsEnable() {
    if (!this.Dch) {
      this.Dch = true;
      this.bSo = this.FbDataInternal.isEnable();
    }
    return this.bSo;
  }
  get ControlType() {
    var e;
    var t;
    if (!this.byh && (this.byh = true, e = this.FbDataInternal.controlTypeType(), t = UnionControlTrackingTypeHelper_1.UnionControlTrackingTypeHelper.GetUnionControlTrackingTypeObject(e))) {
      this.Lyh = UnionControlTrackingTypeHelper_1.UnionControlTrackingTypeHelper.ReadUnionControlTrackingType(e, this.FbDataInternal.controlType(t));
    }
    return this.Lyh;
  }
}
exports.FbEnableNearbyTracking = FbEnableNearbyTracking;
//# sourceMappingURL=FbEnableNearbyTracking.js.map