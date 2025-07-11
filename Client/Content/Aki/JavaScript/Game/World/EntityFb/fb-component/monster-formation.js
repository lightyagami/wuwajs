"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterFormation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MonsterFormation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsMonsterFormation(t, o) {
    return (o || new MonsterFormation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMonsterFormation(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new MonsterFormation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  formationPosConfig(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + o) + t);
    } else {
      return 0;
    }
  }
  formationPosConfigLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  formationPosConfigArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startMonsterFormation(t) {
    t.startObject(1);
  }
  static addFormationPosConfig(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static createFormationPosConfigVector(o, r) {
    o.startVector(1, r.length, 1);
    for (let t = r.length - 1; t >= 0; t--) {
      o.addInt8(r[t]);
    }
    return o.endVector();
  }
  static startFormationPosConfigVector(t, o) {
    t.startVector(1, o, 1);
  }
  static endMonsterFormation(t) {
    return t.endObject();
  }
  static createMonsterFormation(t, o) {
    MonsterFormation.startMonsterFormation(t);
    MonsterFormation.addFormationPosConfig(t, o);
    return MonsterFormation.endMonsterFormation(t);
  }
}
exports.MonsterFormation = MonsterFormation;
//# sourceMappingURL=monster-formation.js.map