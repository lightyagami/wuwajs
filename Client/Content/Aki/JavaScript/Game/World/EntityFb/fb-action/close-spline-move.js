"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloseSplineMove = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class CloseSplineMove {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCloseSplineMove(e, t) {
    return (t || new CloseSplineMove()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCloseSplineMove(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CloseSplineMove()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  targetType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  target(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  splineEntityId() {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCloseSplineMove(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTargetType(e, t) {
    e.addFieldInt8(1, t, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTarget(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addSplineEntityId(e, t) {
    e.addFieldInt32(3, t, 0);
  }
  static endCloseSplineMove(e) {
    return e.endObject();
  }
  static createCloseSplineMove(e, t, i, s, o) {
    CloseSplineMove.startCloseSplineMove(e);
    CloseSplineMove.addType(e, t);
    CloseSplineMove.addTargetType(e, i);
    CloseSplineMove.addTarget(e, s);
    CloseSplineMove.addSplineEntityId(e, o);
    return CloseSplineMove.endCloseSplineMove(e);
  }
}
exports.CloseSplineMove = CloseSplineMove;
//# sourceMappingURL=close-spline-move.js.map