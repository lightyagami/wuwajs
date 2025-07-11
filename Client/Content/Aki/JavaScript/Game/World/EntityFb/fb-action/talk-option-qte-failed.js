"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkOptionQteFailed = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkOptionQteFailed {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTalkOptionQteFailed(t, e) {
    return (e || new TalkOptionQteFailed()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTalkOptionQteFailed(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TalkOptionQteFailed()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startTalkOptionQteFailed(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endTalkOptionQteFailed(t) {
    return t.endObject();
  }
  static createTalkOptionQteFailed(t, e) {
    TalkOptionQteFailed.startTalkOptionQteFailed(t);
    TalkOptionQteFailed.addType(t, e);
    return TalkOptionQteFailed.endTalkOptionQteFailed(t);
  }
}
exports.TalkOptionQteFailed = TalkOptionQteFailed;
//# sourceMappingURL=talk-option-qte-failed.js.map