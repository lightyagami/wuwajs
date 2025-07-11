"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractActions = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class InteractActions {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsInteractActions(t, s) {
    return (s || new InteractActions()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInteractActions(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new InteractActions()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  actions(t, s) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (s || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
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
  static startInteractActions(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addActions(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createActionsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      s.addOffset(i[t]);
    }
    return s.endVector();
  }
  static startActionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endInteractActions(t) {
    return t.endObject();
  }
  static createInteractActions(t, s, i) {
    InteractActions.startInteractActions(t);
    InteractActions.addType(t, s);
    InteractActions.addActions(t, i);
    return InteractActions.endInteractActions(t);
  }
}
exports.InteractActions = InteractActions;
//# sourceMappingURL=interact-actions.js.map