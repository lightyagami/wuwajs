"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSimpleMove = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSimpleMove {
  constructor(t) {
    this.FbDataInternal = t;
    this.i_h = false;
    this.r_h = 0;
    this.Mph = false;
    this.Eph = 0;
    this.uch = false;
    this.dch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSimpleMove(t);
    }
  }
  get Who() {
    if (!this.i_h) {
      this.i_h = true;
      this.r_h = this.FbDataInternal.who();
    }
    return this.r_h;
  }
  get UseTime() {
    if (!this.Mph) {
      this.Mph = true;
      this.Eph = this.FbDataInternal.useTime();
    }
    return this.Eph;
  }
  get Pos() {
    if (!this.uch) {
      this.uch = true;
      this.dch = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.pos());
    }
    return this.dch;
  }
}
exports.FbSimpleMove = FbSimpleMove;
//# sourceMappingURL=FbSimpleMove.js.map