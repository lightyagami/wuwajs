"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThrowCfg = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_throw_motion_js_1 = require("../fb-component/union-throw-motion.js");
class ThrowCfg {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsThrowCfg(t, o) {
    return (o || new ThrowCfg()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsThrowCfg(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new ThrowCfg()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  motionConfigType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_throw_motion_js_1.UnionThrowMotion.NONE;
    }
  }
  motionConfig(t) {
    var o = this.bb.__offset(this.bb_pos, 6);
    if (o) {
      return this.bb.__union(t, this.bb_pos + o);
    } else {
      return undefined;
    }
  }
  static startThrowCfg(t) {
    t.startObject(2);
  }
  static addMotionConfigType(t, o) {
    t.addFieldInt8(0, o, union_throw_motion_js_1.UnionThrowMotion.NONE);
  }
  static addMotionConfig(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static endThrowCfg(t) {
    return t.endObject();
  }
  static createThrowCfg(t, o, r) {
    ThrowCfg.startThrowCfg(t);
    ThrowCfg.addMotionConfigType(t, o);
    ThrowCfg.addMotionConfig(t, r);
    return ThrowCfg.endThrowCfg(t);
  }
}
exports.ThrowCfg = ThrowCfg;
//# sourceMappingURL=throw-cfg.js.map