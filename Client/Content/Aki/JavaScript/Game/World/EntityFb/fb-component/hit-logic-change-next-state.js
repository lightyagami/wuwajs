"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HitLogicChangeNextState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitLogicChangeNextState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsHitLogicChangeNextState(t, e) {
    return (e || new HitLogicChangeNextState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHitLogicChangeNextState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new HitLogicChangeNextState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startHitLogicChangeNextState(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endHitLogicChangeNextState(t) {
    return t.endObject();
  }
  static createHitLogicChangeNextState(t, e) {
    HitLogicChangeNextState.startHitLogicChangeNextState(t);
    HitLogicChangeNextState.addType(t, e);
    return HitLogicChangeNextState.endHitLogicChangeNextState(t);
  }
}
exports.HitLogicChangeNextState = HitLogicChangeNextState;
//# sourceMappingURL=hit-logic-change-next-state.js.map