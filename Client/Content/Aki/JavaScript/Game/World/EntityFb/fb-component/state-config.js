"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StateConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsStateConfig(t, e) {
    return (e || new StateConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStateConfig(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new StateConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startStateConfig(t) {
    t.startObject(2);
  }
  static addState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addDuration(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static endStateConfig(t) {
    return t.endObject();
  }
  static createStateConfig(t, e, i) {
    StateConfig.startStateConfig(t);
    StateConfig.addState(t, e);
    StateConfig.addDuration(t, i);
    return StateConfig.endStateConfig(t);
  }
}
exports.StateConfig = StateConfig;
//# sourceMappingURL=state-config.js.map