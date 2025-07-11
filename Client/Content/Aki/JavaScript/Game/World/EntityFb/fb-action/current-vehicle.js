"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CurrentVehicle = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CurrentVehicle {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCurrentVehicle(e, t) {
    return (t || new CurrentVehicle()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCurrentVehicle(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CurrentVehicle()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startCurrentVehicle(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endCurrentVehicle(e) {
    return e.endObject();
  }
  static createCurrentVehicle(e, t) {
    CurrentVehicle.startCurrentVehicle(e);
    CurrentVehicle.addType(e, t);
    return CurrentVehicle.endCurrentVehicle(e);
  }
}
exports.CurrentVehicle = CurrentVehicle;
//# sourceMappingURL=current-vehicle.js.map