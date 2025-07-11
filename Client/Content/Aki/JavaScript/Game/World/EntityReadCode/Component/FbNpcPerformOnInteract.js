"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcPerformOnInteract = undefined;
class FbNpcPerformOnInteract {
  constructor(t) {
    this.FbDataInternal = t;
    this.mgh = false;
    this.Cgh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNpcPerformOnInteract(t);
    }
  }
  get Montage() {
    if (!this.mgh) {
      this.mgh = true;
      this.Cgh = this.FbDataInternal.montage();
    }
    return this.Cgh;
  }
}
exports.FbNpcPerformOnInteract = FbNpcPerformOnInteract;
//# sourceMappingURL=FbNpcPerformOnInteract.js.map