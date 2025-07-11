"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareFishingPrestigeLevelCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareFishingPrestigeLevelCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsCompareFishingPrestigeLevelCondition(e, i) {
    return (i || new CompareFishingPrestigeLevelCondition()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCompareFishingPrestigeLevelCondition(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CompareFishingPrestigeLevelCondition()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
    } else {
      return undefined;
    }
  }
  compare(e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
    } else {
      return undefined;
    }
  }
  prestigeLevel() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCompareFishingPrestigeLevelCondition(e) {
    e.startObject(3);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static addCompare(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static addPrestigeLevel(e, i) {
    e.addFieldInt32(2, i, 0);
  }
  static endCompareFishingPrestigeLevelCondition(e) {
    return e.endObject();
  }
  static createCompareFishingPrestigeLevelCondition(e, i, t, s) {
    CompareFishingPrestigeLevelCondition.startCompareFishingPrestigeLevelCondition(e);
    CompareFishingPrestigeLevelCondition.addType(e, i);
    CompareFishingPrestigeLevelCondition.addCompare(e, t);
    CompareFishingPrestigeLevelCondition.addPrestigeLevel(e, s);
    return CompareFishingPrestigeLevelCondition.endCompareFishingPrestigeLevelCondition(e);
  }
}
exports.CompareFishingPrestigeLevelCondition = CompareFishingPrestigeLevelCondition;
//# sourceMappingURL=compare-fishing-prestige-level-condition.js.map