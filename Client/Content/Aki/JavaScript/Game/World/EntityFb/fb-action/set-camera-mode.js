"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetCameraMode = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetCameraMode {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSetCameraMode(e, t) {
    return (t || new SetCameraMode()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSetCameraMode(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SetCameraMode()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  mode(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startSetCameraMode(e) {
    e.startObject(1);
  }
  static addMode(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endSetCameraMode(e) {
    return e.endObject();
  }
  static createSetCameraMode(e, t) {
    SetCameraMode.startSetCameraMode(e);
    SetCameraMode.addMode(e, t);
    return SetCameraMode.endSetCameraMode(e);
  }
}
exports.SetCameraMode = SetCameraMode;
//# sourceMappingURL=set-camera-mode.js.map