"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterGachaSlot = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class MonsterGachaSlot {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsMonsterGachaSlot(t, s) {
    return (s || new MonsterGachaSlot()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMonsterGachaSlot(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new MonsterGachaSlot()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  pos(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  static startMonsterGachaSlot(t) {
    t.startObject(1);
  }
  static addPos(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static endMonsterGachaSlot(t) {
    return t.endObject();
  }
  static createMonsterGachaSlot(t, s) {
    MonsterGachaSlot.startMonsterGachaSlot(t);
    MonsterGachaSlot.addPos(t, s);
    return MonsterGachaSlot.endMonsterGachaSlot(t);
  }
}
exports.MonsterGachaSlot = MonsterGachaSlot;
//# sourceMappingURL=monster-gacha-slot.js.map