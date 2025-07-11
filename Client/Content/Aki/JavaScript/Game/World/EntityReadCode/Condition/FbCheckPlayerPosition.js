"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckPlayerPosition = undefined;
const UnionRangeHelper_1 = require("../Shape/UnionRangeHelper");
class FbCheckPlayerPosition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.M_h = false;
    this.E_h = undefined;
    this.kzh = false;
    this.Gzh = false;
  }
  static Create(t) {
    if (t) {
      return new FbCheckPlayerPosition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Range() {
    var t;
    var e;
    if (!this.M_h && (this.M_h = true, t = this.FbDataInternal.rangeType(), e = UnionRangeHelper_1.UnionRangeHelper.GetUnionRangeObject(t))) {
      this.E_h = UnionRangeHelper_1.UnionRangeHelper.ReadUnionRange(t, this.FbDataInternal.range(e));
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
exports.FbCheckPlayerPosition = FbCheckPlayerPosition;
//# sourceMappingURL=FbCheckPlayerPosition.js.map