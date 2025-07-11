"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const passenger_teleport_config_js_1 = require("../fb-component/passenger-teleport-config.js");
const vehicle_passenger_config_js_1 = require("../fb-component/vehicle-passenger-config.js");
class VehicleComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsVehicleComponent(t, e) {
    return (e || new VehicleComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsVehicleComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new VehicleComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  config(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  vehicleBornTag(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  vehicleBornTagLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  vehicleBornTagArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  vehicleRiddenTag(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  vehicleRiddenTagLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  vehicleRiddenTagArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  roleRiddingTag(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  roleRiddingTagLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  roleRiddingTagArray() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  teleportPlayersWhenDestroyed(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    if (e) {
      return (t || new passenger_teleport_config_js_1.PassengerTeleportConfig()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  vehicleFeaturesType(t) {
    var e = this.bb.__offset(this.bb_pos, 16);
    if (e) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + e) + t);
    } else {
      return 0;
    }
  }
  vehicleFeaturesTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  vehicleFeaturesTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  vehicleFeatures(t, e) {
    var i = this.bb.__offset(this.bb_pos, 18);
    if (i) {
      return this.bb.__union(e, this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return undefined;
    }
  }
  vehicleFeaturesLength() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  seatCount() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  driverSeat() {
    var t = this.bb.__offset(this.bb_pos, 22);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  defaultPassengers(t, e) {
    var i = this.bb.__offset(this.bb_pos, 24);
    if (i) {
      return (e || new vehicle_passenger_config_js_1.VehiclePassengerConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  defaultPassengersLength() {
    var t = this.bb.__offset(this.bb_pos, 24);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startVehicleComponent(t) {
    t.startObject(11);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addVehicleBornTag(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createVehicleBornTagVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addInt32(i[t]);
    }
    return e.endVector();
  }
  static startVehicleBornTagVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addVehicleRiddenTag(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createVehicleRiddenTagVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addInt32(i[t]);
    }
    return e.endVector();
  }
  static startVehicleRiddenTagVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addRoleRiddingTag(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createRoleRiddingTagVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addInt32(i[t]);
    }
    return e.endVector();
  }
  static startRoleRiddingTagVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addTeleportPlayersWhenDestroyed(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addVehicleFeaturesType(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static createVehicleFeaturesTypeVector(e, i) {
    e.startVector(1, i.length, 1);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addInt8(i[t]);
    }
    return e.endVector();
  }
  static startVehicleFeaturesTypeVector(t, e) {
    t.startVector(1, e, 1);
  }
  static addVehicleFeatures(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static createVehicleFeaturesVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startVehicleFeaturesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addSeatCount(t, e) {
    t.addFieldInt8(8, e, 0);
  }
  static addDriverSeat(t, e) {
    t.addFieldInt32(9, e, 0);
  }
  static addDefaultPassengers(t, e) {
    t.addFieldOffset(10, e, 0);
  }
  static createDefaultPassengersVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startDefaultPassengersVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endVehicleComponent(t) {
    return t.endObject();
  }
}
exports.VehicleComponent = VehicleComponent;
//# sourceMappingURL=vehicle-component.js.map