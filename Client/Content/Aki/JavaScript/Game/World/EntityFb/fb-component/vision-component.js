"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VisionComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsVisionComponent(t, i) {
    return (i || new VisionComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsVisionComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new VisionComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  visionId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startVisionComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addVisionId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endVisionComponent(t) {
    return t.endObject();
  }
  static createVisionComponent(t, i, n) {
    VisionComponent.startVisionComponent(t);
    VisionComponent.addDisabled(t, i);
    VisionComponent.addVisionId(t, n);
    return VisionComponent.endVisionComponent(t);
  }
}
exports.VisionComponent = VisionComponent;
//# sourceMappingURL=vision-component.js.map