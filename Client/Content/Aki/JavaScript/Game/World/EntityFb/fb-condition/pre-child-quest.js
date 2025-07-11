"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreChildQuest = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const child_quest_condition_js_1 = require("../fb-condition/child-quest-condition.js");
class PreChildQuest {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPreChildQuest(t, e) {
    return (e || new PreChildQuest()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPreChildQuest(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PreChildQuest()).__init(t.readInt32(t.position()) + t.position(), t);
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
  preChildQuest(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new child_quest_condition_js_1.ChildQuestCondition()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startPreChildQuest(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPreChildQuest(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endPreChildQuest(t) {
    return t.endObject();
  }
}
exports.PreChildQuest = PreChildQuest;
//# sourceMappingURL=pre-child-quest.js.map