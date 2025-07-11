"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkOptionQteFailedDelayExec = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkOptionQteFailedDelayExec {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsTalkOptionQteFailedDelayExec(e, t) {
    return (t || new TalkOptionQteFailedDelayExec()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsTalkOptionQteFailedDelayExec(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new TalkOptionQteFailedDelayExec()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startTalkOptionQteFailedDelayExec(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endTalkOptionQteFailedDelayExec(e) {
    return e.endObject();
  }
  static createTalkOptionQteFailedDelayExec(e, t) {
    TalkOptionQteFailedDelayExec.startTalkOptionQteFailedDelayExec(e);
    TalkOptionQteFailedDelayExec.addType(e, t);
    return TalkOptionQteFailedDelayExec.endTalkOptionQteFailedDelayExec(e);
  }
}
exports.TalkOptionQteFailedDelayExec = TalkOptionQteFailedDelayExec;
//# sourceMappingURL=talk-option-qte-failed-delay-exec.js.map