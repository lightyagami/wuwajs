"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivateResetPoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActivateResetPoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsActivateResetPoint(t, e) {
    return (e || new ActivateResetPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActivateResetPoint(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ActivateResetPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startActivateResetPoint(t) {
    t.startObject(0);
  }
  static endActivateResetPoint(t) {
    return t.endObject();
  }
  static createActivateResetPoint(t) {
    ActivateResetPoint.startActivateResetPoint(t);
    return ActivateResetPoint.endActivateResetPoint(t);
  }
}
exports.ActivateResetPoint = ActivateResetPoint;
//# sourceMappingURL=activate-reset-point.js.map