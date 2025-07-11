"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitNpcPerformState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InitNpcPerformState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsInitNpcPerformState(t, e) {
    return (e || new InitNpcPerformState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInitNpcPerformState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new InitNpcPerformState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startInitNpcPerformState(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endInitNpcPerformState(t) {
    return t.endObject();
  }
  static createInitNpcPerformState(t, e, r) {
    InitNpcPerformState.startInitNpcPerformState(t);
    InitNpcPerformState.addType(t, e);
    InitNpcPerformState.addState(t, r);
    return InitNpcPerformState.endInitNpcPerformState(t);
  }
}
exports.InitNpcPerformState = InitNpcPerformState;
//# sourceMappingURL=init-npc-perform-state.js.map