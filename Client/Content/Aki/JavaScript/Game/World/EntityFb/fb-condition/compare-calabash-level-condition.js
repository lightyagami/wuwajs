"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareCalabashLevelCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareCalabashLevelCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(a, e) {
    this.bb_pos = a;
    this.bb = e;
    return this;
  }
  static getRootAsCompareCalabashLevelCondition(a, e) {
    return (e || new CompareCalabashLevelCondition()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  static getSizePrefixedRootAsCompareCalabashLevelCondition(a, e) {
    a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CompareCalabashLevelCondition()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  type(a) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, a);
    } else {
      return undefined;
    }
  }
  compare(a) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, a);
    } else {
      return undefined;
    }
  }
  calabashLevel() {
    var a = this.bb.__offset(this.bb_pos, 8);
    if (a) {
      return this.bb.readInt32(this.bb_pos + a);
    } else {
      return 0;
    }
  }
  static startCompareCalabashLevelCondition(a) {
    a.startObject(3);
  }
  static addType(a, e) {
    a.addFieldOffset(0, e, 0);
  }
  static addCompare(a, e) {
    a.addFieldOffset(1, e, 0);
  }
  static addCalabashLevel(a, e) {
    a.addFieldInt32(2, e, 0);
  }
  static endCompareCalabashLevelCondition(a) {
    return a.endObject();
  }
  static createCompareCalabashLevelCondition(a, e, t, i) {
    CompareCalabashLevelCondition.startCompareCalabashLevelCondition(a);
    CompareCalabashLevelCondition.addType(a, e);
    CompareCalabashLevelCondition.addCompare(a, t);
    CompareCalabashLevelCondition.addCalabashLevel(a, i);
    return CompareCalabashLevelCondition.endCompareCalabashLevelCondition(a);
  }
}
exports.CompareCalabashLevelCondition = CompareCalabashLevelCondition;
//# sourceMappingURL=compare-calabash-level-condition.js.map