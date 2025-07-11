"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpawnMonsterConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_spawn_monster_complete_condition_js_1 = require("../fb-component/union-spawn-monster-complete-condition.js");
const union_spawn_monster_pre_condition_js_1 = require("../fb-component/union-spawn-monster-pre-condition.js");
class SpawnMonsterConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, n) {
    this.bb_pos = t;
    this.bb = n;
    return this;
  }
  static getRootAsSpawnMonsterConfig(t, n) {
    return (n || new SpawnMonsterConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSpawnMonsterConfig(t, n) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new SpawnMonsterConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  delayTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  targetsToAwake(t) {
    var n = this.bb.__offset(this.bb_pos, 8);
    if (n) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + n) + t * 4);
    } else {
      return 0;
    }
  }
  targetsToAwakeLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  targetsToAwakeArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  completeConditionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_spawn_monster_complete_condition_js_1.UnionSpawnMonsterCompleteCondition.NONE;
    }
  }
  completeCondition(t) {
    var n = this.bb.__offset(this.bb_pos, 12);
    if (n) {
      return this.bb.__union(t, this.bb_pos + n);
    } else {
      return undefined;
    }
  }
  preConditionType() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_spawn_monster_pre_condition_js_1.UnionSpawnMonsterPreCondition.NONE;
    }
  }
  preCondition(t) {
    var n = this.bb.__offset(this.bb_pos, 16);
    if (n) {
      return this.bb.__union(t, this.bb_pos + n);
    } else {
      return undefined;
    }
  }
  static startSpawnMonsterConfig(t) {
    t.startObject(7);
  }
  static addId(t, n) {
    t.addFieldInt32(0, n, 0);
  }
  static addDelayTime(t, n) {
    t.addFieldFloat32(1, n, 0);
  }
  static addTargetsToAwake(t, n) {
    t.addFieldOffset(2, n, 0);
  }
  static createTargetsToAwakeVector(n, i) {
    n.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      n.addInt32(i[t]);
    }
    return n.endVector();
  }
  static startTargetsToAwakeVector(t, n) {
    t.startVector(4, n, 4);
  }
  static addCompleteConditionType(t, n) {
    t.addFieldInt8(3, n, union_spawn_monster_complete_condition_js_1.UnionSpawnMonsterCompleteCondition.NONE);
  }
  static addCompleteCondition(t, n) {
    t.addFieldOffset(4, n, 0);
  }
  static addPreConditionType(t, n) {
    t.addFieldInt8(5, n, union_spawn_monster_pre_condition_js_1.UnionSpawnMonsterPreCondition.NONE);
  }
  static addPreCondition(t, n) {
    t.addFieldOffset(6, n, 0);
  }
  static endSpawnMonsterConfig(t) {
    return t.endObject();
  }
  static createSpawnMonsterConfig(t, n, i, s, e, o, r, a) {
    SpawnMonsterConfig.startSpawnMonsterConfig(t);
    SpawnMonsterConfig.addId(t, n);
    SpawnMonsterConfig.addDelayTime(t, i);
    SpawnMonsterConfig.addTargetsToAwake(t, s);
    SpawnMonsterConfig.addCompleteConditionType(t, e);
    SpawnMonsterConfig.addCompleteCondition(t, o);
    SpawnMonsterConfig.addPreConditionType(t, r);
    SpawnMonsterConfig.addPreCondition(t, a);
    return SpawnMonsterConfig.endSpawnMonsterConfig(t);
  }
}
exports.SpawnMonsterConfig = SpawnMonsterConfig;
//# sourceMappingURL=spawn-monster-config.js.map