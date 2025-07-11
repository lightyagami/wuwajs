"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DelayChangeState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DelayChangeState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsDelayChangeState(t, e) {
    return (e || new DelayChangeState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDelayChangeState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new DelayChangeState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  newState(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startDelayChangeState(t) {
    t.startObject(2);
  }
  static addTime(t, e) {
    t.addFieldFloat32(0, e, 0);
  }
  static addNewState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endDelayChangeState(t) {
    return t.endObject();
  }
  static createDelayChangeState(t, e, a) {
    DelayChangeState.startDelayChangeState(t);
    DelayChangeState.addTime(t, e);
    DelayChangeState.addNewState(t, a);
    return DelayChangeState.endDelayChangeState(t);
  }
}
exports.DelayChangeState = DelayChangeState;
//# sourceMappingURL=delay-change-state.js.map