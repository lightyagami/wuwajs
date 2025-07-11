"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareEntityStateCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareEntityStateCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCompareEntityStateCondition(t, i) {
    return (i || new CompareEntityStateCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCompareEntityStateCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CompareEntityStateCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
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
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startCompareEntityStateCondition(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addCompare(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addState(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endCompareEntityStateCondition(t) {
    return t.endObject();
  }
  static createCompareEntityStateCondition(t, i, e, n, o) {
    CompareEntityStateCondition.startCompareEntityStateCondition(t);
    CompareEntityStateCondition.addType(t, i);
    CompareEntityStateCondition.addEntityId(t, e);
    CompareEntityStateCondition.addCompare(t, n);
    CompareEntityStateCondition.addState(t, o);
    return CompareEntityStateCondition.endCompareEntityStateCondition(t);
  }
}
exports.CompareEntityStateCondition = CompareEntityStateCondition;
//# sourceMappingURL=compare-entity-state-condition.js.map