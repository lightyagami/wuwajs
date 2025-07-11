"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CondtionListener = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class CondtionListener {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCondtionListener(t, i) {
    return (i || new CondtionListener()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCondtionListener(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CondtionListener()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  actions(t, i) {
    var n = this.bb.__offset(this.bb_pos, 6);
    if (n) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCondtionListener(t) {
    t.startObject(2);
  }
  static addCondition(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createActionsVector(i, n) {
    i.startVector(4, n.length, 4);
    for (let t = n.length - 1; t >= 0; t--) {
      i.addOffset(n[t]);
    }
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endCondtionListener(t) {
    return t.endObject();
  }
  static createCondtionListener(t, i, n) {
    CondtionListener.startCondtionListener(t);
    CondtionListener.addCondition(t, i);
    CondtionListener.addActions(t, n);
    return CondtionListener.endCondtionListener(t);
  }
}
exports.CondtionListener = CondtionListener;
//# sourceMappingURL=condtion-listener.js.map