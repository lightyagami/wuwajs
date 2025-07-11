"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowTrackToSplineDestination = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FollowTrackToSplineDestination {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsFollowTrackToSplineDestination(t, i) {
    return (i || new FollowTrackToSplineDestination()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFollowTrackToSplineDestination(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new FollowTrackToSplineDestination()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  changeSelfState(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startFollowTrackToSplineDestination(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addChangeSelfState(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endFollowTrackToSplineDestination(t) {
    return t.endObject();
  }
  static createFollowTrackToSplineDestination(t, i, e) {
    FollowTrackToSplineDestination.startFollowTrackToSplineDestination(t);
    FollowTrackToSplineDestination.addType(t, i);
    FollowTrackToSplineDestination.addChangeSelfState(t, e);
    return FollowTrackToSplineDestination.endFollowTrackToSplineDestination(t);
  }
}
exports.FollowTrackToSplineDestination = FollowTrackToSplineDestination;
//# sourceMappingURL=follow-track-to-spline-destination.js.map