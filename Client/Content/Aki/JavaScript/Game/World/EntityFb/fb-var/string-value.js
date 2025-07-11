"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringValue = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StringValue {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsStringValue(t, e) {
    return (e || new StringValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStringValue(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new StringValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  v(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startStringValue(t) {
    t.startObject(1);
  }
  static addV(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endStringValue(t) {
    return t.endObject();
  }
  static createStringValue(t, e) {
    StringValue.startStringValue(t);
    StringValue.addV(t, e);
    return StringValue.endStringValue(t);
  }
}
exports.StringValue = StringValue;
//# sourceMappingURL=string-value.js.map