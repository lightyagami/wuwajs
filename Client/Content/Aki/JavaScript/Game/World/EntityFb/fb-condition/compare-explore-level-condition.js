"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareExploreLevelCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareExploreLevelCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCompareExploreLevelCondition(e, t) {
    return (t || new CompareExploreLevelCondition()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCompareExploreLevelCondition(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CompareExploreLevelCondition()).__init(e.readInt32(e.position()) + e.position(), e);
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
  level() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCompareExploreLevelCondition(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addLevel(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endCompareExploreLevelCondition(e) {
    return e.endObject();
  }
  static createCompareExploreLevelCondition(e, t, o, i) {
    CompareExploreLevelCondition.startCompareExploreLevelCondition(e);
    CompareExploreLevelCondition.addType(e, t);
    CompareExploreLevelCondition.addCompare(e, o);
    CompareExploreLevelCondition.addLevel(e, i);
    return CompareExploreLevelCondition.endCompareExploreLevelCondition(e);
  }
}
exports.CompareExploreLevelCondition = CompareExploreLevelCondition;
//# sourceMappingURL=compare-explore-level-condition.js.map