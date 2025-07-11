"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueGotoNextFloor = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RogueGotoNextFloor {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(o, t) {
    this.bb_pos = o;
    this.bb = t;
    return this;
  }
  static getRootAsRogueGotoNextFloor(o, t) {
    return (t || new RogueGotoNextFloor()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  static getSizePrefixedRootAsRogueGotoNextFloor(o, t) {
    o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new RogueGotoNextFloor()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  static startRogueGotoNextFloor(o) {
    o.startObject(0);
  }
  static endRogueGotoNextFloor(o) {
    return o.endObject();
  }
  static createRogueGotoNextFloor(o) {
    RogueGotoNextFloor.startRogueGotoNextFloor(o);
    return RogueGotoNextFloor.endRogueGotoNextFloor(o);
  }
}
exports.RogueGotoNextFloor = RogueGotoNextFloor;
//# sourceMappingURL=rogue-goto-next-floor.js.map