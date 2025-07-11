"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomItemData = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AttributeItemData_1 = require("./AttributeItemData");
class PhantomItemData extends AttributeItemData_1.AttributeItemData {
  constructor() {
    super(...arguments);
    this.HHa = 0;
  }
  SetFetterGroupId(e) {
    this.HHa = e;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(this.ConfigId);
  }
  GetMainType() {
    return 3;
  }
  GetType() {
    return 9;
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
  OnSetFunctionValue(e) {
    var t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(this.UniqueId);
    if (t) {
      t.OnFunctionValueChange(e);
    }
  }
  GetDefaultDownText() {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("VisionLevel");
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetRedDotDisableRule() {
    return this.GetConfig().RedDotDisableRule;
  }
  GetFetterGroupConfig() {
    var e;
    if (this.HHa !== 0) {
      return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(this.HHa);
    } else if ((e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(this.UniqueId)) !== undefined) {
      return e.GetFetterGroupConfig();
    } else {
      return undefined;
    }
  }
}
exports.PhantomItemData = PhantomItemData;
//# sourceMappingURL=PhantomItemData.js.map