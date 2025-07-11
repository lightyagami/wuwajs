"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JigsawPiece = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const piece_index_js_1 = require("../fb-action/piece-index.js");
class JigsawPiece {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, e) {
    this.bb_pos = i;
    this.bb = e;
    return this;
  }
  static getRootAsJigsawPiece(i, e) {
    return (e || new JigsawPiece()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsJigsawPiece(i, e) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new JigsawPiece()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  index(i) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return (i || new piece_index_js_1.PieceIndex()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  active() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  isCorrect() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  initState(i) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__string(this.bb_pos + e, i);
    } else {
      return undefined;
    }
  }
  static startJigsawPiece(i) {
    i.startObject(4);
  }
  static addIndex(i, e) {
    i.addFieldOffset(0, e, 0);
  }
  static addActive(i, e) {
    i.addFieldInt8(1, +e, 0);
  }
  static addIsCorrect(i, e) {
    i.addFieldInt8(2, +e, 0);
  }
  static addInitState(i, e) {
    i.addFieldOffset(3, e, 0);
  }
  static endJigsawPiece(i) {
    return i.endObject();
  }
  static createJigsawPiece(i, e, t, s, a) {
    JigsawPiece.startJigsawPiece(i);
    JigsawPiece.addIndex(i, e);
    JigsawPiece.addActive(i, t);
    JigsawPiece.addIsCorrect(i, s);
    JigsawPiece.addInitState(i, a);
    return JigsawPiece.endJigsawPiece(i);
  }
}
exports.JigsawPiece = JigsawPiece;
//# sourceMappingURL=jigsaw-piece.js.map