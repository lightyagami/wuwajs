"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraLookAt = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class CameraLookAt {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCameraLookAt(t, i) {
    return (i || new CameraLookAt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCameraLookAt(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CameraLookAt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  pos(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  posEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  fadeInTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  stayTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  fadeOutTime() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  lockCamera() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  cameraPos(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  cameraPosEntityId() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  disableCameraMoveWithCameraPos() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  fov() {
    var t = this.bb.__offset(this.bb_pos, 22);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  banInput() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  hideUi() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  cancelBuffer() {
    var t = this.bb.__offset(this.bb_pos, 28);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  cancelBlendOut() {
    var t = this.bb.__offset(this.bb_pos, 30);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startCameraLookAt(t) {
    t.startObject(14);
  }
  static addPos(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPosEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addFadeInTime(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static addStayTime(t, i) {
    t.addFieldFloat32(3, i, 0);
  }
  static addFadeOutTime(t, i) {
    t.addFieldFloat32(4, i, 0);
  }
  static addLockCamera(t, i) {
    t.addFieldInt8(5, +i, 0);
  }
  static addCameraPos(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addCameraPosEntityId(t, i) {
    t.addFieldInt32(7, i, 0);
  }
  static addDisableCameraMoveWithCameraPos(t, i) {
    t.addFieldInt8(8, +i, 0);
  }
  static addFov(t, i) {
    t.addFieldInt32(9, i, 0);
  }
  static addBanInput(t, i) {
    t.addFieldInt8(10, +i, 0);
  }
  static addHideUi(t, i) {
    t.addFieldInt8(11, +i, 0);
  }
  static addCancelBuffer(t, i) {
    t.addFieldInt8(12, +i, 0);
  }
  static addCancelBlendOut(t, i) {
    t.addFieldInt8(13, +i, 0);
  }
  static endCameraLookAt(t) {
    return t.endObject();
  }
}
exports.CameraLookAt = CameraLookAt;
//# sourceMappingURL=camera-look-at.js.map