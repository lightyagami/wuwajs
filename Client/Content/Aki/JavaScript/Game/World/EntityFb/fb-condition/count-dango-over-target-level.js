"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountDangoOverTargetLevel = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CountDangoOverTargetLevel {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCountDangoOverTargetLevel(e, t) {
    return (t || new CountDangoOverTargetLevel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCountDangoOverTargetLevel(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CountDangoOverTargetLevel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  targetNumber() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  targetLevel() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCountDangoOverTargetLevel(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTargetNumber(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addTargetLevel(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endCountDangoOverTargetLevel(e) {
    return e.endObject();
  }
  static createCountDangoOverTargetLevel(e, t, r, a) {
    CountDangoOverTargetLevel.startCountDangoOverTargetLevel(e);
    CountDangoOverTargetLevel.addType(e, t);
    CountDangoOverTargetLevel.addTargetNumber(e, r);
    CountDangoOverTargetLevel.addTargetLevel(e, a);
    return CountDangoOverTargetLevel.endCountDangoOverTargetLevel(e);
  }
}
exports.CountDangoOverTargetLevel = CountDangoOverTargetLevel;
//# sourceMappingURL=count-dango-over-target-level.js.map