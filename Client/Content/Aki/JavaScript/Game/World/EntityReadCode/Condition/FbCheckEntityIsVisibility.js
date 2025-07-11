"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckEntityIsVisibility = undefined;
class FbCheckEntityIsVisibility {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.tMh = false;
    this.ASo = false;
  }
  static Create(t) {
    if (t) {
      return new FbCheckEntityIsVisibility(t);
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
  get IsVisible() {
    if (!this.tMh) {
      this.tMh = true;
      this.ASo = this.FbDataInternal.isVisible();
    }
    return this.ASo;
  }
}
exports.FbCheckEntityIsVisibility = FbCheckEntityIsVisibility;
//# sourceMappingURL=FbCheckEntityIsVisibility.js.map