"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JumpTalk = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class JumpTalk {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsJumpTalk(t, s) {
    return (s || new JumpTalk()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsJumpTalk(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new JumpTalk()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  talkId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startJumpTalk(t) {
    t.startObject(1);
  }
  static addTalkId(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static endJumpTalk(t) {
    return t.endObject();
  }
  static createJumpTalk(t, s) {
    JumpTalk.startJumpTalk(t);
    JumpTalk.addTalkId(t, s);
    return JumpTalk.endJumpTalk(t);
  }
}
exports.JumpTalk = JumpTalk;
//# sourceMappingURL=jump-talk.js.map