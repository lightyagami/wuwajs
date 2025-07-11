"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementGridItem = exports.AchievementGridItemData = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class AchievementGridItemData {
  constructor() {
    this.Data = undefined;
    this.GetRewardState = false;
  }
}
exports.AchievementGridItemData = AchievementGridItemData;
class AchievementGridItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.Mne = 0;
  }
  OnRefresh(e, t, r) {
    this.Refresh(e);
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Mne);
  }
  Refresh(e) {
    var t;
    var r;
    if (e?.Data) {
      r = e.Data[0];
      t = e.Data[1];
      this.Mne = r.ItemId;
      r = e.GetRewardState;
      e = {
        Data: e,
        Type: 4,
        ItemConfigId: this.Mne,
        BottomText: t > 0 ? "" + t : "",
        IsReceivedVisible: r
      };
      this.Apply(e);
    }
  }
}
exports.AchievementGridItem = AchievementGridItem;
//# sourceMappingURL=AchievementGridItem.js.map