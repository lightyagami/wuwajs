"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatValue = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FloatValue {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsFloatValue(t, e) {
    return (e || new FloatValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFloatValue(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new FloatValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  v() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startFloatValue(t) {
    t.startObject(1);
  }
  static addV(t, e) {
    t.addFieldFloat32(0, e, 0);
  }
  static endFloatValue(t) {
    return t.endObject();
  }
  static createFloatValue(t, e) {
    FloatValue.startFloatValue(t);
    FloatValue.addV(t, e);
    return FloatValue.endFloatValue(t);
  }
}
exports.FloatValue = FloatValue;
//# sourceMappingURL=float-value.js.map