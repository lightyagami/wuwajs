"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleCruisingParams = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VehicleCruisingParams {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, r) {
    this.bb_pos = i;
    this.bb = r;
    return this;
  }
  static getRootAsVehicleCruisingParams(i, r) {
    return (r || new VehicleCruisingParams()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsVehicleCruisingParams(i, r) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new VehicleCruisingParams()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  forwardSpeed() {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readFloat32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  forwardAcceleration() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readFloat32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  disableSprint() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startVehicleCruisingParams(i) {
    i.startObject(3);
  }
  static addForwardSpeed(i, r) {
    i.addFieldFloat32(0, r, 0);
  }
  static addForwardAcceleration(i, r) {
    i.addFieldFloat32(1, r, 0);
  }
  static addDisableSprint(i, r) {
    i.addFieldInt8(2, +r, 0);
  }
  static endVehicleCruisingParams(i) {
    return i.endObject();
  }
  static createVehicleCruisingParams(i, r, s, e) {
    VehicleCruisingParams.startVehicleCruisingParams(i);
    VehicleCruisingParams.addForwardSpeed(i, r);
    VehicleCruisingParams.addForwardAcceleration(i, s);
    VehicleCruisingParams.addDisableSprint(i, e);
    return VehicleCruisingParams.endVehicleCruisingParams(i);
  }
}
exports.VehicleCruisingParams = VehicleCruisingParams;
//# sourceMappingURL=vehicle-cruising-params.js.map