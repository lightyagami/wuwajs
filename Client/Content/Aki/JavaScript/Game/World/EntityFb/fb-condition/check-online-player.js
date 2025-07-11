"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckOnlinePlayer = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
class CheckOnlinePlayer {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, n) {
    this.bb_pos = e;
    this.bb = n;
    return this;
  }
  static getRootAsCheckOnlinePlayer(e, n) {
    return (n || new CheckOnlinePlayer()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCheckOnlinePlayer(e, n) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new CheckOnlinePlayer()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var n = this.bb.__offset(this.bb_pos, 4);
    if (n) {
      return this.bb.__string(this.bb_pos + n, e);
    } else {
      return undefined;
    }
  }
  onlinePlayerConditionTargetOptionType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE;
    }
  }
  onlinePlayerConditionTargetOption(e) {
    var n = this.bb.__offset(this.bb_pos, 8);
    if (n) {
      return this.bb.__union(e, this.bb_pos + n);
    } else {
      return undefined;
    }
  }
  static startCheckOnlinePlayer(e) {
    e.startObject(3);
  }
  static addType(e, n) {
    e.addFieldOffset(0, n, 0);
  }
  static addOnlinePlayerConditionTargetOptionType(e, n) {
    e.addFieldInt8(1, n, union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE);
  }
  static addOnlinePlayerConditionTargetOption(e, n) {
    e.addFieldOffset(2, n, 0);
  }
  static endCheckOnlinePlayer(e) {
    return e.endObject();
  }
  static createCheckOnlinePlayer(e, n, t, i) {
    CheckOnlinePlayer.startCheckOnlinePlayer(e);
    CheckOnlinePlayer.addType(e, n);
    CheckOnlinePlayer.addOnlinePlayerConditionTargetOptionType(e, t);
    CheckOnlinePlayer.addOnlinePlayerConditionTargetOption(e, i);
    return CheckOnlinePlayer.endCheckOnlinePlayer(e);
  }
}
exports.CheckOnlinePlayer = CheckOnlinePlayer;
//# sourceMappingURL=check-online-player.js.map