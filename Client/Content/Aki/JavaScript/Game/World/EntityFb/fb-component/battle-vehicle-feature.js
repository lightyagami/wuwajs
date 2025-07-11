"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleVehicleFeature = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BattleVehicleFeature {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsBattleVehicleFeature(e, t) {
    return (t || new BattleVehicleFeature()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsBattleVehicleFeature(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new BattleVehicleFeature()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startBattleVehicleFeature(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static endBattleVehicleFeature(e) {
    return e.endObject();
  }
  static createBattleVehicleFeature(e, t) {
    BattleVehicleFeature.startBattleVehicleFeature(e);
    BattleVehicleFeature.addType(e, t);
    return BattleVehicleFeature.endBattleVehicleFeature(e);
  }
}
exports.BattleVehicleFeature = BattleVehicleFeature;
//# sourceMappingURL=battle-vehicle-feature.js.map