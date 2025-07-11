"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChildQuestCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChildQuestCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsChildQuestCondition(t, i) {
    return (i || new ChildQuestCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChildQuestCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ChildQuestCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  questId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  childQuestId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startChildQuestCondition(t) {
    t.startObject(2);
  }
  static addQuestId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addChildQuestId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endChildQuestCondition(t) {
    return t.endObject();
  }
  static createChildQuestCondition(t, i, s) {
    ChildQuestCondition.startChildQuestCondition(t);
    ChildQuestCondition.addQuestId(t, i);
    ChildQuestCondition.addChildQuestId(t, s);
    return ChildQuestCondition.endChildQuestCondition(t);
  }
}
exports.ChildQuestCondition = ChildQuestCondition;
//# sourceMappingURL=child-quest-condition.js.map