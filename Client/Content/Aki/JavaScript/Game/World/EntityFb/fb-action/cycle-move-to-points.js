"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CycleMoveToPoints = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_move_to_point_type_js_1 = require("../fb-action/union-move-to-point-type.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class CycleMoveToPoints {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsCycleMoveToPoints(t, o) {
    return (o || new CycleMoveToPoints()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCycleMoveToPoints(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new CycleMoveToPoints()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  points(t, o) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (o || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
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
  isLoop() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  stopTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  moveMotionType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_move_to_point_type_js_1.UnionMoveToPointType.NONE;
    }
  }
  moveMotion(t) {
    var o = this.bb.__offset(this.bb_pos, 14);
    if (o) {
      return this.bb.__union(t, this.bb_pos + o);
    } else {
      return undefined;
    }
  }
  static startCycleMoveToPoints(t) {
    t.startObject(6);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addPoints(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static createPointsVector(o, e) {
    o.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      o.addOffset(e[t]);
    }
    return o.endVector();
  }
  static startPointsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static addIsLoop(t, o) {
    t.addFieldInt8(2, +o, 0);
  }
  static addStopTime(t, o) {
    t.addFieldFloat32(3, o, 0);
  }
  static addMoveMotionType(t, o) {
    t.addFieldInt8(4, o, union_move_to_point_type_js_1.UnionMoveToPointType.NONE);
  }
  static addMoveMotion(t, o) {
    t.addFieldOffset(5, o, 0);
  }
  static endCycleMoveToPoints(t) {
    return t.endObject();
  }
  static createCycleMoveToPoints(t, o, e, i, s, n, r) {
    CycleMoveToPoints.startCycleMoveToPoints(t);
    CycleMoveToPoints.addType(t, o);
    CycleMoveToPoints.addPoints(t, e);
    CycleMoveToPoints.addIsLoop(t, i);
    CycleMoveToPoints.addStopTime(t, s);
    CycleMoveToPoints.addMoveMotionType(t, n);
    CycleMoveToPoints.addMoveMotion(t, r);
    return CycleMoveToPoints.endCycleMoveToPoints(t);
  }
}
exports.CycleMoveToPoints = CycleMoveToPoints;
//# sourceMappingURL=cycle-move-to-points.js.map