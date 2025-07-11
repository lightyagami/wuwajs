"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButterflySplinePoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class ButterflySplinePoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsButterflySplinePoint(t, i) {
    return (i || new ButterflySplinePoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsButterflySplinePoint(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ButterflySplinePoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  position(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  arriveTangent(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  leaveTangent(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  lineType(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  rotation(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  moveSpeed() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  ignorePoint() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startButterflySplinePoint(t) {
    t.startObject(7);
  }
  static addPosition(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addArriveTangent(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addLeaveTangent(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addLineType(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addRotation(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addMoveSpeed(t, i) {
    t.addFieldInt32(5, i, 0);
  }
  static addIgnorePoint(t, i) {
    t.addFieldInt8(6, +i, 0);
  }
  static endButterflySplinePoint(t) {
    return t.endObject();
  }
}
exports.ButterflySplinePoint = ButterflySplinePoint;
//# sourceMappingURL=butterfly-spline-point.js.map