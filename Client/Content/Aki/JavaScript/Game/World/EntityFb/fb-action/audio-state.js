"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AudioState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsAudioState(t, e) {
    return (e || new AudioState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAudioState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new AudioState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  group(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startAudioState(t) {
    t.startObject(2);
  }
  static addGroup(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endAudioState(t) {
    return t.endObject();
  }
  static createAudioState(t, e, i) {
    AudioState.startAudioState(t);
    AudioState.addGroup(t, e);
    AudioState.addState(t, i);
    return AudioState.endAudioState(t);
  }
}
exports.AudioState = AudioState;
//# sourceMappingURL=audio-state.js.map