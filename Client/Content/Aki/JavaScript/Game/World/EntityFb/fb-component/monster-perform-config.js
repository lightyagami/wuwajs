"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterPerformConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_monster_show_on_death_config_js_1 = require("../fb-component/union-monster-show-on-death-config.js");
class MonsterPerformConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsMonsterPerformConfig(t, o) {
    return (o || new MonsterPerformConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMonsterPerformConfig(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new MonsterPerformConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  showOnDeathType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_monster_show_on_death_config_js_1.UnionMonsterShowOnDeathConfig.NONE;
    }
  }
  showOnDeath(t) {
    var o = this.bb.__offset(this.bb_pos, 6);
    if (o) {
      return this.bb.__union(t, this.bb_pos + o);
    } else {
      return undefined;
    }
  }
  static startMonsterPerformConfig(t) {
    t.startObject(2);
  }
  static addShowOnDeathType(t, o) {
    t.addFieldInt8(0, o, union_monster_show_on_death_config_js_1.UnionMonsterShowOnDeathConfig.NONE);
  }
  static addShowOnDeath(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static endMonsterPerformConfig(t) {
    return t.endObject();
  }
  static createMonsterPerformConfig(t, o, r) {
    MonsterPerformConfig.startMonsterPerformConfig(t);
    MonsterPerformConfig.addShowOnDeathType(t, o);
    MonsterPerformConfig.addShowOnDeath(t, r);
    return MonsterPerformConfig.endMonsterPerformConfig(t);
  }
}
exports.MonsterPerformConfig = MonsterPerformConfig;
//# sourceMappingURL=monster-perform-config.js.map