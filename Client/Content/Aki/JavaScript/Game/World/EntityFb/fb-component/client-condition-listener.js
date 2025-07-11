"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientConditionListener = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class ClientConditionListener {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsClientConditionListener(t, i) {
    return (i || new ClientConditionListener()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsClientConditionListener(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ClientConditionListener()).__init(t.readInt32(t.position()) + t.position(), t);
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
  sendSelfEvent(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startClientConditionListener(t) {
    t.startObject(3);
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
  static addSendSelfEvent(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endClientConditionListener(t) {
    return t.endObject();
  }
  static createClientConditionListener(t, i, n, e) {
    ClientConditionListener.startClientConditionListener(t);
    ClientConditionListener.addCondition(t, i);
    ClientConditionListener.addActions(t, n);
    ClientConditionListener.addSendSelfEvent(t, e);
    return ClientConditionListener.endClientConditionListener(t);
  }
}
exports.ClientConditionListener = ClientConditionListener;
//# sourceMappingURL=client-condition-listener.js.map