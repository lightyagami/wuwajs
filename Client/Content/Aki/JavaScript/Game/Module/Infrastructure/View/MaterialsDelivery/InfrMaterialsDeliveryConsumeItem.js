"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrMaterialsDeliveryConsumeItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class InfrMaterialsDeliveryConsumeItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.GetRolePositionFunc = undefined;
    this.IsHighlightIndex = undefined;
    this.ETt = 0;
  }
  OnRefresh(r, e, o) {
    this.ETt = r[0].ItemId;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ETt);
    if (t) {
      var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.ETt);
      let e = "";
      i = {
        Type: 4,
        Data: r,
        IsOmitBottomText: true,
        BottomText: e = i < r[1] ? `<color=#9d2437>${i}</color>/${r[1]}` : `<color=#ffd12f>${i}</color>/${r[1]}`,
        ItemConfigId: this.ETt,
        StarLevel: t.QualityId
      };
      this.Apply(i);
    }
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.ETt);
  }
}
exports.InfrMaterialsDeliveryConsumeItem = InfrMaterialsDeliveryConsumeItem;
//# sourceMappingURL=InfrMaterialsDeliveryConsumeItem.js.map