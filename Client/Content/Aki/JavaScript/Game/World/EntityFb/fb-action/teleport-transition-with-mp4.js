"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportTransitionWithMp4 = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const mp4_background_color_js_1 = require("../fb-action/mp4-background-color.js");
class TeleportTransitionWithMp4 {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsTeleportTransitionWithMp4(t, i) {
    return (i || new TeleportTransitionWithMp4()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTeleportTransitionWithMp4(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new TeleportTransitionWithMp4()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  mp4Path(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  isFadeInScreenAfterTeleport() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  replayWhenReLogin() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  backgroundColor(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (t || new mp4_background_color_js_1.Mp4BackgroundColor()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  afterTeleportScreenColor(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startTeleportTransitionWithMp4(t) {
    t.startObject(6);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addMp4Path(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addIsFadeInScreenAfterTeleport(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addReplayWhenReLogin(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static addBackgroundColor(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addAfterTeleportScreenColor(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static endTeleportTransitionWithMp4(t) {
    return t.endObject();
  }
}
exports.TeleportTransitionWithMp4 = TeleportTransitionWithMp4;
//# sourceMappingURL=teleport-transition-with-mp4.js.map