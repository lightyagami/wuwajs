"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioVehicleFeature = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vehicle_audio_config_js_1 = require("../fb-component/vehicle-audio-config.js");
class AudioVehicleFeature {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsAudioVehicleFeature(e, t) {
    return (t || new AudioVehicleFeature()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsAudioVehicleFeature(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new AudioVehicleFeature()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  audioConfigs(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return (e || new vehicle_audio_config_js_1.VehicleAudioConfig()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  static startAudioVehicleFeature(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addAudioConfigs(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endAudioVehicleFeature(e) {
    return e.endObject();
  }
}
exports.AudioVehicleFeature = AudioVehicleFeature;
//# sourceMappingURL=audio-vehicle-feature.js.map