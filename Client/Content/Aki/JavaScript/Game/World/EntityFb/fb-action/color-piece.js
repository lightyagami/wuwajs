"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorPiece = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ColorPiece {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsColorPiece(e, t) {
    return (t || new ColorPiece()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsColorPiece(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ColorPiece()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  color(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startColorPiece(e) {
    e.startObject(1);
  }
  static addColor(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endColorPiece(e) {
    return e.endObject();
  }
  static createColorPiece(e, t) {
    ColorPiece.startColorPiece(e);
    ColorPiece.addColor(e, t);
    return ColorPiece.endColorPiece(e);
  }
}
exports.ColorPiece = ColorPiece;
//# sourceMappingURL=color-piece.js.map