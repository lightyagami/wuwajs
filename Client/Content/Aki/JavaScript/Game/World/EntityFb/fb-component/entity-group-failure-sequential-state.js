"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityGroupFailureSequentialState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_state_condition_js_1 = require("../fb-condition/entity-state-condition.js");
class EntityGroupFailureSequentialState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEntityGroupFailureSequentialState(t, e) {
    return (e || new EntityGroupFailureSequentialState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityGroupFailureSequentialState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EntityGroupFailureSequentialState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  order(t, e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (e || new entity_state_condition_js_1.EntityStateCondition()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  orderLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startEntityGroupFailureSequentialState(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addOrder(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createOrderVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startOrderVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endEntityGroupFailureSequentialState(t) {
    return t.endObject();
  }
  static createEntityGroupFailureSequentialState(t, e, i) {
    EntityGroupFailureSequentialState.startEntityGroupFailureSequentialState(t);
    EntityGroupFailureSequentialState.addType(t, e);
    EntityGroupFailureSequentialState.addOrder(t, i);
    return EntityGroupFailureSequentialState.endEntityGroupFailureSequentialState(t);
  }
}
exports.EntityGroupFailureSequentialState = EntityGroupFailureSequentialState;
//# sourceMappingURL=entity-group-failure-sequential-state.js.map