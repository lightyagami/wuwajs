"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnlockDungeonEntry = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockDungeonEntry {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(n, t) {
    this.bb_pos = n;
    this.bb = t;
    return this;
  }
  static getRootAsUnlockDungeonEntry(n, t) {
    return (t || new UnlockDungeonEntry()).__init(n.readInt32(n.position()) + n.position(), n);
  }
  static getSizePrefixedRootAsUnlockDungeonEntry(n, t) {
    n.setPosition(n.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new UnlockDungeonEntry()).__init(n.readInt32(n.position()) + n.position(), n);
  }
  dungeonEntryId() {
    var n = this.bb.__offset(this.bb_pos, 4);
    if (n) {
      return this.bb.readInt32(this.bb_pos + n);
    } else {
      return 0;
    }
  }
  static startUnlockDungeonEntry(n) {
    n.startObject(1);
  }
  static addDungeonEntryId(n, t) {
    n.addFieldInt32(0, t, 0);
  }
  static endUnlockDungeonEntry(n) {
    return n.endObject();
  }
  static createUnlockDungeonEntry(n, t) {
    UnlockDungeonEntry.startUnlockDungeonEntry(n);
    UnlockDungeonEntry.addDungeonEntryId(n, t);
    return UnlockDungeonEntry.endUnlockDungeonEntry(n);
  }
}
exports.UnlockDungeonEntry = UnlockDungeonEntry;
//# sourceMappingURL=unlock-dungeon-entry.js.map