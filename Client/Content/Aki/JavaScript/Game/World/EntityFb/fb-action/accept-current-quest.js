"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcceptCurrentQuest = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AcceptCurrentQuest {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsAcceptCurrentQuest(t, e) {
    return (e || new AcceptCurrentQuest()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAcceptCurrentQuest(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new AcceptCurrentQuest()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startAcceptCurrentQuest(t) {
    t.startObject(0);
  }
  static endAcceptCurrentQuest(t) {
    return t.endObject();
  }
  static createAcceptCurrentQuest(t) {
    AcceptCurrentQuest.startAcceptCurrentQuest(t);
    return AcceptCurrentQuest.endAcceptCurrentQuest(t);
  }
}
exports.AcceptCurrentQuest = AcceptCurrentQuest;
//# sourceMappingURL=accept-current-quest.js.map