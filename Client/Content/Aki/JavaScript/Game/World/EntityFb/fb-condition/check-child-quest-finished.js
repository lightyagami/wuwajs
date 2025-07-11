"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckChildQuestFinished = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckChildQuestFinished {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsCheckChildQuestFinished(i, t) {
    return (t || new CheckChildQuestFinished()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsCheckChildQuestFinished(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CheckChildQuestFinished()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  questId() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  childQuestId() {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  compare(i) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startCheckChildQuestFinished(i) {
    i.startObject(4);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addQuestId(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static addChildQuestId(i, t) {
    i.addFieldInt32(2, t, 0);
  }
  static addCompare(i, t) {
    i.addFieldOffset(3, t, 0);
  }
  static endCheckChildQuestFinished(i) {
    return i.endObject();
  }
  static createCheckChildQuestFinished(i, t, e, s, h) {
    CheckChildQuestFinished.startCheckChildQuestFinished(i);
    CheckChildQuestFinished.addType(i, t);
    CheckChildQuestFinished.addQuestId(i, e);
    CheckChildQuestFinished.addChildQuestId(i, s);
    CheckChildQuestFinished.addCompare(i, h);
    return CheckChildQuestFinished.endCheckChildQuestFinished(i);
  }
}
exports.CheckChildQuestFinished = CheckChildQuestFinished;
//# sourceMappingURL=check-child-quest-finished.js.map