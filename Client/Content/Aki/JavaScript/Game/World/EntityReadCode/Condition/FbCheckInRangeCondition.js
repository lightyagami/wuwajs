"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckInRangeCondition = undefined;
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
class FbCheckInRangeCondition {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.jAh = false;
    this.HAh = undefined;
    this.SJh = false;
    this.MJh = false;
    this.czh = false;
    this.uzh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbCheckInRangeCondition(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get RangeEntities() {
    if (!this.jAh) {
      this.jAh = true;
      this.HAh = new Array();
      var t = this.FbDataInternal.rangeEntitiesLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          this.HAh.push(this.FbDataInternal.rangeEntities(i));
        }
      }
    }
    return this.HAh;
  }
  get InRange() {
    if (!this.SJh) {
      this.SJh = true;
      this.MJh = this.FbDataInternal.inRange();
    }
    return this.MJh;
  }
  get OnlinePlayerConditionTargetOption() {
    var i;
    var t;
    if (!this.czh && (this.czh = true, i = this.FbDataInternal.onlinePlayerConditionTargetOptionType(), t = UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.GetUnionOnlinePlayerConditionTargetObject(i))) {
      this.uzh = UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.ReadUnionOnlinePlayerConditionTarget(i, this.FbDataInternal.onlinePlayerConditionTargetOption(t));
    }
    return this.uzh;
  }
}
exports.FbCheckInRangeCondition = FbCheckInRangeCondition;
//# sourceMappingURL=FbCheckInRangeCondition.js.map