"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProbabilityRefreshItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class ProbabilityRefreshItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsProbabilityRefreshItem(t, i) {
    return (i || new ProbabilityRefreshItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsProbabilityRefreshItem(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ProbabilityRefreshItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  probability() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  refreshEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  additionalCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startProbabilityRefreshItem(t) {
    t.startObject(3);
  }
  static addProbability(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addRefreshEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addAdditionalCondition(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endProbabilityRefreshItem(t) {
    return t.endObject();
  }
}
exports.ProbabilityRefreshItem = ProbabilityRefreshItem;
//# sourceMappingURL=probability-refresh-item.js.map