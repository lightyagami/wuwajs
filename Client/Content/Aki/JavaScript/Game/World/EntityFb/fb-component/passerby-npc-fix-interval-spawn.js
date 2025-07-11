"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasserbyNpcFixIntervalSpawn = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PasserbyNpcFixIntervalSpawn {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsPasserbyNpcFixIntervalSpawn(t, s) {
    return (s || new PasserbyNpcFixIntervalSpawn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPasserbyNpcFixIntervalSpawn(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new PasserbyNpcFixIntervalSpawn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  maxSpawnCount() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  minDistance() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  interval() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startPasserbyNpcFixIntervalSpawn(t) {
    t.startObject(4);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addMaxSpawnCount(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addMinDistance(t, s) {
    t.addFieldInt32(2, s, 0);
  }
  static addInterval(t, s) {
    t.addFieldFloat32(3, s, 0);
  }
  static endPasserbyNpcFixIntervalSpawn(t) {
    return t.endObject();
  }
  static createPasserbyNpcFixIntervalSpawn(t, s, a, e, r) {
    PasserbyNpcFixIntervalSpawn.startPasserbyNpcFixIntervalSpawn(t);
    PasserbyNpcFixIntervalSpawn.addType(t, s);
    PasserbyNpcFixIntervalSpawn.addMaxSpawnCount(t, a);
    PasserbyNpcFixIntervalSpawn.addMinDistance(t, e);
    PasserbyNpcFixIntervalSpawn.addInterval(t, r);
    return PasserbyNpcFixIntervalSpawn.endPasserbyNpcFixIntervalSpawn(t);
  }
}
exports.PasserbyNpcFixIntervalSpawn = PasserbyNpcFixIntervalSpawn;
//# sourceMappingURL=passerby-npc-fix-interval-spawn.js.map