"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraTransition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CameraTransition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsCameraTransition(t, a) {
    return (a || new CameraTransition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCameraTransition(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new CameraTransition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCameraTransition(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldInt8(0, a, 0);
  }
  static addDuration(t, a) {
    t.addFieldFloat32(1, a, 0);
  }
  static endCameraTransition(t) {
    return t.endObject();
  }
  static createCameraTransition(t, a, r) {
    CameraTransition.startCameraTransition(t);
    CameraTransition.addType(t, a);
    CameraTransition.addDuration(t, r);
    return CameraTransition.endCameraTransition(t);
  }
}
exports.CameraTransition = CameraTransition;
//# sourceMappingURL=camera-transition.js.map