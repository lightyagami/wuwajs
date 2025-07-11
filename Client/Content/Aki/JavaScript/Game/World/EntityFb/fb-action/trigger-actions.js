"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerActions = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class TriggerActions {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsTriggerActions(t, i) {
    return (i || new TriggerActions()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTriggerActions(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new TriggerActions()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  actions(t, i) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startTriggerActions(t) {
    t.startObject(1);
  }
  static addActions(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static createActionsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      i.addOffset(r[t]);
    }
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endTriggerActions(t) {
    return t.endObject();
  }
  static createTriggerActions(t, i) {
    TriggerActions.startTriggerActions(t);
    TriggerActions.addActions(t, i);
    return TriggerActions.endTriggerActions(t);
  }
}
exports.TriggerActions = TriggerActions;
//# sourceMappingURL=trigger-actions.js.map