"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionBubbleData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const bubble_data_js_1 = require("../fb-action/bubble-data.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class ConditionBubbleData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsConditionBubbleData(t, i) {
    return (i || new ConditionBubbleData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsConditionBubbleData(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ConditionBubbleData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  flow(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new bubble_data_js_1.BubbleData()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startConditionBubbleData(t) {
    t.startObject(2);
  }
  static addCondition(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addFlow(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endConditionBubbleData(t) {
    return t.endObject();
  }
}
exports.ConditionBubbleData = ConditionBubbleData;
//# sourceMappingURL=condition-bubble-data.js.map