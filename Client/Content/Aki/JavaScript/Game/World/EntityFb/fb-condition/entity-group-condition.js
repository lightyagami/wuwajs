"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityGroupCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_event_condition_js_1 = require("../fb-condition/entity-event-condition.js");
class EntityGroupCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEntityGroupCondition(t, i) {
    return (i || new EntityGroupCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityGroupCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EntityGroupCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  count() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  compare(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  conditions(t, i) {
    var n = this.bb.__offset(this.bb_pos, 8);
    if (n) {
      return (i || new entity_event_condition_js_1.EntityEventCondition()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  conditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startEntityGroupCondition(t) {
    t.startObject(3);
  }
  static addCount(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addCompare(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addConditions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createConditionsVector(i, n) {
    i.startVector(4, n.length, 4);
    for (let t = n.length - 1; t >= 0; t--) {
      i.addOffset(n[t]);
    }
    return i.endVector();
  }
  static startConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endEntityGroupCondition(t) {
    return t.endObject();
  }
  static createEntityGroupCondition(t, i, n, o) {
    EntityGroupCondition.startEntityGroupCondition(t);
    EntityGroupCondition.addCount(t, i);
    EntityGroupCondition.addCompare(t, n);
    EntityGroupCondition.addConditions(t, o);
    return EntityGroupCondition.endEntityGroupCondition(t);
  }
}
exports.EntityGroupCondition = EntityGroupCondition;
//# sourceMappingURL=entity-group-condition.js.map