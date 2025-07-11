"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguePrefabConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RoguePrefabConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsRoguePrefabConfig(e, t) {
    return (t || new RoguePrefabConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRoguePrefabConfig(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new RoguePrefabConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  index() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startRoguePrefabConfig(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addIndex(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endRoguePrefabConfig(e) {
    return e.endObject();
  }
  static createRoguePrefabConfig(e, t, i) {
    RoguePrefabConfig.startRoguePrefabConfig(e);
    RoguePrefabConfig.addType(e, t);
    RoguePrefabConfig.addIndex(e, i);
    return RoguePrefabConfig.endRoguePrefabConfig(e);
  }
}
exports.RoguePrefabConfig = RoguePrefabConfig;
//# sourceMappingURL=rogue-prefab-config.js.map