"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCharacterLookAtPositionData = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCharacterLookAtPositionData {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.uch = false;
    this.dch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCharacterLookAtPositionData(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Pos() {
    if (!this.uch) {
      this.uch = true;
      this.dch = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.pos());
    }
    return this.dch;
  }
}
exports.FbCharacterLookAtPositionData = FbCharacterLookAtPositionData;
//# sourceMappingURL=FbCharacterLookAtPositionData.js.map