"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllKillCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AllKillCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsAllKillCondition(i, t) {
    return (t || new AllKillCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsAllKillCondition(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new AllKillCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type() {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  static startAllKillCondition(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldInt8(0, t, 0);
  }
  static endAllKillCondition(i) {
    return i.endObject();
  }
  static createAllKillCondition(i, t) {
    AllKillCondition.startAllKillCondition(i);
    AllKillCondition.addType(i, t);
    return AllKillCondition.endAllKillCondition(i);
  }
}
exports.AllKillCondition = AllKillCondition;
//# sourceMappingURL=all-kill-condition.js.map