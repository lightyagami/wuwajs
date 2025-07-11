"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetPieceState = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbJigsawPiece_1 = require("./FbJigsawPiece");
class FbSetPieceState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.bAh = false;
    this.LAh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetPieceState(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get PieceState() {
    if (!this.bAh) {
      this.bAh = true;
      this.LAh = new Array();
      var i = this.FbDataInternal.pieceStateLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.pieceState(t, new fb_action_1.JigsawPiece());
          this.LAh.push(FbJigsawPiece_1.FbJigsawPiece.Create(e));
        }
      }
    }
    return this.LAh;
  }
}
exports.FbSetPieceState = FbSetPieceState;
//# sourceMappingURL=FbSetPieceState.js.map