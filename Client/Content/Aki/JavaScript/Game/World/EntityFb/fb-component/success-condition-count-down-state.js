"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuccessConditionCountDownState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SuccessConditionCountDownState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsSuccessConditionCountDownState(t, o) {
    return (o || new SuccessConditionCountDownState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSuccessConditionCountDownState(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new SuccessConditionCountDownState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  static startSuccessConditionCountDownState(t) {
    t.startObject(1);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static endSuccessConditionCountDownState(t) {
    return t.endObject();
  }
  static createSuccessConditionCountDownState(t, o) {
    SuccessConditionCountDownState.startSuccessConditionCountDownState(t);
    SuccessConditionCountDownState.addType(t, o);
    return SuccessConditionCountDownState.endSuccessConditionCountDownState(t);
  }
}
exports.SuccessConditionCountDownState = SuccessConditionCountDownState;
//# sourceMappingURL=success-condition-count-down-state.js.map