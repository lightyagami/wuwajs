"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InventoryGiftCellItem = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../Ui/UiManager");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
class InventoryGiftCellItem extends SmallItemGrid_1.SmallItemGrid {
  constructor() {
    super(...arguments);
    this.Tgl = undefined;
  }
  RefreshByConfigId(e) {
    this.Tgl = e;
    if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e.ItemId) === 1) {
      var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.ItemId);
      const i = {
        Data: undefined,
        Type: 2,
        ItemConfigId: e.ItemId,
        BottomText: "",
        QualityId: t.QualityId,
        IsReceivedVisible: false
      };
      this.Apply(i);
    } else if (this.Tgl.PhantomItemData !== undefined) {
      const i = {
        Data: undefined,
        Type: 3,
        ItemConfigId: e.ItemId,
        BottomText: "",
        IsReceivedVisible: false,
        FetterGroupId: this.Tgl.PhantomItemData.Kws
      };
      this.Apply(i);
    } else {
      const i = {
        Data: undefined,
        Type: 4,
        ItemConfigId: e.ItemId,
        BottomText: "",
        IsReceivedVisible: false
      };
      this.Apply(i);
    }
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    var e = UiManager_1.UiManager.IsViewShow("InventoryView");
    if (this.Tgl.PhantomItemData) {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByExtraParam(this.Tgl.IncId, this.Tgl.PhantomItemData.s5n, this.Tgl.PhantomItemData, e);
    } else {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(this.Tgl.IncId, this.Tgl.ItemId, e);
    }
  }
}
exports.InventoryGiftCellItem = InventoryGiftCellItem;
//# sourceMappingURL=InventoryGiftCellItem.js.map