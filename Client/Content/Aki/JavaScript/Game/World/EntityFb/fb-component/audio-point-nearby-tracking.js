"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioPointNearbyTracking = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AudioPointNearbyTracking {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsAudioPointNearbyTracking(i, t) {
    return (t || new AudioPointNearbyTracking()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsAudioPointNearbyTracking(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new AudioPointNearbyTracking()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  nearRadius() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  middleRadius() {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  farRadius() {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  static startAudioPointNearbyTracking(i) {
    i.startObject(4);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addNearRadius(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static addMiddleRadius(i, t) {
    i.addFieldInt32(2, t, 0);
  }
  static addFarRadius(i, t) {
    i.addFieldInt32(3, t, 0);
  }
  static endAudioPointNearbyTracking(i) {
    return i.endObject();
  }
  static createAudioPointNearbyTracking(i, t, r, a, e) {
    AudioPointNearbyTracking.startAudioPointNearbyTracking(i);
    AudioPointNearbyTracking.addType(i, t);
    AudioPointNearbyTracking.addNearRadius(i, r);
    AudioPointNearbyTracking.addMiddleRadius(i, a);
    AudioPointNearbyTracking.addFarRadius(i, e);
    return AudioPointNearbyTracking.endAudioPointNearbyTracking(i);
  }
}
exports.AudioPointNearbyTracking = AudioPointNearbyTracking;
//# sourceMappingURL=audio-point-nearby-tracking.js.map