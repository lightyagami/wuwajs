"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkBackgroundSpineImage = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkBackgroundSpineImage {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(a, e) {
    this.bb_pos = a;
    this.bb = e;
    return this;
  }
  static getRootAsTalkBackgroundSpineImage(a, e) {
    return (e || new TalkBackgroundSpineImage()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  static getSizePrefixedRootAsTalkBackgroundSpineImage(a, e) {
    a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TalkBackgroundSpineImage()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  type(a) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, a);
    } else {
      return undefined;
    }
  }
  id() {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return this.bb.readInt32(this.bb_pos + a);
    } else {
      return 0;
    }
  }
  isLoop() {
    var a = this.bb.__offset(this.bb_pos, 8);
    return !!a && !!this.bb.readInt8(this.bb_pos + a);
  }
  static startTalkBackgroundSpineImage(a) {
    a.startObject(3);
  }
  static addType(a, e) {
    a.addFieldOffset(0, e, 0);
  }
  static addId(a, e) {
    a.addFieldInt32(1, e, 0);
  }
  static addIsLoop(a, e) {
    a.addFieldInt8(2, +e, 0);
  }
  static endTalkBackgroundSpineImage(a) {
    return a.endObject();
  }
  static createTalkBackgroundSpineImage(a, e, t, i) {
    TalkBackgroundSpineImage.startTalkBackgroundSpineImage(a);
    TalkBackgroundSpineImage.addType(a, e);
    TalkBackgroundSpineImage.addId(a, t);
    TalkBackgroundSpineImage.addIsLoop(a, i);
    return TalkBackgroundSpineImage.endTalkBackgroundSpineImage(a);
  }
}
exports.TalkBackgroundSpineImage = TalkBackgroundSpineImage;
//# sourceMappingURL=talk-background-spine-image.js.map