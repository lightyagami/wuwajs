"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlendFunction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BlendFunction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, n) {
    this.bb_pos = t;
    this.bb = n;
    return this;
  }
  static getRootAsBlendFunction(t, n) {
    return (n || new BlendFunction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBlendFunction(t, n) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new BlendFunction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  blendExp() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startBlendFunction(t) {
    t.startObject(2);
  }
  static addType(t, n) {
    t.addFieldInt8(0, n, 0);
  }
  static addBlendExp(t, n) {
    t.addFieldFloat32(1, n, 0);
  }
  static endBlendFunction(t) {
    return t.endObject();
  }
  static createBlendFunction(t, n, e) {
    BlendFunction.startBlendFunction(t);
    BlendFunction.addType(t, n);
    BlendFunction.addBlendExp(t, e);
    return BlendFunction.endBlendFunction(t);
  }
}
exports.BlendFunction = BlendFunction;
//# sourceMappingURL=blend-function.js.map