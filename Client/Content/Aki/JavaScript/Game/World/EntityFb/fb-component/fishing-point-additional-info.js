"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingPointAdditionalInfo = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FishingPointAdditionalInfo {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsFishingPointAdditionalInfo(i, t) {
    return (t || new FishingPointAdditionalInfo()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsFishingPointAdditionalInfo(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new FishingPointAdditionalInfo()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startFishingPointAdditionalInfo(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endFishingPointAdditionalInfo(i) {
    return i.endObject();
  }
  static createFishingPointAdditionalInfo(i, t) {
    FishingPointAdditionalInfo.startFishingPointAdditionalInfo(i);
    FishingPointAdditionalInfo.addType(i, t);
    return FishingPointAdditionalInfo.endFishingPointAdditionalInfo(i);
  }
}
exports.FishingPointAdditionalInfo = FishingPointAdditionalInfo;
//# sourceMappingURL=fishing-point-additional-info.js.map