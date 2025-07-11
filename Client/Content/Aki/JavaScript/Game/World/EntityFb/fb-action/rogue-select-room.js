"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueSelectRoom = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_rogue_select_room_js_1 = require("../fb-action/union-rogue-select-room.js");
class RogueSelectRoom {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, o) {
    this.bb_pos = e;
    this.bb = o;
    return this;
  }
  static getRootAsRogueSelectRoom(e, o) {
    return (o || new RogueSelectRoom()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRogueSelectRoom(e, o) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new RogueSelectRoom()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  configType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_rogue_select_room_js_1.UnionRogueSelectRoom.NONE;
    }
  }
  config(e) {
    var o = this.bb.__offset(this.bb_pos, 6);
    if (o) {
      return this.bb.__union(e, this.bb_pos + o);
    } else {
      return undefined;
    }
  }
  static startRogueSelectRoom(e) {
    e.startObject(2);
  }
  static addConfigType(e, o) {
    e.addFieldInt8(0, o, union_rogue_select_room_js_1.UnionRogueSelectRoom.NONE);
  }
  static addConfig(e, o) {
    e.addFieldOffset(1, o, 0);
  }
  static endRogueSelectRoom(e) {
    return e.endObject();
  }
  static createRogueSelectRoom(e, o, t) {
    RogueSelectRoom.startRogueSelectRoom(e);
    RogueSelectRoom.addConfigType(e, o);
    RogueSelectRoom.addConfig(e, t);
    return RogueSelectRoom.endRogueSelectRoom(e);
  }
}
exports.RogueSelectRoom = RogueSelectRoom;
//# sourceMappingURL=rogue-select-room.js.map