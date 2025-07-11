"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrefabConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PrefabConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPrefabConfig(t, e) {
    return (e || new PrefabConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPrefabConfig(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PrefabConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  prefabId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startPrefabConfig(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addPrefabId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endPrefabConfig(t) {
    return t.endObject();
  }
  static createPrefabConfig(t, e, r) {
    PrefabConfig.startPrefabConfig(t);
    PrefabConfig.addType(t, e);
    PrefabConfig.addPrefabId(t, r);
    return PrefabConfig.endPrefabConfig(t);
  }
}
exports.PrefabConfig = PrefabConfig;
//# sourceMappingURL=prefab-config.js.map