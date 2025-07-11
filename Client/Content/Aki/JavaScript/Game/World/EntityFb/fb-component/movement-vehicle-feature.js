"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovementVehicleFeature = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const movement_perform_config_js_1 = require("../fb-component/movement-perform-config.js");
class MovementVehicleFeature {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsMovementVehicleFeature(e, t) {
    return (t || new MovementVehicleFeature()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsMovementVehicleFeature(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new MovementVehicleFeature()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  moveSpline() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  movePerformConfig(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return (e || new movement_perform_config_js_1.MovementPerformConfig()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  static startMovementVehicleFeature(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addMoveSpline(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addMovePerformConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endMovementVehicleFeature(e) {
    return e.endObject();
  }
}
exports.MovementVehicleFeature = MovementVehicleFeature;
//# sourceMappingURL=movement-vehicle-feature.js.map