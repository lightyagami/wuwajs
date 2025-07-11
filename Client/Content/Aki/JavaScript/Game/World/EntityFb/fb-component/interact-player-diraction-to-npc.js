"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractPlayerDiractionToNpc = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InteractPlayerDiractionToNpc {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsInteractPlayerDiractionToNpc(t, r) {
    return (r || new InteractPlayerDiractionToNpc()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInteractPlayerDiractionToNpc(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new InteractPlayerDiractionToNpc()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  static startInteractPlayerDiractionToNpc(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static endInteractPlayerDiractionToNpc(t) {
    return t.endObject();
  }
  static createInteractPlayerDiractionToNpc(t, r) {
    InteractPlayerDiractionToNpc.startInteractPlayerDiractionToNpc(t);
    InteractPlayerDiractionToNpc.addType(t, r);
    return InteractPlayerDiractionToNpc.endInteractPlayerDiractionToNpc(t);
  }
}
exports.InteractPlayerDiractionToNpc = InteractPlayerDiractionToNpc;
//# sourceMappingURL=interact-player-diraction-to-npc.js.map