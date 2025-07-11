"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSplineMove = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_spline_move_pattern_js_1 = require("../fb-action/union-spline-move-pattern.js");
const union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class OpenSplineMove {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsOpenSplineMove(t, e) {
    return (e || new OpenSplineMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOpenSplineMove(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new OpenSplineMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  targetType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  target(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  splineEntityId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  patternType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_spline_move_pattern_js_1.UnionSplineMovePattern.NONE;
    }
  }
  pattern(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startOpenSplineMove(t) {
    t.startObject(6);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTargetType(t, e) {
    t.addFieldInt8(1, e, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTarget(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addSplineEntityId(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addPatternType(t, e) {
    t.addFieldInt8(4, e, union_spline_move_pattern_js_1.UnionSplineMovePattern.NONE);
  }
  static addPattern(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static endOpenSplineMove(t) {
    return t.endObject();
  }
  static createOpenSplineMove(t, e, i, n, s, r, p) {
    OpenSplineMove.startOpenSplineMove(t);
    OpenSplineMove.addType(t, e);
    OpenSplineMove.addTargetType(t, i);
    OpenSplineMove.addTarget(t, n);
    OpenSplineMove.addSplineEntityId(t, s);
    OpenSplineMove.addPatternType(t, r);
    OpenSplineMove.addPattern(t, p);
    return OpenSplineMove.endOpenSplineMove(t);
  }
}
exports.OpenSplineMove = OpenSplineMove;
//# sourceMappingURL=open-spline-move.js.map