"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareAlertValue = undefined;
const UnionComparedAlertValueHelper_1 = require("./UnionComparedAlertValueHelper");
class FbCompareAlertValue {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Yph = false;
    this.zph = 0;
    this.OJh = false;
    this.FJh = undefined;
    this.KJh = false;
    this.$Jh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCompareAlertValue(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get AreaId() {
    if (!this.Yph) {
      this.Yph = true;
      this.zph = this.FbDataInternal.areaId();
    }
    return this.zph;
  }
  get CompareType() {
    if (!this.OJh) {
      this.OJh = true;
      this.FJh = this.FbDataInternal.compareType();
    }
    return this.FJh;
  }
  get CompareValue() {
    var t;
    var e;
    if (!this.KJh && (this.KJh = true, t = this.FbDataInternal.compareValueType(), e = UnionComparedAlertValueHelper_1.UnionComparedAlertValueHelper.GetUnionComparedAlertValueObject(t))) {
      this.$Jh = UnionComparedAlertValueHelper_1.UnionComparedAlertValueHelper.ReadUnionComparedAlertValue(t, this.FbDataInternal.compareValue(e));
    }
    return this.$Jh;
  }
}
exports.FbCompareAlertValue = FbCompareAlertValue;
//# sourceMappingURL=FbCompareAlertValue.js.map