"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckClimb = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class CheckClimb {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCheckClimb(t, e) {
    return (e || new CheckClimb()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckClimb(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CheckClimb()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  direction(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  distance() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCheckClimb(t) {
    t.startObject(2);
  }
  static addDirection(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addDistance(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endCheckClimb(t) {
    return t.endObject();
  }
  static createCheckClimb(t, e, i) {
    CheckClimb.startCheckClimb(t);
    CheckClimb.addDirection(t, e);
    CheckClimb.addDistance(t, i);
    return CheckClimb.endCheckClimb(t);
  }
}
exports.CheckClimb = CheckClimb;
//# sourceMappingURL=check-climb.js.map