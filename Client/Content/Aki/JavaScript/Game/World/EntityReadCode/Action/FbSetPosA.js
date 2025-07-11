"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetPosA = undefined;
const FbPosA_1 = require("./FbPosA");
class FbSetPosA {
  constructor(s) {
    this.FbDataInternal = s;
    this.uch = false;
    this.dch = undefined;
  }
  static Create(s) {
    if (s) {
      return new FbSetPosA(s);
    }
  }
  get Pos() {
    if (!this.uch) {
      this.uch = true;
      this.dch = FbPosA_1.FbPosA.Create(this.FbDataInternal.pos());
    }
    return this.dch;
  }
}
exports.FbSetPosA = FbSetPosA;
//# sourceMappingURL=FbSetPosA.js.map