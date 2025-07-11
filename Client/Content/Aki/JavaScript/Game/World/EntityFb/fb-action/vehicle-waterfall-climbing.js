"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleWaterfallClimbing = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vehicle_waterfall_climb_gravity_config_js_1 = require("../fb-action/vehicle-waterfall-climb-gravity-config.js");
class VehicleWaterfallClimbing {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsVehicleWaterfallClimbing(i, t) {
    return (t || new VehicleWaterfallClimbing()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsVehicleWaterfallClimbing(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new VehicleWaterfallClimbing()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  splineEntityId() {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  changeGravity(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return (i || new vehicle_waterfall_climb_gravity_config_js_1.VehicleWaterfallClimbGravityConfig()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  static startVehicleWaterfallClimbing(i) {
    i.startObject(2);
  }
  static addSplineEntityId(i, t) {
    i.addFieldInt32(0, t, 0);
  }
  static addChangeGravity(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static endVehicleWaterfallClimbing(i) {
    return i.endObject();
  }
}
exports.VehicleWaterfallClimbing = VehicleWaterfallClimbing;
//# sourceMappingURL=vehicle-waterfall-climbing.js.map