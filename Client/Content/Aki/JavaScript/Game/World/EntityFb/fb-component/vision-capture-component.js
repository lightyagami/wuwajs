"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionCaptureComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VisionCaptureComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsVisionCaptureComponent(t, i) {
    return (i || new VisionCaptureComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsVisionCaptureComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new VisionCaptureComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  visionCaptureId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  visionCaptureProb() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startVisionCaptureComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addVisionCaptureId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addVisionCaptureProb(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endVisionCaptureComponent(t) {
    return t.endObject();
  }
  static createVisionCaptureComponent(t, i, e, s) {
    VisionCaptureComponent.startVisionCaptureComponent(t);
    VisionCaptureComponent.addDisabled(t, i);
    VisionCaptureComponent.addVisionCaptureId(t, e);
    VisionCaptureComponent.addVisionCaptureProb(t, s);
    return VisionCaptureComponent.endVisionCaptureComponent(t);
  }
}
exports.VisionCaptureComponent = VisionCaptureComponent;
//# sourceMappingURL=vision-capture-component.js.map