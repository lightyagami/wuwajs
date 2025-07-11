"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDestroy = undefined;
class FbDestroy {
  constructor(t) {
    this.FbDataInternal = t;
    this.Ych = false;
    this.zch = false;
  }
  static Create(t) {
    if (t) {
      return new FbDestroy(t);
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
exports.FbDestroy = FbDestroy;
//# sourceMappingURL=FbDestroy.js.map