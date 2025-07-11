"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JigsawConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const jigsaw_piece_js_1 = require("../fb-action/jigsaw-piece.js");
class JigsawConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsJigsawConfig(i, t) {
    return (t || new JigsawConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsJigsawConfig(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new JigsawConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  row() {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  column() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  size() {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  shape(i) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  pieces(i, t) {
    var s = this.bb.__offset(this.bb_pos, 12);
    if (s) {
      return (t || new jigsaw_piece_js_1.JigsawPiece()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + i * 4), this.bb);
    } else {
      return undefined;
    }
  }
  piecesLength() {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__vector_len(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  static startJigsawConfig(i) {
    i.startObject(5);
  }
  static addRow(i, t) {
    i.addFieldInt32(0, t, 0);
  }
  static addColumn(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static addSize(i, t) {
    i.addFieldInt32(2, t, 0);
  }
  static addShape(i, t) {
    i.addFieldOffset(3, t, 0);
  }
  static addPieces(i, t) {
    i.addFieldOffset(4, t, 0);
  }
  static createPiecesVector(t, s) {
    t.startVector(4, s.length, 4);
    for (let i = s.length - 1; i >= 0; i--) {
      t.addOffset(s[i]);
    }
    return t.endVector();
  }
  static startPiecesVector(i, t) {
    i.startVector(4, t, 4);
  }
  static endJigsawConfig(i) {
    return i.endObject();
  }
  static createJigsawConfig(i, t, s, e, a, r) {
    JigsawConfig.startJigsawConfig(i);
    JigsawConfig.addRow(i, t);
    JigsawConfig.addColumn(i, s);
    JigsawConfig.addSize(i, e);
    JigsawConfig.addShape(i, a);
    JigsawConfig.addPieces(i, r);
    return JigsawConfig.endJigsawConfig(i);
  }
}
exports.JigsawConfig = JigsawConfig;
//# sourceMappingURL=jigsaw-config.js.map