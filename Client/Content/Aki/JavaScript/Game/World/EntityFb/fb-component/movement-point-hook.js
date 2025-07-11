"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovementPointHook = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class MovementPointHook {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsMovementPointHook(t, o) {
    return (o || new MovementPointHook()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMovementPointHook(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new MovementPointHook()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  hookActions(t, o) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (o || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
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
  exitHookActions(t, o) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (o || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
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
  finishActions(t, o) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return (o || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
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
  static startMovementPointHook(t) {
    t.startObject(4);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addHookActions(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static createHookActionsVector(o, i) {
    o.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      o.addOffset(i[t]);
    }
    return o.endVector();
  }
  static startHookActionsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static addExitHookActions(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static createExitHookActionsVector(o, i) {
    o.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      o.addOffset(i[t]);
    }
    return o.endVector();
  }
  static startExitHookActionsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static addFinishActions(t, o) {
    t.addFieldOffset(3, o, 0);
  }
  static createFinishActionsVector(o, i) {
    o.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      o.addOffset(i[t]);
    }
    return o.endVector();
  }
  static startFinishActionsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static endMovementPointHook(t) {
    return t.endObject();
  }
  static createMovementPointHook(t, o, i, s, e) {
    MovementPointHook.startMovementPointHook(t);
    MovementPointHook.addType(t, o);
    MovementPointHook.addHookActions(t, i);
    MovementPointHook.addExitHookActions(t, s);
    MovementPointHook.addFinishActions(t, e);
    return MovementPointHook.endMovementPointHook(t);
  }
}
exports.MovementPointHook = MovementPointHook;
//# sourceMappingURL=movement-point-hook.js.map