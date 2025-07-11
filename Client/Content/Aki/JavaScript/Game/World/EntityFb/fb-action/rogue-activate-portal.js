"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueActivatePortal = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RogueActivatePortal {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsRogueActivatePortal(t, e) {
    return (e || new RogueActivatePortal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRogueActivatePortal(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new RogueActivatePortal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startRogueActivatePortal(t) {
    t.startObject(0);
  }
  static endRogueActivatePortal(t) {
    return t.endObject();
  }
  static createRogueActivatePortal(t) {
    RogueActivatePortal.startRogueActivatePortal(t);
    return RogueActivatePortal.endRogueActivatePortal(t);
  }
}
exports.RogueActivatePortal = RogueActivatePortal;
//# sourceMappingURL=rogue-activate-portal.js.map