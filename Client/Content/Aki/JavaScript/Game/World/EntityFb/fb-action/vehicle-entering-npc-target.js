"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleEnteringNpcTarget = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VehicleEnteringNpcTarget {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsVehicleEnteringNpcTarget(e, t) {
    return (t || new VehicleEnteringNpcTarget()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsVehicleEnteringNpcTarget(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new VehicleEnteringNpcTarget()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  targetVehicle() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  targetNpc() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startVehicleEnteringNpcTarget(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTargetVehicle(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addTargetNpc(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endVehicleEnteringNpcTarget(e) {
    return e.endObject();
  }
  static createVehicleEnteringNpcTarget(e, t, i, r) {
    VehicleEnteringNpcTarget.startVehicleEnteringNpcTarget(e);
    VehicleEnteringNpcTarget.addType(e, t);
    VehicleEnteringNpcTarget.addTargetVehicle(e, i);
    VehicleEnteringNpcTarget.addTargetNpc(e, r);
    return VehicleEnteringNpcTarget.endVehicleEnteringNpcTarget(e);
  }
}
exports.VehicleEnteringNpcTarget = VehicleEnteringNpcTarget;
//# sourceMappingURL=vehicle-entering-npc-target.js.map