"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcmLimited = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AcmLimited {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsAcmLimited(t, i) {
    return (i || new AcmLimited()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAcmLimited(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new AcmLimited()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  limitValue() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startAcmLimited(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addLimitValue(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endAcmLimited(t) {
    return t.endObject();
  }
  static createAcmLimited(t, i, e) {
    AcmLimited.startAcmLimited(t);
    AcmLimited.addType(t, i);
    AcmLimited.addLimitValue(t, e);
    return AcmLimited.endAcmLimited(t);
  }
}
exports.AcmLimited = AcmLimited;
//# sourceMappingURL=acm-limited.js.map