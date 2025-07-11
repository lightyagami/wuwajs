"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateChangeConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StateChangeConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsStateChangeConfig(t, e) {
    return (e || new StateChangeConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStateChangeConfig(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new StateChangeConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  refreshState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  subDestroyState(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startStateChangeConfig(t) {
    t.startObject(2);
  }
  static addRefreshState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addSubDestroyState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endStateChangeConfig(t) {
    return t.endObject();
  }
  static createStateChangeConfig(t, e, a) {
    StateChangeConfig.startStateChangeConfig(t);
    StateChangeConfig.addRefreshState(t, e);
    StateChangeConfig.addSubDestroyState(t, a);
    return StateChangeConfig.endStateChangeConfig(t);
  }
}
exports.StateChangeConfig = StateChangeConfig;
//# sourceMappingURL=state-change-config.js.map