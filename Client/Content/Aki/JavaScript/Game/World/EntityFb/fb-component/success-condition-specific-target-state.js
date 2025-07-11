"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuccessConditionSpecificTargetState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_state_condition_js_1 = require("../fb-condition/entity-state-condition.js");
class SuccessConditionSpecificTargetState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsSuccessConditionSpecificTargetState(t, i) {
    return (i || new SuccessConditionSpecificTargetState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSuccessConditionSpecificTargetState(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new SuccessConditionSpecificTargetState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  conditions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (i || new entity_state_condition_js_1.EntityStateCondition()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  conditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSuccessConditionSpecificTargetState(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addConditions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createConditionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endSuccessConditionSpecificTargetState(t) {
    return t.endObject();
  }
  static createSuccessConditionSpecificTargetState(t, i, e) {
    SuccessConditionSpecificTargetState.startSuccessConditionSpecificTargetState(t);
    SuccessConditionSpecificTargetState.addType(t, i);
    SuccessConditionSpecificTargetState.addConditions(t, e);
    return SuccessConditionSpecificTargetState.endSuccessConditionSpecificTargetState(t);
  }
}
exports.SuccessConditionSpecificTargetState = SuccessConditionSpecificTargetState;
//# sourceMappingURL=success-condition-specific-target-state.js.map