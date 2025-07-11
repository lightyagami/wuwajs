"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatrolSpline = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const patrol_range_js_1 = require("../fb-component/patrol-range.js");
const patrol_spline_point_js_1 = require("../fb-component/patrol-spline-point.js");
const union_patrol_cycle_option_js_1 = require("../fb-component/union-patrol-cycle-option.js");
class PatrolSpline {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsPatrolSpline(t, i) {
    return (i || new PatrolSpline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPatrolSpline(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new PatrolSpline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  cycleOptionType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_patrol_cycle_option_js_1.UnionPatrolCycleOption.NONE;
    }
  }
  cycleOption(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  isNavigation() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  turnSpeed() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isFloating() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  points(t, i) {
    var s = this.bb.__offset(this.bb_pos, 16);
    if (s) {
      return (i || new patrol_spline_point_js_1.PatrolSplinePoint()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  pointsLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  patrolRange(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    if (i) {
      return (t || new patrol_range_js_1.PatrolRange()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startPatrolSpline(t) {
    t.startObject(8);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCycleOptionType(t, i) {
    t.addFieldInt8(1, i, union_patrol_cycle_option_js_1.UnionPatrolCycleOption.NONE);
  }
  static addCycleOption(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addIsNavigation(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static addTurnSpeed(t, i) {
    t.addFieldFloat32(4, i, 0);
  }
  static addIsFloating(t, i) {
    t.addFieldInt8(5, +i, 0);
  }
  static addPoints(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static createPointsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startPointsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addPatrolRange(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static endPatrolSpline(t) {
    return t.endObject();
  }
}
exports.PatrolSpline = PatrolSpline;
//# sourceMappingURL=patrol-spline.js.map