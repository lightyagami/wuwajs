"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveWithSpline = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const check_climb_js_1 = require("../fb-action/check-climb.js");
const npc_follow_config_js_1 = require("../fb-action/npc-follow-config.js");
const union_spline_move_target_js_1 = require("../fb-action/union-spline-move-target.js");
class MoveWithSpline {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsMoveWithSpline(t, i) {
    return (i || new MoveWithSpline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMoveWithSpline(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new MoveWithSpline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  moveTargetType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_spline_move_target_js_1.UnionSplineMoveTarget.NONE;
    }
  }
  moveTarget(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  splineEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  checkClimb(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return (t || new check_climb_js_1.CheckClimb()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  moveState() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  startPointIndex() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  endPointIndex() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isFollowStrictly() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isForceToFirstPoint() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isLookDir() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  npcFollow(t) {
    var i = this.bb.__offset(this.bb_pos, 24);
    if (i) {
      return (t || new npc_follow_config_js_1.NpcFollowConfig()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  npcCollisionEnabled() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startMoveWithSpline(t) {
    t.startObject(12);
  }
  static addMoveTargetType(t, i) {
    t.addFieldInt8(0, i, union_spline_move_target_js_1.UnionSplineMoveTarget.NONE);
  }
  static addMoveTarget(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addSplineEntityId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addCheckClimb(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addMoveState(t, i) {
    t.addFieldInt8(4, i, 0);
  }
  static addStartPointIndex(t, i) {
    t.addFieldInt32(5, i, 0);
  }
  static addEndPointIndex(t, i) {
    t.addFieldInt32(6, i, 0);
  }
  static addIsFollowStrictly(t, i) {
    t.addFieldInt8(7, +i, 0);
  }
  static addIsForceToFirstPoint(t, i) {
    t.addFieldInt8(8, +i, 0);
  }
  static addIsLookDir(t, i) {
    t.addFieldInt8(9, +i, 0);
  }
  static addNpcFollow(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static addNpcCollisionEnabled(t, i) {
    t.addFieldInt8(11, +i, 0);
  }
  static endMoveWithSpline(t) {
    return t.endObject();
  }
}
exports.MoveWithSpline = MoveWithSpline;
//# sourceMappingURL=move-with-spline.js.map