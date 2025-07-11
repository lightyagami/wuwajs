"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareNpcPerformStateCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareNpcPerformStateCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCompareNpcPerformStateCondition(t, e) {
    return (e || new CompareNpcPerformStateCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCompareNpcPerformStateCondition(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CompareNpcPerformStateCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startCompareNpcPerformStateCondition(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endCompareNpcPerformStateCondition(t) {
    return t.endObject();
  }
  static createCompareNpcPerformStateCondition(t, e, r, o, i) {
    CompareNpcPerformStateCondition.startCompareNpcPerformStateCondition(t);
    CompareNpcPerformStateCondition.addType(t, e);
    CompareNpcPerformStateCondition.addEntityId(t, r);
    CompareNpcPerformStateCondition.addCompare(t, o);
    CompareNpcPerformStateCondition.addState(t, i);
    return CompareNpcPerformStateCondition.endCompareNpcPerformStateCondition(t);
  }
}
exports.CompareNpcPerformStateCondition = CompareNpcPerformStateCondition;
//# sourceMappingURL=compare-npc-perform-state-condition.js.map