"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportTransitionWithEffect = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportTransitionWithEffect {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTeleportTransitionWithEffect(t, e) {
    return (e || new TeleportTransitionWithEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTeleportTransitionWithEffect(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TeleportTransitionWithEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  effectDaPath(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startTeleportTransitionWithEffect(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEffectDaPath(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endTeleportTransitionWithEffect(t) {
    return t.endObject();
  }
  static createTeleportTransitionWithEffect(t, e, i) {
    TeleportTransitionWithEffect.startTeleportTransitionWithEffect(t);
    TeleportTransitionWithEffect.addType(t, e);
    TeleportTransitionWithEffect.addEffectDaPath(t, i);
    return TeleportTransitionWithEffect.endTeleportTransitionWithEffect(t);
  }
}
exports.TeleportTransitionWithEffect = TeleportTransitionWithEffect;
//# sourceMappingURL=teleport-transition-with-effect.js.map