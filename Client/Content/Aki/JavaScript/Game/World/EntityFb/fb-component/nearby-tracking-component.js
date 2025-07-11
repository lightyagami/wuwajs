"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NearbyTrackingComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_nearby_tracking_js_1 = require("../fb-component/union-nearby-tracking.js");
class NearbyTrackingComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, n) {
    this.bb_pos = t;
    this.bb = n;
    return this;
  }
  static getRootAsNearbyTrackingComponent(t, n) {
    return (n || new NearbyTrackingComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNearbyTrackingComponent(t, n) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new NearbyTrackingComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isEnable() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isEnableWhileUnlock() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isEnbaleWhileHoming() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  trackingTypeType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_nearby_tracking_js_1.UnionNearbyTracking.NONE;
    }
  }
  trackingType(t) {
    var n = this.bb.__offset(this.bb_pos, 14);
    if (n) {
      return this.bb.__union(t, this.bb_pos + n);
    } else {
      return undefined;
    }
  }
  static startNearbyTrackingComponent(t) {
    t.startObject(6);
  }
  static addDisabled(t, n) {
    t.addFieldInt8(0, +n, 0);
  }
  static addIsEnable(t, n) {
    t.addFieldInt8(1, +n, 0);
  }
  static addIsEnableWhileUnlock(t, n) {
    t.addFieldInt8(2, +n, 0);
  }
  static addIsEnbaleWhileHoming(t, n) {
    t.addFieldInt8(3, +n, 0);
  }
  static addTrackingTypeType(t, n) {
    t.addFieldInt8(4, n, union_nearby_tracking_js_1.UnionNearbyTracking.NONE);
  }
  static addTrackingType(t, n) {
    t.addFieldOffset(5, n, 0);
  }
  static endNearbyTrackingComponent(t) {
    return t.endObject();
  }
  static createNearbyTrackingComponent(t, n, e, i, r, a, s) {
    NearbyTrackingComponent.startNearbyTrackingComponent(t);
    NearbyTrackingComponent.addDisabled(t, n);
    NearbyTrackingComponent.addIsEnable(t, e);
    NearbyTrackingComponent.addIsEnableWhileUnlock(t, i);
    NearbyTrackingComponent.addIsEnbaleWhileHoming(t, r);
    NearbyTrackingComponent.addTrackingTypeType(t, a);
    NearbyTrackingComponent.addTrackingType(t, s);
    return NearbyTrackingComponent.endNearbyTrackingComponent(t);
  }
}
exports.NearbyTrackingComponent = NearbyTrackingComponent;
//# sourceMappingURL=nearby-tracking-component.js.map