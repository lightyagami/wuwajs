"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThrowDestroyCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ThrowDestroyCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsThrowDestroyCondition(t, o) {
    return (o || new ThrowDestroyCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsThrowDestroyCondition(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new ThrowDestroyCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  delayTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startThrowDestroyCondition(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addDelayTime(t, o) {
    t.addFieldFloat32(1, o, 0);
  }
  static endThrowDestroyCondition(t) {
    return t.endObject();
  }
  static createThrowDestroyCondition(t, o, i) {
    ThrowDestroyCondition.startThrowDestroyCondition(t);
    ThrowDestroyCondition.addType(t, o);
    ThrowDestroyCondition.addDelayTime(t, i);
    return ThrowDestroyCondition.endThrowDestroyCondition(t);
  }
}
exports.ThrowDestroyCondition = ThrowDestroyCondition;
//# sourceMappingURL=throw-destroy-condition.js.map