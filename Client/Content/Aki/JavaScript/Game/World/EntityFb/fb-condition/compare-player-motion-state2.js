"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComparePlayerMotionState2 = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
class ComparePlayerMotionState2 {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsComparePlayerMotionState2(t, e) {
    return (e || new ComparePlayerMotionState2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsComparePlayerMotionState2(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ComparePlayerMotionState2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  motionState(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
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
  onlinePlayerConditionTargetOptionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE;
    }
  }
  onlinePlayerConditionTargetOption(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startComparePlayerMotionState2(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMotionState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addOnlinePlayerConditionTargetOptionType(t, e) {
    t.addFieldInt8(3, e, union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE);
  }
  static addOnlinePlayerConditionTargetOption(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endComparePlayerMotionState2(t) {
    return t.endObject();
  }
  static createComparePlayerMotionState2(t, e, o, i, a, r) {
    ComparePlayerMotionState2.startComparePlayerMotionState2(t);
    ComparePlayerMotionState2.addType(t, e);
    ComparePlayerMotionState2.addMotionState(t, o);
    ComparePlayerMotionState2.addCompare(t, i);
    ComparePlayerMotionState2.addOnlinePlayerConditionTargetOptionType(t, a);
    ComparePlayerMotionState2.addOnlinePlayerConditionTargetOption(t, r);
    return ComparePlayerMotionState2.endComparePlayerMotionState2(t);
  }
}
exports.ComparePlayerMotionState2 = ComparePlayerMotionState2;
//# sourceMappingURL=compare-player-motion-state2.js.map