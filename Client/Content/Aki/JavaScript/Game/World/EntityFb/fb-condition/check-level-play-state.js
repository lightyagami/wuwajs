"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckLevelPlayState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckLevelPlayState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCheckLevelPlayState(e, t) {
    return (t || new CheckLevelPlayState()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCheckLevelPlayState(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CheckLevelPlayState()).__init(e.readInt32(e.position()) + e.position(), e);
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
  state() {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCheckLevelPlayState(e) {
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
  static addState(e, t) {
    e.addFieldInt8(3, t, 0);
  }
  static endCheckLevelPlayState(e) {
    return e.endObject();
  }
  static createCheckLevelPlayState(e, t, a, s, i) {
    CheckLevelPlayState.startCheckLevelPlayState(e);
    CheckLevelPlayState.addType(e, t);
    CheckLevelPlayState.addLevelId(e, a);
    CheckLevelPlayState.addCompare(e, s);
    CheckLevelPlayState.addState(e, i);
    return CheckLevelPlayState.endCheckLevelPlayState(e);
  }
}
exports.CheckLevelPlayState = CheckLevelPlayState;
//# sourceMappingURL=check-level-play-state.js.map