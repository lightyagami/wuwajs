"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowTrackToStart = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FollowTrackToStart {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsFollowTrackToStart(t, r) {
    return (r || new FollowTrackToStart()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFollowTrackToStart(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new FollowTrackToStart()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startFollowTrackToStart(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static endFollowTrackToStart(t) {
    return t.endObject();
  }
  static createFollowTrackToStart(t, r) {
    FollowTrackToStart.startFollowTrackToStart(t);
    FollowTrackToStart.addType(t, r);
    return FollowTrackToStart.endFollowTrackToStart(t);
  }
}
exports.FollowTrackToStart = FollowTrackToStart;
//# sourceMappingURL=follow-track-to-start.js.map