"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hour = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Hour {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsHour(t, r) {
    return (r || new Hour()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHour(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new Hour()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  hour() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  min() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startHour(t) {
    t.startObject(2);
  }
  static addHour(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addMin(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static endHour(t) {
    return t.endObject();
  }
  static createHour(t, r, s) {
    Hour.startHour(t);
    Hour.addHour(t, r);
    Hour.addMin(t, s);
    return Hour.endHour(t);
  }
}
exports.Hour = Hour;
//# sourceMappingURL=hour.js.map