"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BvbEnableHatredData = void 0;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbEnableHatredData {
  constructor() {
    this.bb = void 0, this.bb_pos = 0
  }
  __init(t, a) {
    return this.bb_pos = t, this.bb = a, this
  }
  static getRootAsBvbEnableHatredData(t, a) {
    return (a || new BvbEnableHatredData).__init(t.readInt32(t.position()) + t.position(), t)
  }
  static getSizePrefixedRootAsBvbEnableHatredData(t, a) {
    return t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH), (a || new BvbEnableHatredData).__init(t.readInt32(t.position()) + t.position(), t)
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0
  }
  static startBvbEnableHatredData(t) {
    t.startObject(1)
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0)
  }
  static endBvbEnableHatredData(t) {
    return t.endObject()
  }
  static createBvbEnableHatredData(t, a) {
    return BvbEnableHatredData.startBvbEnableHatredData(t), BvbEnableHatredData.addType(t, a), BvbEnableHatredData.endBvbEnableHatredData(t)
  }
}
exports.BvbEnableHatredData = BvbEnableHatredData;
//# sourceMappingURL=bvb-enable-hatred-data.js.map