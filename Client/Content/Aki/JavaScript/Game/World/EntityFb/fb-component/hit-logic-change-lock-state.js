"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HitLogicChangeLockState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitLogicChangeLockState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsHitLogicChangeLockState(t, e) {
    return (e || new HitLogicChangeLockState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHitLogicChangeLockState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new HitLogicChangeLockState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startHitLogicChangeLockState(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endHitLogicChangeLockState(t) {
    return t.endObject();
  }
  static createHitLogicChangeLockState(t, e) {
    HitLogicChangeLockState.startHitLogicChangeLockState(t);
    HitLogicChangeLockState.addType(t, e);
    return HitLogicChangeLockState.endHitLogicChangeLockState(t);
  }
}
exports.HitLogicChangeLockState = HitLogicChangeLockState;
//# sourceMappingURL=hit-logic-change-lock-state.js.map