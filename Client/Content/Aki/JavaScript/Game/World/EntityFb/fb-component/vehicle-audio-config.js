"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleAudioConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VehicleAudioConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, e) {
    this.bb_pos = i;
    this.bb = e;
    return this;
  }
  static getRootAsVehicleAudioConfig(i, e) {
    return (e || new VehicleAudioConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsVehicleAudioConfig(i, e) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new VehicleAudioConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  minVehicleSpeed() {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readFloat32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  maxVehicleSpeed() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readFloat32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  audioEvent(i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, i);
    } else {
      return undefined;
    }
  }
  static startVehicleAudioConfig(i) {
    i.startObject(3);
  }
  static addMinVehicleSpeed(i, e) {
    i.addFieldFloat32(0, e, 0);
  }
  static addMaxVehicleSpeed(i, e) {
    i.addFieldFloat32(1, e, 0);
  }
  static addAudioEvent(i, e) {
    i.addFieldOffset(2, e, 0);
  }
  static endVehicleAudioConfig(i) {
    return i.endObject();
  }
  static createVehicleAudioConfig(i, e, t, o) {
    VehicleAudioConfig.startVehicleAudioConfig(i);
    VehicleAudioConfig.addMinVehicleSpeed(i, e);
    VehicleAudioConfig.addMaxVehicleSpeed(i, t);
    VehicleAudioConfig.addAudioEvent(i, o);
    return VehicleAudioConfig.endVehicleAudioConfig(i);
  }
}
exports.VehicleAudioConfig = VehicleAudioConfig;
//# sourceMappingURL=vehicle-audio-config.js.map