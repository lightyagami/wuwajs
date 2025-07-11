"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImmediateStartCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ImmediateStartCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsImmediateStartCondition(t, i) {
    return (i || new ImmediateStartCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsImmediateStartCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ImmediateStartCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startImmediateStartCondition(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static endImmediateStartCondition(t) {
    return t.endObject();
  }
  static createImmediateStartCondition(t, i) {
    ImmediateStartCondition.startImmediateStartCondition(t);
    ImmediateStartCondition.addType(t, i);
    return ImmediateStartCondition.endImmediateStartCondition(t);
  }
}
exports.ImmediateStartCondition = ImmediateStartCondition;
//# sourceMappingURL=immediate-start-condition.js.map