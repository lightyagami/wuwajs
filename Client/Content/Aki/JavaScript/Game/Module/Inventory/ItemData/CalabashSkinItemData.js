"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashSkinItemData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ItemDataBase_1 = require("./ItemDataBase");
class CalabashSkinItemData extends ItemDataBase_1.ItemDataBase {
  constructor(e, t, a) {
    super(e, t, a);
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfig(this.ConfigId);
  }
  GetMainType() {
    var e = this.GetConfig();
    if (e) {
      return e.MainTypeId;
    }
  }
  GetType() {
    var e = this.GetConfig();
    if (e) {
      return e.ItemType;
    }
  }
  GetMaxStackCount() {
    return 1;
  }
  GetQuality() {
    return this.GetConfig()?.QualityId;
  }
  GetSortIndex() {
    return this.GetConfig()?.SortIndex;
  }
  GetItemAccess() {
    return this.GetConfig()?.ItemAccess;
  }
  GetUseCountLimit() {
    return 1;
  }
  GetRedDotDisableRule() {
    return this.GetConfig().RedDotDisableRule;
  }
  HasRedDot() {
    var e = this.GetConfigId();
    return ModelManager_1.ModelManager.InventoryModel.IsCommonItemHasRedDot(e);
  }
  IsValid() {
    return true;
  }
  GetIsShowUseButton() {
    return this.GetConfig().ShowUseButton;
  }
  OnIsShowInInventory() {
    return this.GetType() !== 0 && this.GetConfig().ShowInInventory;
  }
  GetItemViewDataInfo(e) {
    var t;
    var a;
    var r = this.GetConfig();
    if (r) {
      t = ModelManager_1.ModelManager.InventoryModel;
      a = this.GetUniqueId();
      return {
        ConfigId: r.Id,
        Count: 1,
        QualityId: r.QualityId,
        IsLock: this.GetIsLock(),
        IsDeprecate: this.GetIsDeprecated(),
        IsNewItem: t.IsNewAttributeItem(a),
        ItemDataType: this.ItemDataType,
        ItemDataBase: this,
        HasRedDot: t.IsCommonItemHasRedDot(a),
        ItemOperationMode: e,
        IsSelectOn: false,
        SelectOnNum: 0,
        StackId: 0
      };
    }
  }
}
exports.CalabashSkinItemData = CalabashSkinItemData;
//# sourceMappingURL=CalabashSkinItemData.js.map