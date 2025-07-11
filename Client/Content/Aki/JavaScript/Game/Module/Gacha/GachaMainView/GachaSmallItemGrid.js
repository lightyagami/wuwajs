"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaSmallItemGrid = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class GachaSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, o, a) {
    if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e) === 1) {
      const t = {
        Type: 2,
        ItemConfigId: e,
        Data: undefined
      };
      this.Apply(t);
    } else {
      const t = {
        Data: undefined,
        Type: 4,
        ItemConfigId: e
      };
      this.Apply(t);
      this.SetToggleInteractive(false);
    }
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {}
}
exports.GachaSmallItemGrid = GachaSmallItemGrid;
//# sourceMappingURL=GachaSmallItemGrid.js.map