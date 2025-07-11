"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderTrajectoryConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RenderTrajectoryConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsRenderTrajectoryConfig(e, t) {
    return (t || new RenderTrajectoryConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRenderTrajectoryConfig(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new RenderTrajectoryConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  time() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  effect(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startRenderTrajectoryConfig(e) {
    e.startObject(2);
  }
  static addTime(e, t) {
    e.addFieldFloat32(0, t, 0);
  }
  static addEffect(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endRenderTrajectoryConfig(e) {
    return e.endObject();
  }
  static createRenderTrajectoryConfig(e, t, r) {
    RenderTrajectoryConfig.startRenderTrajectoryConfig(e);
    RenderTrajectoryConfig.addTime(e, t);
    RenderTrajectoryConfig.addEffect(e, r);
    return RenderTrajectoryConfig.endRenderTrajectoryConfig(e);
  }
}
exports.RenderTrajectoryConfig = RenderTrajectoryConfig;
//# sourceMappingURL=render-trajectory-config.js.map