"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMoveToPosA = undefined;
const FbPosA_1 = require("./FbPosA");
class FbMoveToPosA {
  constructor(s) {
    this.FbDataInternal = s;
    this.Tuh = false;
    this.buh = 0;
    this.uch = false;
    this.dch = undefined;
  }
  static Create(s) {
    if (s) {
      return new FbMoveToPosA(s);
    }
  }
  get Timeout() {
    if (!this.Tuh) {
      this.Tuh = true;
      this.buh = this.FbDataInternal.timeout();
    }
    return this.buh;
  }
  get Pos() {
    if (!this.uch) {
      this.uch = true;
      this.dch = FbPosA_1.FbPosA.Create(this.FbDataInternal.pos());
    }
    return this.dch;
  }
}
exports.FbMoveToPosA = FbMoveToPosA;
//# sourceMappingURL=FbMoveToPosA.js.map