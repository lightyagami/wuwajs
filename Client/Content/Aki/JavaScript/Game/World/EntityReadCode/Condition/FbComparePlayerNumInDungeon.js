"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbComparePlayerNumInDungeon = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbComparePlayerNumInDungeon {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.OJh = false;
    this.FJh = undefined;
    this.KJh = false;
    this.$Jh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbComparePlayerNumInDungeon(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CompareType() {
    if (!this.OJh) {
      this.OJh = true;
      this.FJh = this.FbDataInternal.compareType();
    }
    return this.FJh;
  }
  get CompareValue() {
    var e;
    var t;
    if (!this.KJh && (this.KJh = true, e = this.FbDataInternal.compareValueType(), t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(e))) {
      this.$Jh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(e, this.FbDataInternal.compareValue(t));
    }
    return this.$Jh;
  }
}
exports.FbComparePlayerNumInDungeon = FbComparePlayerNumInDungeon;
//# sourceMappingURL=FbComparePlayerNumInDungeon.js.map