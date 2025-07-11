"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RotationConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class RotationConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsRotationConfig(t, i) {
    return (i || new RotationConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRotationConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new RotationConfig()).__init(t.readInt32(t.position()) + t.position(), t);
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
  cd() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  curve(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  axis(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  angle() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startRotationConfig(t) {
    t.startObject(6);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTime(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addCd(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static addCurve(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addAxis(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addAngle(t, i) {
    t.addFieldFloat32(5, i, 0);
  }
  static endRotationConfig(t) {
    return t.endObject();
  }
}
exports.RotationConfig = RotationConfig;
//# sourceMappingURL=rotation-config.js.map