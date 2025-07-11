"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkOptionCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class TalkOptionCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsTalkOptionCondition(t, i) {
    return (i || new TalkOptionCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTalkOptionCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new TalkOptionCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  conditions(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startTalkOptionCondition(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addConditions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endTalkOptionCondition(t) {
    return t.endObject();
  }
}
exports.TalkOptionCondition = TalkOptionCondition;
//# sourceMappingURL=talk-option-condition.js.map