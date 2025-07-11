"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadStyleWarning = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HeadStyleWarning {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsHeadStyleWarning(t, e) {
    return (e || new HeadStyleWarning()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHeadStyleWarning(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new HeadStyleWarning()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startHeadStyleWarning(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static endHeadStyleWarning(t) {
    return t.endObject();
  }
  static createHeadStyleWarning(t, e) {
    HeadStyleWarning.startHeadStyleWarning(t);
    HeadStyleWarning.addType(t, e);
    return HeadStyleWarning.endHeadStyleWarning(t);
  }
}
exports.HeadStyleWarning = HeadStyleWarning;
//# sourceMappingURL=head-style-warning.js.map