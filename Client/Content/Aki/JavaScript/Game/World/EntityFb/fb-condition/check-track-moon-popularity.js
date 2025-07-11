"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckTrackMoonPopularity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckTrackMoonPopularity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsCheckTrackMoonPopularity(t, r) {
    return (r || new CheckTrackMoonPopularity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckTrackMoonPopularity(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new CheckTrackMoonPopularity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  compare(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  popularity() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCheckTrackMoonPopularity(t) {
    t.startObject(3);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addCompare(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addPopularity(t, r) {
    t.addFieldInt32(2, r, 0);
  }
  static endCheckTrackMoonPopularity(t) {
    return t.endObject();
  }
  static createCheckTrackMoonPopularity(t, r, o, a) {
    CheckTrackMoonPopularity.startCheckTrackMoonPopularity(t);
    CheckTrackMoonPopularity.addType(t, r);
    CheckTrackMoonPopularity.addCompare(t, o);
    CheckTrackMoonPopularity.addPopularity(t, a);
    return CheckTrackMoonPopularity.endCheckTrackMoonPopularity(t);
  }
}
exports.CheckTrackMoonPopularity = CheckTrackMoonPopularity;
//# sourceMappingURL=check-track-moon-popularity.js.map