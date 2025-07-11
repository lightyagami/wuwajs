"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveBuffFromPlayer = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RemoveBuffFromPlayer {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsRemoveBuffFromPlayer(e, t) {
    return (t || new RemoveBuffFromPlayer()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRemoveBuffFromPlayer(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new RemoveBuffFromPlayer()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  buffIds(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt64(this.bb.__vector(this.bb_pos + t) + e * 8);
    } else {
      return BigInt(0);
    }
  }
  buffIdsLength() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startRemoveBuffFromPlayer(e) {
    e.startObject(1);
  }
  static addBuffIds(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static createBuffIdsVector(t, r) {
    t.startVector(8, r.length, 8);
    for (let e = r.length - 1; e >= 0; e--) {
      t.addInt64(r[e]);
    }
    return t.endVector();
  }
  static startBuffIdsVector(e, t) {
    e.startVector(8, t, 8);
  }
  static endRemoveBuffFromPlayer(e) {
    return e.endObject();
  }
  static createRemoveBuffFromPlayer(e, t) {
    RemoveBuffFromPlayer.startRemoveBuffFromPlayer(e);
    RemoveBuffFromPlayer.addBuffIds(e, t);
    return RemoveBuffFromPlayer.endRemoveBuffFromPlayer(e);
  }
}
exports.RemoveBuffFromPlayer = RemoveBuffFromPlayer;
//# sourceMappingURL=remove-buff-from-player.js.map