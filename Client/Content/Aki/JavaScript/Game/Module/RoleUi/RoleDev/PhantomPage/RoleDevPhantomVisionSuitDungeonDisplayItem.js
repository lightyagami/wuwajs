"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomVisionSuitDungeonDisplayItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class RoleDevPhantomVisionSuitDungeonDisplayItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
  }
  OnRefresh(e, o, t) {
    this.$8i = e;
    this.SetSelected(o);
    this.sqe(e);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  sqe(e) {
    if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.ItemId)) {
      e = {
        Type: 4,
        Data: e,
        BottomText: e.Count === 0 ? "" : e.Count.toString(),
        ItemConfigId: e.ItemId
      };
      this.Apply(e);
    }
  }
  OnExtendToggleClicked() {
    var e = this.$8i;
    if (e) {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.ItemId);
    }
  }
  OnCanExecuteChange() {
    return false;
  }
}
exports.RoleDevPhantomVisionSuitDungeonDisplayItem = RoleDevPhantomVisionSuitDungeonDisplayItem;
//# sourceMappingURL=RoleDevPhantomVisionSuitDungeonDisplayItem.js.map