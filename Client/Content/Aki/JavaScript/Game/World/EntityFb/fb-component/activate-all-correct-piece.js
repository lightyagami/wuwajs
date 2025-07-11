"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivateAllCorrectPiece = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActivateAllCorrectPiece {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsActivateAllCorrectPiece(t, e) {
    return (e || new ActivateAllCorrectPiece()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActivateAllCorrectPiece(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ActivateAllCorrectPiece()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startActivateAllCorrectPiece(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endActivateAllCorrectPiece(t) {
    return t.endObject();
  }
  static createActivateAllCorrectPiece(t, e) {
    ActivateAllCorrectPiece.startActivateAllCorrectPiece(t);
    ActivateAllCorrectPiece.addType(t, e);
    return ActivateAllCorrectPiece.endActivateAllCorrectPiece(t);
  }
}
exports.ActivateAllCorrectPiece = ActivateAllCorrectPiece;
//# sourceMappingURL=activate-all-correct-piece.js.map