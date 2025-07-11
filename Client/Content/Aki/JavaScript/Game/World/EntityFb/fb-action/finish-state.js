"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FinishState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FinishState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsFinishState(t, i) {
    return (i || new FinishState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFinishState(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new FinishState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startFinishState(t) {
    t.startObject(0);
  }
  static endFinishState(t) {
    return t.endObject();
  }
  static createFinishState(t) {
    FinishState.startFinishState(t);
    return FinishState.endFinishState(t);
  }
}
exports.FinishState = FinishState;
//# sourceMappingURL=finish-state.js.map