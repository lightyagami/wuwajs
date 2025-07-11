"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddBuffToPlayer = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AddBuffToPlayer {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsAddBuffToPlayer(t, s) {
    return (s || new AddBuffToPlayer()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAddBuffToPlayer(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new AddBuffToPlayer()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  buffIds(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.readInt64(this.bb.__vector(this.bb_pos + s) + t * 8);
    } else {
      return BigInt(0);
    }
  }
  buffIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  persistOnDestroyBuffIds(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.readInt64(this.bb.__vector(this.bb_pos + s) + t * 8);
    } else {
      return BigInt(0);
    }
  }
  persistOnDestroyBuffIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startAddBuffToPlayer(t) {
    t.startObject(2);
  }
  static addBuffIds(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static createBuffIdsVector(s, r) {
    s.startVector(8, r.length, 8);
    for (let t = r.length - 1; t >= 0; t--) {
      s.addInt64(r[t]);
    }
    return s.endVector();
  }
  static startBuffIdsVector(t, s) {
    t.startVector(8, s, 8);
  }
  static addPersistOnDestroyBuffIds(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createPersistOnDestroyBuffIdsVector(s, r) {
    s.startVector(8, r.length, 8);
    for (let t = r.length - 1; t >= 0; t--) {
      s.addInt64(r[t]);
    }
    return s.endVector();
  }
  static startPersistOnDestroyBuffIdsVector(t, s) {
    t.startVector(8, s, 8);
  }
  static endAddBuffToPlayer(t) {
    return t.endObject();
  }
  static createAddBuffToPlayer(t, s, r) {
    AddBuffToPlayer.startAddBuffToPlayer(t);
    AddBuffToPlayer.addBuffIds(t, s);
    AddBuffToPlayer.addPersistOnDestroyBuffIds(t, r);
    return AddBuffToPlayer.endAddBuffToPlayer(t);
  }
}
exports.AddBuffToPlayer = AddBuffToPlayer;
//# sourceMappingURL=add-buff-to-player.js.map