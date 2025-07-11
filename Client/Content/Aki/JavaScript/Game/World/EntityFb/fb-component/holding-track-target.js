"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HoldingTrackTarget = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HoldingTrackTarget {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsHoldingTrackTarget(t, r) {
    return (r || new HoldingTrackTarget()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHoldingTrackTarget(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new HoldingTrackTarget()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  effectPath(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  effectLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startHoldingTrackTarget(t) {
    t.startObject(3);
  }
  static addEffectPath(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addEffectLength(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static addEntityId(t, r) {
    t.addFieldInt32(2, r, 0);
  }
  static endHoldingTrackTarget(t) {
    return t.endObject();
  }
  static createHoldingTrackTarget(t, r, e, a) {
    HoldingTrackTarget.startHoldingTrackTarget(t);
    HoldingTrackTarget.addEffectPath(t, r);
    HoldingTrackTarget.addEffectLength(t, e);
    HoldingTrackTarget.addEntityId(t, a);
    return HoldingTrackTarget.endHoldingTrackTarget(t);
  }
}
exports.HoldingTrackTarget = HoldingTrackTarget;
//# sourceMappingURL=holding-track-target.js.map