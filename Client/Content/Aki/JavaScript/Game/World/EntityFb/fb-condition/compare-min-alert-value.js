"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareMinAlertValue = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareMinAlertValue {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCompareMinAlertValue(e, t) {
    return (t || new CompareMinAlertValue()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCompareMinAlertValue(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CompareMinAlertValue()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCompareMinAlertValue(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static endCompareMinAlertValue(e) {
    return e.endObject();
  }
  static createCompareMinAlertValue(e, t) {
    CompareMinAlertValue.startCompareMinAlertValue(e);
    CompareMinAlertValue.addType(e, t);
    return CompareMinAlertValue.endCompareMinAlertValue(e);
  }
}
exports.CompareMinAlertValue = CompareMinAlertValue;
//# sourceMappingURL=compare-min-alert-value.js.map