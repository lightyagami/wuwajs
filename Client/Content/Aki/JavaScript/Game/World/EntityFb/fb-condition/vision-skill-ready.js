"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionSkillReady = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VisionSkillReady {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsVisionSkillReady(i, t) {
    return (t || new VisionSkillReady()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsVisionSkillReady(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new VisionSkillReady()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startVisionSkillReady(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endVisionSkillReady(i) {
    return i.endObject();
  }
  static createVisionSkillReady(i, t) {
    VisionSkillReady.startVisionSkillReady(i);
    VisionSkillReady.addType(i, t);
    return VisionSkillReady.endVisionSkillReady(i);
  }
}
exports.VisionSkillReady = VisionSkillReady;
//# sourceMappingURL=vision-skill-ready.js.map