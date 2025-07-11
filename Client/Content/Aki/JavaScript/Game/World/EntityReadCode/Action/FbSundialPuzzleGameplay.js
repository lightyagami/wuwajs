"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSundialPuzzleGameplay = undefined;
class FbSundialPuzzleGameplay {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSundialPuzzleGameplay(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
}
exports.FbSundialPuzzleGameplay = FbSundialPuzzleGameplay;
//# sourceMappingURL=FbSundialPuzzleGameplay.js.map