"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParkourSpline = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const parkour_spline_point_js_1 = require("../fb-component/parkour-spline-point.js");
class ParkourSpline {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsParkourSpline(t, r) {
    return (r || new ParkourSpline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsParkourSpline(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ParkourSpline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  isRequireToEnd() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  checkPointsRequire() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  checkPointResource(t) {
    var r = this.bb.__offset(this.bb_pos, 10);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  checkPointsDestroyRes(t) {
    var r = this.bb.__offset(this.bb_pos, 12);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  startResource(t) {
    var r = this.bb.__offset(this.bb_pos, 14);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  endResource(t) {
    var r = this.bb.__offset(this.bb_pos, 16);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  points(t, r) {
    var i = this.bb.__offset(this.bb_pos, 18);
    if (i) {
      return (r || new parkour_spline_point_js_1.ParkourSplinePoint()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  pointsLength() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startParkourSpline(t) {
    t.startObject(8);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addIsRequireToEnd(t, r) {
    t.addFieldInt8(1, +r, 0);
  }
  static addCheckPointsRequire(t, r) {
    t.addFieldInt32(2, r, 0);
  }
  static addCheckPointResource(t, r) {
    t.addFieldOffset(3, r, 0);
  }
  static addCheckPointsDestroyRes(t, r) {
    t.addFieldOffset(4, r, 0);
  }
  static addStartResource(t, r) {
    t.addFieldOffset(5, r, 0);
  }
  static addEndResource(t, r) {
    t.addFieldOffset(6, r, 0);
  }
  static addPoints(t, r) {
    t.addFieldOffset(7, r, 0);
  }
  static createPointsVector(r, i) {
    r.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      r.addOffset(i[t]);
    }
    return r.endVector();
  }
  static startPointsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endParkourSpline(t) {
    return t.endObject();
  }
  static createParkourSpline(t, r, i, e, s, o, a, n, u) {
    ParkourSpline.startParkourSpline(t);
    ParkourSpline.addType(t, r);
    ParkourSpline.addIsRequireToEnd(t, i);
    ParkourSpline.addCheckPointsRequire(t, e);
    ParkourSpline.addCheckPointResource(t, s);
    ParkourSpline.addCheckPointsDestroyRes(t, o);
    ParkourSpline.addStartResource(t, a);
    ParkourSpline.addEndResource(t, n);
    ParkourSpline.addPoints(t, u);
    return ParkourSpline.endParkourSpline(t);
  }
}
exports.ParkourSpline = ParkourSpline;
//# sourceMappingURL=parkour-spline.js.map