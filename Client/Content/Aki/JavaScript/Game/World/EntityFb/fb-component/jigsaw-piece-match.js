"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JigsawPieceMatch = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const piece_index_js_1 = require("../fb-action/piece-index.js");
class JigsawPieceMatch {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsJigsawPieceMatch(t, e) {
    return (e || new JigsawPieceMatch()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsJigsawPieceMatch(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new JigsawPieceMatch()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  index(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new piece_index_js_1.PieceIndex()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startJigsawPieceMatch(t) {
    t.startObject(2);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIndex(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endJigsawPieceMatch(t) {
    return t.endObject();
  }
}
exports.JigsawPieceMatch = JigsawPieceMatch;
//# sourceMappingURL=jigsaw-piece-match.js.map