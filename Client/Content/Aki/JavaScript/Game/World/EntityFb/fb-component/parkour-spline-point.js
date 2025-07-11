"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParkourSplinePoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const point_group_js_1 = require("../fb-component/point-group.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class ParkourSplinePoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsParkourSplinePoint(t, i) {
    return (i || new ParkourSplinePoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsParkourSplinePoint(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ParkourSplinePoint()).__init(t.readInt32(t.position()) + t.position(), t);
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
  radius() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  modifiedTime() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  buffId() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.readInt64(this.bb_pos + t);
    } else {
      return BigInt("0");
    }
  }
  pointGroup(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    if (i) {
      return (t || new point_group_js_1.PointGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  playerTag(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startParkourSplinePoint(t) {
    t.startObject(10);
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
  static addRadius(t, i) {
    t.addFieldInt32(5, i, 0);
  }
  static addModifiedTime(t, i) {
    t.addFieldFloat32(6, i, 0);
  }
  static addBuffId(t, i) {
    t.addFieldInt64(7, i, BigInt("0"));
  }
  static addPointGroup(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static addPlayerTag(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static endParkourSplinePoint(t) {
    return t.endObject();
  }
}
exports.ParkourSplinePoint = ParkourSplinePoint;
//# sourceMappingURL=parkour-spline-point.js.map