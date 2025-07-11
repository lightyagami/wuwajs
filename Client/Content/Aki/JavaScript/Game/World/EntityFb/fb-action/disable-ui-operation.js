"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisableUiOperation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableUiOperation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsDisableUiOperation(i, t) {
    return (t || new DisableUiOperation()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsDisableUiOperation(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new DisableUiOperation()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startDisableUiOperation(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endDisableUiOperation(i) {
    return i.endObject();
  }
  static createDisableUiOperation(i, t) {
    DisableUiOperation.startDisableUiOperation(i);
    DisableUiOperation.addType(i, t);
    return DisableUiOperation.endDisableUiOperation(i);
  }
}
exports.DisableUiOperation = DisableUiOperation;
//# sourceMappingURL=disable-ui-operation.js.map