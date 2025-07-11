"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkBackgroundImage = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkBackgroundImage {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(a, t) {
    this.bb_pos = a;
    this.bb = t;
    return this;
  }
  static getRootAsTalkBackgroundImage(a, t) {
    return (t || new TalkBackgroundImage()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  static getSizePrefixedRootAsTalkBackgroundImage(a, t) {
    a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new TalkBackgroundImage()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  type(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, a);
    } else {
      return undefined;
    }
  }
  imageAsset(a) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, a);
    } else {
      return undefined;
    }
  }
  static startTalkBackgroundImage(a) {
    a.startObject(2);
  }
  static addType(a, t) {
    a.addFieldOffset(0, t, 0);
  }
  static addImageAsset(a, t) {
    a.addFieldOffset(1, t, 0);
  }
  static endTalkBackgroundImage(a) {
    return a.endObject();
  }
  static createTalkBackgroundImage(a, t, e) {
    TalkBackgroundImage.startTalkBackgroundImage(a);
    TalkBackgroundImage.addType(a, t);
    TalkBackgroundImage.addImageAsset(a, e);
    return TalkBackgroundImage.endTalkBackgroundImage(a);
  }
}
exports.TalkBackgroundImage = TalkBackgroundImage;
//# sourceMappingURL=talk-background-image.js.map