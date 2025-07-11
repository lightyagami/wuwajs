"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetRewardByInteract = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GetRewardByInteract {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsGetRewardByInteract(t, e) {
    return (e || new GetRewardByInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGetRewardByInteract(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new GetRewardByInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startGetRewardByInteract(t) {
    t.startObject(0);
  }
  static endGetRewardByInteract(t) {
    return t.endObject();
  }
  static createGetRewardByInteract(t) {
    GetRewardByInteract.startGetRewardByInteract(t);
    return GetRewardByInteract.endGetRewardByInteract(t);
  }
}
exports.GetRewardByInteract = GetRewardByInteract;
//# sourceMappingURL=get-reward-by-interact.js.map