"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThrowMotionLevitate = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const render_trajectory_config_js_1 = require("../fb-component/render-trajectory-config.js");
class ThrowMotionLevitate {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsThrowMotionLevitate(t, i) {
    return (i || new ThrowMotionLevitate()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsThrowMotionLevitate(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ThrowMotionLevitate()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  velocity() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  velocityCurve(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  moveTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  rayRadius() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  renderTrajectoryConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return (t || new render_trajectory_config_js_1.RenderTrajectoryConfig()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startThrowMotionLevitate(t) {
    t.startObject(6);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addVelocity(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addVelocityCurve(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addMoveTime(t, i) {
    t.addFieldFloat32(3, i, 0);
  }
  static addRayRadius(t, i) {
    t.addFieldFloat32(4, i, 0);
  }
  static addRenderTrajectoryConfig(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static endThrowMotionLevitate(t) {
    return t.endObject();
  }
}
exports.ThrowMotionLevitate = ThrowMotionLevitate;
//# sourceMappingURL=throw-motion-levitate.js.map