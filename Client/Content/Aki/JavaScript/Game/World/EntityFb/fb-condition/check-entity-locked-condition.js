"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckEntityLockedCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckEntityLockedCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCheckEntityLockedCondition(t, i) {
    return (i || new CheckEntityLockedCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckEntityLockedCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CheckEntityLockedCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  entities(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return 0;
    }
  }
  entitiesLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entitiesArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  isLocked() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startCheckEntityLockedCondition(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEntities(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createEntitiesVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addInt32(e[t]);
    }
    return i.endVector();
  }
  static startEntitiesVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addIsLocked(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endCheckEntityLockedCondition(t) {
    return t.endObject();
  }
  static createCheckEntityLockedCondition(t, i, e, n) {
    CheckEntityLockedCondition.startCheckEntityLockedCondition(t);
    CheckEntityLockedCondition.addType(t, i);
    CheckEntityLockedCondition.addEntities(t, e);
    CheckEntityLockedCondition.addIsLocked(t, n);
    return CheckEntityLockedCondition.endCheckEntityLockedCondition(t);
  }
}
exports.CheckEntityLockedCondition = CheckEntityLockedCondition;
//# sourceMappingURL=check-entity-locked-condition.js.map