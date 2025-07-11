"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettlementDungeon = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SettlementDungeon {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSettlementDungeon(e, t) {
    return (t || new SettlementDungeon()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSettlementDungeon(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SettlementDungeon()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static startSettlementDungeon(e) {
    e.startObject(0);
  }
  static endSettlementDungeon(e) {
    return e.endObject();
  }
  static createSettlementDungeon(e) {
    SettlementDungeon.startSettlementDungeon(e);
    return SettlementDungeon.endSettlementDungeon(e);
  }
}
exports.SettlementDungeon = SettlementDungeon;
//# sourceMappingURL=settlement-dungeon.js.map