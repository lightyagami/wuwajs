"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopNewMoveWithSplineAtCurrentPos = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StopNewMoveWithSplineAtCurrentPos {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsStopNewMoveWithSplineAtCurrentPos(t, e) {
    return (e || new StopNewMoveWithSplineAtCurrentPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStopNewMoveWithSplineAtCurrentPos(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new StopNewMoveWithSplineAtCurrentPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startStopNewMoveWithSplineAtCurrentPos(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endStopNewMoveWithSplineAtCurrentPos(t) {
    return t.endObject();
  }
  static createStopNewMoveWithSplineAtCurrentPos(t, e) {
    StopNewMoveWithSplineAtCurrentPos.startStopNewMoveWithSplineAtCurrentPos(t);
    StopNewMoveWithSplineAtCurrentPos.addType(t, e);
    return StopNewMoveWithSplineAtCurrentPos.endStopNewMoveWithSplineAtCurrentPos(t);
  }
}
exports.StopNewMoveWithSplineAtCurrentPos = StopNewMoveWithSplineAtCurrentPos;
//# sourceMappingURL=stop-new-move-with-spline-at-current-pos.js.map