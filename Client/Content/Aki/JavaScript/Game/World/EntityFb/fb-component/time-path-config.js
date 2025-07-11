"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePathConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TimePathConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsTimePathConfig(t, i) {
    return (i || new TimePathConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTimePathConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new TimePathConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  totalTime() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  timePathCurve(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startTimePathConfig(t) {
    t.startObject(2);
  }
  static addTotalTime(t, i) {
    t.addFieldFloat32(0, i, 0);
  }
  static addTimePathCurve(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endTimePathConfig(t) {
    return t.endObject();
  }
  static createTimePathConfig(t, i, e) {
    TimePathConfig.startTimePathConfig(t);
    TimePathConfig.addTotalTime(t, i);
    TimePathConfig.addTimePathCurve(t, e);
    return TimePathConfig.endTimePathConfig(t);
  }
}
exports.TimePathConfig = TimePathConfig;
//# sourceMappingURL=time-path-config.js.map