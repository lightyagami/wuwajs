"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntValue = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class IntValue {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsIntValue(t, e) {
    return (e || new IntValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsIntValue(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new IntValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  v() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startIntValue(t) {
    t.startObject(1);
  }
  static addV(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endIntValue(t) {
    return t.endObject();
  }
  static createIntValue(t, e) {
    IntValue.startIntValue(t);
    IntValue.addV(t, e);
    return IntValue.endIntValue(t);
  }
}
exports.IntValue = IntValue;
//# sourceMappingURL=int-value.js.map