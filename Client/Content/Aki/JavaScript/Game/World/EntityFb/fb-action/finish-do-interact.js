"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FinishDoInteract = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FinishDoInteract {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsFinishDoInteract(t, i) {
    return (i || new FinishDoInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFinishDoInteract(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new FinishDoInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startFinishDoInteract(t) {
    t.startObject(0);
  }
  static endFinishDoInteract(t) {
    return t.endObject();
  }
  static createFinishDoInteract(t) {
    FinishDoInteract.startFinishDoInteract(t);
    return FinishDoInteract.endFinishDoInteract(t);
  }
}
exports.FinishDoInteract = FinishDoInteract;
//# sourceMappingURL=finish-do-interact.js.map