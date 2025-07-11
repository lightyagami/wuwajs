"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeBehaviorState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeBehaviorState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeBehaviorState(t, e) {
    return (e || new ChangeBehaviorState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeBehaviorState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeBehaviorState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  stateId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isInstant() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startChangeBehaviorState(t) {
    t.startObject(2);
  }
  static addStateId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIsInstant(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endChangeBehaviorState(t) {
    return t.endObject();
  }
  static createChangeBehaviorState(t, e, a) {
    ChangeBehaviorState.startChangeBehaviorState(t);
    ChangeBehaviorState.addStateId(t, e);
    ChangeBehaviorState.addIsInstant(t, a);
    return ChangeBehaviorState.endChangeBehaviorState(t);
  }
}
exports.ChangeBehaviorState = ChangeBehaviorState;
//# sourceMappingURL=change-behavior-state.js.map