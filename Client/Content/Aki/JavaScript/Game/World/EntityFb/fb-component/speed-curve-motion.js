"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpeedCurveMotion = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SpeedCurveMotion {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSpeedCurveMotion(e, t) {
    return (t || new SpeedCurveMotion()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSpeedCurveMotion(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SpeedCurveMotion()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  speedCurve(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startSpeedCurveMotion(e) {
    e.startObject(1);
  }
  static addSpeedCurve(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endSpeedCurveMotion(e) {
    return e.endObject();
  }
  static createSpeedCurveMotion(e, t) {
    SpeedCurveMotion.startSpeedCurveMotion(e);
    SpeedCurveMotion.addSpeedCurve(e, t);
    return SpeedCurveMotion.endSpeedCurveMotion(e);
  }
}
exports.SpeedCurveMotion = SpeedCurveMotion;
//# sourceMappingURL=speed-curve-motion.js.map