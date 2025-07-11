"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPieceIndex = undefined;
class FbPieceIndex {
  constructor(t) {
    this.FbDataInternal = t;
    this.MAh = false;
    this.EAh = 0;
    this.IAh = false;
    this.TAh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbPieceIndex(t);
    }
  }
  get RowIndex() {
    if (!this.MAh) {
      this.MAh = true;
      this.EAh = this.FbDataInternal.rowIndex();
    }
    return this.EAh;
  }
  get ColumnIndex() {
    if (!this.IAh) {
      this.IAh = true;
      this.TAh = this.FbDataInternal.columnIndex();
    }
    return this.TAh;
  }
}
exports.FbPieceIndex = FbPieceIndex;
//# sourceMappingURL=FbPieceIndex.js.map