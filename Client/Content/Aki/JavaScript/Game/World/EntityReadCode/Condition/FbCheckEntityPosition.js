"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckEntityPosition = undefined;
const UnionRangeHelper_1 = require("../Shape/UnionRangeHelper");
class FbCheckEntityPosition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.M_h = false;
    this.E_h = undefined;
    this.kzh = false;
    this.Gzh = false;
  }
  static Create(t) {
    if (t) {
      return new FbCheckEntityPosition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get Range() {
    var t;
    var i;
    if (!this.M_h && (this.M_h = true, t = this.FbDataInternal.rangeType(), i = UnionRangeHelper_1.UnionRangeHelper.GetUnionRangeObject(t))) {
      this.E_h = UnionRangeHelper_1.UnionRangeHelper.ReadUnionRange(t, this.FbDataInternal.range(i));
    }
    return this.E_h;
  }
  get IsOnRange() {
    if (!this.kzh) {
      this.kzh = true;
      this.Gzh = this.FbDataInternal.isOnRange();
    }
    return this.Gzh;
  }
}
exports.FbCheckEntityPosition = FbCheckEntityPosition;
//# sourceMappingURL=FbCheckEntityPosition.js.map