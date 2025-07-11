"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetLevelPlay = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ResetLevelPlay {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsResetLevelPlay(e, t) {
    return (t || new ResetLevelPlay()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsResetLevelPlay(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ResetLevelPlay()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  resetLevelPlayList(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + t) + e * 4);
    } else {
      return 0;
    }
  }
  resetLevelPlayListLength() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  resetLevelPlayListArray() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + e), this.bb.__vector_len(this.bb_pos + e));
    } else {
      return undefined;
    }
  }
  static startResetLevelPlay(e) {
    e.startObject(1);
  }
  static addResetLevelPlayList(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static createResetLevelPlayListVector(t, s) {
    t.startVector(4, s.length, 4);
    for (let e = s.length - 1; e >= 0; e--) {
      t.addInt32(s[e]);
    }
    return t.endVector();
  }
  static startResetLevelPlayListVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endResetLevelPlay(e) {
    return e.endObject();
  }
  static createResetLevelPlay(e, t) {
    ResetLevelPlay.startResetLevelPlay(e);
    ResetLevelPlay.addResetLevelPlayList(e, t);
    return ResetLevelPlay.endResetLevelPlay(e);
  }
}
exports.ResetLevelPlay = ResetLevelPlay;
//# sourceMappingURL=reset-level-play.js.map