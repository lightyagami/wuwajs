"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckIsPlayerUsingVehicle = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
class CheckIsPlayerUsingVehicle {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsCheckIsPlayerUsingVehicle(e, i) {
    return (i || new CheckIsPlayerUsingVehicle()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCheckIsPlayerUsingVehicle(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CheckIsPlayerUsingVehicle()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
    } else {
      return undefined;
    }
  }
  vehicleType(e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
    } else {
      return undefined;
    }
  }
  checkType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  onlinePlayerConditionTargetOptionType() {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE;
    }
  }
  onlinePlayerConditionTargetOption(e) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__union(e, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startCheckIsPlayerUsingVehicle(e) {
    e.startObject(5);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static addVehicleType(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static addCheckType(e, i) {
    e.addFieldInt8(2, +i, 0);
  }
  static addOnlinePlayerConditionTargetOptionType(e, i) {
    e.addFieldInt8(3, i, union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE);
  }
  static addOnlinePlayerConditionTargetOption(e, i) {
    e.addFieldOffset(4, i, 0);
  }
  static endCheckIsPlayerUsingVehicle(e) {
    return e.endObject();
  }
  static createCheckIsPlayerUsingVehicle(e, i, t, s, n, r) {
    CheckIsPlayerUsingVehicle.startCheckIsPlayerUsingVehicle(e);
    CheckIsPlayerUsingVehicle.addType(e, i);
    CheckIsPlayerUsingVehicle.addVehicleType(e, t);
    CheckIsPlayerUsingVehicle.addCheckType(e, s);
    CheckIsPlayerUsingVehicle.addOnlinePlayerConditionTargetOptionType(e, n);
    CheckIsPlayerUsingVehicle.addOnlinePlayerConditionTargetOption(e, r);
    return CheckIsPlayerUsingVehicle.endCheckIsPlayerUsingVehicle(e);
  }
}
exports.CheckIsPlayerUsingVehicle = CheckIsPlayerUsingVehicle;
//# sourceMappingURL=check-is-player-using-vehicle.js.map