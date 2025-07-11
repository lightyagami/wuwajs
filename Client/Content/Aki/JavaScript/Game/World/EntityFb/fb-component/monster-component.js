"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const boss_state_view_config_js_1 = require("../fb-component/boss-state-view-config.js");
const monster_perform_config_js_1 = require("../fb-component/monster-perform-config.js");
class MonsterComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsMonsterComponent(t, s) {
    return (s || new MonsterComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMonsterComponent(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new MonsterComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  fightConfigId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  bossViewConfig(t) {
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return (t || new boss_state_view_config_js_1.BossStateViewConfig()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  initGasTag(t, s) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + i) + t * 4, s);
    } else {
      return undefined;
    }
  }
  initGasTagLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  specialHateAndSenseConfig() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  performConfig(t) {
    var s = this.bb.__offset(this.bb_pos, 14);
    if (s) {
      return (t || new monster_perform_config_js_1.MonsterPerformConfig()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  shareLifeSubMonsterIds(t) {
    var s = this.bb.__offset(this.bb_pos, 16);
    if (s) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + s) + t * 4);
    } else {
      return 0;
    }
  }
  shareLifeSubMonsterIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  shareLifeSubMonsterIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startMonsterComponent(t) {
    t.startObject(7);
  }
  static addDisabled(t, s) {
    t.addFieldInt8(0, +s, 0);
  }
  static addFightConfigId(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addBossViewConfig(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static addInitGasTag(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static createInitGasTagVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      s.addOffset(i[t]);
    }
    return s.endVector();
  }
  static startInitGasTagVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addSpecialHateAndSenseConfig(t, s) {
    t.addFieldInt32(4, s, 0);
  }
  static addPerformConfig(t, s) {
    t.addFieldOffset(5, s, 0);
  }
  static addShareLifeSubMonsterIds(t, s) {
    t.addFieldOffset(6, s, 0);
  }
  static createShareLifeSubMonsterIdsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      s.addInt32(i[t]);
    }
    return s.endVector();
  }
  static startShareLifeSubMonsterIdsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endMonsterComponent(t) {
    return t.endObject();
  }
}
exports.MonsterComponent = MonsterComponent;
//# sourceMappingURL=monster-component.js.map