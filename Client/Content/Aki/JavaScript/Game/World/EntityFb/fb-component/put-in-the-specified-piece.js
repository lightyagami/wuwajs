"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PutInTheSpecifiedPiece = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const jigsaw_piece_match_js_1 = require("../fb-component/jigsaw-piece-match.js");
class PutInTheSpecifiedPiece {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsPutInTheSpecifiedPiece(e, t) {
    return (t || new PutInTheSpecifiedPiece()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsPutInTheSpecifiedPiece(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new PutInTheSpecifiedPiece()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  matchList(e, t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new jigsaw_piece_match_js_1.JigsawPieceMatch()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + e * 4), this.bb);
    } else {
      return undefined;
    }
  }
  matchListLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startPutInTheSpecifiedPiece(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addMatchList(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createMatchListVector(t, i) {
    t.startVector(4, i.length, 4);
    for (let e = i.length - 1; e >= 0; e--) {
      t.addOffset(i[e]);
    }
    return t.endVector();
  }
  static startMatchListVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endPutInTheSpecifiedPiece(e) {
    return e.endObject();
  }
  static createPutInTheSpecifiedPiece(e, t, i) {
    PutInTheSpecifiedPiece.startPutInTheSpecifiedPiece(e);
    PutInTheSpecifiedPiece.addType(e, t);
    PutInTheSpecifiedPiece.addMatchList(e, i);
    return PutInTheSpecifiedPiece.endPutInTheSpecifiedPiece(e);
  }
}
exports.PutInTheSpecifiedPiece = PutInTheSpecifiedPiece;
//# sourceMappingURL=put-in-the-specified-piece.js.map