"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinAlertValue = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MinAlertValue {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsMinAlertValue(t, e) {
    return (e || new MinAlertValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMinAlertValue(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new MinAlertValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startMinAlertValue(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static endMinAlertValue(t) {
    return t.endObject();
  }
  static createMinAlertValue(t, e) {
    MinAlertValue.startMinAlertValue(t);
    MinAlertValue.addType(t, e);
    return MinAlertValue.endMinAlertValue(t);
  }
}
exports.MinAlertValue = MinAlertValue;
//# sourceMappingURL=min-alert-value.js.map