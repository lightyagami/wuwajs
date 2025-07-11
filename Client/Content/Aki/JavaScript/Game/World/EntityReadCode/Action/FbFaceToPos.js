"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFaceToPos = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbFaceToPos {
  constructor(t) {
    this.FbDataInternal = t;
    this.uch = false;
    this.dch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFaceToPos(t);
    }
  }
  get Pos() {
    if (!this.uch) {
      this.uch = true;
      this.dch = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.pos());
    }
    return this.dch;
  }
}
exports.FbFaceToPos = FbFaceToPos;
//# sourceMappingURL=FbFaceToPos.js.map