"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkOptionQteSucceedDelayExec = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkOptionQteSucceedDelayExec {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsTalkOptionQteSucceedDelayExec(e, t) {
    return (t || new TalkOptionQteSucceedDelayExec()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsTalkOptionQteSucceedDelayExec(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new TalkOptionQteSucceedDelayExec()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startTalkOptionQteSucceedDelayExec(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endTalkOptionQteSucceedDelayExec(e) {
    return e.endObject();
  }
  static createTalkOptionQteSucceedDelayExec(e, t) {
    TalkOptionQteSucceedDelayExec.startTalkOptionQteSucceedDelayExec(e);
    TalkOptionQteSucceedDelayExec.addType(e, t);
    return TalkOptionQteSucceedDelayExec.endTalkOptionQteSucceedDelayExec(e);
  }
}
exports.TalkOptionQteSucceedDelayExec = TalkOptionQteSucceedDelayExec;
//# sourceMappingURL=talk-option-qte-succeed-delay-exec.js.map