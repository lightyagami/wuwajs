"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadStyleWeakSignal = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HeadStyleWeakSignal {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsHeadStyleWeakSignal(e, t) {
    return (t || new HeadStyleWeakSignal()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsHeadStyleWeakSignal(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new HeadStyleWeakSignal()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startHeadStyleWeakSignal(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static endHeadStyleWeakSignal(e) {
    return e.endObject();
  }
  static createHeadStyleWeakSignal(e, t) {
    HeadStyleWeakSignal.startHeadStyleWeakSignal(e);
    HeadStyleWeakSignal.addType(e, t);
    return HeadStyleWeakSignal.endHeadStyleWeakSignal(e);
  }
}
exports.HeadStyleWeakSignal = HeadStyleWeakSignal;
//# sourceMappingURL=head-style-weak-signal.js.map