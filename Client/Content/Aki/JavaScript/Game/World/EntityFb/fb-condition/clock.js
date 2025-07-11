"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clock = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Clock {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsClock(t, s) {
    return (s || new Clock()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsClock(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new Clock()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  compare(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  start() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  end() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startClock(t) {
    t.startObject(4);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addCompare(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addStart(t, s) {
    t.addFieldInt32(2, s, 0);
  }
  static addEnd(t, s) {
    t.addFieldInt32(3, s, 0);
  }
  static endClock(t) {
    return t.endObject();
  }
  static createClock(t, s, i, r, e) {
    Clock.startClock(t);
    Clock.addType(t, s);
    Clock.addCompare(t, i);
    Clock.addStart(t, r);
    Clock.addEnd(t, e);
    return Clock.endClock(t);
  }
}
exports.Clock = Clock;
//# sourceMappingURL=clock.js.map