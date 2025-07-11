"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FinishTalk = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FinishTalk {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsFinishTalk(i, t) {
    return (t || new FinishTalk()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsFinishTalk(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new FinishTalk()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static startFinishTalk(i) {
    i.startObject(0);
  }
  static endFinishTalk(i) {
    return i.endObject();
  }
  static createFinishTalk(i) {
    FinishTalk.startFinishTalk(i);
    return FinishTalk.endFinishTalk(i);
  }
}
exports.FinishTalk = FinishTalk;
//# sourceMappingURL=finish-talk.js.map