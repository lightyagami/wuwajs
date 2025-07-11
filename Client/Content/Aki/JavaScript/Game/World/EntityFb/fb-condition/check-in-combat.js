"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckInCombat = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
class CheckInCombat {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCheckInCombat(t, e) {
    return (e || new CheckInCombat()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckInCombat(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CheckInCombat()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  inCombat() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
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
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startCheckInCombat(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addInCombat(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addOnlinePlayerConditionTargetOptionType(t, e) {
    t.addFieldInt8(2, e, union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE);
  }
  static addOnlinePlayerConditionTargetOption(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endCheckInCombat(t) {
    return t.endObject();
  }
  static createCheckInCombat(t, e, n, i, o) {
    CheckInCombat.startCheckInCombat(t);
    CheckInCombat.addType(t, e);
    CheckInCombat.addInCombat(t, n);
    CheckInCombat.addOnlinePlayerConditionTargetOptionType(t, i);
    CheckInCombat.addOnlinePlayerConditionTargetOption(t, o);
    return CheckInCombat.endCheckInCombat(t);
  }
}
exports.CheckInCombat = CheckInCombat;
//# sourceMappingURL=check-in-combat.js.map