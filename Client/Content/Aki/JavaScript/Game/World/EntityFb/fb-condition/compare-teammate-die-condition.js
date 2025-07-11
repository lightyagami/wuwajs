"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareTeammateDieCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareTeammateDieCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCompareTeammateDieCondition(e, t) {
    return (t || new CompareTeammateDieCondition()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCompareTeammateDieCondition(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CompareTeammateDieCondition()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  compare(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  dieCount() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCompareTeammateDieCondition(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addDieCount(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endCompareTeammateDieCondition(e) {
    return e.endObject();
  }
  static createCompareTeammateDieCondition(e, t, i, a) {
    CompareTeammateDieCondition.startCompareTeammateDieCondition(e);
    CompareTeammateDieCondition.addType(e, t);
    CompareTeammateDieCondition.addCompare(e, i);
    CompareTeammateDieCondition.addDieCount(e, a);
    return CompareTeammateDieCondition.endCompareTeammateDieCondition(e);
  }
}
exports.CompareTeammateDieCondition = CompareTeammateDieCondition;
//# sourceMappingURL=compare-teammate-die-condition.js.map