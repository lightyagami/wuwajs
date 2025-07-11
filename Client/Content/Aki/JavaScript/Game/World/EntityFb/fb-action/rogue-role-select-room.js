"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueRoleSelectRoom = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RogueRoleSelectRoom {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, o) {
    this.bb_pos = e;
    this.bb = o;
    return this;
  }
  static getRootAsRogueRoleSelectRoom(e, o) {
    return (o || new RogueRoleSelectRoom()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRogueRoleSelectRoom(e, o) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new RogueRoleSelectRoom()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, e);
    } else {
      return undefined;
    }
  }
  static startRogueRoleSelectRoom(e) {
    e.startObject(1);
  }
  static addType(e, o) {
    e.addFieldOffset(0, o, 0);
  }
  static endRogueRoleSelectRoom(e) {
    return e.endObject();
  }
  static createRogueRoleSelectRoom(e, o) {
    RogueRoleSelectRoom.startRogueRoleSelectRoom(e);
    RogueRoleSelectRoom.addType(e, o);
    return RogueRoleSelectRoom.endRogueRoleSelectRoom(e);
  }
}
exports.RogueRoleSelectRoom = RogueRoleSelectRoom;
//# sourceMappingURL=rogue-role-select-room.js.map