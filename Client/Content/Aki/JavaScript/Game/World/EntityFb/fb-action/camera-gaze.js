"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraGaze = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CameraGaze {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(a, t) {
    this.bb_pos = a;
    this.bb = t;
    return this;
  }
  static getRootAsCameraGaze(a, t) {
    return (t || new CameraGaze()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  static getSizePrefixedRootAsCameraGaze(a, t) {
    a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CameraGaze()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  fadeInTime() {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.readFloat32(this.bb_pos + a);
    } else {
      return 0;
    }
  }
  stayTime() {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return this.bb.readFloat32(this.bb_pos + a);
    } else {
      return 0;
    }
  }
  fadeOutTime() {
    var a = this.bb.__offset(this.bb_pos, 8);
    if (a) {
      return this.bb.readFloat32(this.bb_pos + a);
    } else {
      return 0;
    }
  }
  lockCamera() {
    var a = this.bb.__offset(this.bb_pos, 10);
    return !!a && !!this.bb.readInt8(this.bb_pos + a);
  }
  lockPriority() {
    var a = this.bb.__offset(this.bb_pos, 12);
    if (a) {
      return this.bb.readInt32(this.bb_pos + a);
    } else {
      return 0;
    }
  }
  gazeInHook() {
    var a = this.bb.__offset(this.bb_pos, 14);
    return !!a && !!this.bb.readInt8(this.bb_pos + a);
  }
  static startCameraGaze(a) {
    a.startObject(6);
  }
  static addFadeInTime(a, t) {
    a.addFieldFloat32(0, t, 0);
  }
  static addStayTime(a, t) {
    a.addFieldFloat32(1, t, 0);
  }
  static addFadeOutTime(a, t) {
    a.addFieldFloat32(2, t, 0);
  }
  static addLockCamera(a, t) {
    a.addFieldInt8(3, +t, 0);
  }
  static addLockPriority(a, t) {
    a.addFieldInt32(4, t, 0);
  }
  static addGazeInHook(a, t) {
    a.addFieldInt8(5, +t, 0);
  }
  static endCameraGaze(a) {
    return a.endObject();
  }
  static createCameraGaze(a, t, e, r, i, s, h) {
    CameraGaze.startCameraGaze(a);
    CameraGaze.addFadeInTime(a, t);
    CameraGaze.addStayTime(a, e);
    CameraGaze.addFadeOutTime(a, r);
    CameraGaze.addLockCamera(a, i);
    CameraGaze.addLockPriority(a, s);
    CameraGaze.addGazeInHook(a, h);
    return CameraGaze.endCameraGaze(a);
  }
}
exports.CameraGaze = CameraGaze;
//# sourceMappingURL=camera-gaze.js.map