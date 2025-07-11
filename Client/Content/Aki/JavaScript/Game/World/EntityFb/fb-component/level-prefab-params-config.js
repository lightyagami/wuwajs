"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPrefabParamsConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_params_preset_js_1 = require("../fb-var/union-params-preset.js");
class LevelPrefabParamsConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsLevelPrefabParamsConfig(e, r) {
    return (r || new LevelPrefabParamsConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsLevelPrefabParamsConfig(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new LevelPrefabParamsConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  referenceActorKey(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, e);
    } else {
      return undefined;
    }
  }
  paramsType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_params_preset_js_1.UnionParamsPreset.NONE;
    }
  }
  params(e) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return this.bb.__union(e, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  static startLevelPrefabParamsConfig(e) {
    e.startObject(3);
  }
  static addReferenceActorKey(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static addParamsType(e, r) {
    e.addFieldInt8(1, r, union_params_preset_js_1.UnionParamsPreset.NONE);
  }
  static addParams(e, r) {
    e.addFieldOffset(2, r, 0);
  }
  static endLevelPrefabParamsConfig(e) {
    return e.endObject();
  }
  static createLevelPrefabParamsConfig(e, r, a, s) {
    LevelPrefabParamsConfig.startLevelPrefabParamsConfig(e);
    LevelPrefabParamsConfig.addReferenceActorKey(e, r);
    LevelPrefabParamsConfig.addParamsType(e, a);
    LevelPrefabParamsConfig.addParams(e, s);
    return LevelPrefabParamsConfig.endLevelPrefabParamsConfig(e);
  }
}
exports.LevelPrefabParamsConfig = LevelPrefabParamsConfig;
//# sourceMappingURL=level-prefab-params-config.js.map