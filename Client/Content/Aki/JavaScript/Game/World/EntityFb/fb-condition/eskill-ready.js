"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ESkillReady = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ESkillReady {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsESkillReady(t, e) {
    return (e || new ESkillReady()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsESkillReady(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ESkillReady()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startESkillReady(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endESkillReady(t) {
    return t.endObject();
  }
  static createESkillReady(t, e) {
    ESkillReady.startESkillReady(t);
    ESkillReady.addType(t, e);
    return ESkillReady.endESkillReady(t);
  }
}
exports.ESkillReady = ESkillReady;
//# sourceMappingURL=eskill-ready.js.map