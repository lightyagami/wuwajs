"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableMoveOperation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableMoveOperation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsEnableMoveOperation(e, t) {
    return (t || new EnableMoveOperation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsEnableMoveOperation(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new EnableMoveOperation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startEnableMoveOperation(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endEnableMoveOperation(e) {
    return e.endObject();
  }
  static createEnableMoveOperation(e, t) {
    EnableMoveOperation.startEnableMoveOperation(e);
    EnableMoveOperation.addType(e, t);
    return EnableMoveOperation.endEnableMoveOperation(e);
  }
}
exports.EnableMoveOperation = EnableMoveOperation;
//# sourceMappingURL=enable-move-operation.js.map