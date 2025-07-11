"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBlackBoardVector = undefined;
const FbVectorInfo_1 = require("./FbVectorInfo");
class FbBlackBoardVector {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ubh = false;
    this.dbh = undefined;
    this.DZh = false;
    this.BZh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBlackBoardVector(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Key() {
    if (!this.ubh) {
      this.ubh = true;
      this.dbh = this.FbDataInternal.key();
    }
    return this.dbh;
  }
  get Vector() {
    if (!this.DZh) {
      this.DZh = true;
      this.BZh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.vector());
    }
    return this.BZh;
  }
}
exports.FbBlackBoardVector = FbBlackBoardVector;
//# sourceMappingURL=FbBlackBoardVector.js.map