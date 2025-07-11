"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareEntityGroupStateCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_group_condition_js_1 = require("../fb-condition/entity-group-condition.js");
class CompareEntityGroupStateCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCompareEntityGroupStateCondition(t, i) {
    return (i || new CompareEntityGroupStateCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCompareEntityGroupStateCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CompareEntityGroupStateCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  groupCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new entity_group_condition_js_1.EntityGroupCondition()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startCompareEntityGroupStateCondition(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addGroupCondition(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endCompareEntityGroupStateCondition(t) {
    return t.endObject();
  }
}
exports.CompareEntityGroupStateCondition = CompareEntityGroupStateCondition;
//# sourceMappingURL=compare-entity-group-state-condition.js.map