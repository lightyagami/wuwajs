"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformerAiMoveToPlayer = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PerformerAiMoveToPlayer {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsPerformerAiMoveToPlayer(e, r) {
    return (r || new PerformerAiMoveToPlayer()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsPerformerAiMoveToPlayer(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new PerformerAiMoveToPlayer()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, e);
    } else {
      return undefined;
    }
  }
  static startPerformerAiMoveToPlayer(e) {
    e.startObject(1);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static endPerformerAiMoveToPlayer(e) {
    return e.endObject();
  }
  static createPerformerAiMoveToPlayer(e, r) {
    PerformerAiMoveToPlayer.startPerformerAiMoveToPlayer(e);
    PerformerAiMoveToPlayer.addType(e, r);
    return PerformerAiMoveToPlayer.endPerformerAiMoveToPlayer(e);
  }
}
exports.PerformerAiMoveToPlayer = PerformerAiMoveToPlayer;
//# sourceMappingURL=performer-ai-move-to-player.js.map