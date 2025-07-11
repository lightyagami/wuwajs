"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetInteractionLockState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetInteractionLockState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetInteractionLockState(t, e) {
    return (e || new SetInteractionLockState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetInteractionLockState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetInteractionLockState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  isLock() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSetInteractionLockState(t) {
    t.startObject(1);
  }
  static addIsLock(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static endSetInteractionLockState(t) {
    return t.endObject();
  }
  static createSetInteractionLockState(t, e) {
    SetInteractionLockState.startSetInteractionLockState(t);
    SetInteractionLockState.addIsLock(t, e);
    return SetInteractionLockState.endSetInteractionLockState(t);
  }
}
exports.SetInteractionLockState = SetInteractionLockState;
//# sourceMappingURL=set-interaction-lock-state.js.map