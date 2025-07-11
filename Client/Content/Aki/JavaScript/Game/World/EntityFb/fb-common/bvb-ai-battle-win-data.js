"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbAiBattleWinData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbAiBattleWinData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBvbAiBattleWinData(t, a) {
    return (a || new BvbAiBattleWinData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbAiBattleWinData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BvbAiBattleWinData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startBvbAiBattleWinData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbAiBattleWinData(t) {
    return t.endObject();
  }
  static createBvbAiBattleWinData(t, a) {
    BvbAiBattleWinData.startBvbAiBattleWinData(t);
    BvbAiBattleWinData.addType(t, a);
    return BvbAiBattleWinData.endBvbAiBattleWinData(t);
  }
}
exports.BvbAiBattleWinData = BvbAiBattleWinData;
//# sourceMappingURL=bvb-ai-battle-win-data.js.map