"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInitStateBirth = undefined;
class FbInitStateBirth {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.$Rh = false;
    this.XRh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbInitStateBirth(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BirthTag() {
    if (!this.$Rh) {
      this.$Rh = true;
      this.XRh = this.FbDataInternal.birthTag();
    }
    return this.XRh;
  }
}
exports.FbInitStateBirth = FbInitStateBirth;
//# sourceMappingURL=FbInitStateBirth.js.map