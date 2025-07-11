"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbReduceTime = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbReduceTime {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.Fph = false;
    this.Nph = 0;
    this.Ct_ = false;
    this.gt_ = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbReduceTime(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Time() {
    if (!this.Fph) {
      this.Fph = true;
      this.Nph = this.FbDataInternal.time();
    }
    return this.Nph;
  }
  get VarForTime() {
    var e;
    var t;
    if (!this.Ct_ && (this.Ct_ = true, e = this.FbDataInternal.varForTimeType(), t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(e))) {
      this.gt_ = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(e, this.FbDataInternal.varForTime(t));
    }
    return this.gt_;
  }
}
exports.FbReduceTime = FbReduceTime;
//# sourceMappingURL=FbReduceTime.js.map