"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportDungeonPos = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class TeleportDungeonPos {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTeleportDungeonPos(t, e) {
    return (e || new TeleportDungeonPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTeleportDungeonPos(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TeleportDungeonPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  dungeonId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  teleportPos(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startTeleportDungeonPos(t) {
    t.startObject(2);
  }
  static addDungeonId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addTeleportPos(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endTeleportDungeonPos(t) {
    return t.endObject();
  }
}
exports.TeleportDungeonPos = TeleportDungeonPos;
//# sourceMappingURL=teleport-dungeon-pos.js.map