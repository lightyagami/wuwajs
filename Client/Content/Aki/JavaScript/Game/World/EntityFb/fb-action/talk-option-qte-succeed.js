"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkOptionQteSucceed = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkOptionQteSucceed {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTalkOptionQteSucceed(t, e) {
    return (e || new TalkOptionQteSucceed()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTalkOptionQteSucceed(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TalkOptionQteSucceed()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startTalkOptionQteSucceed(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endTalkOptionQteSucceed(t) {
    return t.endObject();
  }
  static createTalkOptionQteSucceed(t, e) {
    TalkOptionQteSucceed.startTalkOptionQteSucceed(t);
    TalkOptionQteSucceed.addType(t, e);
    return TalkOptionQteSucceed.endTalkOptionQteSucceed(t);
  }
}
exports.TalkOptionQteSucceed = TalkOptionQteSucceed;
//# sourceMappingURL=talk-option-qte-succeed.js.map