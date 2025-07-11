"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SafePos = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SafePos {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSafePos(t, e) {
    return (e || new SafePos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSafePos(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SafePos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSafePos(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static endSafePos(t) {
    return t.endObject();
  }
  static createSafePos(t, e) {
    SafePos.startSafePos(t);
    SafePos.addType(t, e);
    return SafePos.endSafePos(t);
  }
}
exports.SafePos = SafePos;
//# sourceMappingURL=safe-pos.js.map