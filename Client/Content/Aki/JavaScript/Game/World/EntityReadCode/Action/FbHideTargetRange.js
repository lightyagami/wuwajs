"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHideTargetRange = undefined;
const UnionHideRangeConfigHelper_1 = require("./UnionHideRangeConfigHelper");
class FbHideTargetRange {
  constructor(i) {
    this.FbDataInternal = i;
    this.ILh = false;
    this.TLh = 0;
    this.JAh = false;
    this.ZAh = undefined;
    this.exh = false;
    this.txh = false;
    this.ixh = false;
    this.rxh = false;
  }
  static Create(i) {
    if (i) {
      return new FbHideTargetRange(i);
    }
  }
  get RangeEntity() {
    if (!this.ILh) {
      this.ILh = true;
      this.TLh = this.FbDataInternal.rangeEntity();
    }
    return this.TLh;
  }
  get HideConfig() {
    var i;
    var t;
    if (!this.JAh && (this.JAh = true, i = this.FbDataInternal.hideConfigType(), t = UnionHideRangeConfigHelper_1.UnionHideRangeConfigHelper.GetUnionHideRangeConfigObject(i))) {
      this.ZAh = UnionHideRangeConfigHelper_1.UnionHideRangeConfigHelper.ReadUnionHideRangeConfig(i, this.FbDataInternal.hideConfig(t));
    }
    return this.ZAh;
  }
  get IsHideSimpleNpc() {
    if (!this.exh) {
      this.exh = true;
      this.txh = this.FbDataInternal.isHideSimpleNpc();
    }
    return this.txh;
  }
  get IsHidePasserByNpc() {
    if (!this.ixh) {
      this.ixh = true;
      this.rxh = this.FbDataInternal.isHidePasserByNpc();
    }
    return this.rxh;
  }
}
exports.FbHideTargetRange = FbHideTargetRange;
//# sourceMappingURL=FbHideTargetRange.js.map