"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LimitPlayerCamera = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LimitPlayerCamera {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsLimitPlayerCamera(t, e) {
    return (e || new LimitPlayerCamera()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLimitPlayerCamera(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new LimitPlayerCamera()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startLimitPlayerCamera(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endLimitPlayerCamera(t) {
    return t.endObject();
  }
  static createLimitPlayerCamera(t, e) {
    LimitPlayerCamera.startLimitPlayerCamera(t);
    LimitPlayerCamera.addType(t, e);
    return LimitPlayerCamera.endLimitPlayerCamera(t);
  }
}
exports.LimitPlayerCamera = LimitPlayerCamera;
//# sourceMappingURL=limit-player-camera.js.map