"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInteractPointIconConfig = undefined;
class FbInteractPointIconConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.lk1 = false;
    this._k1 = 0;
  }
  static Create(t) {
    if (t) {
      return new FbInteractPointIconConfig(t);
    }
  }
  get MaxShowDistance() {
    if (!this.lk1) {
      this.lk1 = true;
      this._k1 = this.FbDataInternal.maxShowDistance();
    }
    return this._k1;
  }
}
exports.FbInteractPointIconConfig = FbInteractPointIconConfig;
//# sourceMappingURL=FbInteractPointIconConfig.js.map