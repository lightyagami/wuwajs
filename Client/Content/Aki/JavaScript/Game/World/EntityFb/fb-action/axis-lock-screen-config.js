"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AxisLockScreenConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AxisLockScreenConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsAxisLockScreenConfig(e, i) {
    return (i || new AxisLockScreenConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsAxisLockScreenConfig(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new AxisLockScreenConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  triggerAngle() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  fadeInTime() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  fadeOutTime() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startAxisLockScreenConfig(e) {
    e.startObject(3);
  }
  static addTriggerAngle(e, i) {
    e.addFieldFloat32(0, i, 0);
  }
  static addFadeInTime(e, i) {
    e.addFieldFloat32(1, i, 0);
  }
  static addFadeOutTime(e, i) {
    e.addFieldFloat32(2, i, 0);
  }
  static endAxisLockScreenConfig(e) {
    return e.endObject();
  }
  static createAxisLockScreenConfig(e, i, t, s) {
    AxisLockScreenConfig.startAxisLockScreenConfig(e);
    AxisLockScreenConfig.addTriggerAngle(e, i);
    AxisLockScreenConfig.addFadeInTime(e, t);
    AxisLockScreenConfig.addFadeOutTime(e, s);
    return AxisLockScreenConfig.endAxisLockScreenConfig(e);
  }
}
exports.AxisLockScreenConfig = AxisLockScreenConfig;
//# sourceMappingURL=axis-lock-screen-config.js.map