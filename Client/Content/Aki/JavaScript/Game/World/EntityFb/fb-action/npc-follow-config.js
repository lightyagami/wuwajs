"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcFollowConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const performer_range_boundary_action_trigger_js_1 = require("../fb-action/performer-range-boundary-action-trigger.js");
class NpcFollowConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(r, t) {
    this.bb_pos = r;
    this.bb = t;
    return this;
  }
  static getRootAsNpcFollowConfig(r, t) {
    return (t || new NpcFollowConfig()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  static getSizePrefixedRootAsNpcFollowConfig(r, t) {
    r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new NpcFollowConfig()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  performerWhenEnter(r) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return (r || new performer_range_boundary_action_trigger_js_1.PerformerRangeBoundaryActionTrigger()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  performerWhenExit(r) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return (r || new performer_range_boundary_action_trigger_js_1.PerformerRangeBoundaryActionTrigger()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  static startNpcFollowConfig(r) {
    r.startObject(2);
  }
  static addPerformerWhenEnter(r, t) {
    r.addFieldOffset(0, t, 0);
  }
  static addPerformerWhenExit(r, t) {
    r.addFieldOffset(1, t, 0);
  }
  static endNpcFollowConfig(r) {
    return r.endObject();
  }
}
exports.NpcFollowConfig = NpcFollowConfig;
//# sourceMappingURL=npc-follow-config.js.map