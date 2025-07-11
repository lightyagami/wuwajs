"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareEntityStateCondition = undefined;
class FbCompareEntityStateCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this._ch = false;
    this.cch = undefined;
    this.Bch = false;
    this.Cbo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCompareEntityStateCondition(t);
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
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
}
exports.FbCompareEntityStateCondition = FbCompareEntityStateCondition;
//# sourceMappingURL=FbCompareEntityStateCondition.js.map