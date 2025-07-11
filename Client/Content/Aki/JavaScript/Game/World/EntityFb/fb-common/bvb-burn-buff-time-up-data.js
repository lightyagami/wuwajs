"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbBurnBuffTimeUpData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbBurnBuffTimeUpData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsBvbBurnBuffTimeUpData(t, e) {
    return (e || new BvbBurnBuffTimeUpData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbBurnBuffTimeUpData(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new BvbBurnBuffTimeUpData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startBvbBurnBuffTimeUpData(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endBvbBurnBuffTimeUpData(t) {
    return t.endObject();
  }
  static createBvbBurnBuffTimeUpData(t, e) {
    BvbBurnBuffTimeUpData.startBvbBurnBuffTimeUpData(t);
    BvbBurnBuffTimeUpData.addType(t, e);
    return BvbBurnBuffTimeUpData.endBvbBurnBuffTimeUpData(t);
  }
}
exports.BvbBurnBuffTimeUpData = BvbBurnBuffTimeUpData;
//# sourceMappingURL=bvb-burn-buff-time-up-data.js.map