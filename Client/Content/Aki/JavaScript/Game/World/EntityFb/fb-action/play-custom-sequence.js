"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayCustomSequence = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayCustomSequence {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPlayCustomSequence(t, e) {
    return (e || new PlayCustomSequence()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPlayCustomSequence(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PlayCustomSequence()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  customSeqId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  whoIds(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  whoIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  whoIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  resetCamera() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startPlayCustomSequence(t) {
    t.startObject(3);
  }
  static addCustomSeqId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addWhoIds(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createWhoIdsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addInt32(s[t]);
    }
    return e.endVector();
  }
  static startWhoIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addResetCamera(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endPlayCustomSequence(t) {
    return t.endObject();
  }
  static createPlayCustomSequence(t, e, s, r) {
    PlayCustomSequence.startPlayCustomSequence(t);
    PlayCustomSequence.addCustomSeqId(t, e);
    PlayCustomSequence.addWhoIds(t, s);
    PlayCustomSequence.addResetCamera(t, r);
    return PlayCustomSequence.endPlayCustomSequence(t);
  }
}
exports.PlayCustomSequence = PlayCustomSequence;
//# sourceMappingURL=play-custom-sequence.js.map