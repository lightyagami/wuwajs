"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WhiteCatWarning = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class WhiteCatWarning {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsWhiteCatWarning(t, i) {
    return (i || new WhiteCatWarning()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsWhiteCatWarning(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new WhiteCatWarning()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  warningText(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startWhiteCatWarning(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addWarningText(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endWhiteCatWarning(t) {
    return t.endObject();
  }
  static createWhiteCatWarning(t, i, e) {
    WhiteCatWarning.startWhiteCatWarning(t);
    WhiteCatWarning.addType(t, i);
    WhiteCatWarning.addWarningText(t, e);
    return WhiteCatWarning.endWhiteCatWarning(t);
  }
}
exports.WhiteCatWarning = WhiteCatWarning;
//# sourceMappingURL=white-cat-warning.js.map