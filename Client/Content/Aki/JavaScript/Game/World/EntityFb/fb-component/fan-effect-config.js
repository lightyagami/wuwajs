"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FanEffectConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FanEffectConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, f) {
    this.bb_pos = t;
    this.bb = f;
    return this;
  }
  static getRootAsFanEffectConfig(t, f) {
    return (f || new FanEffectConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFanEffectConfig(t, f) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (f || new FanEffectConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  effectPath(t) {
    var f = this.bb.__offset(this.bb_pos, 4);
    if (f) {
      return this.bb.__string(this.bb_pos + f, t);
    } else {
      return undefined;
    }
  }
  defaultEffectLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  hitEffectPath(t) {
    var f = this.bb.__offset(this.bb_pos, 8);
    if (f) {
      return this.bb.__string(this.bb_pos + f, t);
    } else {
      return undefined;
    }
  }
  static startFanEffectConfig(t) {
    t.startObject(3);
  }
  static addEffectPath(t, f) {
    t.addFieldOffset(0, f, 0);
  }
  static addDefaultEffectLength(t, f) {
    t.addFieldFloat32(1, f, 0);
  }
  static addHitEffectPath(t, f) {
    t.addFieldOffset(2, f, 0);
  }
  static endFanEffectConfig(t) {
    return t.endObject();
  }
  static createFanEffectConfig(t, f, e, i) {
    FanEffectConfig.startFanEffectConfig(t);
    FanEffectConfig.addEffectPath(t, f);
    FanEffectConfig.addDefaultEffectLength(t, e);
    FanEffectConfig.addHitEffectPath(t, i);
    return FanEffectConfig.endFanEffectConfig(t);
  }
}
exports.FanEffectConfig = FanEffectConfig;
//# sourceMappingURL=fan-effect-config.js.map