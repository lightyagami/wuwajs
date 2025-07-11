"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbStartRoundData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbStartRoundData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBvbStartRoundData(t, a) {
    return (a || new BvbStartRoundData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbStartRoundData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BvbStartRoundData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startBvbStartRoundData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbStartRoundData(t) {
    return t.endObject();
  }
  static createBvbStartRoundData(t, a) {
    BvbStartRoundData.startBvbStartRoundData(t);
    BvbStartRoundData.addType(t, a);
    return BvbStartRoundData.endBvbStartRoundData(t);
  }
}
exports.BvbStartRoundData = BvbStartRoundData;
//# sourceMappingURL=bvb-start-round-data.js.map