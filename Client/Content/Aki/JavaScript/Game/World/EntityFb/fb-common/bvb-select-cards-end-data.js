"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbSelectCardsEndData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbSelectCardsEndData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsBvbSelectCardsEndData(t, e) {
    return (e || new BvbSelectCardsEndData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbSelectCardsEndData(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new BvbSelectCardsEndData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startBvbSelectCardsEndData(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endBvbSelectCardsEndData(t) {
    return t.endObject();
  }
  static createBvbSelectCardsEndData(t, e) {
    BvbSelectCardsEndData.startBvbSelectCardsEndData(t);
    BvbSelectCardsEndData.addType(t, e);
    return BvbSelectCardsEndData.endBvbSelectCardsEndData(t);
  }
}
exports.BvbSelectCardsEndData = BvbSelectCardsEndData;
//# sourceMappingURL=bvb-select-cards-end-data.js.map