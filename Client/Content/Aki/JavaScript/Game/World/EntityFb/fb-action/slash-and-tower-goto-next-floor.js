"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlashAndTowerGotoNextFloor = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SlashAndTowerGotoNextFloor {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(o, t) {
    this.bb_pos = o;
    this.bb = t;
    return this;
  }
  static getRootAsSlashAndTowerGotoNextFloor(o, t) {
    return (t || new SlashAndTowerGotoNextFloor()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  static getSizePrefixedRootAsSlashAndTowerGotoNextFloor(o, t) {
    o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SlashAndTowerGotoNextFloor()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  static startSlashAndTowerGotoNextFloor(o) {
    o.startObject(0);
  }
  static endSlashAndTowerGotoNextFloor(o) {
    return o.endObject();
  }
  static createSlashAndTowerGotoNextFloor(o) {
    SlashAndTowerGotoNextFloor.startSlashAndTowerGotoNextFloor(o);
    return SlashAndTowerGotoNextFloor.endSlashAndTowerGotoNextFloor(o);
  }
}
exports.SlashAndTowerGotoNextFloor = SlashAndTowerGotoNextFloor;
//# sourceMappingURL=slash-and-tower-goto-next-floor.js.map