"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopNewMoveWithSplineAtStartPoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StopNewMoveWithSplineAtStartPoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsStopNewMoveWithSplineAtStartPoint(t, e) {
    return (e || new StopNewMoveWithSplineAtStartPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStopNewMoveWithSplineAtStartPoint(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new StopNewMoveWithSplineAtStartPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startStopNewMoveWithSplineAtStartPoint(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endStopNewMoveWithSplineAtStartPoint(t) {
    return t.endObject();
  }
  static createStopNewMoveWithSplineAtStartPoint(t, e) {
    StopNewMoveWithSplineAtStartPoint.startStopNewMoveWithSplineAtStartPoint(t);
    StopNewMoveWithSplineAtStartPoint.addType(t, e);
    return StopNewMoveWithSplineAtStartPoint.endStopNewMoveWithSplineAtStartPoint(t);
  }
}
exports.StopNewMoveWithSplineAtStartPoint = StopNewMoveWithSplineAtStartPoint;
//# sourceMappingURL=stop-new-move-with-spline-at-start-point.js.map