"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatrolAction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class PatrolAction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsPatrolAction(t, i) {
    return (i || new PatrolAction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPatrolAction(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new PatrolAction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  point() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  actions(t, i) {
    var o = this.bb.__offset(this.bb_pos, 6);
    if (o) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + o) + t * 4), this.bb);
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
  static startPatrolAction(t) {
    t.startObject(2);
  }
  static addPoint(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createActionsVector(i, o) {
    i.startVector(4, o.length, 4);
    for (let t = o.length - 1; t >= 0; t--) {
      i.addOffset(o[t]);
    }
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endPatrolAction(t) {
    return t.endObject();
  }
  static createPatrolAction(t, i, o) {
    PatrolAction.startPatrolAction(t);
    PatrolAction.addPoint(t, i);
    PatrolAction.addActions(t, o);
    return PatrolAction.endPatrolAction(t);
  }
}
exports.PatrolAction = PatrolAction;
//# sourceMappingURL=patrol-action.js.map