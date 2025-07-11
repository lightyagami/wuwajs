"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurabilityState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DurabilityState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsDurabilityState(t, i) {
    return (i || new DurabilityState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDurabilityState(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new DurabilityState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  durability() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startDurabilityState(t) {
    t.startObject(2);
  }
  static addDurability(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addState(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endDurabilityState(t) {
    return t.endObject();
  }
  static createDurabilityState(t, i, a) {
    DurabilityState.startDurabilityState(t);
    DurabilityState.addDurability(t, i);
    DurabilityState.addState(t, a);
    return DurabilityState.endDurabilityState(t);
  }
}
exports.DurabilityState = DurabilityState;
//# sourceMappingURL=durability-state.js.map