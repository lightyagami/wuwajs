"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasserbyNpcSpawnComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_passerby_npc_move_js_1 = require("../fb-component/union-passerby-npc-move.js");
const union_passerby_npc_source_js_1 = require("../fb-component/union-passerby-npc-source.js");
const union_passerby_npc_spawn_js_1 = require("../fb-component/union-passerby-npc-spawn.js");
class PasserbyNpcSpawnComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(s, n) {
    this.bb_pos = s;
    this.bb = n;
    return this;
  }
  static getRootAsPasserbyNpcSpawnComponent(s, n) {
    return (n || new PasserbyNpcSpawnComponent()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  static getSizePrefixedRootAsPasserbyNpcSpawnComponent(s, n) {
    s.setPosition(s.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new PasserbyNpcSpawnComponent()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  disabled() {
    var s = this.bb.__offset(this.bb_pos, 4);
    return !!s && !!this.bb.readInt8(this.bb_pos + s);
  }
  moveConfigType() {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.readUint8(this.bb_pos + s);
    } else {
      return union_passerby_npc_move_js_1.UnionPasserbyNpcMove.NONE;
    }
  }
  moveConfig(s) {
    var n = this.bb.__offset(this.bb_pos, 8);
    if (n) {
      return this.bb.__union(s, this.bb_pos + n);
    } else {
      return undefined;
    }
  }
  spawnConfigType() {
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return this.bb.readUint8(this.bb_pos + s);
    } else {
      return union_passerby_npc_spawn_js_1.UnionPasserbyNpcSpawn.NONE;
    }
  }
  spawnConfig(s) {
    var n = this.bb.__offset(this.bb_pos, 12);
    if (n) {
      return this.bb.__union(s, this.bb_pos + n);
    } else {
      return undefined;
    }
  }
  sourceConfigType() {
    var s = this.bb.__offset(this.bb_pos, 14);
    if (s) {
      return this.bb.readUint8(this.bb_pos + s);
    } else {
      return union_passerby_npc_source_js_1.UnionPasserbyNpcSource.NONE;
    }
  }
  sourceConfig(s) {
    var n = this.bb.__offset(this.bb_pos, 16);
    if (n) {
      return this.bb.__union(s, this.bb_pos + n);
    } else {
      return undefined;
    }
  }
  static startPasserbyNpcSpawnComponent(s) {
    s.startObject(7);
  }
  static addDisabled(s, n) {
    s.addFieldInt8(0, +n, 0);
  }
  static addMoveConfigType(s, n) {
    s.addFieldInt8(1, n, union_passerby_npc_move_js_1.UnionPasserbyNpcMove.NONE);
  }
  static addMoveConfig(s, n) {
    s.addFieldOffset(2, n, 0);
  }
  static addSpawnConfigType(s, n) {
    s.addFieldInt8(3, n, union_passerby_npc_spawn_js_1.UnionPasserbyNpcSpawn.NONE);
  }
  static addSpawnConfig(s, n) {
    s.addFieldOffset(4, n, 0);
  }
  static addSourceConfigType(s, n) {
    s.addFieldInt8(5, n, union_passerby_npc_source_js_1.UnionPasserbyNpcSource.NONE);
  }
  static addSourceConfig(s, n) {
    s.addFieldOffset(6, n, 0);
  }
  static endPasserbyNpcSpawnComponent(s) {
    return s.endObject();
  }
  static createPasserbyNpcSpawnComponent(s, n, e, t, o, p, a, r) {
    PasserbyNpcSpawnComponent.startPasserbyNpcSpawnComponent(s);
    PasserbyNpcSpawnComponent.addDisabled(s, n);
    PasserbyNpcSpawnComponent.addMoveConfigType(s, e);
    PasserbyNpcSpawnComponent.addMoveConfig(s, t);
    PasserbyNpcSpawnComponent.addSpawnConfigType(s, o);
    PasserbyNpcSpawnComponent.addSpawnConfig(s, p);
    PasserbyNpcSpawnComponent.addSourceConfigType(s, a);
    PasserbyNpcSpawnComponent.addSourceConfig(s, r);
    return PasserbyNpcSpawnComponent.endPasserbyNpcSpawnComponent(s);
  }
}
exports.PasserbyNpcSpawnComponent = PasserbyNpcSpawnComponent;
//# sourceMappingURL=passerby-npc-spawn-component.js.map