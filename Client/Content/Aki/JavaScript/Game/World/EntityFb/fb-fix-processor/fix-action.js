"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixAction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class FixAction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsFixAction(t, i) {
    return (i || new FixAction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFixAction(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new FixAction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  timing(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  thenActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  thenActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  period() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startFixAction(t) {
    t.startObject(4);
  }
  static addTiming(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCondition(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addThenActions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createThenActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startThenActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addPeriod(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static endFixAction(t) {
    return t.endObject();
  }
}
exports.FixAction = FixAction;
//# sourceMappingURL=fix-action.js.map