"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkSequenceTransition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkSequenceTransition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsTalkSequenceTransition(e, t) {
    return (t || new TalkSequenceTransition()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsTalkSequenceTransition(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new TalkSequenceTransition()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  optionText(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  optionTextKey(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  nextSequenceIndex() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startTalkSequenceTransition(e) {
    e.startObject(3);
  }
  static addOptionText(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addOptionTextKey(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addNextSequenceIndex(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endTalkSequenceTransition(e) {
    return e.endObject();
  }
  static createTalkSequenceTransition(e, t, i, n) {
    TalkSequenceTransition.startTalkSequenceTransition(e);
    TalkSequenceTransition.addOptionText(e, t);
    TalkSequenceTransition.addOptionTextKey(e, i);
    TalkSequenceTransition.addNextSequenceIndex(e, n);
    return TalkSequenceTransition.endTalkSequenceTransition(e);
  }
}
exports.TalkSequenceTransition = TalkSequenceTransition;
//# sourceMappingURL=talk-sequence-transition.js.map