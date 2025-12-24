"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonItemData = undefined;
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ItemDataBase_1 = require("./ItemDataBase");
class CommonItemData extends ItemDataBase_1.ItemDataBase {
  constructor(t, e, i, s, r) {
    super(t, i, s);
    this.UniqueId = 0;
    this.EndTime = 0;
    this.MainTypeId = undefined;
    this.Type = undefined;
    this.MaxStackCount = 0;
    this.QualityId = 0;
    this.SortIndex = 0;
    this.ItemAccess = [];
    this.ShowTypes = [];
    this.UseCountLimit = 0;
    this.RedDotDisableRule = 0;
    this.ShowUseButton = false;
    this.UniqueId = e;
    this.EndTime = r ?? 0;
    t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(this.ConfigId);
    this.MainTypeId = t?.MainTypeId;
    this.Type = t?.ItemType;
    this.MaxStackCount = t?.MaxStackableNum ?? 0;
    this.QualityId = t?.QualityId ?? 0;
    this.SortIndex = t?.SortIndex ?? 0;
    this.ItemAccess = t?.ItemAccess ?? [];
    this.ShowTypes = t?.ShowTypes ?? [];
    this.UseCountLimit = t?.UseCountLimit ?? 0;
    this.RedDotDisableRule = t?.RedDotDisableRule ?? 0;
    this.ShowUseButton = t?.ShowUseButton ?? false;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(this.ConfigId);
  }
  GetUniqueId() {
    return this.UniqueId;
  }
  GetMainType() {
    return this.MainTypeId;
  }
  GetType() {
    return this.Type;
  }
  GetMaxStackCount() {
    return this.MaxStackCount;
  }
  GetQuality() {
    return this.QualityId;
  }
  GetSortIndex() {
    return this.SortIndex;
  }
  GetItemAccess() {
    return this.ItemAccess;
  }
  GetShowTypeList() {
    return this.ShowTypes;
  }
  GetUseCountLimit() {
    return this.UseCountLimit;
  }
  GetRedDotDisableRule() {
    return this.RedDotDisableRule;
  }
  HasRedDot() {
    var t = this.GetConfigId();
    return ModelManager_1.ModelManager.InventoryModel.IsCommonItemHasRedDot(t);
  }
  SetEndTime(t) {
    this.EndTime = t;
  }
  IsLimitTimeItem() {
    return this.EndTime > 0 && !this.IsOverTime();
  }
  GetEndTime() {
    return this.EndTime;
  }
  IsOverTime() {
    return !(this.EndTime <= 0) && this.EndTime <= TimeUtil_1.TimeUtil.GetServerTimeStamp();
  }
  IsValid() {
    return !this.IsOverTime();
  }
  IsBuffEquipItem() {
    return ConfigManager_1.ConfigManager.BuffItemConfig.IsEquipBuffItem(this.ConfigId);
  }
  IsBuffEquippedItem() {
    return !!this.IsBuffEquipItem() && ModelManager_1.ModelManager.BuffItemModel.IsEquippedBuffItem(this.ConfigId);
  }
  IsBuffItem() {
    return ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(this.ConfigId);
  }
  GetIsShowUseButton() {
    return this.ShowUseButton;
  }
  GetItemViewDataInfo(t) {}
}
exports.CommonItemData = CommonItemData;
//# sourceMappingURL=CommonItemData.js.map