"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExitVehicleLaunch = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExitVehicleLaunch {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsExitVehicleLaunch(t, e) {
    return (e || new ExitVehicleLaunch()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsExitVehicleLaunch(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ExitVehicleLaunch()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startExitVehicleLaunch(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endExitVehicleLaunch(t) {
    return t.endObject();
  }
  static createExitVehicleLaunch(t, e) {
    ExitVehicleLaunch.startExitVehicleLaunch(t);
    ExitVehicleLaunch.addType(t, e);
    return ExitVehicleLaunch.endExitVehicleLaunch(t);
  }
}
exports.ExitVehicleLaunch = ExitVehicleLaunch;
//# sourceMappingURL=exit-vehicle-launch.js.map