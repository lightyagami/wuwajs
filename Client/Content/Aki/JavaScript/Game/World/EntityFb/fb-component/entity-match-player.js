"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityMatchPlayer = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityMatchPlayer {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEntityMatchPlayer(t, i) {
    return (i || new EntityMatchPlayer()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityMatchPlayer(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EntityMatchPlayer()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  matchRoleOptionType(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t);
    } else {
      return 0;
    }
  }
  matchRoleOptionTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  matchRoleOptionTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  matchRoleOption(t, i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(i, this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return undefined;
    }
  }
  matchRoleOptionLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  changeRoleTrigger() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startEntityMatchPlayer(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addMatchRoleOptionType(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createMatchRoleOptionTypeVector(i, e) {
    i.startVector(1, e.length, 1);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addInt8(e[t]);
    }
    return i.endVector();
  }
  static startMatchRoleOptionTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addMatchRoleOption(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createMatchRoleOptionVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startMatchRoleOptionVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addChangeRoleTrigger(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static endEntityMatchPlayer(t) {
    return t.endObject();
  }
  static createEntityMatchPlayer(t, i, e, r, a) {
    EntityMatchPlayer.startEntityMatchPlayer(t);
    EntityMatchPlayer.addType(t, i);
    EntityMatchPlayer.addMatchRoleOptionType(t, e);
    EntityMatchPlayer.addMatchRoleOption(t, r);
    EntityMatchPlayer.addChangeRoleTrigger(t, a);
    return EntityMatchPlayer.endEntityMatchPlayer(t);
  }
}
exports.EntityMatchPlayer = EntityMatchPlayer;
//# sourceMappingURL=entity-match-player.js.map