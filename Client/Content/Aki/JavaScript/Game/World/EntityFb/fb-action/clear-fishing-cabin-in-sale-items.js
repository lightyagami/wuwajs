"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClearFishingCabinInSaleItems = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ClearFishingCabinInSaleItems {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsClearFishingCabinInSaleItems(e, i) {
    return (i || new ClearFishingCabinInSaleItems()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsClearFishingCabinInSaleItems(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ClearFishingCabinInSaleItems()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static startClearFishingCabinInSaleItems(e) {
    e.startObject(0);
  }
  static endClearFishingCabinInSaleItems(e) {
    return e.endObject();
  }
  static createClearFishingCabinInSaleItems(e) {
    ClearFishingCabinInSaleItems.startClearFishingCabinInSaleItems(e);
    return ClearFishingCabinInSaleItems.endClearFishingCabinInSaleItems(e);
  }
}
exports.ClearFishingCabinInSaleItems = ClearFishingCabinInSaleItems;
//# sourceMappingURL=clear-fishing-cabin-in-sale-items.js.map