"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckPlayerGender = undefined;
class FbCheckPlayerGender {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.Azh = false;
    this.xzh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbCheckPlayerGender(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Gender() {
    if (!this.Azh) {
      this.Azh = true;
      this.xzh = this.FbDataInternal.gender();
    }
    return this.xzh;
  }
}
exports.FbCheckPlayerGender = FbCheckPlayerGender;
//# sourceMappingURL=FbCheckPlayerGender.js.map