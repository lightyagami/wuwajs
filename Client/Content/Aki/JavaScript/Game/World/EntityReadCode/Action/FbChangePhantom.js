"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangePhantom = undefined;
class FbChangePhantom {
  constructor(t) {
    this.FbDataInternal = t;
    this.tgh = false;
    this.FFe = 0;
  }
  static Create(t) {
    if (t) {
      return new FbChangePhantom(t);
    }
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
}
exports.FbChangePhantom = FbChangePhantom;
//# sourceMappingURL=FbChangePhantom.js.map