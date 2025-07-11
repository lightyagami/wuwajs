"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStandControl2 = undefined;
class FbStandControl2 {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbStandControl2(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
}
exports.FbStandControl2 = FbStandControl2;
//# sourceMappingURL=FbStandControl2.js.map