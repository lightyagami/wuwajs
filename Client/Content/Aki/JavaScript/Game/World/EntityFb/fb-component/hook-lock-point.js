"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HookLockPoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const camera_gaze_js_1 = require("../fb-action/camera-gaze.js");
const gaze_next_point_after_interact_js_1 = require("../fb-component/gaze-next-point-after-interact.js");
const union_hook_interact_config_js_1 = require("../fb-component/union-hook-interact-config.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
const sphere_trigger_shape_js_1 = require("../fb-shape/sphere-trigger-shape.js");
class HookLockPoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsHookLockPoint(t, i) {
    return (i || new HookLockPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHookLockPoint(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new HookLockPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  range(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new sphere_trigger_shape_js_1.SphereTriggerShape()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  matchRoleOptionType(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t);
    } else {
      return 0;
    }
  }
  matchRoleOptionTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  matchRoleOptionTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  matchRoleOption(t, i) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__union(i, this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return undefined;
    }
  }
  matchRoleOptionLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  ignorePlayCollision() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  useRangeComponent() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  cameraGaze(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return (t || new camera_gaze_js_1.CameraGaze()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  gazeNextPointAfterInteract(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    if (i) {
      return (t || new gaze_next_point_after_interact_js_1.GazeNextPointAfterInteract()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  inheritSpeed() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  normalEffect(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  isClimb() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  playerStateRestritionId() {
    var t = this.bb.__offset(this.bb_pos, 26);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  hookEnableCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 28);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  hookLockCd() {
    var t = this.bb.__offset(this.bb_pos, 30);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isDestroyedSelf() {
    var t = this.bb.__offset(this.bb_pos, 32);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isHideSelf() {
    var t = this.bb.__offset(this.bb_pos, 34);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  hookInteractConfigType() {
    var t = this.bb.__offset(this.bb_pos, 36);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_hook_interact_config_js_1.UnionHookInteractConfig.NONE;
    }
  }
  hookInteractConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 38);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startHookLockPoint(t) {
    t.startObject(18);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addRange(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addMatchRoleOptionType(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createMatchRoleOptionTypeVector(i, e) {
    i.startVector(1, e.length, 1);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addInt8(e[t]);
    }
    return i.endVector();
  }
  static startMatchRoleOptionTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addMatchRoleOption(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createMatchRoleOptionVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startMatchRoleOptionVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addIgnorePlayCollision(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static addUseRangeComponent(t, i) {
    t.addFieldInt8(5, +i, 0);
  }
  static addCameraGaze(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addGazeNextPointAfterInteract(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static addInheritSpeed(t, i) {
    t.addFieldInt8(8, +i, 0);
  }
  static addNormalEffect(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static addIsClimb(t, i) {
    t.addFieldInt8(10, +i, 0);
  }
  static addPlayerStateRestritionId(t, i) {
    t.addFieldInt32(11, i, 0);
  }
  static addHookEnableCondition(t, i) {
    t.addFieldOffset(12, i, 0);
  }
  static addHookLockCd(t, i) {
    t.addFieldFloat32(13, i, 0);
  }
  static addIsDestroyedSelf(t, i) {
    t.addFieldInt8(14, +i, 0);
  }
  static addIsHideSelf(t, i) {
    t.addFieldInt8(15, +i, 0);
  }
  static addHookInteractConfigType(t, i) {
    t.addFieldInt8(16, i, union_hook_interact_config_js_1.UnionHookInteractConfig.NONE);
  }
  static addHookInteractConfig(t, i) {
    t.addFieldOffset(17, i, 0);
  }
  static endHookLockPoint(t) {
    return t.endObject();
  }
}
exports.HookLockPoint = HookLockPoint;
//# sourceMappingURL=hook-lock-point.js.map