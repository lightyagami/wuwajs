"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UniformMotion = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UniformMotion {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsUniformMotion(t, i) {
    return (i || new UniformMotion()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUniformMotion(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new UniformMotion()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startUniformMotion(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTime(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static endUniformMotion(t) {
    return t.endObject();
  }
  static createUniformMotion(t, i, o) {
    UniformMotion.startUniformMotion(t);
    UniformMotion.addType(t, i);
    UniformMotion.addTime(t, o);
    return UniformMotion.endUniformMotion(t);
  }
}
exports.UniformMotion = UniformMotion;
//# sourceMappingURL=uniform-motion.js.map