"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnableAoiNotify = undefined;
class FbEnableAoiNotify {
  constructor(t) {
    this.FbDataInternal = t;
    this.Bch = false;
    this.Cbo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEnableAoiNotify(t);
    }
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
}
exports.FbEnableAoiNotify = FbEnableAoiNotify;
//# sourceMappingURL=FbEnableAoiNotify.js.map