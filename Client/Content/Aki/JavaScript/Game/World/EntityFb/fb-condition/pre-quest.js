"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreQuest = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PreQuest {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPreQuest(t, e) {
    return (e || new PreQuest()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPreQuest(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PreQuest()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  preQuestId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startPreQuest(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPreQuestId(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endPreQuest(t) {
    return t.endObject();
  }
  static createPreQuest(t, e, s, r) {
    PreQuest.startPreQuest(t);
    PreQuest.addType(t, e);
    PreQuest.addCompare(t, s);
    PreQuest.addPreQuestId(t, r);
    return PreQuest.endPreQuest(t);
  }
}
exports.PreQuest = PreQuest;
//# sourceMappingURL=pre-quest.js.map