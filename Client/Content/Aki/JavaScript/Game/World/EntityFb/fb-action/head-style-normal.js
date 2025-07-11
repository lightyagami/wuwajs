"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadStyleNormal = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HeadStyleNormal {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsHeadStyleNormal(t, e) {
    return (e || new HeadStyleNormal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHeadStyleNormal(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new HeadStyleNormal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  whoId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startHeadStyleNormal(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addWhoId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endHeadStyleNormal(t) {
    return t.endObject();
  }
  static createHeadStyleNormal(t, e, a) {
    HeadStyleNormal.startHeadStyleNormal(t);
    HeadStyleNormal.addType(t, e);
    HeadStyleNormal.addWhoId(t, a);
    return HeadStyleNormal.endHeadStyleNormal(t);
  }
}
exports.HeadStyleNormal = HeadStyleNormal;
//# sourceMappingURL=head-style-normal.js.map