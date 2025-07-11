"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FailureConditionArbitraryState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FailureConditionArbitraryState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsFailureConditionArbitraryState(t, i) {
    return (i || new FailureConditionArbitraryState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFailureConditionArbitraryState(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new FailureConditionArbitraryState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startFailureConditionArbitraryState(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addState(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endFailureConditionArbitraryState(t) {
    return t.endObject();
  }
  static createFailureConditionArbitraryState(t, i, r) {
    FailureConditionArbitraryState.startFailureConditionArbitraryState(t);
    FailureConditionArbitraryState.addType(t, i);
    FailureConditionArbitraryState.addState(t, r);
    return FailureConditionArbitraryState.endFailureConditionArbitraryState(t);
  }
}
exports.FailureConditionArbitraryState = FailureConditionArbitraryState;
//# sourceMappingURL=failure-condition-arbitrary-state.js.map