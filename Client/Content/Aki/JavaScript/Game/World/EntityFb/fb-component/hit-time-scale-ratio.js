"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HitTimeScaleRatio = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitTimeScaleRatio {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsHitTimeScaleRatio(t, i) {
    return (i || new HitTimeScaleRatio()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHitTimeScaleRatio(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new HitTimeScaleRatio()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  timeRatio() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  maxExtraTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  valueRatio() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startHitTimeScaleRatio(t) {
    t.startObject(3);
  }
  static addTimeRatio(t, i) {
    t.addFieldFloat32(0, i, 0);
  }
  static addMaxExtraTime(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addValueRatio(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static endHitTimeScaleRatio(t) {
    return t.endObject();
  }
  static createHitTimeScaleRatio(t, i, e, a) {
    HitTimeScaleRatio.startHitTimeScaleRatio(t);
    HitTimeScaleRatio.addTimeRatio(t, i);
    HitTimeScaleRatio.addMaxExtraTime(t, e);
    HitTimeScaleRatio.addValueRatio(t, a);
    return HitTimeScaleRatio.endHitTimeScaleRatio(t);
  }
}
exports.HitTimeScaleRatio = HitTimeScaleRatio;
//# sourceMappingURL=hit-time-scale-ratio.js.map