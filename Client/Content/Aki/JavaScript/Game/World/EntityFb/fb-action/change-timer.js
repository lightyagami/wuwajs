"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeTimer = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_change_timer_js_1 = require("../fb-action/union-change-timer.js");
class ChangeTimer {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsChangeTimer(e, t) {
    return (t || new ChangeTimer()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsChangeTimer(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ChangeTimer()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  timerType(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  changeTypeType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_change_timer_js_1.UnionChangeTimer.NONE;
    }
  }
  changeType(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startChangeTimer(e) {
    e.startObject(3);
  }
  static addTimerType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addChangeTypeType(e, t) {
    e.addFieldInt8(1, t, union_change_timer_js_1.UnionChangeTimer.NONE);
  }
  static addChangeType(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endChangeTimer(e) {
    return e.endObject();
  }
  static createChangeTimer(e, t, i, r) {
    ChangeTimer.startChangeTimer(e);
    ChangeTimer.addTimerType(e, t);
    ChangeTimer.addChangeTypeType(e, i);
    ChangeTimer.addChangeType(e, r);
    return ChangeTimer.endChangeTimer(e);
  }
}
exports.ChangeTimer = ChangeTimer;
//# sourceMappingURL=change-timer.js.map