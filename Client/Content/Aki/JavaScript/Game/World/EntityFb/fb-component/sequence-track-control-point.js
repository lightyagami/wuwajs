"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceTrackControlPoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SequenceTrackControlPoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSequenceTrackControlPoint(t, e) {
    return (e || new SequenceTrackControlPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSequenceTrackControlPoint(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SequenceTrackControlPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  mark(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startSequenceTrackControlPoint(t) {
    t.startObject(1);
  }
  static addMark(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSequenceTrackControlPoint(t) {
    return t.endObject();
  }
  static createSequenceTrackControlPoint(t, e) {
    SequenceTrackControlPoint.startSequenceTrackControlPoint(t);
    SequenceTrackControlPoint.addMark(t, e);
    return SequenceTrackControlPoint.endSequenceTrackControlPoint(t);
  }
}
exports.SequenceTrackControlPoint = SequenceTrackControlPoint;
//# sourceMappingURL=sequence-track-control-point.js.map