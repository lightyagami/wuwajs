"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuccessConditionSameSpecificState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SuccessConditionSameSpecificState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSuccessConditionSameSpecificState(t, e) {
    return (e || new SuccessConditionSameSpecificState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSuccessConditionSameSpecificState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SuccessConditionSameSpecificState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startSuccessConditionSameSpecificState(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endSuccessConditionSameSpecificState(t) {
    return t.endObject();
  }
  static createSuccessConditionSameSpecificState(t, e, i) {
    SuccessConditionSameSpecificState.startSuccessConditionSameSpecificState(t);
    SuccessConditionSameSpecificState.addType(t, e);
    SuccessConditionSameSpecificState.addState(t, i);
    return SuccessConditionSameSpecificState.endSuccessConditionSameSpecificState(t);
  }
}
exports.SuccessConditionSameSpecificState = SuccessConditionSameSpecificState;
//# sourceMappingURL=success-condition-same-specific-state.js.map