"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlashTowerPrefabConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SlashTowerPrefabConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsSlashTowerPrefabConfig(e, r) {
    return (r || new SlashTowerPrefabConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSlashTowerPrefabConfig(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new SlashTowerPrefabConfig()).__init(e.readInt32(e.position()) + e.position(), e);
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
  static startSlashTowerPrefabConfig(e) {
    e.startObject(2);
  }
  static addType(e, r) {
    e.addFieldInt8(0, r, 0);
  }
  static addIndex(e, r) {
    e.addFieldInt32(1, r, 0);
  }
  static endSlashTowerPrefabConfig(e) {
    return e.endObject();
  }
  static createSlashTowerPrefabConfig(e, r, t) {
    SlashTowerPrefabConfig.startSlashTowerPrefabConfig(e);
    SlashTowerPrefabConfig.addType(e, r);
    SlashTowerPrefabConfig.addIndex(e, t);
    return SlashTowerPrefabConfig.endSlashTowerPrefabConfig(e);
  }
}
exports.SlashTowerPrefabConfig = SlashTowerPrefabConfig;
//# sourceMappingURL=slash-tower-prefab-config.js.map