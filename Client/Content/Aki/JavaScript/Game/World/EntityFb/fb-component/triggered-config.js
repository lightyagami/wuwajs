"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggeredConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class TriggeredConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsTriggeredConfig(i, t) {
    return (t || new TriggeredConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsTriggeredConfig(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new TriggeredConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  condition(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return (i || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  maxTriggerTimes() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  actions(i, t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return (t || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + i * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionsLength() {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__vector_len(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  onlineDisableTip() {
    var i = this.bb.__offset(this.bb_pos, 10);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startTriggeredConfig(i) {
    i.startObject(4);
  }
  static addCondition(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addMaxTriggerTimes(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static addActions(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static createActionsVector(t, r) {
    t.startVector(4, r.length, 4);
    for (let i = r.length - 1; i >= 0; i--) {
      t.addOffset(r[i]);
    }
    return t.endVector();
  }
  static startActionsVector(i, t) {
    i.startVector(4, t, 4);
  }
  static addOnlineDisableTip(i, t) {
    i.addFieldInt8(3, +t, 0);
  }
  static endTriggeredConfig(i) {
    return i.endObject();
  }
  static createTriggeredConfig(i, t, r, e, s) {
    TriggeredConfig.startTriggeredConfig(i);
    TriggeredConfig.addCondition(i, t);
    TriggeredConfig.addMaxTriggerTimes(i, r);
    TriggeredConfig.addActions(i, e);
    TriggeredConfig.addOnlineDisableTip(i, s);
    return TriggeredConfig.endTriggeredConfig(i);
  }
}
exports.TriggeredConfig = TriggeredConfig;
//# sourceMappingURL=triggered-config.js.map