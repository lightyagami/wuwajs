"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleNewSplineMoveTarget = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_vehicle_js_1 = require("../fb-action/union-target-vehicle.js");
class VehicleNewSplineMoveTarget {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsVehicleNewSplineMoveTarget(e, t) {
    return (t || new VehicleNewSplineMoveTarget()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsVehicleNewSplineMoveTarget(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new VehicleNewSplineMoveTarget()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  targetVehicleType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_target_vehicle_js_1.UnionTargetVehicle.NONE;
    }
  }
  targetVehicle(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  isLookDir() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startVehicleNewSplineMoveTarget(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTargetVehicleType(e, t) {
    e.addFieldInt8(1, t, union_target_vehicle_js_1.UnionTargetVehicle.NONE);
  }
  static addTargetVehicle(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addIsLookDir(e, t) {
    e.addFieldInt8(3, +t, 0);
  }
  static endVehicleNewSplineMoveTarget(e) {
    return e.endObject();
  }
  static createVehicleNewSplineMoveTarget(e, t, i, r, s) {
    VehicleNewSplineMoveTarget.startVehicleNewSplineMoveTarget(e);
    VehicleNewSplineMoveTarget.addType(e, t);
    VehicleNewSplineMoveTarget.addTargetVehicleType(e, i);
    VehicleNewSplineMoveTarget.addTargetVehicle(e, r);
    VehicleNewSplineMoveTarget.addIsLookDir(e, s);
    return VehicleNewSplineMoveTarget.endVehicleNewSplineMoveTarget(e);
  }
}
exports.VehicleNewSplineMoveTarget = VehicleNewSplineMoveTarget;
//# sourceMappingURL=vehicle-new-spline-move-target.js.map