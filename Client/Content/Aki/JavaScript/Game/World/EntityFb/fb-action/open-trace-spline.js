"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenTraceSpline = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OpenTraceSpline {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsOpenTraceSpline(e, t) {
    return (t || new OpenTraceSpline()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsOpenTraceSpline(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new OpenTraceSpline()).__init(e.readInt32(e.position()) + e.position(), e);
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
  duration() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startOpenTraceSpline(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addSplineEntityId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addDuration(e, t) {
    e.addFieldFloat32(2, t, 0);
  }
  static endOpenTraceSpline(e) {
    return e.endObject();
  }
  static createOpenTraceSpline(e, t, i, r) {
    OpenTraceSpline.startOpenTraceSpline(e);
    OpenTraceSpline.addType(e, t);
    OpenTraceSpline.addSplineEntityId(e, i);
    OpenTraceSpline.addDuration(e, r);
    return OpenTraceSpline.endOpenTraceSpline(e);
  }
}
exports.OpenTraceSpline = OpenTraceSpline;
//# sourceMappingURL=open-trace-spline.js.map