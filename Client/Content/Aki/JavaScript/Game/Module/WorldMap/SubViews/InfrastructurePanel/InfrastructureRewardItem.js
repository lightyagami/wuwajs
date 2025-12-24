"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureRewardItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class InfrastructureRewardItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.GetRolePositionFunc = undefined;
    this.IsHighlightIndex = undefined;
    this.ETt = 0;
  }
  OnRefresh(r, e, o) {
    this.ETt = r[0].ItemId;
    if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ETt)) {
      var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.ETt);
      let e = "";
      t = {
        Type: 4,
        Data: r,
        BottomText: e = t < r[1] ? `<color=#9d2437>${t}</color>/${r[1]}` : `<color=#ffd12f>${t}</color>/${r[1]}`,
        ItemConfigId: this.ETt
      };
      this.Apply(t);
    }
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.ETt);
  }
}
exports.InfrastructureRewardItem = InfrastructureRewardItem;
//# sourceMappingURL=InfrastructureRewardItem.js.map