"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbJigsawPieceMatch = undefined;
const FbPieceIndex_1 = require("../Action/FbPieceIndex");
class FbJigsawPieceMatch {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.Afh = false;
    this.V_i = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbJigsawPieceMatch(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get Index() {
    if (!this.Afh) {
      this.Afh = true;
      this.V_i = FbPieceIndex_1.FbPieceIndex.Create(this.FbDataInternal.index());
    }
    return this.V_i;
  }
}
exports.FbJigsawPieceMatch = FbJigsawPieceMatch;
//# sourceMappingURL=FbJigsawPieceMatch.js.map