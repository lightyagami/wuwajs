"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableCameraOperation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableCameraOperation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, a) {
    this.bb_pos = e;
    this.bb = a;
    return this;
  }
  static getRootAsEnableCameraOperation(e, a) {
    return (a || new EnableCameraOperation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsEnableCameraOperation(e, a) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new EnableCameraOperation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, e);
    } else {
      return undefined;
    }
  }
  static startEnableCameraOperation(e) {
    e.startObject(1);
  }
  static addType(e, a) {
    e.addFieldOffset(0, a, 0);
  }
  static endEnableCameraOperation(e) {
    return e.endObject();
  }
  static createEnableCameraOperation(e, a) {
    EnableCameraOperation.startEnableCameraOperation(e);
    EnableCameraOperation.addType(e, a);
    return EnableCameraOperation.endEnableCameraOperation(e);
  }
}
exports.EnableCameraOperation = EnableCameraOperation;
//# sourceMappingURL=enable-camera-operation.js.map