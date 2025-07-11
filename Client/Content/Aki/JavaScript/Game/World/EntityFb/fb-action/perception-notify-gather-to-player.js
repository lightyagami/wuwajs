"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerceptionNotifyGatherToPlayer = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PerceptionNotifyGatherToPlayer {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPerceptionNotifyGatherToPlayer(t, e) {
    return (e || new PerceptionNotifyGatherToPlayer()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPerceptionNotifyGatherToPlayer(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PerceptionNotifyGatherToPlayer()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startPerceptionNotifyGatherToPlayer(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endPerceptionNotifyGatherToPlayer(t) {
    return t.endObject();
  }
  static createPerceptionNotifyGatherToPlayer(t, e) {
    PerceptionNotifyGatherToPlayer.startPerceptionNotifyGatherToPlayer(t);
    PerceptionNotifyGatherToPlayer.addType(t, e);
    return PerceptionNotifyGatherToPlayer.endPerceptionNotifyGatherToPlayer(t);
  }
}
exports.PerceptionNotifyGatherToPlayer = PerceptionNotifyGatherToPlayer;
//# sourceMappingURL=perception-notify-gather-to-player.js.map