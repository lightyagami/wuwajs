"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityStateTrigger = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
const entity_group_condition_js_1 = require("../fb-condition/entity-group-condition.js");
class EntityStateTrigger {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEntityStateTrigger(t, i) {
    return (i || new EntityStateTrigger()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityStateTrigger(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EntityStateTrigger()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  groupCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new entity_group_condition_js_1.EntityGroupCondition()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  successActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  successActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  failActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  failActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startEntityStateTrigger(t) {
    t.startObject(4);
  }
  static addGroupCondition(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addSuccessActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createSuccessActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startSuccessActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addFailActions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createFailActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startFailActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addCondition(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endEntityStateTrigger(t) {
    return t.endObject();
  }
}
exports.EntityStateTrigger = EntityStateTrigger;
//# sourceMappingURL=entity-state-trigger.js.map