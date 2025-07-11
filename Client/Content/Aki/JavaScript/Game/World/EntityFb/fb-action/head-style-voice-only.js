"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadStyleVoiceOnly = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HeadStyleVoiceOnly {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsHeadStyleVoiceOnly(e, t) {
    return (t || new HeadStyleVoiceOnly()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsHeadStyleVoiceOnly(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new HeadStyleVoiceOnly()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  whoId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startHeadStyleVoiceOnly(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addWhoId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endHeadStyleVoiceOnly(e) {
    return e.endObject();
  }
  static createHeadStyleVoiceOnly(e, t, i) {
    HeadStyleVoiceOnly.startHeadStyleVoiceOnly(e);
    HeadStyleVoiceOnly.addType(e, t);
    HeadStyleVoiceOnly.addWhoId(e, i);
    return HeadStyleVoiceOnly.endHeadStyleVoiceOnly(e);
  }
}
exports.HeadStyleVoiceOnly = HeadStyleVoiceOnly;
//# sourceMappingURL=head-style-voice-only.js.map