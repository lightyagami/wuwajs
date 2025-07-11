"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointedVehicle = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AppointedVehicle {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsAppointedVehicle(e, t) {
    return (t || new AppointedVehicle()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsAppointedVehicle(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new AppointedVehicle()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  vehicleId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startAppointedVehicle(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addVehicleId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endAppointedVehicle(e) {
    return e.endObject();
  }
  static createAppointedVehicle(e, t, i) {
    AppointedVehicle.startAppointedVehicle(e);
    AppointedVehicle.addType(e, t);
    AppointedVehicle.addVehicleId(e, i);
    return AppointedVehicle.endAppointedVehicle(e);
  }
}
exports.AppointedVehicle = AppointedVehicle;
//# sourceMappingURL=appointed-vehicle.js.map