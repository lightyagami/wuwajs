"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckPlayerStateRestrictionCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
class CheckPlayerStateRestrictionCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCheckPlayerStateRestrictionCondition(t, i) {
    return (i || new CheckPlayerStateRestrictionCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckPlayerStateRestrictionCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CheckPlayerStateRestrictionCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  restrictionId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  onlinePlayerConditionTargetOptionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE;
    }
  }
  onlinePlayerConditionTargetOption(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startCheckPlayerStateRestrictionCondition(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addRestrictionId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addOnlinePlayerConditionTargetOptionType(t, i) {
    t.addFieldInt8(2, i, union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE);
  }
  static addOnlinePlayerConditionTargetOption(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endCheckPlayerStateRestrictionCondition(t) {
    return t.endObject();
  }
  static createCheckPlayerStateRestrictionCondition(t, i, e, n, o) {
    CheckPlayerStateRestrictionCondition.startCheckPlayerStateRestrictionCondition(t);
    CheckPlayerStateRestrictionCondition.addType(t, i);
    CheckPlayerStateRestrictionCondition.addRestrictionId(t, e);
    CheckPlayerStateRestrictionCondition.addOnlinePlayerConditionTargetOptionType(t, n);
    CheckPlayerStateRestrictionCondition.addOnlinePlayerConditionTargetOption(t, o);
    return CheckPlayerStateRestrictionCondition.endCheckPlayerStateRestrictionCondition(t);
  }
}
exports.CheckPlayerStateRestrictionCondition = CheckPlayerStateRestrictionCondition;
//# sourceMappingURL=check-player-state-restriction-condition.js.map