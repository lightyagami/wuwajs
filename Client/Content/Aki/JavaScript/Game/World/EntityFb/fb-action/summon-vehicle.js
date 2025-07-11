"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SummonVehicle = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SummonVehicle {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSummonVehicle(t, e) {
    return (e || new SummonVehicle()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSummonVehicle(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SummonVehicle()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  templateId(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  positionEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSummonVehicle(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTemplateId(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPositionEntityId(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endSummonVehicle(t) {
    return t.endObject();
  }
  static createSummonVehicle(t, e, i, s) {
    SummonVehicle.startSummonVehicle(t);
    SummonVehicle.addType(t, e);
    SummonVehicle.addTemplateId(t, i);
    SummonVehicle.addPositionEntityId(t, s);
    return SummonVehicle.endSummonVehicle(t);
  }
}
exports.SummonVehicle = SummonVehicle;
//# sourceMappingURL=summon-vehicle.js.map