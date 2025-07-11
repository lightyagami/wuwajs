"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetTimeLockState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetTimeLockState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetTimeLockState(t, e) {
    return (e || new SetTimeLockState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetTimeLockState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetTimeLockState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  lockState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startSetTimeLockState(t) {
    t.startObject(1);
  }
  static addLockState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSetTimeLockState(t) {
    return t.endObject();
  }
  static createSetTimeLockState(t, e) {
    SetTimeLockState.startSetTimeLockState(t);
    SetTimeLockState.addLockState(t, e);
    return SetTimeLockState.endSetTimeLockState(t);
  }
}
exports.SetTimeLockState = SetTimeLockState;
//# sourceMappingURL=set-time-lock-state.js.map