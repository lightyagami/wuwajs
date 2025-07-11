"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButterflySpline = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const butterfly_spline_point_js_1 = require("../fb-component/butterfly-spline-point.js");
class ButterflySpline {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsButterflySpline(t, e) {
    return (e || new ButterflySpline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsButterflySpline(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ButterflySpline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  points(t, e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (e || new butterfly_spline_point_js_1.ButterflySplinePoint()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
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
  static startButterflySpline(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addPoints(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createPointsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startPointsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endButterflySpline(t) {
    return t.endObject();
  }
  static createButterflySpline(t, e, i) {
    ButterflySpline.startButterflySpline(t);
    ButterflySpline.addType(t, e);
    ButterflySpline.addPoints(t, i);
    return ButterflySpline.endButterflySpline(t);
  }
}
exports.ButterflySpline = ButterflySpline;
//# sourceMappingURL=butterfly-spline.js.map