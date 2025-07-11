"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePeriod = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TimePeriod {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, e) {
    this.bb_pos = i;
    this.bb = e;
    return this;
  }
  static getRootAsTimePeriod(i, e) {
    return (e || new TimePeriod()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsTimePeriod(i, e) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TimePeriod()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, i);
    } else {
      return undefined;
    }
  }
  compare(i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, i);
    } else {
      return undefined;
    }
  }
  timePeriod(i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, i);
    } else {
      return undefined;
    }
  }
  static startTimePeriod(i) {
    i.startObject(3);
  }
  static addType(i, e) {
    i.addFieldOffset(0, e, 0);
  }
  static addCompare(i, e) {
    i.addFieldOffset(1, e, 0);
  }
  static addTimePeriod(i, e) {
    i.addFieldOffset(2, e, 0);
  }
  static endTimePeriod(i) {
    return i.endObject();
  }
  static createTimePeriod(i, e, t, r) {
    TimePeriod.startTimePeriod(i);
    TimePeriod.addType(i, e);
    TimePeriod.addCompare(i, t);
    TimePeriod.addTimePeriod(i, r);
    return TimePeriod.endTimePeriod(i);
  }
}
exports.TimePeriod = TimePeriod;
//# sourceMappingURL=time-period.js.map