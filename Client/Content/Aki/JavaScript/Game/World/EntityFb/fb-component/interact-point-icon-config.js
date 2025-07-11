"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractPointIconConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InteractPointIconConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, n) {
    this.bb_pos = t;
    this.bb = n;
    return this;
  }
  static getRootAsInteractPointIconConfig(t, n) {
    return (n || new InteractPointIconConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInteractPointIconConfig(t, n) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new InteractPointIconConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  maxShowDistance() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startInteractPointIconConfig(t) {
    t.startObject(1);
  }
  static addMaxShowDistance(t, n) {
    t.addFieldFloat32(0, n, 0);
  }
  static endInteractPointIconConfig(t) {
    return t.endObject();
  }
  static createInteractPointIconConfig(t, n) {
    InteractPointIconConfig.startInteractPointIconConfig(t);
    InteractPointIconConfig.addMaxShowDistance(t, n);
    return InteractPointIconConfig.endInteractPointIconConfig(t);
  }
}
exports.InteractPointIconConfig = InteractPointIconConfig;
//# sourceMappingURL=interact-point-icon-config.js.map