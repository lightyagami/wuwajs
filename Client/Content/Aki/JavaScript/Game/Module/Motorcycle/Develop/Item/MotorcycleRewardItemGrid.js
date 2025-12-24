"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleRewardItemGrid = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class MotorcycleRewardItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.Mne = 0;
    this.thl = true;
    this.ShowReceivedCallBack = undefined;
  }
  OnRefresh(e, t, o) {
    var r = e[0];
    var i = e[1];
    this.Mne = r.ItemId;
    var r = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(this.Mne);
    if (r) {
      r = {
        Data: e,
        Type: 4,
        IconPath: r.Icon,
        QualityId: r.QualityId,
        BottomText: i > 0 ? "" + i : "",
        IsReceivedVisible: this.ShowReceivedCallBack?.(e)
      };
      this.Apply(r);
    } else {
      r = {
        Data: e,
        Type: 4,
        ItemConfigId: this.Mne,
        BottomText: i > 0 ? "" + i : "",
        IsReceivedVisible: this.ShowReceivedCallBack?.(e)
      };
      this.Apply(r);
    }
  }
  OnCanExecuteChange() {
    return false;
  }
  SetAllowClickBack(e) {
    this.thl = e;
  }
  OnExtendToggleClicked() {
    if (this.thl) {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Mne);
    }
  }
}
exports.MotorcycleRewardItemGrid = MotorcycleRewardItemGrid;
//# sourceMappingURL=MotorcycleRewardItemGrid.js.map