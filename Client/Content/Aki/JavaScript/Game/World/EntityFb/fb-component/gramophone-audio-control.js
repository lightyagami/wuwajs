"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GramophoneAudioControl = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GramophoneAudioControl {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(o, t) {
    this.bb_pos = o;
    this.bb = t;
    return this;
  }
  static getRootAsGramophoneAudioControl(o, t) {
    return (t || new GramophoneAudioControl()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  static getSizePrefixedRootAsGramophoneAudioControl(o, t) {
    o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new GramophoneAudioControl()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  type(o) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, o);
    } else {
      return undefined;
    }
  }
  static startGramophoneAudioControl(o) {
    o.startObject(1);
  }
  static addType(o, t) {
    o.addFieldOffset(0, t, 0);
  }
  static endGramophoneAudioControl(o) {
    return o.endObject();
  }
  static createGramophoneAudioControl(o, t) {
    GramophoneAudioControl.startGramophoneAudioControl(o);
    GramophoneAudioControl.addType(o, t);
    return GramophoneAudioControl.endGramophoneAudioControl(o);
  }
}
exports.GramophoneAudioControl = GramophoneAudioControl;
//# sourceMappingURL=gramophone-audio-control.js.map