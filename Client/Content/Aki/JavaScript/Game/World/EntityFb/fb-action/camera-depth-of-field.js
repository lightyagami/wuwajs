"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraDepthOfField = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CameraDepthOfField {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCameraDepthOfField(t, e) {
    return (e || new CameraDepthOfField()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCameraDepthOfField(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CameraDepthOfField()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  fstop() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  distance() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  blurAmount() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  blurRadius() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCameraDepthOfField(t) {
    t.startObject(4);
  }
  static addFstop(t, e) {
    t.addFieldFloat32(0, e, 0);
  }
  static addDistance(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static addBlurAmount(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static addBlurRadius(t, e) {
    t.addFieldFloat32(3, e, 0);
  }
  static endCameraDepthOfField(t) {
    return t.endObject();
  }
  static createCameraDepthOfField(t, e, a, i, r) {
    CameraDepthOfField.startCameraDepthOfField(t);
    CameraDepthOfField.addFstop(t, e);
    CameraDepthOfField.addDistance(t, a);
    CameraDepthOfField.addBlurAmount(t, i);
    CameraDepthOfField.addBlurRadius(t, r);
    return CameraDepthOfField.endCameraDepthOfField(t);
  }
}
exports.CameraDepthOfField = CameraDepthOfField;
//# sourceMappingURL=camera-depth-of-field.js.map