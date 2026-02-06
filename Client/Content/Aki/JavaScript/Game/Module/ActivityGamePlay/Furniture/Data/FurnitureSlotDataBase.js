"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureSlotDataBase = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
class FurnitureSlotDataBase {
  constructor() {
    this.PlacedFurnitureConfigId = 0;
    this.SlotTagId = 0;
    this.ExcludedFurnitureIds = [];
  }
  DeepCopy(t) {
    this.PlacedFurnitureConfigId = t.PlacedFurnitureConfigId;
    this.SlotTagId = t.SlotTagId;
    this.ExcludedFurnitureIds = t.ExcludedFurnitureIds.slice();
  }
  Compare(e) {
    if (this.PlacedFurnitureConfigId !== e.PlacedFurnitureConfigId) {
      return false;
    }
    if (this.SlotTagId !== e.SlotTagId) {
      return false;
    }
    if (this.ExcludedFurnitureIds.length !== e.ExcludedFurnitureIds.length) {
      return false;
    }
    for (let t = 0; t < this.ExcludedFurnitureIds.length; t++) {
      if (this.ExcludedFurnitureIds[t] !== e.ExcludedFurnitureIds[t]) {
        return false;
      }
    }
    return true;
  }
  GetPlacedFurnitureConfigId() {
    return this.PlacedFurnitureConfigId;
  }
  GetSlotTagId() {
    return this.SlotTagId;
  }
  GetExcludedFurnitureIds() {
    return this.ExcludedFurnitureIds;
  }
  CheckCanPlace(t) {
    t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(t);
    return !!t && this.CheckCanPlaceByConfig(t);
  }
  CheckCanPlaceByConfig(t) {
    const e = t.Id;
    return this.ExcludedFurnitureIds.findIndex(t => t === e) === -1 && t.TagId === this.SlotTagId;
  }
  IsPlaced() {
    return this.PlacedFurnitureConfigId !== 0;
  }
}
exports.FurnitureSlotDataBase = FurnitureSlotDataBase;
//# sourceMappingURL=FurnitureSlotDataBase.js.map