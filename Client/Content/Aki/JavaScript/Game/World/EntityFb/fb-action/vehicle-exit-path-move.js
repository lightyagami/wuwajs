"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleExitPathMove = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VehicleExitPathMove {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsVehicleExitPathMove(t, e) {
    return (e || new VehicleExitPathMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsVehicleExitPathMove(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new VehicleExitPathMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startVehicleExitPathMove(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endVehicleExitPathMove(t) {
    return t.endObject();
  }
  static createVehicleExitPathMove(t, e) {
    VehicleExitPathMove.startVehicleExitPathMove(t);
    VehicleExitPathMove.addType(t, e);
    return VehicleExitPathMove.endVehicleExitPathMove(t);
  }
}
exports.VehicleExitPathMove = VehicleExitPathMove;
//# sourceMappingURL=vehicle-exit-path-move.js.map