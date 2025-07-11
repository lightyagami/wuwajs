"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportSceneEffect = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportSceneEffect {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsTeleportSceneEffect(e, t) {
    return (t || new TeleportSceneEffect()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsTeleportSceneEffect(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new TeleportSceneEffect()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  worldEffectPath(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  screenEffectPath(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startTeleportSceneEffect(e) {
    e.startObject(2);
  }
  static addWorldEffectPath(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addScreenEffectPath(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endTeleportSceneEffect(e) {
    return e.endObject();
  }
  static createTeleportSceneEffect(e, t, r) {
    TeleportSceneEffect.startTeleportSceneEffect(e);
    TeleportSceneEffect.addWorldEffectPath(e, t);
    TeleportSceneEffect.addScreenEffectPath(e, r);
    return TeleportSceneEffect.endTeleportSceneEffect(e);
  }
}
exports.TeleportSceneEffect = TeleportSceneEffect;
//# sourceMappingURL=teleport-scene-effect.js.map