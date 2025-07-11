"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FinishCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FinishCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsFinishCondition(i, t) {
    return (t || new FinishCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsFinishCondition(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new FinishCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static startFinishCondition(i) {
    i.startObject(0);
  }
  static endFinishCondition(i) {
    return i.endObject();
  }
  static createFinishCondition(i) {
    FinishCondition.startFinishCondition(i);
    return FinishCondition.endFinishCondition(i);
  }
}
exports.FinishCondition = FinishCondition;
//# sourceMappingURL=finish-condition.js.map