"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingTechLevelUpItem = undefined;
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const FishingDefine_1 = require("../FishingDefine");
class FishingTechLevelUpItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.ETt = 0;
  }
  OnRefresh(r, e, i) {
    this.ETt = r.ItemId;
    this.BindOnCanExecuteChange(() => false);
    var n = r.ItemId;
    var o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(n);
    if (o) {
      let e = "";
      var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(n);
      e = t < r.ItemNeedNum ? StringUtils_1.StringUtils.Format(FishingDefine_1.FISHING_TECH_MATERIAL_NOT_ENOUGHT, t.toString()) : StringUtils_1.StringUtils.Format(FishingDefine_1.FISHING_TECH_MATERIAL_WHITE_ENOUGHT, t.toString());
      var t = {
        Type: 4
      };
      t.Type = 4;
      t.Data = r;
      t.ItemConfigId = n;
      t.StarLevel = o.QualityId;
      t.BottomText = e + "/" + r.ItemNeedNum;
      t.IsOmitBottomText = false;
      this.Apply(t);
    }
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.ETt);
  }
}
exports.FishingTechLevelUpItem = FishingTechLevelUpItem;
//# sourceMappingURL=FishingTechLevelUpItem.js.map