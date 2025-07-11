"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableAllPlayerOperation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableAllPlayerOperation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsEnableAllPlayerOperation(e, t) {
    return (t || new EnableAllPlayerOperation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsEnableAllPlayerOperation(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new EnableAllPlayerOperation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startEnableAllPlayerOperation(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endEnableAllPlayerOperation(e) {
    return e.endObject();
  }
  static createEnableAllPlayerOperation(e, t) {
    EnableAllPlayerOperation.startEnableAllPlayerOperation(e);
    EnableAllPlayerOperation.addType(e, t);
    return EnableAllPlayerOperation.endEnableAllPlayerOperation(e);
  }
}
exports.EnableAllPlayerOperation = EnableAllPlayerOperation;
//# sourceMappingURL=enable-all-player-operation.js.map