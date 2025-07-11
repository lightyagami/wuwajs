"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleExitPlayer = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_exit_vehicle_type_js_1 = require("../fb-action/union-exit-vehicle-type.js");
class VehicleExitPlayer {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsVehicleExitPlayer(e, t) {
    return (t || new VehicleExitPlayer()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsVehicleExitPlayer(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new VehicleExitPlayer()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  destroyVehicle() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  exitTypeType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_exit_vehicle_type_js_1.UnionExitVehicleType.NONE;
    }
  }
  exitType(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startVehicleExitPlayer(e) {
    e.startObject(3);
  }
  static addDestroyVehicle(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addExitTypeType(e, t) {
    e.addFieldInt8(1, t, union_exit_vehicle_type_js_1.UnionExitVehicleType.NONE);
  }
  static addExitType(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endVehicleExitPlayer(e) {
    return e.endObject();
  }
  static createVehicleExitPlayer(e, t, i, r) {
    VehicleExitPlayer.startVehicleExitPlayer(e);
    VehicleExitPlayer.addDestroyVehicle(e, t);
    VehicleExitPlayer.addExitTypeType(e, i);
    VehicleExitPlayer.addExitType(e, r);
    return VehicleExitPlayer.endVehicleExitPlayer(e);
  }
}
exports.VehicleExitPlayer = VehicleExitPlayer;
//# sourceMappingURL=vehicle-exit-player.js.map