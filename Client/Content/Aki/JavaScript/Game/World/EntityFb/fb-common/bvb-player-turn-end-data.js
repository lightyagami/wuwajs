"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbPlayerTurnEndData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbPlayerTurnEndData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBvbPlayerTurnEndData(t, a) {
    return (a || new BvbPlayerTurnEndData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbPlayerTurnEndData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BvbPlayerTurnEndData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startBvbPlayerTurnEndData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbPlayerTurnEndData(t) {
    return t.endObject();
  }
  static createBvbPlayerTurnEndData(t, a) {
    BvbPlayerTurnEndData.startBvbPlayerTurnEndData(t);
    BvbPlayerTurnEndData.addType(t, a);
    return BvbPlayerTurnEndData.endBvbPlayerTurnEndData(t);
  }
}
exports.BvbPlayerTurnEndData = BvbPlayerTurnEndData;
//# sourceMappingURL=bvb-player-turn-end-data.js.map