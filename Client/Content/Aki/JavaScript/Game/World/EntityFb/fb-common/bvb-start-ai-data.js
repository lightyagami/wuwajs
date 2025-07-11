"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbStartAiData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbStartAiData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBvbStartAiData(t, a) {
    return (a || new BvbStartAiData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbStartAiData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BvbStartAiData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startBvbStartAiData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbStartAiData(t) {
    return t.endObject();
  }
  static createBvbStartAiData(t, a) {
    BvbStartAiData.startBvbStartAiData(t);
    BvbStartAiData.addType(t, a);
    return BvbStartAiData.endBvbStartAiData(t);
  }
}
exports.BvbStartAiData = BvbStartAiData;
//# sourceMappingURL=bvb-start-ai-data.js.map