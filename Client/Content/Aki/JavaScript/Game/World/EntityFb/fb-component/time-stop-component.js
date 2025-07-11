"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeStopComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const time_stop_target_js_1 = require("../fb-component/time-stop-target.js");
class TimeStopComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTimeStopComponent(t, e) {
    return (e || new TimeStopComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTimeStopComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TimeStopComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  activeState(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  stopTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  target(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return (t || new time_stop_target_js_1.TimeStopTarget()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startTimeStopComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addActiveState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addStopTime(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addTarget(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endTimeStopComponent(t) {
    return t.endObject();
  }
}
exports.TimeStopComponent = TimeStopComponent;
//# sourceMappingURL=time-stop-component.js.map