"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamlessWarning = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DreamlessWarning {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(s, e) {
    this.bb_pos = s;
    this.bb = e;
    return this;
  }
  static getRootAsDreamlessWarning(s, e) {
    return (e || new DreamlessWarning()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  static getSizePrefixedRootAsDreamlessWarning(s, e) {
    s.setPosition(s.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new DreamlessWarning()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  type() {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.readUint8(this.bb_pos + s);
    } else {
      return 0;
    }
  }
  warningText(s) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, s);
    } else {
      return undefined;
    }
  }
  static startDreamlessWarning(s) {
    s.startObject(2);
  }
  static addType(s, e) {
    s.addFieldInt8(0, e, 0);
  }
  static addWarningText(s, e) {
    s.addFieldOffset(1, e, 0);
  }
  static endDreamlessWarning(s) {
    return s.endObject();
  }
  static createDreamlessWarning(s, e, r) {
    DreamlessWarning.startDreamlessWarning(s);
    DreamlessWarning.addType(s, e);
    DreamlessWarning.addWarningText(s, r);
    return DreamlessWarning.endDreamlessWarning(s);
  }
}
exports.DreamlessWarning = DreamlessWarning;
//# sourceMappingURL=dreamless-warning.js.map