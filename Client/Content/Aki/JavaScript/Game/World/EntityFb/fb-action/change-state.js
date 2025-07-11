"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeState(t, e) {
    return (e || new ChangeState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  stateId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startChangeState(t) {
    t.startObject(1);
  }
  static addStateId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endChangeState(t) {
    return t.endObject();
  }
  static createChangeState(t, e) {
    ChangeState.startChangeState(t);
    ChangeState.addStateId(t, e);
    return ChangeState.endChangeState(t);
  }
}
exports.ChangeState = ChangeState;
//# sourceMappingURL=change-state.js.map