"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HitLogicChangeNextAndLockTargetState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitLogicChangeNextAndLockTargetState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsHitLogicChangeNextAndLockTargetState(t, e) {
    return (e || new HitLogicChangeNextAndLockTargetState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHitLogicChangeNextAndLockTargetState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new HitLogicChangeNextAndLockTargetState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  targetState(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startHitLogicChangeNextAndLockTargetState(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTargetState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endHitLogicChangeNextAndLockTargetState(t) {
    return t.endObject();
  }
  static createHitLogicChangeNextAndLockTargetState(t, e, a) {
    HitLogicChangeNextAndLockTargetState.startHitLogicChangeNextAndLockTargetState(t);
    HitLogicChangeNextAndLockTargetState.addType(t, e);
    HitLogicChangeNextAndLockTargetState.addTargetState(t, a);
    return HitLogicChangeNextAndLockTargetState.endHitLogicChangeNextAndLockTargetState(t);
  }
}
exports.HitLogicChangeNextAndLockTargetState = HitLogicChangeNextAndLockTargetState;
//# sourceMappingURL=hit-logic-change-next-and-lock-target-state.js.map