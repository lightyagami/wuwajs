"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponItemData = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AttributeItemData_1 = require("./AttributeItemData");
class WeaponItemData extends AttributeItemData_1.AttributeItemData {
  GetConfig() {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(this.ConfigId);
  }
  GetMainType() {
    return 2;
  }
  GetType() {
    return 2;
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
  GetMaxStackCount() {
    return 1;
  }
  GetDefaultDownText() {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("LevelShow");
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetRedDotDisableRule() {
    return this.GetConfig().RedDotDisableRule;
  }
  GetItemViewDataInfo(e) {
    var t;
    var a;
    var r = this.GetConfig();
    if (r) {
      t = ModelManager_1.ModelManager.InventoryModel;
      a = this.GetUniqueId();
      return {
        ConfigId: r.ItemId,
        Count: 1,
        QualityId: r.QualityId,
        IsLock: this.GetIsLock(),
        IsDeprecate: this.GetIsDeprecated(),
        IsNewItem: t.IsNewAttributeItem(a),
        ItemDataType: this.ItemDataType,
        ItemDataBase: this,
        HasRedDot: t.IsAttributeItemHasRedDot(a),
        ItemOperationMode: e,
        IsSelectOn: false,
        SelectOnNum: 0,
        StackId: 0
      };
    }
  }
}
exports.WeaponItemData = WeaponItemData;
//# sourceMappingURL=WeaponItemData.js.map