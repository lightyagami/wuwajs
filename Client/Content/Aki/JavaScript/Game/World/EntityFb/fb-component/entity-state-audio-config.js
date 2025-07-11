"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityStateAudioConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const audio_fade_js_1 = require("../fb-component/audio-fade.js");
class EntityStateAudioConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEntityStateAudioConfig(t, i) {
    return (i || new EntityStateAudioConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityStateAudioConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EntityStateAudioConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  akEvent(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  leaveAkEvent(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  audioFade(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return (t || new audio_fade_js_1.AudioFade()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startEntityStateAudioConfig(t) {
    t.startObject(4);
  }
  static addState(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addAkEvent(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addLeaveAkEvent(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addAudioFade(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endEntityStateAudioConfig(t) {
    return t.endObject();
  }
}
exports.EntityStateAudioConfig = EntityStateAudioConfig;
//# sourceMappingURL=entity-state-audio-config.js.map