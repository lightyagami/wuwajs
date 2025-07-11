"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HitLogicChangeCountDownState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitLogicChangeCountDownState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsHitLogicChangeCountDownState(t, e) {
    return (e || new HitLogicChangeCountDownState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHitLogicChangeCountDownState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new HitLogicChangeCountDownState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startHitLogicChangeCountDownState(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endHitLogicChangeCountDownState(t) {
    return t.endObject();
  }
  static createHitLogicChangeCountDownState(t, e) {
    HitLogicChangeCountDownState.startHitLogicChangeCountDownState(t);
    HitLogicChangeCountDownState.addType(t, e);
    return HitLogicChangeCountDownState.endHitLogicChangeCountDownState(t);
  }
}
exports.HitLogicChangeCountDownState = HitLogicChangeCountDownState;
//# sourceMappingURL=hit-logic-change-count-down-state.js.map