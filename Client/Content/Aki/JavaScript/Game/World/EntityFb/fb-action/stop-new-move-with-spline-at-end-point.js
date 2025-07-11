"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopNewMoveWithSplineAtEndPoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StopNewMoveWithSplineAtEndPoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsStopNewMoveWithSplineAtEndPoint(t, e) {
    return (e || new StopNewMoveWithSplineAtEndPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStopNewMoveWithSplineAtEndPoint(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new StopNewMoveWithSplineAtEndPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startStopNewMoveWithSplineAtEndPoint(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endStopNewMoveWithSplineAtEndPoint(t) {
    return t.endObject();
  }
  static createStopNewMoveWithSplineAtEndPoint(t, e) {
    StopNewMoveWithSplineAtEndPoint.startStopNewMoveWithSplineAtEndPoint(t);
    StopNewMoveWithSplineAtEndPoint.addType(t, e);
    return StopNewMoveWithSplineAtEndPoint.endStopNewMoveWithSplineAtEndPoint(t);
  }
}
exports.StopNewMoveWithSplineAtEndPoint = StopNewMoveWithSplineAtEndPoint;
//# sourceMappingURL=stop-new-move-with-spline-at-end-point.js.map