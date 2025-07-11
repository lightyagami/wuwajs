"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExitVehicleStandUp = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExitVehicleStandUp {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsExitVehicleStandUp(t, e) {
    return (e || new ExitVehicleStandUp()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsExitVehicleStandUp(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ExitVehicleStandUp()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startExitVehicleStandUp(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endExitVehicleStandUp(t) {
    return t.endObject();
  }
  static createExitVehicleStandUp(t, e) {
    ExitVehicleStandUp.startExitVehicleStandUp(t);
    ExitVehicleStandUp.addType(t, e);
    return ExitVehicleStandUp.endExitVehicleStandUp(t);
  }
}
exports.ExitVehicleStandUp = ExitVehicleStandUp;
//# sourceMappingURL=exit-vehicle-stand-up.js.map