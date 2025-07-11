"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionAction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class ConditionAction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsConditionAction(t, i) {
    return (i || new ConditionAction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsConditionAction(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ConditionAction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  action(t, i) {
    var o = this.bb.__offset(this.bb_pos, 6);
    if (o) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + o) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startConditionAction(t) {
    t.startObject(2);
  }
  static addCondition(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addAction(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createActionVector(i, o) {
    i.startVector(4, o.length, 4);
    for (let t = o.length - 1; t >= 0; t--) {
      i.addOffset(o[t]);
    }
    return i.endVector();
  }
  static startActionVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endConditionAction(t) {
    return t.endObject();
  }
  static createConditionAction(t, i, o) {
    ConditionAction.startConditionAction(t);
    ConditionAction.addCondition(t, i);
    ConditionAction.addAction(t, o);
    return ConditionAction.endConditionAction(t);
  }
}
exports.ConditionAction = ConditionAction;
//# sourceMappingURL=condition-action.js.map