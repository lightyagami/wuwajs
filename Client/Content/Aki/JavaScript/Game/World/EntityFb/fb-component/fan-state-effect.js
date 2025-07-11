"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FanStateEffect = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const fan_effect_config_js_1 = require("../fb-component/fan-effect-config.js");
class FanStateEffect {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsFanStateEffect(t, e) {
    return (e || new FanStateEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFanStateEffect(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new FanStateEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  effectConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new fan_effect_config_js_1.FanEffectConfig()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startFanStateEffect(t) {
    t.startObject(2);
  }
  static addEntityState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEffectConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endFanStateEffect(t) {
    return t.endObject();
  }
}
exports.FanStateEffect = FanStateEffect;
//# sourceMappingURL=fan-state-effect.js.map