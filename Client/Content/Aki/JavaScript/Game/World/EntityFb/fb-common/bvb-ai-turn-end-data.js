"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbAiTurnEndData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbAiTurnEndData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBvbAiTurnEndData(t, a) {
    return (a || new BvbAiTurnEndData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbAiTurnEndData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BvbAiTurnEndData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startBvbAiTurnEndData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbAiTurnEndData(t) {
    return t.endObject();
  }
  static createBvbAiTurnEndData(t, a) {
    BvbAiTurnEndData.startBvbAiTurnEndData(t);
    BvbAiTurnEndData.addType(t, a);
    return BvbAiTurnEndData.endBvbAiTurnEndData(t);
  }
}
exports.BvbAiTurnEndData = BvbAiTurnEndData;
//# sourceMappingURL=bvb-ai-turn-end-data.js.map