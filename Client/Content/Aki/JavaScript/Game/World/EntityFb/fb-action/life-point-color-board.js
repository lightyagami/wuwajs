"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointColorBoard = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const color_piece_js_1 = require("../fb-action/color-piece.js");
class LifePointColorBoard {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsLifePointColorBoard(t, o) {
    return (o || new LifePointColorBoard()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLifePointColorBoard(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new LifePointColorBoard()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  config(t, o) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return (o || new color_piece_js_1.ColorPiece()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  configLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  colors(t, o) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + r) + t * 4, o);
    } else {
      return undefined;
    }
  }
  colorsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  targetColor(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  static startLifePointColorBoard(t) {
    t.startObject(3);
  }
  static addConfig(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static createConfigVector(o, r) {
    o.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      o.addOffset(r[t]);
    }
    return o.endVector();
  }
  static startConfigVector(t, o) {
    t.startVector(4, o, 4);
  }
  static addColors(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static createColorsVector(o, r) {
    o.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      o.addOffset(r[t]);
    }
    return o.endVector();
  }
  static startColorsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static addTargetColor(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static endLifePointColorBoard(t) {
    return t.endObject();
  }
  static createLifePointColorBoard(t, o, r, i) {
    LifePointColorBoard.startLifePointColorBoard(t);
    LifePointColorBoard.addConfig(t, o);
    LifePointColorBoard.addColors(t, r);
    LifePointColorBoard.addTargetColor(t, i);
    return LifePointColorBoard.endLifePointColorBoard(t);
  }
}
exports.LifePointColorBoard = LifePointColorBoard;
//# sourceMappingURL=life-point-color-board.js.map