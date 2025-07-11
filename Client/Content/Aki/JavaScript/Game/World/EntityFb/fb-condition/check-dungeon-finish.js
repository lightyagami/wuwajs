"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckDungeonFinish = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckDungeonFinish {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsCheckDungeonFinish(e, i) {
    return (i || new CheckDungeonFinish()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCheckDungeonFinish(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CheckDungeonFinish()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
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
  static startCheckDungeonFinish(e) {
    e.startObject(2);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static addDungeonId(e, i) {
    e.addFieldInt32(1, i, 0);
  }
  static endCheckDungeonFinish(e) {
    return e.endObject();
  }
  static createCheckDungeonFinish(e, i, n) {
    CheckDungeonFinish.startCheckDungeonFinish(e);
    CheckDungeonFinish.addType(e, i);
    CheckDungeonFinish.addDungeonId(e, n);
    return CheckDungeonFinish.endCheckDungeonFinish(e);
  }
}
exports.CheckDungeonFinish = CheckDungeonFinish;
//# sourceMappingURL=check-dungeon-finish.js.map