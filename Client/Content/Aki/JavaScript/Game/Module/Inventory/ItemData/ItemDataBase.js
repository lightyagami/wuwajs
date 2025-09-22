"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemDataBase = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class ItemDataBase {
  constructor(t, e, r) {
    this.LastCount = 0;
    this.ConfigId = t;
    this.Count = e;
    this.ItemDataType = r;
  }
  GetConfigId() {
    return this.ConfigId;
  }
  GetUniqueId() {
    return 0;
  }
  SetCount(t) {
    this.LastCount = this.Count;
    this.Count = t;
  }
  GetCount() {
    return this.Count;
  }
  GetLastCount() {
    return this.LastCount;
  }
  GetItemDataType() {
    return this.ItemDataType;
  }
  GetItemTypeConfig() {
    var t = this.GetType();
    if (t) {
      return ConfigManager_1.ConfigManager.InventoryConfig.GetItemTypeConfig(t);
    }
  }
  CanLock() {
    var t = this.GetItemTypeConfig();
    return !!t && t.Lock;
  }
  CanDeprecate() {
    var t = this.GetItemTypeConfig();
    return !!t && t.Deprecate;
  }
  GetQualityConfig() {
    var t = this.GetQuality();
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(t);
  }
  GetIsLock() {
    return false;
  }
  GetIsDeprecated() {
    return false;
  }
  GetIsShowUseButton() {
    return false;
  }
  IsBuffEquipItem() {
    return false;
  }
  IsBuffEquippedItem() {
    return false;
  }
  IsBuffItem() {
    return false;
  }
  IsShowInInventory() {
    return this.OnIsShowInInventory();
  }
  OnIsShowInInventory() {
    return this.GetType() !== 0;
  }
}
exports.ItemDataBase = ItemDataBase;
//# sourceMappingURL=ItemDataBase.js.map