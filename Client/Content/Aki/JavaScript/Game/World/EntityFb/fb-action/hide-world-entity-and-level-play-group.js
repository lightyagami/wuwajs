"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HideWorldEntityAndLevelPlayGroup = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HideWorldEntityAndLevelPlayGroup {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsHideWorldEntityAndLevelPlayGroup(t, e) {
    return (e || new HideWorldEntityAndLevelPlayGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHideWorldEntityAndLevelPlayGroup(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new HideWorldEntityAndLevelPlayGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  hideRangeEntities(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  hideRangeEntitiesLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  hideRangeEntitiesArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  excludeEntities(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  excludeEntitiesLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  excludeEntitiesArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  excludeLevelPlays(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  excludeLevelPlaysLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  excludeLevelPlaysArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  appendEntities(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  appendEntitiesLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  appendEntitiesArray() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  appendLevelPlays(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  appendLevelPlaysLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  appendLevelPlaysArray() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startHideWorldEntityAndLevelPlayGroup(t) {
    t.startObject(6);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addHideRangeEntities(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createHideRangeEntitiesVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addInt32(i[t]);
    }
    return e.endVector();
  }
  static startHideRangeEntitiesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addExcludeEntities(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createExcludeEntitiesVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addInt32(i[t]);
    }
    return e.endVector();
  }
  static startExcludeEntitiesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addExcludeLevelPlays(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createExcludeLevelPlaysVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addInt32(i[t]);
    }
    return e.endVector();
  }
  static startExcludeLevelPlaysVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addAppendEntities(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createAppendEntitiesVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addInt32(i[t]);
    }
    return e.endVector();
  }
  static startAppendEntitiesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addAppendLevelPlays(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static createAppendLevelPlaysVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addInt32(i[t]);
    }
    return e.endVector();
  }
  static startAppendLevelPlaysVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endHideWorldEntityAndLevelPlayGroup(t) {
    return t.endObject();
  }
  static createHideWorldEntityAndLevelPlayGroup(t, e, i, s, r, n, a) {
    HideWorldEntityAndLevelPlayGroup.startHideWorldEntityAndLevelPlayGroup(t);
    HideWorldEntityAndLevelPlayGroup.addType(t, e);
    HideWorldEntityAndLevelPlayGroup.addHideRangeEntities(t, i);
    HideWorldEntityAndLevelPlayGroup.addExcludeEntities(t, s);
    HideWorldEntityAndLevelPlayGroup.addExcludeLevelPlays(t, r);
    HideWorldEntityAndLevelPlayGroup.addAppendEntities(t, n);
    HideWorldEntityAndLevelPlayGroup.addAppendLevelPlays(t, a);
    return HideWorldEntityAndLevelPlayGroup.endHideWorldEntityAndLevelPlayGroup(t);
  }
}
exports.HideWorldEntityAndLevelPlayGroup = HideWorldEntityAndLevelPlayGroup;
//# sourceMappingURL=hide-world-entity-and-level-play-group.js.map