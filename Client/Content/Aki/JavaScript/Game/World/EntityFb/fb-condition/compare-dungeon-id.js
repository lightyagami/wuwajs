"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareDungeonId = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareDungeonId {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCompareDungeonId(e, t) {
    return (t || new CompareDungeonId()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCompareDungeonId(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CompareDungeonId()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  dungeonId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  compare(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startCompareDungeonId(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addDungeonId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endCompareDungeonId(e) {
    return e.endObject();
  }
  static createCompareDungeonId(e, t, r, n) {
    CompareDungeonId.startCompareDungeonId(e);
    CompareDungeonId.addType(e, t);
    CompareDungeonId.addDungeonId(e, r);
    CompareDungeonId.addCompare(e, n);
    return CompareDungeonId.endCompareDungeonId(e);
  }
}
exports.CompareDungeonId = CompareDungeonId;
//# sourceMappingURL=compare-dungeon-id.js.map