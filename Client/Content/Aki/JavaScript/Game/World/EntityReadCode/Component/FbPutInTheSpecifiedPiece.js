"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPutInTheSpecifiedPiece = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbJigsawPieceMatch_1 = require("./FbJigsawPieceMatch");
class FbPutInTheSpecifiedPiece {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.RNh = false;
    this.wNh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbPutInTheSpecifiedPiece(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MatchList() {
    if (!this.RNh) {
      this.RNh = true;
      this.wNh = new Array();
      var t = this.FbDataInternal.matchListLength();
      if (t) {
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.matchList(e, new fb_component_1.JigsawPieceMatch());
          this.wNh.push(FbJigsawPieceMatch_1.FbJigsawPieceMatch.Create(i));
        }
      }
    }
    return this.wNh;
  }
}
exports.FbPutInTheSpecifiedPiece = FbPutInTheSpecifiedPiece;
//# sourceMappingURL=FbPutInTheSpecifiedPiece.js.map