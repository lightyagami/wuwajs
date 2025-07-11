"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DestroyQuest = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DestroyQuest {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsDestroyQuest(t, s) {
    return (s || new DestroyQuest()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDestroyQuest(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new DestroyQuest()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  questId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isDestroy() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startDestroyQuest(t) {
    t.startObject(2);
  }
  static addQuestId(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addIsDestroy(t, s) {
    t.addFieldInt8(1, +s, 0);
  }
  static endDestroyQuest(t) {
    return t.endObject();
  }
  static createDestroyQuest(t, s, e) {
    DestroyQuest.startDestroyQuest(t);
    DestroyQuest.addQuestId(t, s);
    DestroyQuest.addIsDestroy(t, e);
    return DestroyQuest.endDestroyQuest(t);
  }
}
exports.DestroyQuest = DestroyQuest;
//# sourceMappingURL=destroy-quest.js.map