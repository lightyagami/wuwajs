"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackCatWarning = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BlackCatWarning {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBlackCatWarning(t, a) {
    return (a || new BlackCatWarning()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBlackCatWarning(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BlackCatWarning()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startBlackCatWarning(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldInt8(0, a, 0);
  }
  static addWarningText(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static endBlackCatWarning(t) {
    return t.endObject();
  }
  static createBlackCatWarning(t, a, i) {
    BlackCatWarning.startBlackCatWarning(t);
    BlackCatWarning.addType(t, a);
    BlackCatWarning.addWarningText(t, i);
    return BlackCatWarning.endBlackCatWarning(t);
  }
}
exports.BlackCatWarning = BlackCatWarning;
//# sourceMappingURL=black-cat-warning.js.map