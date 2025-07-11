"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableNearbyTracking = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_control_tracking_type_js_1 = require("../fb-action/union-control-tracking-type.js");
class EnableNearbyTracking {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsEnableNearbyTracking(t, r) {
    return (r || new EnableNearbyTracking()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEnableNearbyTracking(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new EnableNearbyTracking()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  isEnable() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  controlTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_control_tracking_type_js_1.UnionControlTrackingType.NONE;
    }
  }
  controlType(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return this.bb.__union(t, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  static startEnableNearbyTracking(t) {
    t.startObject(3);
  }
  static addIsEnable(t, r) {
    t.addFieldInt8(0, +r, 0);
  }
  static addControlTypeType(t, r) {
    t.addFieldInt8(1, r, union_control_tracking_type_js_1.UnionControlTrackingType.NONE);
  }
  static addControlType(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endEnableNearbyTracking(t) {
    return t.endObject();
  }
  static createEnableNearbyTracking(t, r, e, a) {
    EnableNearbyTracking.startEnableNearbyTracking(t);
    EnableNearbyTracking.addIsEnable(t, r);
    EnableNearbyTracking.addControlTypeType(t, e);
    EnableNearbyTracking.addControlType(t, a);
    return EnableNearbyTracking.endEnableNearbyTracking(t);
  }
}
exports.EnableNearbyTracking = EnableNearbyTracking;
//# sourceMappingURL=enable-nearby-tracking.js.map