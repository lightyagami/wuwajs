"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConstantCameraShake = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ConstantCameraShake {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsConstantCameraShake(t, a) {
    return (a || new ConstantCameraShake()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsConstantCameraShake(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new ConstantCameraShake()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startConstantCameraShake(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endConstantCameraShake(t) {
    return t.endObject();
  }
  static createConstantCameraShake(t, a) {
    ConstantCameraShake.startConstantCameraShake(t);
    ConstantCameraShake.addType(t, a);
    return ConstantCameraShake.endConstantCameraShake(t);
  }
}
exports.ConstantCameraShake = ConstantCameraShake;
//# sourceMappingURL=constant-camera-shake.js.map