"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RagDollJumpingPoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class RagDollJumpingPoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsRagDollJumpingPoint(t, i) {
    return (i || new RagDollJumpingPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRagDollJumpingPoint(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new RagDollJumpingPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  hookActions(t, i) {
    var o = this.bb.__offset(this.bb_pos, 6);
    if (o) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + o) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  hookActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  exitHookActions(t, i) {
    var o = this.bb.__offset(this.bb_pos, 8);
    if (o) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + o) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  exitHookActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  finishActions(t, i) {
    var o = this.bb.__offset(this.bb_pos, 10);
    if (o) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + o) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  finishActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startRagDollJumpingPoint(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addHookActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createHookActionsVector(i, o) {
    i.startVector(4, o.length, 4);
    for (let t = o.length - 1; t >= 0; t--) {
      i.addOffset(o[t]);
    }
    return i.endVector();
  }
  static startHookActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addExitHookActions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createExitHookActionsVector(i, o) {
    i.startVector(4, o.length, 4);
    for (let t = o.length - 1; t >= 0; t--) {
      i.addOffset(o[t]);
    }
    return i.endVector();
  }
  static startExitHookActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addFinishActions(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createFinishActionsVector(i, o) {
    i.startVector(4, o.length, 4);
    for (let t = o.length - 1; t >= 0; t--) {
      i.addOffset(o[t]);
    }
    return i.endVector();
  }
  static startFinishActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endRagDollJumpingPoint(t) {
    return t.endObject();
  }
  static createRagDollJumpingPoint(t, i, o, s, n) {
    RagDollJumpingPoint.startRagDollJumpingPoint(t);
    RagDollJumpingPoint.addType(t, i);
    RagDollJumpingPoint.addHookActions(t, o);
    RagDollJumpingPoint.addExitHookActions(t, s);
    RagDollJumpingPoint.addFinishActions(t, n);
    return RagDollJumpingPoint.endRagDollJumpingPoint(t);
  }
}
exports.RagDollJumpingPoint = RagDollJumpingPoint;
//# sourceMappingURL=rag-doll-jumping-point.js.map