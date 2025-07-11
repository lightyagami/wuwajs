"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaxAlertValue = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MaxAlertValue {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsMaxAlertValue(t, e) {
    return (e || new MaxAlertValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMaxAlertValue(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new MaxAlertValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startMaxAlertValue(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static endMaxAlertValue(t) {
    return t.endObject();
  }
  static createMaxAlertValue(t, e) {
    MaxAlertValue.startMaxAlertValue(t);
    MaxAlertValue.addType(t, e);
    return MaxAlertValue.endMaxAlertValue(t);
  }
}
exports.MaxAlertValue = MaxAlertValue;
//# sourceMappingURL=max-alert-value.js.map