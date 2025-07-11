"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceTrackControl = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const sequence_track_control_point_js_1 = require("../fb-component/sequence-track-control-point.js");
class SequenceTrackControl {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSequenceTrackControl(t, e) {
    return (e || new SequenceTrackControl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSequenceTrackControl(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SequenceTrackControl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  sequence(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  controlPoints(t, e) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return (e || new sequence_track_control_point_js_1.SequenceTrackControlPoint()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  controlPointsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSequenceTrackControl(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addSequence(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addControlPoints(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createControlPointsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addOffset(r[t]);
    }
    return e.endVector();
  }
  static startControlPointsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endSequenceTrackControl(t) {
    return t.endObject();
  }
  static createSequenceTrackControl(t, e, r, o) {
    SequenceTrackControl.startSequenceTrackControl(t);
    SequenceTrackControl.addType(t, e);
    SequenceTrackControl.addSequence(t, r);
    SequenceTrackControl.addControlPoints(t, o);
    return SequenceTrackControl.endSequenceTrackControl(t);
  }
}
exports.SequenceTrackControl = SequenceTrackControl;
//# sourceMappingURL=sequence-track-control.js.map