"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbEnableHatredData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbEnableHatredData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBvbEnableHatredData(t, a) {
    return (a || new BvbEnableHatredData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbEnableHatredData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BvbEnableHatredData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startBvbEnableHatredData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbEnableHatredData(t) {
    return t.endObject();
  }
  static createBvbEnableHatredData(t, a) {
    BvbEnableHatredData.startBvbEnableHatredData(t);
    BvbEnableHatredData.addType(t, a);
    return BvbEnableHatredData.endBvbEnableHatredData(t);
  }
}
exports.BvbEnableHatredData = BvbEnableHatredData;
//# sourceMappingURL=bvb-enable-hatred-data.js.map