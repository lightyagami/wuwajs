"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuccessConditionSameArbitraryState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SuccessConditionSameArbitraryState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSuccessConditionSameArbitraryState(t, e) {
    return (e || new SuccessConditionSameArbitraryState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSuccessConditionSameArbitraryState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SuccessConditionSameArbitraryState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startSuccessConditionSameArbitraryState(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSuccessConditionSameArbitraryState(t) {
    return t.endObject();
  }
  static createSuccessConditionSameArbitraryState(t, e) {
    SuccessConditionSameArbitraryState.startSuccessConditionSameArbitraryState(t);
    SuccessConditionSameArbitraryState.addType(t, e);
    return SuccessConditionSameArbitraryState.endSuccessConditionSameArbitraryState(t);
  }
}
exports.SuccessConditionSameArbitraryState = SuccessConditionSameArbitraryState;
//# sourceMappingURL=success-condition-same-arbitrary-state.js.map