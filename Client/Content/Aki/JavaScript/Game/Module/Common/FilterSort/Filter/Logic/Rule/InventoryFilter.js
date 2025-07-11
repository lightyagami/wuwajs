"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InventoryFilter = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonFilter_1 = require("./CommonFilter");
const VisionDestroyFilterLogic_1 = require("./VisionDestroyFilterLogic");
class InventoryFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments);
    this.YLt = i => {
      return i.GetQuality();
    };
    this.JLt = i => {
      var t = i.GetConfigId();
      if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(t) === 2) {
        t = i.GetUniqueId();
        if (i = ModelManager_1.ModelManager.InventoryModel.GetWeaponItemData(t)) {
          return i.GetConfig().WeaponType;
        } else {
          return undefined;
        }
      }
    };
    this.zLt = i => {
      var t = i.GetConfigId();
      if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(t) === 3) {
        t = i.GetUniqueId();
        if (i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t)) {
          return i.GetMonsterId();
        } else {
          return undefined;
        }
      }
    };
    this.ZLt = i => {
      var t = i.GetSelectOn();
      var i = i.GetItemOperationType() === 1;
      return t && i;
    };
  }
  OnInitFilterMap() {
    this.FilterMap.set(22, this.YLt);
    this.FilterMap.set(2, this.JLt);
    this.FilterMap.set(3, this.zLt);
    this.FilterMap.set(18, this.zLt);
    this.FilterMap.set(19, this.zLt);
    this.FilterMap.set(20, this.zLt);
    this.FilterMap.set(21, this.zLt);
    this.FilterMap.set(14, VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetPhantomRarity);
    this.FilterMap.set(23, VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetPhantomCost);
    this.FilterMap.set(24, VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetPhantomQuality);
    this.FilterMap.set(25, VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetVisionDestroyFetterGroup);
    this.FilterMap.set(26, VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetVisionDestroyAttribute);
    this.FilterMap.set(28, VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetPhantomDeprecate);
  }
  DefaultFilterList() {
    return [this.ZLt];
  }
}
exports.InventoryFilter = InventoryFilter;
//# sourceMappingURL=InventoryFilter.js.map