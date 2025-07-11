"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AirPassageSpline = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const common_spline_point_js_1 = require("../fb-component/common-spline-point.js");
class AirPassageSpline {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsAirPassageSpline(i, t) {
    return (t || new AirPassageSpline()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsAirPassageSpline(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new AirPassageSpline()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  middleLineEffect(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  tailCircleEffect(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  middleCircleEffect(i) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  middleCircleOverlyingEffect(i) {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  middleCircleSpace() {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return this.bb.readFloat32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  middleCircleRadius() {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return this.bb.readFloat32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  movableRadius() {
    var i = this.bb.__offset(this.bb_pos, 18);
    if (i) {
      return this.bb.readFloat32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  resistance() {
    var i = this.bb.__offset(this.bb_pos, 20);
    if (i) {
      return this.bb.readFloat32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  speedLimit() {
    var i = this.bb.__offset(this.bb_pos, 22);
    if (i) {
      return this.bb.readFloat32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  sprintSpeedLimit() {
    var i = this.bb.__offset(this.bb_pos, 24);
    if (i) {
      return this.bb.readFloat32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  points(i, t) {
    var s = this.bb.__offset(this.bb_pos, 26);
    if (s) {
      return (t || new common_spline_point_js_1.CommonSplinePoint()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + i * 4), this.bb);
    } else {
      return undefined;
    }
  }
  pointsLength() {
    var i = this.bb.__offset(this.bb_pos, 26);
    if (i) {
      return this.bb.__vector_len(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  static startAirPassageSpline(i) {
    i.startObject(12);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addMiddleLineEffect(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static addTailCircleEffect(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static addMiddleCircleEffect(i, t) {
    i.addFieldOffset(3, t, 0);
  }
  static addMiddleCircleOverlyingEffect(i, t) {
    i.addFieldOffset(4, t, 0);
  }
  static addMiddleCircleSpace(i, t) {
    i.addFieldFloat32(5, t, 0);
  }
  static addMiddleCircleRadius(i, t) {
    i.addFieldFloat32(6, t, 0);
  }
  static addMovableRadius(i, t) {
    i.addFieldFloat32(7, t, 0);
  }
  static addResistance(i, t) {
    i.addFieldFloat32(8, t, 0);
  }
  static addSpeedLimit(i, t) {
    i.addFieldFloat32(9, t, 0);
  }
  static addSprintSpeedLimit(i, t) {
    i.addFieldFloat32(10, t, 0);
  }
  static addPoints(i, t) {
    i.addFieldOffset(11, t, 0);
  }
  static createPointsVector(t, s) {
    t.startVector(4, s.length, 4);
    for (let i = s.length - 1; i >= 0; i--) {
      t.addOffset(s[i]);
    }
    return t.endVector();
  }
  static startPointsVector(i, t) {
    i.startVector(4, t, 4);
  }
  static endAirPassageSpline(i) {
    return i.endObject();
  }
  static createAirPassageSpline(i, t, s, e, a, r, n, d, h, l, c, p, o) {
    AirPassageSpline.startAirPassageSpline(i);
    AirPassageSpline.addType(i, t);
    AirPassageSpline.addMiddleLineEffect(i, s);
    AirPassageSpline.addTailCircleEffect(i, e);
    AirPassageSpline.addMiddleCircleEffect(i, a);
    AirPassageSpline.addMiddleCircleOverlyingEffect(i, r);
    AirPassageSpline.addMiddleCircleSpace(i, n);
    AirPassageSpline.addMiddleCircleRadius(i, d);
    AirPassageSpline.addMovableRadius(i, h);
    AirPassageSpline.addResistance(i, l);
    AirPassageSpline.addSpeedLimit(i, c);
    AirPassageSpline.addSprintSpeedLimit(i, p);
    AirPassageSpline.addPoints(i, o);
    return AirPassageSpline.endAirPassageSpline(i);
  }
}
exports.AirPassageSpline = AirPassageSpline;
//# sourceMappingURL=air-passage-spline.js.map