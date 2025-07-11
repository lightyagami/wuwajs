"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckEntityLockedCondition = undefined;
class FbCheckEntityLockedCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Ayh = false;
    this.xyh = undefined;
    this.$ph = false;
    this.Xph = false;
  }
  static Create(t) {
    if (t) {
      return new FbCheckEntityLockedCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Entities() {
    if (!this.Ayh) {
      this.Ayh = true;
      this.xyh = new Array();
      var i = this.FbDataInternal.entitiesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.xyh.push(this.FbDataInternal.entities(t));
        }
      }
    }
    return this.xyh;
  }
  get IsLocked() {
    if (!this.$ph) {
      this.$ph = true;
      this.Xph = this.FbDataInternal.isLocked();
    }
    return this.Xph;
  }
}
exports.FbCheckEntityLockedCondition = FbCheckEntityLockedCondition;
//# sourceMappingURL=FbCheckEntityLockedCondition.js.map