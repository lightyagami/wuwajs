"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOpenFishingItemDeliveryWithReturn = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbOpenFishingItemDeliveryWithReturn {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.TJl = false;
    this.bJl = 0;
    this.mxh = false;
    this.Cxh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbOpenFishingItemDeliveryWithReturn(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get PresetId() {
    if (!this.TJl) {
      this.TJl = true;
      this.bJl = this.FbDataInternal.presetId();
    }
    return this.bJl;
  }
  get ReturnVar() {
    var t;
    var e;
    if (!this.mxh && (this.mxh = true, t = this.FbDataInternal.returnVarType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.Cxh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.returnVar(e));
    }
    return this.Cxh;
  }
}
exports.FbOpenFishingItemDeliveryWithReturn = FbOpenFishingItemDeliveryWithReturn;
//# sourceMappingURL=FbOpenFishingItemDeliveryWithReturn.js.map