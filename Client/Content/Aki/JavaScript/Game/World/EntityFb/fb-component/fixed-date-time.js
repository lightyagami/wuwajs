"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedDateTime = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FixedDateTime {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsFixedDateTime(e, t) {
    return (t || new FixedDateTime()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsFixedDateTime(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new FixedDateTime()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  hours() {
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
  seconds() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startFixedDateTime(e) {
    e.startObject(3);
  }
  static addHours(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addMinutes(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addSeconds(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endFixedDateTime(e) {
    return e.endObject();
  }
  static createFixedDateTime(e, t, i, s) {
    FixedDateTime.startFixedDateTime(e);
    FixedDateTime.addHours(e, t);
    FixedDateTime.addMinutes(e, i);
    FixedDateTime.addSeconds(e, s);
    return FixedDateTime.endFixedDateTime(e);
  }
}
exports.FixedDateTime = FixedDateTime;
//# sourceMappingURL=fixed-date-time.js.map