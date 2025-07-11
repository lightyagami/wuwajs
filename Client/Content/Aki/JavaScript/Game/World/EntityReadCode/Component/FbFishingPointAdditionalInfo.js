"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFishingPointAdditionalInfo = undefined;
class FbFishingPointAdditionalInfo {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbFishingPointAdditionalInfo(i);
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
exports.FbFishingPointAdditionalInfo = FbFishingPointAdditionalInfo;
//# sourceMappingURL=FbFishingPointAdditionalInfo.js.map