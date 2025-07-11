"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSettlement = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BattleSettlement {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsBattleSettlement(t, e) {
    return (e || new BattleSettlement()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBattleSettlement(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new BattleSettlement()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  gamePlayCue() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startBattleSettlement(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addGamePlayCue(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endBattleSettlement(t) {
    return t.endObject();
  }
  static createBattleSettlement(t, e, s) {
    BattleSettlement.startBattleSettlement(t);
    BattleSettlement.addType(t, e);
    BattleSettlement.addGamePlayCue(t, s);
    return BattleSettlement.endBattleSettlement(t);
  }
}
exports.BattleSettlement = BattleSettlement;
//# sourceMappingURL=battle-settlement.js.map