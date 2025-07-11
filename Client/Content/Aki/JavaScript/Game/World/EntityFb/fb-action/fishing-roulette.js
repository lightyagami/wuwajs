"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingRoulette = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FishingRoulette {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsFishingRoulette(t, e) {
    return (e || new FishingRoulette()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFishingRoulette(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new FishingRoulette()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startFishingRoulette(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endFishingRoulette(t) {
    return t.endObject();
  }
  static createFishingRoulette(t, e) {
    FishingRoulette.startFishingRoulette(t);
    FishingRoulette.addType(t, e);
    return FishingRoulette.endFishingRoulette(t);
  }
}
exports.FishingRoulette = FishingRoulette;
//# sourceMappingURL=fishing-roulette.js.map