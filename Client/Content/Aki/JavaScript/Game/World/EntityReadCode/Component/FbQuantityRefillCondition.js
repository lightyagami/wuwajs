"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbQuantityRefillCondition = undefined;
class FbQuantityRefillCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Zqh = false;
    this.ekh = 0;
    this.h1_ = false;
    this.l1_ = 0;
  }
  static Create(t) {
    if (t) {
      return new FbQuantityRefillCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Quantity() {
    if (!this.Zqh) {
      this.Zqh = true;
      this.ekh = this.FbDataInternal.quantity();
    }
    return this.ekh;
  }
  get DelayRefill() {
    if (!this.h1_) {
      this.h1_ = true;
      this.l1_ = this.FbDataInternal.delayRefill();
    }
    return this.l1_;
  }
}
exports.FbQuantityRefillCondition = FbQuantityRefillCondition;
//# sourceMappingURL=FbQuantityRefillCondition.js.map