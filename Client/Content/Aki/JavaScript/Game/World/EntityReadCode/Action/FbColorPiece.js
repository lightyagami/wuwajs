"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbColorPiece = undefined;
class FbColorPiece {
  constructor(t) {
    this.FbDataInternal = t;
    this.xIh = false;
    this.RIh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbColorPiece(t);
    }
  }
  get Color() {
    if (!this.xIh) {
      this.xIh = true;
      this.RIh = this.FbDataInternal.color();
    }
    return this.RIh;
  }
}
exports.FbColorPiece = FbColorPiece;
//# sourceMappingURL=FbColorPiece.js.map