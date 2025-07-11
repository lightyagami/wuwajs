"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateChangeBehavior = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const condition_action_js_1 = require("../fb-component/condition-action.js");
const delay_change_state_js_1 = require("../fb-component/delay-change-state.js");
class StateChangeBehavior {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsStateChangeBehavior(t, i) {
    return (i || new StateChangeBehavior()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStateChangeBehavior(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new StateChangeBehavior()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  action(t, i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
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
  delayChangeState(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new delay_change_state_js_1.DelayChangeState()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  conditionAction(t, i) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return (i || new condition_action_js_1.ConditionAction()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  conditionActionLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startStateChangeBehavior(t) {
    t.startObject(4);
  }
  static addState(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addAction(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createActionVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startActionVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addDelayChangeState(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addConditionAction(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createConditionActionVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startConditionActionVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endStateChangeBehavior(t) {
    return t.endObject();
  }
}
exports.StateChangeBehavior = StateChangeBehavior;
//# sourceMappingURL=state-change-behavior.js.map