"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RotatorComponent2 = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const state_rotation_config_js_1 = require("../fb-component/state-rotation-config.js");
class RotatorComponent2 {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsRotatorComponent2(t, o) {
    return (o || new RotatorComponent2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRotatorComponent2(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new RotatorComponent2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  config(t, o) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (o || new state_rotation_config_js_1.StateRotationConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  configLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startRotatorComponent2(t) {
    t.startObject(2);
  }
  static addDisabled(t, o) {
    t.addFieldInt8(0, +o, 0);
  }
  static addConfig(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static createConfigVector(o, e) {
    o.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      o.addOffset(e[t]);
    }
    return o.endVector();
  }
  static startConfigVector(t, o) {
    t.startVector(4, o, 4);
  }
  static endRotatorComponent2(t) {
    return t.endObject();
  }
  static createRotatorComponent2(t, o, e) {
    RotatorComponent2.startRotatorComponent2(t);
    RotatorComponent2.addDisabled(t, o);
    RotatorComponent2.addConfig(t, e);
    return RotatorComponent2.endRotatorComponent2(t);
  }
}
exports.RotatorComponent2 = RotatorComponent2;
//# sourceMappingURL=rotator-component2.js.map