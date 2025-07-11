"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HideWorldMonsterAndMonsterTreasure = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HideWorldMonsterAndMonsterTreasure {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsHideWorldMonsterAndMonsterTreasure(e, r) {
    return (r || new HideWorldMonsterAndMonsterTreasure()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsHideWorldMonsterAndMonsterTreasure(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new HideWorldMonsterAndMonsterTreasure()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, e);
    } else {
      return undefined;
    }
  }
  static startHideWorldMonsterAndMonsterTreasure(e) {
    e.startObject(1);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static endHideWorldMonsterAndMonsterTreasure(e) {
    return e.endObject();
  }
  static createHideWorldMonsterAndMonsterTreasure(e, r) {
    HideWorldMonsterAndMonsterTreasure.startHideWorldMonsterAndMonsterTreasure(e);
    HideWorldMonsterAndMonsterTreasure.addType(e, r);
    return HideWorldMonsterAndMonsterTreasure.endHideWorldMonsterAndMonsterTreasure(e);
  }
}
exports.HideWorldMonsterAndMonsterTreasure = HideWorldMonsterAndMonsterTreasure;
//# sourceMappingURL=hide-world-monster-and-monster-treasure.js.map