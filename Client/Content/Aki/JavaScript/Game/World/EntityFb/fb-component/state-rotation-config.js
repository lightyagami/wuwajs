"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateRotationConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const key_rotator_config_js_1 = require("../fb-component/key-rotator-config.js");
const rotation_config_js_1 = require("../fb-component/rotation-config.js");
class StateRotationConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsStateRotationConfig(t, o) {
    return (o || new StateRotationConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStateRotationConfig(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new StateRotationConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  state(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  isLoop() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  rotatePoint(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  rotationConfig(t, o) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return (o || new rotation_config_js_1.RotationConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  rotationConfigLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  keyRotatorConfig(t, o) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (o || new key_rotator_config_js_1.KeyRotatorConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  keyRotatorConfigLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  keepLastRotation() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startStateRotationConfig(t) {
    t.startObject(6);
  }
  static addState(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addIsLoop(t, o) {
    t.addFieldInt8(1, +o, 0);
  }
  static addRotatePoint(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static addRotationConfig(t, o) {
    t.addFieldOffset(3, o, 0);
  }
  static createRotationConfigVector(o, i) {
    o.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      o.addOffset(i[t]);
    }
    return o.endVector();
  }
  static startRotationConfigVector(t, o) {
    t.startVector(4, o, 4);
  }
  static addKeyRotatorConfig(t, o) {
    t.addFieldOffset(4, o, 0);
  }
  static createKeyRotatorConfigVector(o, i) {
    o.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      o.addOffset(i[t]);
    }
    return o.endVector();
  }
  static startKeyRotatorConfigVector(t, o) {
    t.startVector(4, o, 4);
  }
  static addKeepLastRotation(t, o) {
    t.addFieldInt8(5, +o, 0);
  }
  static endStateRotationConfig(t) {
    return t.endObject();
  }
  static createStateRotationConfig(t, o, i, a, e, n, s) {
    StateRotationConfig.startStateRotationConfig(t);
    StateRotationConfig.addState(t, o);
    StateRotationConfig.addIsLoop(t, i);
    StateRotationConfig.addRotatePoint(t, a);
    StateRotationConfig.addRotationConfig(t, e);
    StateRotationConfig.addKeyRotatorConfig(t, n);
    StateRotationConfig.addKeepLastRotation(t, s);
    return StateRotationConfig.endStateRotationConfig(t);
  }
}
exports.StateRotationConfig = StateRotationConfig;
//# sourceMappingURL=state-rotation-config.js.map