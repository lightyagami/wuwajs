"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrefabEffectConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PrefabEffectConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPrefabEffectConfig(t, e) {
    return (e || new PrefabEffectConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPrefabEffectConfig(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PrefabEffectConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  levelTag() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  sceneInteractionEffectState() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startPrefabEffectConfig(t) {
    t.startObject(2);
  }
  static addLevelTag(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addSceneInteractionEffectState(t, e) {
    t.addFieldInt8(1, e, 0);
  }
  static endPrefabEffectConfig(t) {
    return t.endObject();
  }
  static createPrefabEffectConfig(t, e, f) {
    PrefabEffectConfig.startPrefabEffectConfig(t);
    PrefabEffectConfig.addLevelTag(t, e);
    PrefabEffectConfig.addSceneInteractionEffectState(t, f);
    return PrefabEffectConfig.endPrefabEffectConfig(t);
  }
}
exports.PrefabEffectConfig = PrefabEffectConfig;
//# sourceMappingURL=prefab-effect-config.js.map