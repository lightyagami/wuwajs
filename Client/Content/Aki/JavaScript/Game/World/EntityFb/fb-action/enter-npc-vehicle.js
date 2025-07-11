"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnterNpcVehicle = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnterNpcVehicle {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsEnterNpcVehicle(e, t) {
    return (t || new EnterNpcVehicle()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsEnterNpcVehicle(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new EnterNpcVehicle()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  target() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  seat() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startEnterNpcVehicle(e) {
    e.startObject(2);
  }
  static addTarget(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addSeat(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endEnterNpcVehicle(e) {
    return e.endObject();
  }
  static createEnterNpcVehicle(e, t, r) {
    EnterNpcVehicle.startEnterNpcVehicle(e);
    EnterNpcVehicle.addTarget(e, t);
    EnterNpcVehicle.addSeat(e, r);
    return EnterNpcVehicle.endEnterNpcVehicle(e);
  }
}
exports.EnterNpcVehicle = EnterNpcVehicle;
//# sourceMappingURL=enter-npc-vehicle.js.map