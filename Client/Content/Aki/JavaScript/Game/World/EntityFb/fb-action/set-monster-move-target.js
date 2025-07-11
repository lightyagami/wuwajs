"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetMonsterMoveTarget = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetMonsterMoveTarget {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetMonsterMoveTarget(t, e) {
    return (e || new SetMonsterMoveTarget()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetMonsterMoveTarget(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetMonsterMoveTarget()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  targetEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  moveEvent(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  monsterEntityIds(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  monsterEntityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  monsterEntityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startSetMonsterMoveTarget(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTargetEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addMoveEvent(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addMonsterEntityIds(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createMonsterEntityIdsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addInt32(r[t]);
    }
    return e.endVector();
  }
  static startMonsterEntityIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endSetMonsterMoveTarget(t) {
    return t.endObject();
  }
  static createSetMonsterMoveTarget(t, e, r, s, i) {
    SetMonsterMoveTarget.startSetMonsterMoveTarget(t);
    SetMonsterMoveTarget.addType(t, e);
    SetMonsterMoveTarget.addTargetEntityId(t, r);
    SetMonsterMoveTarget.addMoveEvent(t, s);
    SetMonsterMoveTarget.addMonsterEntityIds(t, i);
    return SetMonsterMoveTarget.endSetMonsterMoveTarget(t);
  }
}
exports.SetMonsterMoveTarget = SetMonsterMoveTarget;
//# sourceMappingURL=set-monster-move-target.js.map