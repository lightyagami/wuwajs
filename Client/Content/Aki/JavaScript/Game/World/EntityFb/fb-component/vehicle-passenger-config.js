"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehiclePassengerConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VehiclePassengerConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, s) {
    this.bb_pos = e;
    this.bb = s;
    return this;
  }
  static getRootAsVehiclePassengerConfig(e, s) {
    return (s || new VehiclePassengerConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsVehiclePassengerConfig(e, s) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new VehiclePassengerConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  passengerNpc() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  seat() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startVehiclePassengerConfig(e) {
    e.startObject(2);
  }
  static addPassengerNpc(e, s) {
    e.addFieldInt32(0, s, 0);
  }
  static addSeat(e, s) {
    e.addFieldInt32(1, s, 0);
  }
  static endVehiclePassengerConfig(e) {
    return e.endObject();
  }
  static createVehiclePassengerConfig(e, s, t) {
    VehiclePassengerConfig.startVehiclePassengerConfig(e);
    VehiclePassengerConfig.addPassengerNpc(e, s);
    VehiclePassengerConfig.addSeat(e, t);
    return VehiclePassengerConfig.endVehiclePassengerConfig(e);
  }
}
exports.VehiclePassengerConfig = VehiclePassengerConfig;
//# sourceMappingURL=vehicle-passenger-config.js.map