"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FinishDungeon = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FinishDungeon {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(s, i) {
    this.bb_pos = s;
    this.bb = i;
    return this;
  }
  static getRootAsFinishDungeon(s, i) {
    return (i || new FinishDungeon()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  static getSizePrefixedRootAsFinishDungeon(s, i) {
    s.setPosition(s.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new FinishDungeon()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  isSuccess() {
    var s = this.bb.__offset(this.bb_pos, 4);
    return !!s && !!this.bb.readInt8(this.bb_pos + s);
  }
  static startFinishDungeon(s) {
    s.startObject(1);
  }
  static addIsSuccess(s, i) {
    s.addFieldInt8(0, +i, 0);
  }
  static endFinishDungeon(s) {
    return s.endObject();
  }
  static createFinishDungeon(s, i) {
    FinishDungeon.startFinishDungeon(s);
    FinishDungeon.addIsSuccess(s, i);
    return FinishDungeon.endFinishDungeon(s);
  }
}
exports.FinishDungeon = FinishDungeon;
//# sourceMappingURL=finish-dungeon.js.map