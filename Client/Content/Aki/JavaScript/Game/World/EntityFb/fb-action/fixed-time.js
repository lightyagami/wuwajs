"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedTime = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FixedTime {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsFixedTime(e, i) {
    return (i || new FixedTime()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsFixedTime(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new FixedTime()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  hour() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  minutes() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startFixedTime(e) {
    e.startObject(2);
  }
  static addHour(e, i) {
    e.addFieldInt32(0, i, 0);
  }
  static addMinutes(e, i) {
    e.addFieldInt32(1, i, 0);
  }
  static endFixedTime(e) {
    return e.endObject();
  }
  static createFixedTime(e, i, t) {
    FixedTime.startFixedTime(e);
    FixedTime.addHour(e, i);
    FixedTime.addMinutes(e, t);
    return FixedTime.endFixedTime(e);
  }
}
exports.FixedTime = FixedTime;
//# sourceMappingURL=fixed-time.js.map