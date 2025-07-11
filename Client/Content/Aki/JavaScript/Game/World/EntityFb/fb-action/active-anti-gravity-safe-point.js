"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveAntiGravitySafePoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActiveAntiGravitySafePoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsActiveAntiGravitySafePoint(t, i) {
    return (i || new ActiveAntiGravitySafePoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActiveAntiGravitySafePoint(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ActiveAntiGravitySafePoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startActiveAntiGravitySafePoint(t) {
    t.startObject(0);
  }
  static endActiveAntiGravitySafePoint(t) {
    return t.endObject();
  }
  static createActiveAntiGravitySafePoint(t) {
    ActiveAntiGravitySafePoint.startActiveAntiGravitySafePoint(t);
    return ActiveAntiGravitySafePoint.endActiveAntiGravitySafePoint(t);
  }
}
exports.ActiveAntiGravitySafePoint = ActiveAntiGravitySafePoint;
//# sourceMappingURL=active-anti-gravity-safe-point.js.map