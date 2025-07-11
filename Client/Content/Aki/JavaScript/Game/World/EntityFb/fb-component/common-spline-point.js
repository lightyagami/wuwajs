"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonSplinePoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class CommonSplinePoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCommonSplinePoint(t, i) {
    return (i || new CommonSplinePoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCommonSplinePoint(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CommonSplinePoint()).__init(t.readInt32(t.position()) + t.position(), t);
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
  static startCommonSplinePoint(t) {
    t.startObject(5);
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
  static endCommonSplinePoint(t) {
    return t.endObject();
  }
}
exports.CommonSplinePoint = CommonSplinePoint;
//# sourceMappingURL=common-spline-point.js.map