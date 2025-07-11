"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAdsortTransform = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbAdsortTransform {
  constructor(t) {
    this.FbDataInternal = t;
    this.uch = false;
    this.dch = undefined;
    this.Aph = false;
    this.xph = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAdsortTransform(t);
    }
  }
  get Pos() {
    if (!this.uch) {
      this.uch = true;
      this.dch = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.pos());
    }
    return this.dch;
  }
  get Rot() {
    if (!this.Aph) {
      this.Aph = true;
      this.xph = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.rot());
    }
    return this.xph;
  }
}
exports.FbAdsortTransform = FbAdsortTransform;
//# sourceMappingURL=FbAdsortTransform.js.map