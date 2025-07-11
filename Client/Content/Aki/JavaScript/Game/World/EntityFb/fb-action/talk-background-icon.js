"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkBackgroundIcon = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkBackgroundIcon {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsTalkBackgroundIcon(t, a) {
    return (a || new TalkBackgroundIcon()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTalkBackgroundIcon(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new TalkBackgroundIcon()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  imageAsset(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startTalkBackgroundIcon(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addImageAsset(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static endTalkBackgroundIcon(t) {
    return t.endObject();
  }
  static createTalkBackgroundIcon(t, a, r) {
    TalkBackgroundIcon.startTalkBackgroundIcon(t);
    TalkBackgroundIcon.addType(t, a);
    TalkBackgroundIcon.addImageAsset(t, r);
    return TalkBackgroundIcon.endTalkBackgroundIcon(t);
  }
}
exports.TalkBackgroundIcon = TalkBackgroundIcon;
//# sourceMappingURL=talk-background-icon.js.map