"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbJigsawPiece = undefined;
const FbPieceIndex_1 = require("./FbPieceIndex");
class FbJigsawPiece {
  constructor(t) {
    this.FbDataInternal = t;
    this.Afh = false;
    this.V_i = undefined;
    this.AAh = false;
    this.qzo = false;
    this.xAh = false;
    this.RAh = false;
    this.wAh = false;
    this.PAh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbJigsawPiece(t);
    }
  }
  get Index() {
    if (!this.Afh) {
      this.Afh = true;
      this.V_i = FbPieceIndex_1.FbPieceIndex.Create(this.FbDataInternal.index());
    }
    return this.V_i;
  }
  get Active() {
    if (!this.AAh) {
      this.AAh = true;
      this.qzo = this.FbDataInternal.active();
    }
    return this.qzo;
  }
  get IsCorrect() {
    if (!this.xAh) {
      this.xAh = true;
      this.RAh = this.FbDataInternal.isCorrect();
    }
    return this.RAh;
  }
  get InitState() {
    if (!this.wAh) {
      this.wAh = true;
      this.PAh = this.FbDataInternal.initState();
    }
    return this.PAh;
  }
}
exports.FbJigsawPiece = FbJigsawPiece;
//# sourceMappingURL=FbJigsawPiece.js.map