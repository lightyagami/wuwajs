"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayVoicePassengersConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayVoicePassengersConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(s, e) {
    this.bb_pos = s;
    this.bb = e;
    return this;
  }
  static getRootAsPlayVoicePassengersConfig(s, e) {
    return (e || new PlayVoicePassengersConfig()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  static getSizePrefixedRootAsPlayVoicePassengersConfig(s, e) {
    s.setPosition(s.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PlayVoicePassengersConfig()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  passengers(s) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + s * 4);
    } else {
      return 0;
    }
  }
  passengersLength() {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__vector_len(this.bb_pos + s);
    } else {
      return 0;
    }
  }
  passengersArray() {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + s), this.bb.__vector_len(this.bb_pos + s));
    } else {
      return undefined;
    }
  }
  matchNone() {
    var s = this.bb.__offset(this.bb_pos, 6);
    return !!s && !!this.bb.readInt8(this.bb_pos + s);
  }
  static startPlayVoicePassengersConfig(s) {
    s.startObject(2);
  }
  static addPassengers(s, e) {
    s.addFieldOffset(0, e, 0);
  }
  static createPassengersVector(e, t) {
    e.startVector(4, t.length, 4);
    for (let s = t.length - 1; s >= 0; s--) {
      e.addInt32(t[s]);
    }
    return e.endVector();
  }
  static startPassengersVector(s, e) {
    s.startVector(4, e, 4);
  }
  static addMatchNone(s, e) {
    s.addFieldInt8(1, +e, 0);
  }
  static endPlayVoicePassengersConfig(s) {
    return s.endObject();
  }
  static createPlayVoicePassengersConfig(s, e, t) {
    PlayVoicePassengersConfig.startPlayVoicePassengersConfig(s);
    PlayVoicePassengersConfig.addPassengers(s, e);
    PlayVoicePassengersConfig.addMatchNone(s, t);
    return PlayVoicePassengersConfig.endPlayVoicePassengersConfig(s);
  }
}
exports.PlayVoicePassengersConfig = PlayVoicePassengersConfig;
//# sourceMappingURL=play-voice-passengers-config.js.map