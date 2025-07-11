"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashLevelUpRewardItemGrid = exports.CalabashRewardItemData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class CalabashRewardItemData {
  constructor() {
    this.ReceiveState = 0;
    this.ItemData = undefined;
  }
}
exports.CalabashRewardItemData = CalabashRewardItemData;
class CalabashLevelUpRewardItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.Mne = 0;
  }
  OnRefresh(e, t, r) {
    this.Mne = e.ItemData[0].ItemId;
    var a = e.ItemData[1];
    this.Qpt(this.Mne, a, e);
  }
  Qpt(e, t, r) {
    this.Mne = e;
    if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(this.Mne) === 1) {
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Mne);
      const a = {
        Data: r,
        Type: 2,
        ItemConfigId: this.Mne,
        BottomText: (t ?? 0) > 0 ? "" + t : "",
        QualityId: e.QualityId,
        IsReceivedVisible: r?.ReceiveState === 3
      };
      this.Apply(a);
    } else {
      const a = {
        Data: r,
        Type: 4,
        ItemConfigId: this.Mne,
        BottomText: (t ?? 0) > 0 ? "" + t : "",
        IsReceivedVisible: r?.ReceiveState === 3
      };
      this.Apply(a);
    }
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Mne);
  }
}
exports.CalabashLevelUpRewardItemGrid = CalabashLevelUpRewardItemGrid;
//# sourceMappingURL=CalabashLevelUpRewardItemGrid.js.map