"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDirectionFill = undefined;
class FbDirectionFill {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.iNh = false;
    this.rNh = false;
    this.oNh = false;
    this.nNh = false;
    this.Uuh = false;
    this.Duh = false;
    this.sNh = false;
    this.aNh = false;
  }
  static Create(t) {
    if (t) {
      return new FbDirectionFill(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get W() {
    if (!this.iNh) {
      this.iNh = true;
      this.rNh = this.FbDataInternal.w();
    }
    return this.rNh;
  }
  get S() {
    if (!this.oNh) {
      this.oNh = true;
      this.nNh = this.FbDataInternal.s();
    }
    return this.nNh;
  }
  get A() {
    if (!this.Uuh) {
      this.Uuh = true;
      this.Duh = this.FbDataInternal.a();
    }
    return this.Duh;
  }
  get D() {
    if (!this.sNh) {
      this.sNh = true;
      this.aNh = this.FbDataInternal.d();
    }
    return this.aNh;
  }
}
exports.FbDirectionFill = FbDirectionFill;
//# sourceMappingURL=FbDirectionFill.js.map