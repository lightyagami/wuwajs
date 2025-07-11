"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayGuestUiAnimation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_play_guest_ui_animation_type_js_1 = require("../fb-action/union-play-guest-ui-animation-type.js");
class PlayGuestUiAnimation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsPlayGuestUiAnimation(t, i) {
    return (i || new PlayGuestUiAnimation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPlayGuestUiAnimation(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new PlayGuestUiAnimation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  playGuestUiAnimationType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_play_guest_ui_animation_type_js_1.UnionPlayGuestUiAnimationType.NONE;
    }
  }
  playGuestUiAnimation(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startPlayGuestUiAnimation(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPlayGuestUiAnimationType(t, i) {
    t.addFieldInt8(1, i, union_play_guest_ui_animation_type_js_1.UnionPlayGuestUiAnimationType.NONE);
  }
  static addPlayGuestUiAnimation(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endPlayGuestUiAnimation(t) {
    return t.endObject();
  }
  static createPlayGuestUiAnimation(t, i, a, s) {
    PlayGuestUiAnimation.startPlayGuestUiAnimation(t);
    PlayGuestUiAnimation.addType(t, i);
    PlayGuestUiAnimation.addPlayGuestUiAnimationType(t, a);
    PlayGuestUiAnimation.addPlayGuestUiAnimation(t, s);
    return PlayGuestUiAnimation.endPlayGuestUiAnimation(t);
  }
}
exports.PlayGuestUiAnimation = PlayGuestUiAnimation;
//# sourceMappingURL=play-guest-ui-animation.js.map