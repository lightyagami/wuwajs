"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityEventCondition = undefined;
class FbEntityEventCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.Bch = false;
    this.Cbo = undefined;
    this.azh = false;
    this.hzh = false;
    this.$ph = false;
    this.Xph = false;
  }
  static Create(t) {
    if (t) {
      return new FbEntityEventCondition(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get IsDead() {
    if (!this.azh) {
      this.azh = true;
      this.hzh = this.FbDataInternal.isDead();
    }
    return this.hzh;
  }
  get IsLocked() {
    if (!this.$ph) {
      this.$ph = true;
      this.Xph = this.FbDataInternal.isLocked();
    }
    return this.Xph;
  }
}
exports.FbEntityEventCondition = FbEntityEventCondition;
//# sourceMappingURL=FbEntityEventCondition.js.map