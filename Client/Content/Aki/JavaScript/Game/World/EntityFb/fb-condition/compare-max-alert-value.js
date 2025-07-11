"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareMaxAlertValue = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareMaxAlertValue {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCompareMaxAlertValue(e, t) {
    return (t || new CompareMaxAlertValue()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCompareMaxAlertValue(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CompareMaxAlertValue()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCompareMaxAlertValue(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static endCompareMaxAlertValue(e) {
    return e.endObject();
  }
  static createCompareMaxAlertValue(e, t) {
    CompareMaxAlertValue.startCompareMaxAlertValue(e);
    CompareMaxAlertValue.addType(e, t);
    return CompareMaxAlertValue.endCompareMaxAlertValue(e);
  }
}
exports.CompareMaxAlertValue = CompareMaxAlertValue;
//# sourceMappingURL=compare-max-alert-value.js.map