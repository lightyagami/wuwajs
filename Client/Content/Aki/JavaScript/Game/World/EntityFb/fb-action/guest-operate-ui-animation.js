"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuestOperateUiAnimation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_guest_operate_ui_animation_js_1 = require("../fb-action/union-guest-operate-ui-animation.js");
class GuestOperateUiAnimation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsGuestOperateUiAnimation(t, i) {
    return (i || new GuestOperateUiAnimation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGuestOperateUiAnimation(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new GuestOperateUiAnimation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  uiAnimationConfigType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_guest_operate_ui_animation_js_1.UnionGuestOperateUiAnimation.NONE;
    }
  }
  uiAnimationConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startGuestOperateUiAnimation(t) {
    t.startObject(2);
  }
  static addUiAnimationConfigType(t, i) {
    t.addFieldInt8(0, i, union_guest_operate_ui_animation_js_1.UnionGuestOperateUiAnimation.NONE);
  }
  static addUiAnimationConfig(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endGuestOperateUiAnimation(t) {
    return t.endObject();
  }
  static createGuestOperateUiAnimation(t, i, e) {
    GuestOperateUiAnimation.startGuestOperateUiAnimation(t);
    GuestOperateUiAnimation.addUiAnimationConfigType(t, i);
    GuestOperateUiAnimation.addUiAnimationConfig(t, e);
    return GuestOperateUiAnimation.endGuestOperateUiAnimation(t);
  }
}
exports.GuestOperateUiAnimation = GuestOperateUiAnimation;
//# sourceMappingURL=guest-operate-ui-animation.js.map