"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayVarContext = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LevelPlayVarContext {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsLevelPlayVarContext(t, e) {
    return (e || new LevelPlayVarContext()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLevelPlayVarContext(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new LevelPlayVarContext()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startLevelPlayVarContext(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endLevelPlayVarContext(t) {
    return t.endObject();
  }
  static createLevelPlayVarContext(t, e, a) {
    LevelPlayVarContext.startLevelPlayVarContext(t);
    LevelPlayVarContext.addType(t, e);
    LevelPlayVarContext.addId(t, a);
    return LevelPlayVarContext.endLevelPlayVarContext(t);
  }
}
exports.LevelPlayVarContext = LevelPlayVarContext;
//# sourceMappingURL=level-play-var-context.js.map