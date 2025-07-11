"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAddTime = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbAddTime {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Fph = false;
    this.Nph = 0;
    this.Ct_ = false;
    this.gt_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAddTime(t);
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
    var t;
    var i;
    if (!this.Ct_ && (this.Ct_ = true, t = this.FbDataInternal.varForTimeType(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.gt_ = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.varForTime(i));
    }
    return this.gt_;
  }
}
exports.FbAddTime = FbAddTime;
//# sourceMappingURL=FbAddTime.js.map