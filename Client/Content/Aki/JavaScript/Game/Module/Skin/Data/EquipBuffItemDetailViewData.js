"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EquipBuffItemDetailViewData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class EquipBuffItemDetailViewData {
  constructor() {
    this.RoleSkinData = undefined;
    this.PreviewTitle = "";
    this.Description = "";
    this.TitleName = "";
  }
  LoadFromItemId(t) {
    t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t);
    if (t) {
      this.TitleName = t.Name;
      this.Description = t.BgDescription;
    }
  }
}
exports.EquipBuffItemDetailViewData = EquipBuffItemDetailViewData;
//# sourceMappingURL=EquipBuffItemDetailViewData.js.map