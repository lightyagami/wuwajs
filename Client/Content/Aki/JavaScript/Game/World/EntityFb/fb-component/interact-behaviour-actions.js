"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractBehaviourActions = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class InteractBehaviourActions {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsInteractBehaviourActions(t, i) {
    return (i || new InteractBehaviourActions()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInteractBehaviourActions(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new InteractBehaviourActions()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  actions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
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
  static startInteractBehaviourActions(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createActionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endInteractBehaviourActions(t) {
    return t.endObject();
  }
  static createInteractBehaviourActions(t, i, e) {
    InteractBehaviourActions.startInteractBehaviourActions(t);
    InteractBehaviourActions.addType(t, i);
    InteractBehaviourActions.addActions(t, e);
    return InteractBehaviourActions.endInteractBehaviourActions(t);
  }
}
exports.InteractBehaviourActions = InteractBehaviourActions;
//# sourceMappingURL=interact-behaviour-actions.js.map