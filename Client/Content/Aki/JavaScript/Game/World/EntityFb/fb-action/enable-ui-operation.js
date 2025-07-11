"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableUiOperation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableUiOperation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEnableUiOperation(t, e) {
    return (e || new EnableUiOperation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEnableUiOperation(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EnableUiOperation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startEnableUiOperation(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endEnableUiOperation(t) {
    return t.endObject();
  }
  static createEnableUiOperation(t, e) {
    EnableUiOperation.startEnableUiOperation(t);
    EnableUiOperation.addType(t, e);
    return EnableUiOperation.endEnableUiOperation(t);
  }
}
exports.EnableUiOperation = EnableUiOperation;
//# sourceMappingURL=enable-ui-operation.js.map