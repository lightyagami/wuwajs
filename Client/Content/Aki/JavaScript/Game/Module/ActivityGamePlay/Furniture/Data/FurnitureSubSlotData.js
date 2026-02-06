"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureSubSlotData = undefined;
const FurnitureSlotDataBase_1 = require("./FurnitureSlotDataBase");
class FurnitureSubSlotData extends FurnitureSlotDataBase_1.FurnitureSlotDataBase {
  constructor() {
    super(...arguments);
    this.RootFurnitureEntityId = 0;
    this.RootFurnitureConfigId = 0;
    this.SlotIndex = 0;
  }
  GetSlotType() {
    return 1;
  }
  DeepCopy(t) {
    super.DeepCopy(t);
    this.RootFurnitureEntityId = t.RootFurnitureEntityId;
    this.RootFurnitureConfigId = t.RootFurnitureConfigId;
    this.SlotIndex = t.SlotIndex;
  }
  Compare(t) {
    return !!super.Compare(t) && this.RootFurnitureEntityId === t.RootFurnitureEntityId && this.RootFurnitureConfigId === t.RootFurnitureConfigId && this.SlotIndex === t.SlotIndex;
  }
  SetSlotData(t, e, r, s, i) {
    this.RootFurnitureEntityId = t;
    this.RootFurnitureConfigId = e;
    this.SlotIndex = r;
    this.SlotTagId = s;
    this.ExcludedFurnitureIds = i;
  }
  PlaceFurniture(t) {
    this.PlacedFurnitureConfigId = t;
  }
  UnPlaceFurniture() {
    this.PlacedFurnitureConfigId = 0;
  }
  GetRootFurnitureEntityId() {
    return this.RootFurnitureEntityId;
  }
  GetRootFurnitureConfigId() {
    return this.RootFurnitureConfigId;
  }
  GetSlotIndex() {
    return this.SlotIndex;
  }
}
exports.FurnitureSubSlotData = FurnitureSubSlotData;
//# sourceMappingURL=FurnitureSubSlotData.js.map