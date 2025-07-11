"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VariableMotion = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VariableMotion {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsVariableMotion(t, i) {
    return (i || new VariableMotion()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsVariableMotion(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new VariableMotion()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  acceleration() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  maxSpeed() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startVariableMotion(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addAcceleration(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addMaxSpeed(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static endVariableMotion(t) {
    return t.endObject();
  }
  static createVariableMotion(t, i, e, a) {
    VariableMotion.startVariableMotion(t);
    VariableMotion.addType(t, i);
    VariableMotion.addAcceleration(t, e);
    VariableMotion.addMaxSpeed(t, a);
    return VariableMotion.endVariableMotion(t);
  }
}
exports.VariableMotion = VariableMotion;
//# sourceMappingURL=variable-motion.js.map