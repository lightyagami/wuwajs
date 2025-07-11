"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkBackgroundClean = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkBackgroundClean {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(a, t) {
    this.bb_pos = a;
    this.bb = t;
    return this;
  }
  static getRootAsTalkBackgroundClean(a, t) {
    return (t || new TalkBackgroundClean()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  static getSizePrefixedRootAsTalkBackgroundClean(a, t) {
    a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new TalkBackgroundClean()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  type(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, a);
    } else {
      return undefined;
    }
  }
  static startTalkBackgroundClean(a) {
    a.startObject(1);
  }
  static addType(a, t) {
    a.addFieldOffset(0, t, 0);
  }
  static endTalkBackgroundClean(a) {
    return a.endObject();
  }
  static createTalkBackgroundClean(a, t) {
    TalkBackgroundClean.startTalkBackgroundClean(a);
    TalkBackgroundClean.addType(a, t);
    return TalkBackgroundClean.endTalkBackgroundClean(a);
  }
}
exports.TalkBackgroundClean = TalkBackgroundClean;
//# sourceMappingURL=talk-background-clean.js.map