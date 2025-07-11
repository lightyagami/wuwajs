"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlashHook = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class SlashHook {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsSlashHook(t, i) {
    return (i || new SlashHook()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSlashHook(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new SlashHook()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
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
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
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
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
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
  slashAngleType(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  defaultSlashDir(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  characterLookAt(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  characterLookAtPointId() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isAdjustCameraConfig() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSlashHook(t) {
    t.startObject(9);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addHookActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createHookActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startHookActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addExitHookActions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createExitHookActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startExitHookActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addFinishActions(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createFinishActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startFinishActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addSlashAngleType(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addDefaultSlashDir(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addCharacterLookAt(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addCharacterLookAtPointId(t, i) {
    t.addFieldInt32(7, i, 0);
  }
  static addIsAdjustCameraConfig(t, i) {
    t.addFieldInt8(8, +i, 0);
  }
  static endSlashHook(t) {
    return t.endObject();
  }
}
exports.SlashHook = SlashHook;
//# sourceMappingURL=slash-hook.js.map