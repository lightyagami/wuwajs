"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeEntityStateDirectly = undefined;
class FbChangeEntityStateDirectly {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.Bch = false;
    this.Cbo = undefined;
    this.Gch = false;
    this.Och = false;
  }
  static Create(t) {
    if (t) {
      return new FbChangeEntityStateDirectly(t);
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
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get DelayChange() {
    if (!this.Gch) {
      this.Gch = true;
      this.Och = this.FbDataInternal.delayChange();
    }
    return this.Och;
  }
}
exports.FbChangeEntityStateDirectly = FbChangeEntityStateDirectly;
//# sourceMappingURL=FbChangeEntityStateDirectly.js.map