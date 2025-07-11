"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleWaterfallClimbGravityConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VehicleWaterfallClimbGravityConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsVehicleWaterfallClimbGravityConfig(i, t) {
    return (t || new VehicleWaterfallClimbGravityConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsVehicleWaterfallClimbGravityConfig(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new VehicleWaterfallClimbGravityConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  safePositionEntityId() {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  gravityDirection(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startVehicleWaterfallClimbGravityConfig(i) {
    i.startObject(2);
  }
  static addSafePositionEntityId(i, t) {
    i.addFieldInt32(0, t, 0);
  }
  static addGravityDirection(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static endVehicleWaterfallClimbGravityConfig(i) {
    return i.endObject();
  }
  static createVehicleWaterfallClimbGravityConfig(i, t, e) {
    VehicleWaterfallClimbGravityConfig.startVehicleWaterfallClimbGravityConfig(i);
    VehicleWaterfallClimbGravityConfig.addSafePositionEntityId(i, t);
    VehicleWaterfallClimbGravityConfig.addGravityDirection(i, e);
    return VehicleWaterfallClimbGravityConfig.endVehicleWaterfallClimbGravityConfig(i);
  }
}
exports.VehicleWaterfallClimbGravityConfig = VehicleWaterfallClimbGravityConfig;
//# sourceMappingURL=vehicle-waterfall-climb-gravity-config.js.map