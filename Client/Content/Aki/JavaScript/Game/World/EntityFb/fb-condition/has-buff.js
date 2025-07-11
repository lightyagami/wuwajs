"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HasBuff = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
class HasBuff {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsHasBuff(t, i) {
    return (i || new HasBuff()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHasBuff(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new HasBuff()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  buffId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt64(this.bb_pos + t);
    } else {
      return BigInt("0");
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
  onlinePlayerConditionTargetOptionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE;
    }
  }
  onlinePlayerConditionTargetOption(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startHasBuff(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBuffId(t, i) {
    t.addFieldInt64(1, i, BigInt("0"));
  }
  static addCompare(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addOnlinePlayerConditionTargetOptionType(t, i) {
    t.addFieldInt8(3, i, union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE);
  }
  static addOnlinePlayerConditionTargetOption(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endHasBuff(t) {
    return t.endObject();
  }
  static createHasBuff(t, i, s, e, n, a) {
    HasBuff.startHasBuff(t);
    HasBuff.addType(t, i);
    HasBuff.addBuffId(t, s);
    HasBuff.addCompare(t, e);
    HasBuff.addOnlinePlayerConditionTargetOptionType(t, n);
    HasBuff.addOnlinePlayerConditionTargetOption(t, a);
    return HasBuff.endHasBuff(t);
  }
}
exports.HasBuff = HasBuff;
//# sourceMappingURL=has-buff.js.map