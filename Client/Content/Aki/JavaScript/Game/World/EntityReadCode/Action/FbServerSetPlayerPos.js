"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbServerSetPlayerPos = undefined;
const FbPosA_1 = require("./FbPosA");
class FbServerSetPlayerPos {
  constructor(e) {
    this.FbDataInternal = e;
    this.uch = false;
    this.dch = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbServerSetPlayerPos(e);
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
exports.FbServerSetPlayerPos = FbServerSetPlayerPos;
//# sourceMappingURL=FbServerSetPlayerPos.js.map