"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsumeItemUtil = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ConsumeItem_1 = require("./ConsumeItem");
class ConsumeItemUtil {
  static GetConsumeItemData(e, a) {
    e = ModelManager_1.ModelManager.InventoryModel.GetItemDataBase(e)[0];
    if (e) {
      if (e.GetType() === 2) {
        return this.WeaponConsumeData(e);
      } else {
        return this.MaterialConsumeData(e, a);
      }
    }
  }
  static WeaponConsumeData(e) {
    var a = new ConsumeItem_1.ConsumeItemData();
    var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e.GetUniqueId());
    a.IncId = e.GetUniqueId();
    a.ItemId = e.GetConfigId();
    a.ResonanceLevel = t.GetResonanceLevel();
    a.BottomText = ConfigManager_1.ConfigManager.TextConfig.GetTextById("LevelShow").replace("{0}", t.GetLevel().toString());
    return a;
  }
  static MaterialConsumeData(e, a) {
    var t = new ConsumeItem_1.ConsumeItemData();
    t.IncId = e.GetUniqueId();
    t.ItemId = e.GetConfigId();
    t.BottomText = a + "/" + e.GetCount();
    return t;
  }
}
exports.ConsumeItemUtil = ConsumeItemUtil;
//# sourceMappingURL=ConsumeItemUtil.js.map