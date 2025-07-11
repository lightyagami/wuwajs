"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckFishingCageFillingRatio = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckFishingCageFillingRatio {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsCheckFishingCageFillingRatio(i, t) {
    return (t || new CheckFishingCageFillingRatio()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsCheckFishingCageFillingRatio(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CheckFishingCageFillingRatio()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  compare(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  ratio() {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  static startCheckFishingCageFillingRatio(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addCompare(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static addRatio(i, t) {
    i.addFieldInt32(2, t, 0);
  }
  static endCheckFishingCageFillingRatio(i) {
    return i.endObject();
  }
  static createCheckFishingCageFillingRatio(i, t, e, s) {
    CheckFishingCageFillingRatio.startCheckFishingCageFillingRatio(i);
    CheckFishingCageFillingRatio.addType(i, t);
    CheckFishingCageFillingRatio.addCompare(i, e);
    CheckFishingCageFillingRatio.addRatio(i, s);
    return CheckFishingCageFillingRatio.endCheckFishingCageFillingRatio(i);
  }
}
exports.CheckFishingCageFillingRatio = CheckFishingCageFillingRatio;
//# sourceMappingURL=check-fishing-cage-filling-ratio.js.map