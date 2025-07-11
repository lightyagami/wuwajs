"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloseTraceSpline = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CloseTraceSpline {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCloseTraceSpline(e, t) {
    return (t || new CloseTraceSpline()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCloseTraceSpline(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CloseTraceSpline()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  splineEntityId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCloseTraceSpline(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addSplineEntityId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endCloseTraceSpline(e) {
    return e.endObject();
  }
  static createCloseTraceSpline(e, t, s) {
    CloseTraceSpline.startCloseTraceSpline(e);
    CloseTraceSpline.addType(e, t);
    CloseTraceSpline.addSplineEntityId(e, s);
    return CloseTraceSpline.endCloseTraceSpline(e);
  }
}
exports.CloseTraceSpline = CloseTraceSpline;
//# sourceMappingURL=close-trace-spline.js.map