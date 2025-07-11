"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareLevelPlayRewardStateCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareLevelPlayRewardStateCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCompareLevelPlayRewardStateCondition(e, t) {
    return (t || new CompareLevelPlayRewardStateCondition()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCompareLevelPlayRewardStateCondition(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CompareLevelPlayRewardStateCondition()).__init(e.readInt32(e.position()) + e.position(), e);
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
  static startCompareLevelPlayRewardStateCondition(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endCompareLevelPlayRewardStateCondition(e) {
    return e.endObject();
  }
  static createCompareLevelPlayRewardStateCondition(e, t, a) {
    CompareLevelPlayRewardStateCondition.startCompareLevelPlayRewardStateCondition(e);
    CompareLevelPlayRewardStateCondition.addType(e, t);
    CompareLevelPlayRewardStateCondition.addCompare(e, a);
    return CompareLevelPlayRewardStateCondition.endCompareLevelPlayRewardStateCondition(e);
  }
}
exports.CompareLevelPlayRewardStateCondition = CompareLevelPlayRewardStateCondition;
//# sourceMappingURL=compare-level-play-reward-state-condition.js.map