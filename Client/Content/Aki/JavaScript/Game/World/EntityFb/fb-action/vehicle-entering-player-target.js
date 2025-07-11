"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleEnteringPlayerTarget = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VehicleEnteringPlayerTarget {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsVehicleEnteringPlayerTarget(e, t) {
    return (t || new VehicleEnteringPlayerTarget()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsVehicleEnteringPlayerTarget(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new VehicleEnteringPlayerTarget()).__init(e.readInt32(e.position()) + e.position(), e);
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
  static startVehicleEnteringPlayerTarget(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTargetVehicle(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endVehicleEnteringPlayerTarget(e) {
    return e.endObject();
  }
  static createVehicleEnteringPlayerTarget(e, t, r) {
    VehicleEnteringPlayerTarget.startVehicleEnteringPlayerTarget(e);
    VehicleEnteringPlayerTarget.addType(e, t);
    VehicleEnteringPlayerTarget.addTargetVehicle(e, r);
    return VehicleEnteringPlayerTarget.endVehicleEnteringPlayerTarget(e);
  }
}
exports.VehicleEnteringPlayerTarget = VehicleEnteringPlayerTarget;
//# sourceMappingURL=vehicle-entering-player-target.js.map