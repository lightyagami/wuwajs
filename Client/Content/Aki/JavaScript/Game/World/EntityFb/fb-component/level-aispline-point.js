"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAISplinePoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class LevelAISplinePoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsLevelAISplinePoint(t, i) {
    return (i || new LevelAISplinePoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLevelAISplinePoint(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new LevelAISplinePoint()).__init(t.readInt32(t.position()) + t.position(), t);
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
  moveState() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  charPositionState() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  moveSpeed() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  actions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 20);
    if (e) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startLevelAISplinePoint(t) {
    t.startObject(9);
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
  static addMoveState(t, i) {
    t.addFieldInt8(5, i, 0);
  }
  static addCharPositionState(t, i) {
    t.addFieldInt8(6, i, 0);
  }
  static addMoveSpeed(t, i) {
    t.addFieldInt32(7, i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static createActionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endLevelAISplinePoint(t) {
    return t.endObject();
  }
}
exports.LevelAISplinePoint = LevelAISplinePoint;
//# sourceMappingURL=level-aispline-point.js.map