"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioFade = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AudioFade {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsAudioFade(t, e) {
    return (e || new AudioFade()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAudioFade(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new AudioFade()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  fadeCurve() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  fadeDuration() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startAudioFade(t) {
    t.startObject(2);
  }
  static addFadeCurve(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addFadeDuration(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endAudioFade(t) {
    return t.endObject();
  }
  static createAudioFade(t, e, i) {
    AudioFade.startAudioFade(t);
    AudioFade.addFadeCurve(t, e);
    AudioFade.addFadeDuration(t, i);
    return AudioFade.endAudioFade(t);
  }
}
exports.AudioFade = AudioFade;
//# sourceMappingURL=audio-fade.js.map