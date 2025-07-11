"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleMontagePlayConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VehicleMontagePlayConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsVehicleMontagePlayConfig(e, t) {
    return (t || new VehicleMontagePlayConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsVehicleMontagePlayConfig(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new VehicleMontagePlayConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  minMontageSpeedFactor() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  maxMontageSpeedFactor() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  minVehicleSpeed() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  maxVehicleSpeed() {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  targetState(e) {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startVehicleMontagePlayConfig(e) {
    e.startObject(5);
  }
  static addMinMontageSpeedFactor(e, t) {
    e.addFieldFloat32(0, t, 0);
  }
  static addMaxMontageSpeedFactor(e, t) {
    e.addFieldFloat32(1, t, 0);
  }
  static addMinVehicleSpeed(e, t) {
    e.addFieldFloat32(2, t, 0);
  }
  static addMaxVehicleSpeed(e, t) {
    e.addFieldFloat32(3, t, 0);
  }
  static addTargetState(e, t) {
    e.addFieldOffset(4, t, 0);
  }
  static endVehicleMontagePlayConfig(e) {
    return e.endObject();
  }
  static createVehicleMontagePlayConfig(e, t, i, a, n, o) {
    VehicleMontagePlayConfig.startVehicleMontagePlayConfig(e);
    VehicleMontagePlayConfig.addMinMontageSpeedFactor(e, t);
    VehicleMontagePlayConfig.addMaxMontageSpeedFactor(e, i);
    VehicleMontagePlayConfig.addMinVehicleSpeed(e, a);
    VehicleMontagePlayConfig.addMaxVehicleSpeed(e, n);
    VehicleMontagePlayConfig.addTargetState(e, o);
    return VehicleMontagePlayConfig.endVehicleMontagePlayConfig(e);
  }
}
exports.VehicleMontagePlayConfig = VehicleMontagePlayConfig;
//# sourceMappingURL=vehicle-montage-play-config.js.map