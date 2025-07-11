"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaySpineAnimation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlaySpineAnimation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsPlaySpineAnimation(i, t) {
    return (t || new PlaySpineAnimation()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsPlaySpineAnimation(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new PlaySpineAnimation()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  name(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  isLoop() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startPlaySpineAnimation(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addName(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static addIsLoop(i, t) {
    i.addFieldInt8(2, +t, 0);
  }
  static endPlaySpineAnimation(i) {
    return i.endObject();
  }
  static createPlaySpineAnimation(i, t, n, a) {
    PlaySpineAnimation.startPlaySpineAnimation(i);
    PlaySpineAnimation.addType(i, t);
    PlaySpineAnimation.addName(i, n);
    PlaySpineAnimation.addIsLoop(i, a);
    return PlaySpineAnimation.endPlaySpineAnimation(i);
  }
}
exports.PlaySpineAnimation = PlaySpineAnimation;
//# sourceMappingURL=play-spine-animation.js.map