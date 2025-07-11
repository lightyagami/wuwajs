"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbPlayerBattleWinData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbPlayerBattleWinData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBvbPlayerBattleWinData(t, a) {
    return (a || new BvbPlayerBattleWinData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbPlayerBattleWinData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BvbPlayerBattleWinData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startBvbPlayerBattleWinData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbPlayerBattleWinData(t) {
    return t.endObject();
  }
  static createBvbPlayerBattleWinData(t, a) {
    BvbPlayerBattleWinData.startBvbPlayerBattleWinData(t);
    BvbPlayerBattleWinData.addType(t, a);
    return BvbPlayerBattleWinData.endBvbPlayerBattleWinData(t);
  }
}
exports.BvbPlayerBattleWinData = BvbPlayerBattleWinData;
//# sourceMappingURL=bvb-player-battle-win-data.js.map