"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePatrolSpline = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const time_patrol_spline_point_js_1 = require("../fb-component/time-patrol-spline-point.js");
class TimePatrolSpline {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsTimePatrolSpline(t, i) {
    return (i || new TimePatrolSpline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTimePatrolSpline(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new TimePatrolSpline()).__init(t.readInt32(t.position()) + t.position(), t);
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
      return (i || new time_patrol_spline_point_js_1.TimePatrolSplinePoint()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
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
  static startTimePatrolSpline(t) {
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
  static endTimePatrolSpline(t) {
    return t.endObject();
  }
  static createTimePatrolSpline(t, i, e) {
    TimePatrolSpline.startTimePatrolSpline(t);
    TimePatrolSpline.addType(t, i);
    TimePatrolSpline.addPoints(t, e);
    return TimePatrolSpline.endTimePatrolSpline(t);
  }
}
exports.TimePatrolSpline = TimePatrolSpline;
//# sourceMappingURL=time-patrol-spline.js.map