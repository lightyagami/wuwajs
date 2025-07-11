"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeActorState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeActorState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeActorState(t, e) {
    return (e || new ChangeActorState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeActorState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeActorState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startChangeActorState(t) {
    t.startObject(1);
  }
  static addState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endChangeActorState(t) {
    return t.endObject();
  }
  static createChangeActorState(t, e) {
    ChangeActorState.startChangeActorState(t);
    ChangeActorState.addState(t, e);
    return ChangeActorState.endChangeActorState(t);
  }
}
exports.ChangeActorState = ChangeActorState;
//# sourceMappingURL=change-actor-state.js.map