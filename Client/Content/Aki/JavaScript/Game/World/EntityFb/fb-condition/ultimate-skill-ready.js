"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UltimateSkillReady = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UltimateSkillReady {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsUltimateSkillReady(t, e) {
    return (e || new UltimateSkillReady()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUltimateSkillReady(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new UltimateSkillReady()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startUltimateSkillReady(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endUltimateSkillReady(t) {
    return t.endObject();
  }
  static createUltimateSkillReady(t, e) {
    UltimateSkillReady.startUltimateSkillReady(t);
    UltimateSkillReady.addType(t, e);
    return UltimateSkillReady.endUltimateSkillReady(t);
  }
}
exports.UltimateSkillReady = UltimateSkillReady;
//# sourceMappingURL=ultimate-skill-ready.js.map