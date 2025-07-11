"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinRewardItemGrid = exports.SkinRewardData = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LoopScrollSmallItemGrid_1 = require("../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class SkinRewardData {
  constructor() {
    this.ItemData = undefined;
    this.FinishState = false;
  }
}
exports.SkinRewardData = SkinRewardData;
class SkinRewardItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.Mne = 0;
  }
  OnRefresh(e, r, t) {
    this.Refresh(e);
  }
  Refresh(e) {
    var r = e.ItemData;
    var t = r[0];
    let o = 0;
    if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(t.ItemId) === 5) {
      o = r[1];
    }
    this.Mne = t.ItemId;
    r = {
      Data: e,
      Type: 4,
      ItemConfigId: this.Mne,
      IsReceivedVisible: e.FinishState,
      BottomText: o > 0 ? "" + o : ""
    };
    this.Apply(r);
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Mne);
  }
}
exports.SkinRewardItemGrid = SkinRewardItemGrid;
//# sourceMappingURL=SkinRewardItemGrid.js.map