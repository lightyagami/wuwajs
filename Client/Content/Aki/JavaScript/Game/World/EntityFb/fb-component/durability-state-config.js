"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurabilityStateConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const durability_state_js_1 = require("../fb-component/durability-state.js");
class DurabilityStateConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsDurabilityStateConfig(t, i) {
    return (i || new DurabilityStateConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDurabilityStateConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new DurabilityStateConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  nonDestructable() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  durabilityStates(t, i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (i || new durability_state_js_1.DurabilityState()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  durabilityStatesLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startDurabilityStateConfig(t) {
    t.startObject(2);
  }
  static addNonDestructable(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addDurabilityStates(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createDurabilityStatesVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startDurabilityStatesVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endDurabilityStateConfig(t) {
    return t.endObject();
  }
  static createDurabilityStateConfig(t, i, e) {
    DurabilityStateConfig.startDurabilityStateConfig(t);
    DurabilityStateConfig.addNonDestructable(t, i);
    DurabilityStateConfig.addDurabilityStates(t, e);
    return DurabilityStateConfig.endDurabilityStateConfig(t);
  }
}
exports.DurabilityStateConfig = DurabilityStateConfig;
//# sourceMappingURL=durability-state-config.js.map