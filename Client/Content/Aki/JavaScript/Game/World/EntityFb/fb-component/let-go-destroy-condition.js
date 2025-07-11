"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LetGoDestroyCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LetGoDestroyCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsLetGoDestroyCondition(t, o) {
    return (o || new LetGoDestroyCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLetGoDestroyCondition(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new LetGoDestroyCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  static startLetGoDestroyCondition(t) {
    t.startObject(1);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static endLetGoDestroyCondition(t) {
    return t.endObject();
  }
  static createLetGoDestroyCondition(t, o) {
    LetGoDestroyCondition.startLetGoDestroyCondition(t);
    LetGoDestroyCondition.addType(t, o);
    return LetGoDestroyCondition.endLetGoDestroyCondition(t);
  }
}
exports.LetGoDestroyCondition = LetGoDestroyCondition;
//# sourceMappingURL=let-go-destroy-condition.js.map