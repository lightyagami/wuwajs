"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareTeammateDieCondition = undefined;
class FbCompareTeammateDieCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.EJh = false;
    this.IJh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCompareTeammateDieCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get DieCount() {
    if (!this.EJh) {
      this.EJh = true;
      this.IJh = this.FbDataInternal.dieCount();
    }
    return this.IJh;
  }
}
exports.FbCompareTeammateDieCondition = FbCompareTeammateDieCondition;
//# sourceMappingURL=FbCompareTeammateDieCondition.js.map