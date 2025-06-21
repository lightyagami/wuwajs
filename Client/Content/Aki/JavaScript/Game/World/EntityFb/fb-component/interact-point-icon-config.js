"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.InteractPointIconConfig = void 0;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InteractPointIconConfig {
  constructor() {
    this.bb = void 0, this.bb_pos = 0
  }
  __init(t, n) {
    return this.bb_pos = t, this.bb = n, this
  }
  static getRootAsInteractPointIconConfig(t, n) {
    return (n || new InteractPointIconConfig).__init(t.readInt32(t.position()) + t.position(), t)
  }
  static getSizePrefixedRootAsInteractPointIconConfig(t, n) {
    return t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH), (n || new InteractPointIconConfig).__init(t.readInt32(t.position()) + t.position(), t)
  }
  maxShowDistance() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0
  }
  static startInteractPointIconConfig(t) {
    t.startObject(1)
  }
  static addMaxShowDistance(t, n) {
    t.addFieldFloat32(0, n, 0)
  }
  static endInteractPointIconConfig(t) {
    return t.endObject()
  }
  static createInteractPointIconConfig(t, n) {
    return InteractPointIconConfig.startInteractPointIconConfig(t), InteractPointIconConfig.addMaxShowDistance(t, n), InteractPointIconConfig.endInteractPointIconConfig(t)
  }
}
exports.InteractPointIconConfig = InteractPointIconConfig;
//# sourceMappingURL=interact-point-icon-config.js.map