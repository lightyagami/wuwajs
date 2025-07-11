"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiCycleLooply = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LevelAiCycleLooply {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsLevelAiCycleLooply(e, t) {
    return (t || new LevelAiCycleLooply()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsLevelAiCycleLooply(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new LevelAiCycleLooply()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  isCircle() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startLevelAiCycleLooply(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addIsCircle(e, t) {
    e.addFieldInt8(1, +t, 0);
  }
  static endLevelAiCycleLooply(e) {
    return e.endObject();
  }
  static createLevelAiCycleLooply(e, t, l) {
    LevelAiCycleLooply.startLevelAiCycleLooply(e);
    LevelAiCycleLooply.addType(e, t);
    LevelAiCycleLooply.addIsCircle(e, l);
    return LevelAiCycleLooply.endLevelAiCycleLooply(e);
  }
}
exports.LevelAiCycleLooply = LevelAiCycleLooply;
//# sourceMappingURL=level-ai-cycle-looply.js.map