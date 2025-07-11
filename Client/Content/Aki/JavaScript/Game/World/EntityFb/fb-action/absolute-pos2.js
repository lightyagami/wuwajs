"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbsolutePos2 = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class AbsolutePos2 {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsAbsolutePos2(t, s) {
    return (s || new AbsolutePos2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAbsolutePos2(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new AbsolutePos2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  pos(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  static startAbsolutePos2(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldInt8(0, s, 0);
  }
  static addPos(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endAbsolutePos2(t) {
    return t.endObject();
  }
}
exports.AbsolutePos2 = AbsolutePos2;
//# sourceMappingURL=absolute-pos2.js.map