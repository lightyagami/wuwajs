"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeOtherState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const play_flow_js_1 = require("../fb-action/play-flow.js");
class ChangeOtherState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeOtherState(t, e) {
    return (e || new ChangeOtherState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeOtherState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeOtherState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startChangeOtherState(t) {
    t.startObject(2);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endChangeOtherState(t) {
    return t.endObject();
  }
}
exports.ChangeOtherState = ChangeOtherState;
//# sourceMappingURL=change-other-state.js.map