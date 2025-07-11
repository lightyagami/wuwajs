"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisableCameraOperation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableCameraOperation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, a) {
    this.bb_pos = e;
    this.bb = a;
    return this;
  }
  static getRootAsDisableCameraOperation(e, a) {
    return (a || new DisableCameraOperation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsDisableCameraOperation(e, a) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new DisableCameraOperation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, e);
    } else {
      return undefined;
    }
  }
  static startDisableCameraOperation(e) {
    e.startObject(1);
  }
  static addType(e, a) {
    e.addFieldOffset(0, a, 0);
  }
  static endDisableCameraOperation(e) {
    return e.endObject();
  }
  static createDisableCameraOperation(e, a) {
    DisableCameraOperation.startDisableCameraOperation(e);
    DisableCameraOperation.addType(e, a);
    return DisableCameraOperation.endDisableCameraOperation(e);
  }
}
exports.DisableCameraOperation = DisableCameraOperation;
//# sourceMappingURL=disable-camera-operation.js.map