"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnLimitPlayerOperation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnLimitPlayerOperation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsUnLimitPlayerOperation(t, i) {
    return (i || new UnLimitPlayerOperation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUnLimitPlayerOperation(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new UnLimitPlayerOperation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startUnLimitPlayerOperation(t) {
    t.startObject(0);
  }
  static endUnLimitPlayerOperation(t) {
    return t.endObject();
  }
  static createUnLimitPlayerOperation(t) {
    UnLimitPlayerOperation.startUnLimitPlayerOperation(t);
    return UnLimitPlayerOperation.endUnLimitPlayerOperation(t);
  }
}
exports.UnLimitPlayerOperation = UnLimitPlayerOperation;
//# sourceMappingURL=un-limit-player-operation.js.map