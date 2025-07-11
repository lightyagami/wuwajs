"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPosRot = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPosRot {
  constructor(t) {
    this.FbDataInternal = t;
    this.uch = false;
    this.dch = undefined;
    this.Aph = false;
    this.xph = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPosRot(t);
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
exports.FbPosRot = FbPosRot;
//# sourceMappingURL=FbPosRot.js.map