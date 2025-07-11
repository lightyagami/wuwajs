"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckIsGramophonePlayingMusic = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const gramophone_check_condition_js_1 = require("../fb-condition/gramophone-check-condition.js");
class CheckIsGramophonePlayingMusic {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCheckIsGramophonePlayingMusic(t, i) {
    return (i || new CheckIsGramophonePlayingMusic()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckIsGramophonePlayingMusic(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CheckIsGramophonePlayingMusic()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  targetGramophone() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  checkCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new gramophone_check_condition_js_1.GramophoneCheckCondition()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startCheckIsGramophonePlayingMusic(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTargetGramophone(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addCheckCondition(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endCheckIsGramophonePlayingMusic(t) {
    return t.endObject();
  }
}
exports.CheckIsGramophonePlayingMusic = CheckIsGramophonePlayingMusic;
//# sourceMappingURL=check-is-gramophone-playing-music.js.map