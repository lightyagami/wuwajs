"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkBackgroundImageByMcGender = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkBackgroundImageByMcGender {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, a) {
    this.bb_pos = e;
    this.bb = a;
    return this;
  }
  static getRootAsTalkBackgroundImageByMcGender(e, a) {
    return (a || new TalkBackgroundImageByMcGender()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsTalkBackgroundImageByMcGender(e, a) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new TalkBackgroundImageByMcGender()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, e);
    } else {
      return undefined;
    }
  }
  imageAssetMale(e) {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return this.bb.__string(this.bb_pos + a, e);
    } else {
      return undefined;
    }
  }
  imageAssetFemale(e) {
    var a = this.bb.__offset(this.bb_pos, 8);
    if (a) {
      return this.bb.__string(this.bb_pos + a, e);
    } else {
      return undefined;
    }
  }
  static startTalkBackgroundImageByMcGender(e) {
    e.startObject(3);
  }
  static addType(e, a) {
    e.addFieldOffset(0, a, 0);
  }
  static addImageAssetMale(e, a) {
    e.addFieldOffset(1, a, 0);
  }
  static addImageAssetFemale(e, a) {
    e.addFieldOffset(2, a, 0);
  }
  static endTalkBackgroundImageByMcGender(e) {
    return e.endObject();
  }
  static createTalkBackgroundImageByMcGender(e, a, t, r) {
    TalkBackgroundImageByMcGender.startTalkBackgroundImageByMcGender(e);
    TalkBackgroundImageByMcGender.addType(e, a);
    TalkBackgroundImageByMcGender.addImageAssetMale(e, t);
    TalkBackgroundImageByMcGender.addImageAssetFemale(e, r);
    return TalkBackgroundImageByMcGender.endTalkBackgroundImageByMcGender(e);
  }
}
exports.TalkBackgroundImageByMcGender = TalkBackgroundImageByMcGender;
//# sourceMappingURL=talk-background-image-by-mc-gender.js.map