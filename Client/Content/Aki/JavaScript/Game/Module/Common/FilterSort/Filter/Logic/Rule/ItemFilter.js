"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemFilter = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonFilter_1 = require("./CommonFilter");
class ItemFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments);
    this.zLt = e => {
      var t = e.GetConfigId();
      if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(t) === 3) {
        t = e.GetUniqueId();
        if (e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t)) {
          return e.GetMonsterId();
        } else {
          return undefined;
        }
      }
    };
  }
  OnInitFilterMap() {
    this.FilterMap.set(3, this.zLt);
    this.FilterMap.set(18, this.zLt);
    this.FilterMap.set(19, this.zLt);
    this.FilterMap.set(20, this.zLt);
    this.FilterMap.set(21, this.zLt);
  }
}
exports.ItemFilter = ItemFilter;
//# sourceMappingURL=ItemFilter.js.map