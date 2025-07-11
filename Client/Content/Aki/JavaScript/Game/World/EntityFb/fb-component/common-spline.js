"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonSpline = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const common_spline_point_js_1 = require("../fb-component/common-spline-point.js");
class CommonSpline {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCommonSpline(t, i) {
    return (i || new CommonSpline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCommonSpline(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CommonSpline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  points(t, i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (i || new common_spline_point_js_1.CommonSplinePoint()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  pointsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCommonSpline(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPoints(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createPointsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startPointsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endCommonSpline(t) {
    return t.endObject();
  }
  static createCommonSpline(t, i, e) {
    CommonSpline.startCommonSpline(t);
    CommonSpline.addType(t, i);
    CommonSpline.addPoints(t, e);
    return CommonSpline.endCommonSpline(t);
  }
}
exports.CommonSpline = CommonSpline;
//# sourceMappingURL=common-spline.js.map