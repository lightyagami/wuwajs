"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveRange = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class ActiveRange {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsActiveRange(t, e) {
    return (e || new ActiveRange()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActiveRange(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ActiveRange()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  checkPoint(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  checkEnterRange() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  checkLeaveRange() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startActiveRange(t) {
    t.startObject(3);
  }
  static addCheckPoint(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCheckEnterRange(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addCheckLeaveRange(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endActiveRange(t) {
    return t.endObject();
  }
  static createActiveRange(t, e, i, s) {
    ActiveRange.startActiveRange(t);
    ActiveRange.addCheckPoint(t, e);
    ActiveRange.addCheckEnterRange(t, i);
    ActiveRange.addCheckLeaveRange(t, s);
    return ActiveRange.endActiveRange(t);
  }
}
exports.ActiveRange = ActiveRange;
//# sourceMappingURL=active-range.js.map