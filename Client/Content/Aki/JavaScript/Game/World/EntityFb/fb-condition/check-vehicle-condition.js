"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckVehicleCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_vehicle_condition_js_1 = require("../fb-condition/union-vehicle-condition.js");
class CheckVehicleCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, e) {
    this.bb_pos = i;
    this.bb = e;
    return this;
  }
  static getRootAsCheckVehicleCondition(i, e) {
    return (e || new CheckVehicleCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsCheckVehicleCondition(i, e) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CheckVehicleCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, i);
    } else {
      return undefined;
    }
  }
  conditionType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return union_vehicle_condition_js_1.UnionVehicleCondition.NONE;
    }
  }
  condition(i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(i, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startCheckVehicleCondition(i) {
    i.startObject(3);
  }
  static addType(i, e) {
    i.addFieldOffset(0, e, 0);
  }
  static addConditionType(i, e) {
    i.addFieldInt8(1, e, union_vehicle_condition_js_1.UnionVehicleCondition.NONE);
  }
  static addCondition(i, e) {
    i.addFieldOffset(2, e, 0);
  }
  static endCheckVehicleCondition(i) {
    return i.endObject();
  }
  static createCheckVehicleCondition(i, e, t, n) {
    CheckVehicleCondition.startCheckVehicleCondition(i);
    CheckVehicleCondition.addType(i, e);
    CheckVehicleCondition.addConditionType(i, t);
    CheckVehicleCondition.addCondition(i, n);
    return CheckVehicleCondition.endCheckVehicleCondition(i);
  }
}
exports.CheckVehicleCondition = CheckVehicleCondition;
//# sourceMappingURL=check-vehicle-condition.js.map