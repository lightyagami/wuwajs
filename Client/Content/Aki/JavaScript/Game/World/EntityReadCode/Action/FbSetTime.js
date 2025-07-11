"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetTime = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbSetTime {
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
      return new FbSetTime(t);
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
    var e;
    if (!this.Ct_ && (this.Ct_ = true, t = this.FbDataInternal.varForTimeType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.gt_ = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.varForTime(e));
    }
    return this.gt_;
  }
}
exports.FbSetTime = FbSetTime;
//# sourceMappingURL=FbSetTime.js.map