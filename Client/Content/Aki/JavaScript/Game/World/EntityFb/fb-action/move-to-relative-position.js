"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToRelativePosition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_move_to_point_type_js_1 = require("../fb-action/union-move-to-point-type.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class MoveToRelativePosition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsMoveToRelativePosition(t, i) {
    return (i || new MoveToRelativePosition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMoveToRelativePosition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new MoveToRelativePosition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  point(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  moveMotionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_move_to_point_type_js_1.UnionMoveToPointType.NONE;
    }
  }
  moveMotion(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startMoveToRelativePosition(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPoint(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addMoveMotionType(t, i) {
    t.addFieldInt8(2, i, union_move_to_point_type_js_1.UnionMoveToPointType.NONE);
  }
  static addMoveMotion(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endMoveToRelativePosition(t) {
    return t.endObject();
  }
}
exports.MoveToRelativePosition = MoveToRelativePosition;
//# sourceMappingURL=move-to-relative-position.js.map