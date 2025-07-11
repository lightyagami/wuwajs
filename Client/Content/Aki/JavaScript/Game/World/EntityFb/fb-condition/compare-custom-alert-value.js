"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareCustomAlertValue = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareCustomAlertValue {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCompareCustomAlertValue(t, e) {
    return (e || new CompareCustomAlertValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCompareCustomAlertValue(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CompareCustomAlertValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  compareValue() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCompareCustomAlertValue(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addCompareValue(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static endCompareCustomAlertValue(t) {
    return t.endObject();
  }
  static createCompareCustomAlertValue(t, e, r) {
    CompareCustomAlertValue.startCompareCustomAlertValue(t);
    CompareCustomAlertValue.addType(t, e);
    CompareCustomAlertValue.addCompareValue(t, r);
    return CompareCustomAlertValue.endCompareCustomAlertValue(t);
  }
}
exports.CompareCustomAlertValue = CompareCustomAlertValue;
//# sourceMappingURL=compare-custom-alert-value.js.map