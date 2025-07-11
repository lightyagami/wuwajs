"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbStartBattleData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbStartBattleData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBvbStartBattleData(t, a) {
    return (a || new BvbStartBattleData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbStartBattleData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BvbStartBattleData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startBvbStartBattleData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbStartBattleData(t) {
    return t.endObject();
  }
  static createBvbStartBattleData(t, a) {
    BvbStartBattleData.startBvbStartBattleData(t);
    BvbStartBattleData.addType(t, a);
    return BvbStartBattleData.endBvbStartBattleData(t);
  }
}
exports.BvbStartBattleData = BvbStartBattleData;
//# sourceMappingURL=bvb-start-battle-data.js.map