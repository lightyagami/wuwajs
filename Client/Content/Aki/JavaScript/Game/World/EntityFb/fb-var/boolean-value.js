"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BooleanValue = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BooleanValue {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsBooleanValue(e, t) {
    return (t || new BooleanValue()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsBooleanValue(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new BooleanValue()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  v() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startBooleanValue(e) {
    e.startObject(1);
  }
  static addV(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static endBooleanValue(e) {
    return e.endObject();
  }
  static createBooleanValue(e, t) {
    BooleanValue.startBooleanValue(e);
    BooleanValue.addV(e, t);
    return BooleanValue.endBooleanValue(e);
  }
}
exports.BooleanValue = BooleanValue;
//# sourceMappingURL=boolean-value.js.map