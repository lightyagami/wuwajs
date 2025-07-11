"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpawnMonsterPreDependOnPreceding = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SpawnMonsterPreDependOnPreceding {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSpawnMonsterPreDependOnPreceding(e, t) {
    return (t || new SpawnMonsterPreDependOnPreceding()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSpawnMonsterPreDependOnPreceding(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SpawnMonsterPreDependOnPreceding()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  ids(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + t) + e * 4);
    } else {
      return 0;
    }
  }
  idsLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  idsArray() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + e), this.bb.__vector_len(this.bb_pos + e));
    } else {
      return undefined;
    }
  }
  static startSpawnMonsterPreDependOnPreceding(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addIds(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createIdsVector(t, r) {
    t.startVector(4, r.length, 4);
    for (let e = r.length - 1; e >= 0; e--) {
      t.addInt32(r[e]);
    }
    return t.endVector();
  }
  static startIdsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endSpawnMonsterPreDependOnPreceding(e) {
    return e.endObject();
  }
  static createSpawnMonsterPreDependOnPreceding(e, t, r) {
    SpawnMonsterPreDependOnPreceding.startSpawnMonsterPreDependOnPreceding(e);
    SpawnMonsterPreDependOnPreceding.addType(e, t);
    SpawnMonsterPreDependOnPreceding.addIds(e, r);
    return SpawnMonsterPreDependOnPreceding.endSpawnMonsterPreDependOnPreceding(e);
  }
}
exports.SpawnMonsterPreDependOnPreceding = SpawnMonsterPreDependOnPreceding;
//# sourceMappingURL=spawn-monster-pre-depend-on-preceding.js.map