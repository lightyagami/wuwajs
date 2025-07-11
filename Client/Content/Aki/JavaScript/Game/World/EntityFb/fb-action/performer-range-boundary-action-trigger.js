"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformerRangeBoundaryActionTrigger = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class PerformerRangeBoundaryActionTrigger {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(r, e) {
    this.bb_pos = r;
    this.bb = e;
    return this;
  }
  static getRootAsPerformerRangeBoundaryActionTrigger(r, e) {
    return (e || new PerformerRangeBoundaryActionTrigger()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  static getSizePrefixedRootAsPerformerRangeBoundaryActionTrigger(r, e) {
    r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PerformerRangeBoundaryActionTrigger()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  range() {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.readInt32(this.bb_pos + r);
    } else {
      return 0;
    }
  }
  actions(r, e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return (e || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + t) + r * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionsLength() {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__vector_len(this.bb_pos + r);
    } else {
      return 0;
    }
  }
  static startPerformerRangeBoundaryActionTrigger(r) {
    r.startObject(2);
  }
  static addRange(r, e) {
    r.addFieldInt32(0, e, 0);
  }
  static addActions(r, e) {
    r.addFieldOffset(1, e, 0);
  }
  static createActionsVector(e, t) {
    e.startVector(4, t.length, 4);
    for (let r = t.length - 1; r >= 0; r--) {
      e.addOffset(t[r]);
    }
    return e.endVector();
  }
  static startActionsVector(r, e) {
    r.startVector(4, e, 4);
  }
  static endPerformerRangeBoundaryActionTrigger(r) {
    return r.endObject();
  }
  static createPerformerRangeBoundaryActionTrigger(r, e, t) {
    PerformerRangeBoundaryActionTrigger.startPerformerRangeBoundaryActionTrigger(r);
    PerformerRangeBoundaryActionTrigger.addRange(r, e);
    PerformerRangeBoundaryActionTrigger.addActions(r, t);
    return PerformerRangeBoundaryActionTrigger.endPerformerRangeBoundaryActionTrigger(r);
  }
}
exports.PerformerRangeBoundaryActionTrigger = PerformerRangeBoundaryActionTrigger;
//# sourceMappingURL=performer-range-boundary-action-trigger.js.map