"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetEntityPos = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ResetEntityPos {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsResetEntityPos(t, s) {
    return (s || new ResetEntityPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsResetEntityPos(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new ResetEntityPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startResetEntityPos(t) {
    t.startObject(1);
  }
  static addEntityId(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static endResetEntityPos(t) {
    return t.endObject();
  }
  static createResetEntityPos(t, s) {
    ResetEntityPos.startResetEntityPos(t);
    ResetEntityPos.addEntityId(t, s);
    return ResetEntityPos.endResetEntityPos(t);
  }
}
exports.ResetEntityPos = ResetEntityPos;
//# sourceMappingURL=reset-entity-pos.js.map