"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeNpcPerformState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeNpcPerformState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeNpcPerformState(t, e) {
    return (e || new ChangeNpcPerformState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeNpcPerformState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeNpcPerformState()).__init(t.readInt32(t.position()) + t.position(), t);
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
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startChangeNpcPerformState(t) {
    t.startObject(2);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endChangeNpcPerformState(t) {
    return t.endObject();
  }
  static createChangeNpcPerformState(t, e, r) {
    ChangeNpcPerformState.startChangeNpcPerformState(t);
    ChangeNpcPerformState.addEntityId(t, e);
    ChangeNpcPerformState.addState(t, r);
    return ChangeNpcPerformState.endChangeNpcPerformState(t);
  }
}
exports.ChangeNpcPerformState = ChangeNpcPerformState;
//# sourceMappingURL=change-npc-perform-state.js.map