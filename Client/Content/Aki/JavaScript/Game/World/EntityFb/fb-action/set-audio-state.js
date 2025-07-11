"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetAudioState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const audio_state_js_1 = require("../fb-action/audio-state.js");
class SetAudioState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetAudioState(t, e) {
    return (e || new SetAudioState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetAudioState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetAudioState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  audioConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return (t || new audio_state_js_1.AudioState()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startSetAudioState(t) {
    t.startObject(1);
  }
  static addAudioConfig(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSetAudioState(t) {
    return t.endObject();
  }
  static createSetAudioState(t, e) {
    SetAudioState.startSetAudioState(t);
    SetAudioState.addAudioConfig(t, e);
    return SetAudioState.endSetAudioState(t);
  }
}
exports.SetAudioState = SetAudioState;
//# sourceMappingURL=set-audio-state.js.map