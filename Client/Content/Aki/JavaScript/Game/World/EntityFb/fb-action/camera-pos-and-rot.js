"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraPosAndRot = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class CameraPosAndRot {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCameraPosAndRot(t, e) {
    return (e || new CameraPosAndRot()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCameraPosAndRot(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CameraPosAndRot()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  cameraOffset(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  cameraRotate(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startCameraPosAndRot(t) {
    t.startObject(2);
  }
  static addCameraOffset(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCameraRotate(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endCameraPosAndRot(t) {
    return t.endObject();
  }
}
exports.CameraPosAndRot = CameraPosAndRot;
//# sourceMappingURL=camera-pos-and-rot.js.map