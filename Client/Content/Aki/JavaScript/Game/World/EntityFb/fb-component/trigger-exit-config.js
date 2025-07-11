"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerExitConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class TriggerExitConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsTriggerExitConfig(t, i) {
    return (i || new TriggerExitConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTriggerExitConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new TriggerExitConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  extraRange() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  maxTriggerTimes() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  matchTypeCount() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  exitByNotEnterCondition() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  actions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 14);
    if (s) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  disableExecuteActionsWhenDestroy() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startTriggerExitConfig(t) {
    t.startObject(7);
  }
  static addExtraRange(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addMaxTriggerTimes(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addCondition(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addMatchTypeCount(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static addExitByNotEnterCondition(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static createActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addDisableExecuteActionsWhenDestroy(t, i) {
    t.addFieldInt8(6, +i, 0);
  }
  static endTriggerExitConfig(t) {
    return t.endObject();
  }
}
exports.TriggerExitConfig = TriggerExitConfig;
//# sourceMappingURL=trigger-exit-config.js.map