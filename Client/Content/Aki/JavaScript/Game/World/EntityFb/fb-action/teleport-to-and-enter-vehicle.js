"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportToAndEnterVehicle = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_teleport_to_and_enter_vehicle_type_js_1 = require("../fb-action/union-teleport-to-and-enter-vehicle-type.js");
class TeleportToAndEnterVehicle {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsTeleportToAndEnterVehicle(e, t) {
    return (t || new TeleportToAndEnterVehicle()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsTeleportToAndEnterVehicle(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new TeleportToAndEnterVehicle()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  toVehicleType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_teleport_to_and_enter_vehicle_type_js_1.UnionTeleportToAndEnterVehicleType.NONE;
    }
  }
  toVehicle(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startTeleportToAndEnterVehicle(e) {
    e.startObject(2);
  }
  static addToVehicleType(e, t) {
    e.addFieldInt8(0, t, union_teleport_to_and_enter_vehicle_type_js_1.UnionTeleportToAndEnterVehicleType.NONE);
  }
  static addToVehicle(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endTeleportToAndEnterVehicle(e) {
    return e.endObject();
  }
  static createTeleportToAndEnterVehicle(e, t, r) {
    TeleportToAndEnterVehicle.startTeleportToAndEnterVehicle(e);
    TeleportToAndEnterVehicle.addToVehicleType(e, t);
    TeleportToAndEnterVehicle.addToVehicle(e, r);
    return TeleportToAndEnterVehicle.endTeleportToAndEnterVehicle(e);
  }
}
exports.TeleportToAndEnterVehicle = TeleportToAndEnterVehicle;
//# sourceMappingURL=teleport-to-and-enter-vehicle.js.map