"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DungeonEntryComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DungeonEntryComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(n, t) {
    this.bb_pos = n;
    this.bb = t;
    return this;
  }
  static getRootAsDungeonEntryComponent(n, t) {
    return (t || new DungeonEntryComponent()).__init(n.readInt32(n.position()) + n.position(), n);
  }
  static getSizePrefixedRootAsDungeonEntryComponent(n, t) {
    n.setPosition(n.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new DungeonEntryComponent()).__init(n.readInt32(n.position()) + n.position(), n);
  }
  disabled() {
    var n = this.bb.__offset(this.bb_pos, 4);
    return !!n && !!this.bb.readInt8(this.bb_pos + n);
  }
  static startDungeonEntryComponent(n) {
    n.startObject(1);
  }
  static addDisabled(n, t) {
    n.addFieldInt8(0, +t, 0);
  }
  static endDungeonEntryComponent(n) {
    return n.endObject();
  }
  static createDungeonEntryComponent(n, t) {
    DungeonEntryComponent.startDungeonEntryComponent(n);
    DungeonEntryComponent.addDisabled(n, t);
    return DungeonEntryComponent.endDungeonEntryComponent(n);
  }
}
exports.DungeonEntryComponent = DungeonEntryComponent;
//# sourceMappingURL=dungeon-entry-component.js.map