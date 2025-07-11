"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbJigsawConfig = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbJigsawPiece_1 = require("./FbJigsawPiece");
class FbJigsawConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.eRh = false;
    this.tRh = 0;
    this.iRh = false;
    this.rRh = 0;
    this.oRh = false;
    this.n6 = 0;
    this.nRh = false;
    this.c6o = undefined;
    this.sRh = false;
    this.aRh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbJigsawConfig(t);
    }
  }
  get Row() {
    if (!this.eRh) {
      this.eRh = true;
      this.tRh = this.FbDataInternal.row();
    }
    return this.tRh;
  }
  get Column() {
    if (!this.iRh) {
      this.iRh = true;
      this.rRh = this.FbDataInternal.column();
    }
    return this.rRh;
  }
  get Size() {
    if (!this.oRh) {
      this.oRh = true;
      this.n6 = this.FbDataInternal.size();
    }
    return this.n6;
  }
  get Shape() {
    if (!this.nRh) {
      this.nRh = true;
      this.c6o = this.FbDataInternal.shape();
    }
    return this.c6o;
  }
  get Pieces() {
    if (!this.sRh) {
      this.sRh = true;
      this.aRh = new Array();
      var i = this.FbDataInternal.piecesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.pieces(t, new fb_action_1.JigsawPiece());
          this.aRh.push(FbJigsawPiece_1.FbJigsawPiece.Create(s));
        }
      }
    }
    return this.aRh;
  }
}
exports.FbJigsawConfig = FbJigsawConfig;
//# sourceMappingURL=FbJigsawConfig.js.map