"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDestroySelf = undefined;
class FbDestroySelf {
  constructor(t) {
    this.FbDataInternal = t;
    this.Ych = false;
    this.zch = false;
  }
  static Create(t) {
    if (t) {
      return new FbDestroySelf(t);
    }
  }
  get DelayDestroy() {
    if (!this.Ych) {
      this.Ych = true;
      this.zch = this.FbDataInternal.delayDestroy();
    }
    return this.zch;
  }
}
exports.FbDestroySelf = FbDestroySelf;
//# sourceMappingURL=FbDestroySelf.js.map