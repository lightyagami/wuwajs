"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Circumnutation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const render_trajectory_config_js_1 = require("../fb-component/render-trajectory-config.js");
class Circumnutation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCircumnutation(t, i) {
    return (i || new Circumnutation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCircumnutation(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new Circumnutation()).__init(t.readInt32(t.position()) + t.position(), t);
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
  direction(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  angularVelocity() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  rotationSpeed() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  angularVelocityCurve(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  renderTrajectoryConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    if (i) {
      return (t || new render_trajectory_config_js_1.RenderTrajectoryConfig()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startCircumnutation(t) {
    t.startObject(8);
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
  static addDirection(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addAngularVelocity(t, i) {
    t.addFieldFloat32(4, i, 0);
  }
  static addRotationSpeed(t, i) {
    t.addFieldFloat32(5, i, 0);
  }
  static addAngularVelocityCurve(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addRenderTrajectoryConfig(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static endCircumnutation(t) {
    return t.endObject();
  }
}
exports.Circumnutation = Circumnutation;
//# sourceMappingURL=circumnutation.js.map