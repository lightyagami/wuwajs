"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleEnter = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_vehicle_entering_target_js_1 = require("../fb-action/union-vehicle-entering-target.js");
class VehicleEnter {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsVehicleEnter(e, t) {
    return (t || new VehicleEnter()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsVehicleEnter(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new VehicleEnter()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  enteringTargetType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_vehicle_entering_target_js_1.UnionVehicleEnteringTarget.NONE;
    }
  }
  enteringTarget(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  seat() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startVehicleEnter(e) {
    e.startObject(3);
  }
  static addEnteringTargetType(e, t) {
    e.addFieldInt8(0, t, union_vehicle_entering_target_js_1.UnionVehicleEnteringTarget.NONE);
  }
  static addEnteringTarget(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addSeat(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endVehicleEnter(e) {
    return e.endObject();
  }
  static createVehicleEnter(e, t, i, r) {
    VehicleEnter.startVehicleEnter(e);
    VehicleEnter.addEnteringTargetType(e, t);
    VehicleEnter.addEnteringTarget(e, i);
    VehicleEnter.addSeat(e, r);
    return VehicleEnter.endVehicleEnter(e);
  }
}
exports.VehicleEnter = VehicleEnter;
//# sourceMappingURL=vehicle-enter.js.map