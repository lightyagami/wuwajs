"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckDungeonHasSaveConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckDungeonHasSaveConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, n) {
    this.bb_pos = e;
    this.bb = n;
    return this;
  }
  static getRootAsCheckDungeonHasSaveConfig(e, n) {
    return (n || new CheckDungeonHasSaveConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCheckDungeonHasSaveConfig(e, n) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new CheckDungeonHasSaveConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var n = this.bb.__offset(this.bb_pos, 4);
    if (n) {
      return this.bb.__string(this.bb_pos + n, e);
    } else {
      return undefined;
    }
  }
  dungeonId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  isHasSaveConfig() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startCheckDungeonHasSaveConfig(e) {
    e.startObject(3);
  }
  static addType(e, n) {
    e.addFieldOffset(0, n, 0);
  }
  static addDungeonId(e, n) {
    e.addFieldInt32(1, n, 0);
  }
  static addIsHasSaveConfig(e, n) {
    e.addFieldInt8(2, +n, 0);
  }
  static endCheckDungeonHasSaveConfig(e) {
    return e.endObject();
  }
  static createCheckDungeonHasSaveConfig(e, n, t, s) {
    CheckDungeonHasSaveConfig.startCheckDungeonHasSaveConfig(e);
    CheckDungeonHasSaveConfig.addType(e, n);
    CheckDungeonHasSaveConfig.addDungeonId(e, t);
    CheckDungeonHasSaveConfig.addIsHasSaveConfig(e, s);
    return CheckDungeonHasSaveConfig.endCheckDungeonHasSaveConfig(e);
  }
}
exports.CheckDungeonHasSaveConfig = CheckDungeonHasSaveConfig;
//# sourceMappingURL=check-dungeon-has-save-config.js.map