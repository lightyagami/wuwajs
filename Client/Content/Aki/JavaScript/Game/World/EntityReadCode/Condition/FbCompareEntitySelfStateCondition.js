"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareEntitySelfStateCondition = undefined;
class FbCompareEntitySelfStateCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Bch = false;
    this.Cbo = undefined;
    this._ch = false;
    this.cch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCompareEntitySelfStateCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
}
exports.FbCompareEntitySelfStateCondition = FbCompareEntitySelfStateCondition;
//# sourceMappingURL=FbCompareEntitySelfStateCondition.js.map