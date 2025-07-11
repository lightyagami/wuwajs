"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossStateViewConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BossStateViewConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsBossStateViewConfig(t, s) {
    return (s || new BossStateViewConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBossStateViewConfig(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new BossStateViewConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  bossStateViewType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  tidBossSubTitle(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  bossStateInfoShowType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  tidLevelText(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  onlyShowInBattleState() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  showDistance() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startBossStateViewConfig(t) {
    t.startObject(6);
  }
  static addBossStateViewType(t, s) {
    t.addFieldInt8(0, s, 0);
  }
  static addTidBossSubTitle(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addBossStateInfoShowType(t, s) {
    t.addFieldInt8(2, s, 0);
  }
  static addTidLevelText(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static addOnlyShowInBattleState(t, s) {
    t.addFieldInt8(4, +s, 0);
  }
  static addShowDistance(t, s) {
    t.addFieldInt32(5, s, 0);
  }
  static endBossStateViewConfig(t) {
    return t.endObject();
  }
  static createBossStateViewConfig(t, s, i, e, o, a, n) {
    BossStateViewConfig.startBossStateViewConfig(t);
    BossStateViewConfig.addBossStateViewType(t, s);
    BossStateViewConfig.addTidBossSubTitle(t, i);
    BossStateViewConfig.addBossStateInfoShowType(t, e);
    BossStateViewConfig.addTidLevelText(t, o);
    BossStateViewConfig.addOnlyShowInBattleState(t, a);
    BossStateViewConfig.addShowDistance(t, n);
    return BossStateViewConfig.endBossStateViewConfig(t);
  }
}
exports.BossStateViewConfig = BossStateViewConfig;
//# sourceMappingURL=boss-state-view-config.js.map