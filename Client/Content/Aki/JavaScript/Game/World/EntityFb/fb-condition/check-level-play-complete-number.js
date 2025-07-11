"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckLevelPlayCompleteNumber = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckLevelPlayCompleteNumber {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCheckLevelPlayCompleteNumber(e, t) {
    return (t || new CheckLevelPlayCompleteNumber()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCheckLevelPlayCompleteNumber(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CheckLevelPlayCompleteNumber()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  levelId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  compare(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  number() {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCheckLevelPlayCompleteNumber(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addLevelId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addNumber(e, t) {
    e.addFieldInt32(3, t, 0);
  }
  static endCheckLevelPlayCompleteNumber(e) {
    return e.endObject();
  }
  static createCheckLevelPlayCompleteNumber(e, t, r, l, s) {
    CheckLevelPlayCompleteNumber.startCheckLevelPlayCompleteNumber(e);
    CheckLevelPlayCompleteNumber.addType(e, t);
    CheckLevelPlayCompleteNumber.addLevelId(e, r);
    CheckLevelPlayCompleteNumber.addCompare(e, l);
    CheckLevelPlayCompleteNumber.addNumber(e, s);
    return CheckLevelPlayCompleteNumber.endCheckLevelPlayCompleteNumber(e);
  }
}
exports.CheckLevelPlayCompleteNumber = CheckLevelPlayCompleteNumber;
//# sourceMappingURL=check-level-play-complete-number.js.map