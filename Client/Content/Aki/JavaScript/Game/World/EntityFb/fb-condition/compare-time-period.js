"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareTimePeriod = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareTimePeriod {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsCompareTimePeriod(e, i) {
    return (i || new CompareTimePeriod()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCompareTimePeriod(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CompareTimePeriod()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
    } else {
      return undefined;
    }
  }
  compare(e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
    } else {
      return undefined;
    }
  }
  timePeriod(e) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
    } else {
      return undefined;
    }
  }
  static startCompareTimePeriod(e) {
    e.startObject(3);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static addCompare(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static addTimePeriod(e, i) {
    e.addFieldOffset(2, i, 0);
  }
  static endCompareTimePeriod(e) {
    return e.endObject();
  }
  static createCompareTimePeriod(e, i, r, t) {
    CompareTimePeriod.startCompareTimePeriod(e);
    CompareTimePeriod.addType(e, i);
    CompareTimePeriod.addCompare(e, r);
    CompareTimePeriod.addTimePeriod(e, t);
    return CompareTimePeriod.endCompareTimePeriod(e);
  }
}
exports.CompareTimePeriod = CompareTimePeriod;
//# sourceMappingURL=compare-time-period.js.map