"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PieceIndex = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PieceIndex {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsPieceIndex(e, t) {
    return (t || new PieceIndex()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsPieceIndex(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new PieceIndex()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  rowIndex() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  columnIndex() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startPieceIndex(e) {
    e.startObject(2);
  }
  static addRowIndex(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addColumnIndex(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endPieceIndex(e) {
    return e.endObject();
  }
  static createPieceIndex(e, t, i) {
    PieceIndex.startPieceIndex(e);
    PieceIndex.addRowIndex(e, t);
    PieceIndex.addColumnIndex(e, i);
    return PieceIndex.endPieceIndex(e);
  }
}
exports.PieceIndex = PieceIndex;
//# sourceMappingURL=piece-index.js.map