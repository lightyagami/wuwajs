"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformStateConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class NpcPerformStateConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsNpcPerformStateConfig(t, e) {
    return (e || new NpcPerformStateConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNpcPerformStateConfig(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new NpcPerformStateConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  materialDa(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startNpcPerformStateConfig(t) {
    t.startObject(2);
  }
  static addState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMaterialDa(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endNpcPerformStateConfig(t) {
    return t.endObject();
  }
  static createNpcPerformStateConfig(t, e, r) {
    NpcPerformStateConfig.startNpcPerformStateConfig(t);
    NpcPerformStateConfig.addState(t, e);
    NpcPerformStateConfig.addMaterialDa(t, r);
    return NpcPerformStateConfig.endNpcPerformStateConfig(t);
  }
}
exports.NpcPerformStateConfig = NpcPerformStateConfig;
//# sourceMappingURL=npc-perform-state-config.js.map