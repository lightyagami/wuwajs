"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleMoveWithPathLine = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_vehicle_js_1 = require("../fb-action/union-target-vehicle.js");
const union_vehicle_control_type_js_1 = require("../fb-action/union-vehicle-control-type.js");
class VehicleMoveWithPathLine {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsVehicleMoveWithPathLine(e, t) {
    return (t || new VehicleMoveWithPathLine()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsVehicleMoveWithPathLine(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new VehicleMoveWithPathLine()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  targetVehicleType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_target_vehicle_js_1.UnionTargetVehicle.NONE;
    }
  }
  targetVehicle(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  splineEntityId() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  controlTypeType() {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_vehicle_control_type_js_1.UnionVehicleControlType.NONE;
    }
  }
  controlType(e) {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startVehicleMoveWithPathLine(e) {
    e.startObject(5);
  }
  static addTargetVehicleType(e, t) {
    e.addFieldInt8(0, t, union_target_vehicle_js_1.UnionTargetVehicle.NONE);
  }
  static addTargetVehicle(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addSplineEntityId(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static addControlTypeType(e, t) {
    e.addFieldInt8(3, t, union_vehicle_control_type_js_1.UnionVehicleControlType.NONE);
  }
  static addControlType(e, t) {
    e.addFieldOffset(4, t, 0);
  }
  static endVehicleMoveWithPathLine(e) {
    return e.endObject();
  }
  static createVehicleMoveWithPathLine(e, t, i, h, n, s) {
    VehicleMoveWithPathLine.startVehicleMoveWithPathLine(e);
    VehicleMoveWithPathLine.addTargetVehicleType(e, t);
    VehicleMoveWithPathLine.addTargetVehicle(e, i);
    VehicleMoveWithPathLine.addSplineEntityId(e, h);
    VehicleMoveWithPathLine.addControlTypeType(e, n);
    VehicleMoveWithPathLine.addControlType(e, s);
    return VehicleMoveWithPathLine.endVehicleMoveWithPathLine(e);
  }
}
exports.VehicleMoveWithPathLine = VehicleMoveWithPathLine;
//# sourceMappingURL=vehicle-move-with-path-line.js.map