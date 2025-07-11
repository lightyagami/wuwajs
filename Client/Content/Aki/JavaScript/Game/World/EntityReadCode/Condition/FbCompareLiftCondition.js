"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareLiftCondition = undefined;
class FbCompareLiftCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.tIh = false;
    this.iIh = false;
    this.a_h = false;
    this.I9o = 0;
    this._ch = false;
    this.cch = undefined;
    this.rIh = false;
    this.oIh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCompareLiftCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get IsSelf() {
    if (!this.tIh) {
      this.tIh = true;
      this.iIh = this.FbDataInternal.isSelf();
    }
    return this.iIh;
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
  get Location() {
    if (!this.rIh) {
      this.rIh = true;
      this.oIh = this.FbDataInternal.location();
    }
    return this.oIh;
  }
}
exports.FbCompareLiftCondition = FbCompareLiftCondition;
//# sourceMappingURL=FbCompareLiftCondition.js.map