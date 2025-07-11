"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckSubLevelStateConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckSubLevelStateConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCheckSubLevelStateConfig(e, t) {
    return (t || new CheckSubLevelStateConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCheckSubLevelStateConfig(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CheckSubLevelStateConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  subLevelName(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  subLevelState(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startCheckSubLevelStateConfig(e) {
    e.startObject(2);
  }
  static addSubLevelName(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addSubLevelState(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endCheckSubLevelStateConfig(e) {
    return e.endObject();
  }
  static createCheckSubLevelStateConfig(e, t, i) {
    CheckSubLevelStateConfig.startCheckSubLevelStateConfig(e);
    CheckSubLevelStateConfig.addSubLevelName(e, t);
    CheckSubLevelStateConfig.addSubLevelState(e, i);
    return CheckSubLevelStateConfig.endCheckSubLevelStateConfig(e);
  }
}
exports.CheckSubLevelStateConfig = CheckSubLevelStateConfig;
//# sourceMappingURL=check-sub-level-state-config.js.map