"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioEventConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AudioEventConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsAudioEventConfig(t, i) {
    return (i || new AudioEventConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAudioEventConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new AudioEventConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  collectAkEvent(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startAudioEventConfig(t) {
    t.startObject(1);
  }
  static addCollectAkEvent(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endAudioEventConfig(t) {
    return t.endObject();
  }
  static createAudioEventConfig(t, i) {
    AudioEventConfig.startAudioEventConfig(t);
    AudioEventConfig.addCollectAkEvent(t, i);
    return AudioEventConfig.endAudioEventConfig(t);
  }
}
exports.AudioEventConfig = AudioEventConfig;
//# sourceMappingURL=audio-event-config.js.map