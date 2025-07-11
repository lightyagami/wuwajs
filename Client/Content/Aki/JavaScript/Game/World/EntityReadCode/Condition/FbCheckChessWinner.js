"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckChessWinner = undefined;
class FbCheckChessWinner {
  constructor(s) {
    this.FbDataInternal = s;
    this.u_h = false;
    this.f8o = undefined;
    this.NJh = false;
    this.VJh = 0;
    this.jJh = false;
    this.HJh = undefined;
  }
  static Create(s) {
    if (s) {
      return new FbCheckChessWinner(s);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ChessboardId() {
    if (!this.NJh) {
      this.NJh = true;
      this.VJh = this.FbDataInternal.chessboardId();
    }
    return this.VJh;
  }
  get Winner() {
    if (!this.jJh) {
      this.jJh = true;
      this.HJh = this.FbDataInternal.winner();
    }
    return this.HJh;
  }
}
exports.FbCheckChessWinner = FbCheckChessWinner;
//# sourceMappingURL=FbCheckChessWinner.js.map