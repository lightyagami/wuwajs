"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingBoatVehicle = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FishingBoatVehicle {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsFishingBoatVehicle(i, t) {
    return (t || new FishingBoatVehicle()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsFishingBoatVehicle(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new FishingBoatVehicle()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startFishingBoatVehicle(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endFishingBoatVehicle(i) {
    return i.endObject();
  }
  static createFishingBoatVehicle(i, t) {
    FishingBoatVehicle.startFishingBoatVehicle(i);
    FishingBoatVehicle.addType(i, t);
    return FishingBoatVehicle.endFishingBoatVehicle(i);
  }
}
exports.FishingBoatVehicle = FishingBoatVehicle;
//# sourceMappingURL=fishing-boat-vehicle.js.map