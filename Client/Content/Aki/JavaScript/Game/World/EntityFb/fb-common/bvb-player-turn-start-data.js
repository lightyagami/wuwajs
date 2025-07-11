"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbPlayerTurnStartData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbPlayerTurnStartData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBvbPlayerTurnStartData(t, a) {
    return (a || new BvbPlayerTurnStartData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbPlayerTurnStartData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BvbPlayerTurnStartData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startBvbPlayerTurnStartData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbPlayerTurnStartData(t) {
    return t.endObject();
  }
  static createBvbPlayerTurnStartData(t, a) {
    BvbPlayerTurnStartData.startBvbPlayerTurnStartData(t);
    BvbPlayerTurnStartData.addType(t, a);
    return BvbPlayerTurnStartData.endBvbPlayerTurnStartData(t);
  }
}
exports.BvbPlayerTurnStartData = BvbPlayerTurnStartData;
//# sourceMappingURL=bvb-player-turn-start-data.js.map